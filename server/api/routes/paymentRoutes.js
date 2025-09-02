import express from "express";
import razorpay from "../../config/razorpay.js";
import Subscription from "../../models/Subscription.js";
import User from "../../models/User.js";
import Investment from "../../models/Investments.js";
import Ledger from "../../models/Ledger.js";
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
    const { plan } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);

    if (user.wallet < plan.amount) {
      return res.status(400).json({ error: "Insufficient wallet balance" });
    }

    user.wallet -= plan.amount;
    await user.save();

    await Subscription.create({
        userId,
        planName: plan.name,
        amount: plan.amount,
        monthlyReturns: plan.monthlyReturn,
        status: "awaiting_approval", 
        startDate: new Date(),
    });
    
    // Log the debit transaction
    await Ledger.create({
        user: userId,
        type: "debit",
        amount: plan.amount,
        description: `Purchase of ${plan.name} (Pending Approval)`,
    });

    res.json({ success: true, message: "Plan purchased successfully! Your investment is awaiting admin approval." });
  } catch (err) {
    console.error("Error purchasing plan:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});


export default router;