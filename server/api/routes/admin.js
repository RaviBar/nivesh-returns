import express from "express";
import { authMiddleware, adminMiddleware } from "../../middleware/auth.js";
import User from "../../models/User.js";
import Subscription from "../../models/Subscription.js";
import Withdrawal from "../../models/Withdrawals.js";
const router = express.Router();

router.use(authMiddleware, adminMiddleware);

router.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

router.post("/kyc/:userId", async (req, res) => {
  const { status } = req.body;
  await User.findByIdAndUpdate(req.params.userId, { kycStatus: status });
  res.json({ success: true });
});

router.get("/subscriptions", async (req, res) => {
  const subs = await Subscription.find({ status: "awaiting_admin" }).populate("user plan");
  res.json(subs);
});

router.post("/subscriptions/:id/approve", async (req, res) => {
  await Subscription.findByIdAndUpdate(req.params.id, { status: "active" });
  res.json({ success: true });
});

router.post("/subscriptions/:id/reject", async (req, res) => {
  await Subscription.findByIdAndUpdate(req.params.id, { status: "rejected" });
  res.json({ success: true });
});

router.get("/withdrawals", async (req, res) => {
  const withdrawals = await Withdrawal.find({ status: "pending" }).populate("user");
  res.json(withdrawals);
});

router.post("/withdrawals/:id/approve", async (req, res) => {
  const withdrawal = await Withdrawal.findById(req.params.id);
  await User.findByIdAndUpdate(withdrawal.user, { $inc: { wallet: -withdrawal.amount } });
  await Withdrawal.findByIdAndUpdate(req.params.id, { status: "approved" });
  res.json({ success: true });
});

router.post("/withdrawals/:id/reject", async (req, res) => {
  await Withdrawal.findByIdAndUpdate(req.params.id, { status: "rejected" });
  res.json({ success: true });
});

export default router;