import express from "express";
import Subscription from "../../models/Subscription.js";
import { authMiddleware } from "../../middleware/auth.js";
import mongoose from "mongoose";
const router = express.Router();

// Get user's investments
router.get("/", authMiddleware, async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);
    const allSubs = await Subscription.find({ userId }).sort({ createdAt: -1 });
    const activeSubs = allSubs.filter(s => s.status === "active");

    const totalInvestment = activeSubs.reduce(
      (sum, s) => sum + (s.amount || 0),
      0
    );
    const totalEarned = allSubs.reduce(
      (sum, s) => sum + (s.totalEarned || 0),
      0
    );
    const activePlans = activeSubs.length;

    const subscriptions = allSubs.map(s => ({
      _id: s._id,
      planName: s.planName,
      status: s.status,
      amount: s.amount,
      monthlyReturns: s.monthlyReturns,
      startDate: s.startDate,
      nextReturnDate: s.nextReturnDate,
      totalEarned: s.totalEarned
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

// Request to cancel a subscription
router.post('/subscriptions/:id/request-cancellation', authMiddleware, async (req, res) => {
    try {
        const sub = await Subscription.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.id, status: 'active' },
            { status: 'cancellation_requested' },
            { new: true }
        );

        if (!sub) {
            return res.status(404).json({ error: "Active subscription not found." });
        }

        res.json({ success: true, message: "Cancellation requested. Admin will review." });
    } catch (err) {
        console.error("Error requesting subscription cancellation:", err);
        res.status(500).json({ error: "Failed to request cancellation." });
    }
});

export default router;