import express from "express";
import Subscription from "../../models/Subscription.js";
import Plan from "../../models/Plan.js";
import { authMiddleware } from "../../middleware/auth.js";
import mongoose from "mongoose";

const router = express.Router();

// Get user's investments
router.get("/", authMiddleware, async (req, res) => {
  try {
const subs = await Subscription.find({ userId: new mongoose.Types.ObjectId(req.user.id) })
  .sort({ createdAt: -1 });
      console.log("User ID from token:", req.user.id);
      console.log(subs);
    if (!subs.length) {
      return res.json({
        totalInvestment: 0,
        totalEarned: 0,
        activePlans: 0,
        subscriptions: [],
      });
    }

    const activeSubs = subs.filter(s => s.status === "active");

    const totalInvestment = activeSubs.reduce(
      (sum, s) => sum + (s.amount || 0),
      0
    );
    const totalEarned = activeSubs.reduce(
      (sum, s) => sum + (s.monthlyReturns || 0),
      0
    );
    const activePlans = activeSubs.length;

    const subscriptions = subs.map(s => ({
      planName: s.planName || "Unknown",
      status: s.status,
      amount: s.amount || 0,
      monthlyReturns: s.monthlyReturns || 0,
      activePlan: s.status === "active" ? 1 : 0,
    }));

    res.json({
      totalInvestment,
      totalEarned,
      activePlans,
      subscriptions,
    });
  } catch (err) {
    console.error("Error fetching investments:", err);
    res.status(500).json({ error: "Failed to fetch investments" });
  }
});

export default router;
