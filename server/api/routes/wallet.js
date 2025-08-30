import express from "express";
import { authMiddleware  } from "../../middleware/auth.js"; 
import User from "../../models/User.js";
import Ledger from "../../models/Ledger.js";

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("wallet"); 

    if (!user) return res.status(404).json({ error: "User not found" });

    const transactions = await Ledger.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .limit(5);

    const totalEarned = await Ledger.aggregate([
      { $match: { user: user._id, type: "credit" } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);
    const totalWithdrawn = await Ledger.aggregate([
      { $match: { user: user._id, type: "withdrawal" } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);
    const lastCredit = await Ledger.findOne({ user: user._id, type: "credit" })
      .sort({ createdAt: -1 });

    res.json({
      walletBalance: user.wallet,
      totalEarned: totalEarned[0]?.total || 0,
      totalWithdrawn: totalWithdrawn[0]?.total || 0,
      lastCredited: lastCredit?.createdAt || null,
      transactions,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch wallet" });
  }
});

router.post("/credit", authMiddleware, async (req, res) => {
  try {
    const { amount, description } = req.body;
    if (!amount || amount <= 0) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    // Update user's wallet
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $inc: { wallet: amount } }, // wallet += amount
      { new: true }
    );

    // Log the transaction in ledger
    await Ledger.create({
      user: req.user.id,
      type: "credit",
      amount,
      description: description || "Wallet credit",
    });

    res.json({ message: "Wallet credited successfully", walletBalance: user.wallet });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to credit wallet" });
  }
});

router.post("/debit", authMiddleware, async (req, res) => {
  try {
    const { amount, description } = req.body;
    if (!amount || amount <= 0) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    const user = await User.findById(req.user.id);

    if (user.wallet < amount) {
        return res.status(400).json({ error: "Insufficient funds" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { $inc: { wallet: -amount } }, 
      { new: true }
    );

    // Log the transaction in ledger
    await Ledger.create({
      user: req.user.id,
      type: "debit",
      amount,
      description: description || "Plan Purchase",
    });

    res.json({ message: "Wallet debited successfully", walletBalance: updatedUser.wallet });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to debit wallet" });
  }
});

export default router;
