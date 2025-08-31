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
        // Payment is authentic, now update the user's wallet.
        await User.findByIdAndUpdate(req.user.id, {
            $inc: { wallet: amount }
        });

        await Ledger.create({
            user: req.user.id,
            type: "credit",
            amount,
            description: "Wallet Deposit",
        });
        await Investment.findOneAndUpdate(
            { userId: req.user.id },
            { $inc: { totalDeposited: amount } },
            { upsert: true, new: true }
        );
        res.json({
            success: true,
            walletBalance: user.wallet,
            message: "Deposit successful",
        });
        res.json({ success: true, orderId: razorpay_order_id, paymentId: razorpay_payment_id });

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

    // Deduct plan amount from wallet
    user.wallet -= plan.amount;
    await user.save();

    const startDate = new Date();
    const nextReturnDate = new Date(startDate);
    nextReturnDate.setMonth(nextReturnDate.getMonth() + 1);

    // Create subscription
    await Subscription.create({
        userId,
        planName: plan.name,
        amount: plan.amount,
        monthlyReturns: plan.monthlyReturn,
        status: "active",
        startDate: startDate,
        nextReturnDate: nextReturnDate,
    });

    // Update total invested amount
    await Investment.findOneAndUpdate(
      { userId },
      { $inc: { totalInvested: plan.amount, activePlans: 1 } },
      { upsert: true, new: true }
    );

    res.json({ success: true, message: "Plan purchased successfully!" });
  } catch (err) {
    console.error("Error purchasing plan:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});


export default router;
