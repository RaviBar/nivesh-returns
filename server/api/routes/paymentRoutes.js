import express from "express";
import razorpay from "../../config/razorpay.js";
import Subscription from "../../models/Subscription.js";
import User from "../../models/User.js";
import { authMiddleware } from "../../middleware/auth.js";
import crypto from "crypto";

const router = express.Router();

// router.post("/dummy-purchase", authMiddleware, async (req, res) => {
//   try {
  //     console.log("🟢 Body received:", req.body);
  //     const { planName, amount, monthlyReturns, totalEarned, status, startDate, endDate } = req.body;
  //     const userId = req.user.id;

//     if (!planName || !amount || !monthlyReturns) {
//       return res.status(400).json({ error: "planName, amount and monthlyReturns are required" });
//     }

//     // Direct subscription create
//     const subscription = await Subscription.create({
//       userId,
//       planName,
//       amount,
//       monthlyReturns,
//       totalEarned: totalEarned || 0,
//       status: status || "active",
//       startDate: startDate || Date.now(),
//       endDate: endDate || null,
//     });

//     res.json({
//       message: "Dummy purchase successful!",
//       subscription,
//     });
//   } catch (err) {
//     console.error("❌ Subscription error:", err);
//     res.status(500).json({ error: "Something went wrong" });
//   }
// });

// Create Razorpay order
router.post("/create-order", authMiddleware, async (req, res) => {
  try {
    const { amount, planName } = req.body;

    if (!amount || !planName) {
        return res.status(400).json({ error: "Amount and Plan Name are required." });
    }

    const options = {
      amount: amount * 100, // Razorpay works in paise
      currency: "INR",
      receipt: `receipt_order_${new Date().getTime()}`,
      notes: {
        planName: planName,
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


// Verify payment
router.post("/verify-payment", authMiddleware, async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, plan } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(body.toString())
        .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
        // Payment is authentic, now create the subscription and update the user's wallet.
        
        // Add amount to wallet
        await User.findByIdAndUpdate(req.user.id, {
            $inc: { wallet: plan.amount }
        });

        // Create subscription
        await Subscription.create({
            userId: req.user.id,
            planName: plan.name,
            amount: plan.amount,
            monthlyReturns: plan.monthlyReturn,
            status: "active",
        });

        res.json({ success: true, orderId: razorpay_order_id, paymentId: razorpay_payment_id });

    } else {
        res.status(400).json({ success: false, error: "Invalid signature" });
    }
});

// router.post("/purchase-wallet", authMiddleware, async (req, res) => {
//   try {
//     const { planId } = req.body;
//     const userId = req.user.id;

//     if (!planId) return res.status(400).json({ error: "planId is required" });

//     // Fetch plan
//     const plan = await Plan.findById(planId);
//     if (!plan) return res.status(404).json({ error: "Plan not found" });

//     // Fetch user
//     const user = await User.findById(userId);
//     if (!user) return res.status(404).json({ error: "User not found" });

//     // Check wallet balance
//     if (user.wallet < plan.amount)
//       return res.status(400).json({ error: "Insufficient wallet balance" });

//     // Deduct wallet balance
//     user.wallet -= plan.amount;
//     await user.save();

//     // Log in Ledger
//     await Ledger.create({
//       user: userId,
//       type: "debit",
//       amount: plan.amount,
//       description: `Purchase Plan: ${plan.name}`,
//     });

//     // Create subscription
//     const subscription = await Subscription.create({
//       userId,
//       planName: plan.name,
//       amount: plan.amount,
//       monthlyReturns: plan.monthlyReturn,
//       totalEarned: 0,
//       status: "active",
//       startDate: Date.now(),
//     });

//     res.json({ message: "Plan purchased successfully!", subscription });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Failed to purchase plan" });
//   }
// });

export default router;
