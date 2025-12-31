import express from "express";
import razorpay from "../../config/razorpay.js";
import Subscription from "../../models/Subscription.js";
import User from "../../models/User.js";
import Investment from "../../models/Investments.js";
import Ledger from "../../models/Ledger.js";
import Plan from "../../models/Plan.js";
import PlatformFund from "../../models/PlatformFund.js";
import { authMiddleware } from "../../middleware/auth.js";
import crypto from "crypto";

const router = express.Router();

// Create Razorpay order
router.post("/create-order", authMiddleware, async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount) {
        return res.status(400).json({ error: "Amount is required." });
    }

    const options = {
      amount: amount * 100, // Razorpay works in paise
      currency: "INR",
      receipt: `receipt_order_${new Date().getTime()}`,
      notes: {
        userId: req.user.id,
      }
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    console.error("Error creating Razorpay order:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});


// Verify payment and add funds to wallet
router.post("/deposit", authMiddleware, async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, amount } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(body.toString())
        .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
        const user = await User.findByIdAndUpdate(req.user.id, {
            $inc: { wallet: amount, totalDeposited: amount }
        }, { new: true });

        // Update platform fund aggregate for deposits
        const fund = await PlatformFund.findOne();
        if (fund) {
          fund.totalDeposited += amount;
          await fund.save();
        } else {
          await PlatformFund.create({ totalDeposited: amount });
        }

        await Ledger.create({
            user: req.user.id,
            type: "credit",
            amount,
            description: "Wallet Deposit",
        });

        res.json({
            success: true,
            walletBalance: user.wallet,
            message: "Deposit successful",
        });

    } else {
        res.status(400).json({ success: false, error: "Invalid signature" });
    }
});
// Purchase a plan using wallet balance
router.post("/purchase-plan", authMiddleware, async (req, res) => {
  try {
    const { planId } = req.body;
    if (!planId) return res.status(400).json({ error: "planId is required" });

    const plan = await Plan.findById(planId);
    if (!plan) return res.status(404).json({ error: "Plan not found" });

    const userId = req.user.id;
    const user = await User.findById(userId);

    if (user.wallet < plan.amount) {
      return res.status(400).json({ error: "Insufficient wallet balance" });
    }

    // Deduct user wallet
    user.wallet -= plan.amount;
    await user.save();

    // Create pending subscription
    const subscription = await Subscription.create({
      userId,
      planId: plan._id,
      planName: plan.name,
      amount: plan.amount,
      monthlyReturns: plan.isPercentage ? (plan.amount * plan.monthlyReturn) / 100 : plan.monthlyReturn,
      status: "awaiting_approval",
      startDate: new Date(),
      durationMonths: plan.durationMonths
    });

    // Log the debit transaction
    await Ledger.create({
      user: userId,
      type: "debit",
      amount: plan.amount,
      description: `Purchase of ${plan.name} (Pending Approval)`
    });

    // Update platform fund aggregate
    const fund = await PlatformFund.findOne();
    if (fund) {
      fund.totalInvested += plan.amount; // considered earmarked for investment
      await fund.save();
    } else {
      await PlatformFund.create({ totalInvested: plan.amount });
    }

    res.json({ success: true, message: "Plan purchased successfully! Awaiting admin approval.", subscriptionId: subscription._id });
  } catch (err) {
    console.error("Error purchasing plan:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});


export default router;