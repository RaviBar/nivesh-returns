import express from "express";
// import razorpay from "../config/razorpay.js";
import Subscription from "../../models/Subscription.js";
import Plan from "../../models/Plan.js";
import { authMiddleware } from "../../middleware/auth.js";

const router = express.Router();

// // Create Razorpay order
// router.post("/create-order", async (req, res) => {
//   try {
//     const { planId, userId } = req.body;

//     const plan = await Plan.findById(planId);
//     if (!plan) return res.status(404).json({ error: "Plan not found" });

//     const options = {
//       amount: plan.amount * 100, // Razorpay works in paise
//       currency: "INR",
//       receipt: `order_rcptid_${Date.now()}`,
//     };

//     const order = await razorpay.orders.create(options);

//     // Store a pending subscription
//     await Subscription.create({
//       user: userId,
//       plan: planId,
//       status: "awaiting_admin",
//       startDate: new Date(),
//     });

//     res.json({ orderId: order.id, amount: plan.amount, currency: "INR" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Something went wrong" });
//   }
// });

router.post("/dummy-purchase", authMiddleware, async (req, res) => {
  try {
    console.log("🟢 Body received:", req.body);
    const { planName, amount, monthlyReturns, totalEarned, status, startDate, endDate } = req.body;
    const userId = req.user.id;

    if (!planName || !amount || !monthlyReturns) {
      return res.status(400).json({ error: "planName, amount and monthlyReturns are required" });
    }

    // Direct subscription create
    const subscription = await Subscription.create({
      userId,
      planName,
      amount,
      monthlyReturns,
      totalEarned: totalEarned || 0,
      status: status || "active",
      startDate: startDate || Date.now(),
      endDate: endDate || null,
    });

    res.json({
      message: "Dummy purchase successful!",
      subscription,
    });
  } catch (err) {
    console.error("❌ Subscription error:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;
