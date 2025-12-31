import express from "express";
import { authMiddleware, adminMiddleware } from "../../middleware/auth.js";
import User from "../../models/User.js";
import Subscription from "../../models/Subscription.js";
import Withdrawal from "../../models/Withdrawals.js";
import Investment from "../../models/Investments.js";
import PlatformFund from "../../models/PlatformFund.js";
import Ledger from "../../models/Ledger.js";

const router = express.Router();

router.use(authMiddleware, adminMiddleware);

// Dashboard Summary Route
router.get("/dashboard-summary", async (req, res) => {
    try {
        const totalUsers = await User.countDocuments({ role: 'user' });
        const pendingWithdrawals = await Withdrawal.countDocuments({ status: 'pending' });
        const pendingSubscriptions = await Subscription.countDocuments({ status: 'awaiting_approval' });
        const cancellationRequests = await Subscription.countDocuments({ status: 'cancellation_requested' });

        const totalInvestedResult = await Subscription.aggregate([
            { $match: { status: 'active' } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);
        const totalInvested = totalInvestedResult[0]?.total || 0;

        const fund = await PlatformFund.findOne();
        res.json({
            totalUsers,
            pendingWithdrawals,
            totalInvested,
            pendingSubscriptions,
            cancellationRequests,
            platformFund: fund ? {
              totalDeposited: fund.totalDeposited,
              totalInvested: fund.totalInvested,
              totalReturnsDistributed: fund.totalReturnsDistributed,
              totalWithdrawn: fund.totalWithdrawn,
              availableForInvestment: fund.availableForInvestment
            } : null
        });
    } catch (error) {
        console.error("Dashboard summary error:", error);
        res.status(500).json({ error: "Failed to fetch dashboard summary" });
    }
});

// Dedicated platform fund metrics route
router.get('/platform-fund', async (req, res) => {
  try {
    const fund = await PlatformFund.findOne();
    if (!fund) return res.json({ platformFund: null });
    res.json({
      platformFund: {
        totalDeposited: fund.totalDeposited,
        totalInvested: fund.totalInvested,
        totalReturnsDistributed: fund.totalReturnsDistributed,
        totalWithdrawn: fund.totalWithdrawn,
        availableForInvestment: fund.availableForInvestment
      }
    });
  } catch (err) {
    console.error('Platform fund fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch platform fund metrics' });
  }
});


router.get("/users", async (req, res) => {
  const users = await User.find({ role: 'user' }).select('-password');
  res.json(users);
});

router.post("/kyc/:userId", async (req, res) => {
  const { status } = req.body;
  await User.findByIdAndUpdate(req.params.userId, { kycStatus: status });
  res.json({ success: true });
});

router.get("/subscriptions", async (req, res) => {
  const subs = await Subscription.find().populate("userId", "firstName lastName email").sort({ createdAt: -1 });
  res.json(subs);
});

router.post("/subscriptions/:id/approve", async (req, res) => {
  try {
    const sub = await Subscription.findById(req.params.id);
    if (!sub || sub.status !== 'awaiting_approval') {
      return res.status(400).json({ error: 'Subscription not found or already processed.' });
    }

    // Set next return date one month ahead and maturity date based on duration
    const nextReturnDate = new Date(sub.startDate);
    nextReturnDate.setMonth(nextReturnDate.getMonth() + 1);

    const endDate = new Date(sub.startDate);
    if (sub.durationMonths) {
      endDate.setMonth(endDate.getMonth() + sub.durationMonths);
    }

    sub.status = 'active';
    sub.nextReturnDate = nextReturnDate;
    sub.endDate = endDate;
    await sub.save();

    await Investment.findOneAndUpdate(
      { userId: sub.userId },
      { $inc: { totalInvested: sub.amount, activePlans: 1 } },
      { upsert: true, new: true }
    );

    res.json({ success: true, message: 'Subscription approved and activated.' });
  } catch (error) {
    console.error('Error approving subscription:', error);
    res.status(500).json({ error: 'Server error.' });
  }
});

router.post("/subscriptions/:id/approve-cancellation", async (req, res) => {
    try {
        const sub = await Subscription.findById(req.params.id);
        if (!sub || sub.status !== 'cancellation_requested') {
            return res.status(400).json({ error: 'Subscription not found or cancellation not requested.' });
        }

        // Return principal amount to user's wallet
        await User.findByIdAndUpdate(sub.userId, { $inc: { wallet: sub.amount } });
        
        // Log this transaction in the ledger
        await Ledger.create({
            user: sub.userId,
            type: "credit",
            amount: sub.amount,
            description: `Principal returned for ${sub.planName}`,
        });
        
        // Update user's investment stats
        await Investment.findOneAndUpdate(
            { userId: sub.userId },
            { $inc: { totalInvested: -sub.amount, activePlans: -1 } }
        );

        sub.status = 'completed';
        sub.endDate = new Date();
        await sub.save();

        res.json({ success: true, message: "Cancellation approved and principal returned." });
    } catch (error) {
        console.error("Error approving cancellation:", error);
        res.status(500).json({ error: "Server error." });
    }
});

router.post("/subscriptions/:id/reject-cancellation", async (req, res) => {
    try {
        const sub = await Subscription.findOneAndUpdate(
            { _id: req.params.id, status: 'cancellation_requested' },
            { status: 'active' }, // Revert to active
            { new: true }
        );

        if (!sub) {
            return res.status(404).json({ error: "Subscription not found or not awaiting cancellation." });
        }

        res.json({ success: true, message: "Cancellation request has been rejected." });
    } catch (err) {
        res.status(500).json({ error: "Failed to reject cancellation." });
    }
});

router.get("/withdrawals", async (req, res) => {
  const withdrawals = await Withdrawal.find({ status: "pending" }).populate("user");
  res.json(withdrawals);
});

router.post("/withdrawals/:id/approve", async (req, res) => {
  try {
    const withdrawal = await Withdrawal.findById(req.params.id);
    if (!withdrawal || withdrawal.status !== 'pending') {
      return res.status(400).json({ error: 'Withdrawal not found or already processed.' });
    }

    const user = await User.findById(withdrawal.user);
    if (user.wallet < withdrawal.amount) {
      await Withdrawal.findByIdAndUpdate(req.params.id, { status: "failed", reason: "Insufficient funds at time of processing." });
      return res.status(400).json({ success: false, message: "User had insufficient funds. Marked as failed." });
    }
    
    // PSEUDOCODE: Integrate with Razorpay Payouts API here
    console.log(`Simulating payout of ${withdrawal.amount} to ${withdrawal.bankDetails.accountNumber}`);
    
    // ONLY after successful payout API response:
    await User.findByIdAndUpdate(withdrawal.user, { 
      $inc: { wallet: -withdrawal.amount, totalWithdrawn: withdrawal.amount } 
    });

    // Update platform fund totals
    const fund = await PlatformFund.findOne();
    if (fund) {
      fund.totalWithdrawn += withdrawal.amount;
      await fund.save();
    } else {
      await PlatformFund.create({ totalWithdrawn: withdrawal.amount });
    }
    
    await Withdrawal.findByIdAndUpdate(req.params.id, { 
      status: "completed",
    });
    
    res.json({ success: true, message: "Withdrawal approved and processed." });

  } catch (error) {
    console.error("Error approving withdrawal:", error);
    await Withdrawal.findByIdAndUpdate(req.params.id, { status: "failed" });
    res.status(500).json({ success: false, error: "Failed to process withdrawal." });
  }
});
router.post("/withdrawals/:id/reject", async (req, res) => {
  await Withdrawal.findByIdAndUpdate(req.params.id, { status: "rejected" });
  res.json({ success: true });
});

export default router;

