import express from "express";
import { authMiddleware  } from "../../middleware/auth.js";
import User from "../../models/User.js";
import Ledger from "../../models/Ledger.js";
import Withdrawal from "../../models/Withdrawals.js";

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("wallet totalDeposited totalWithdrawn");

    if (!user) return res.status(404).json({ error: "User not found" });

    const transactions = await Ledger.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .limit(5);

    const lastCredit = await Ledger.findOne({ user: user._id, type: "credit" })
      .sort({ createdAt: -1 });

    res.json({
      walletBalance: user.wallet,
      totalDeposited: user.totalDeposited || 0,
      totalWithdrawn: user.totalWithdrawn || 0,
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
router.post("/withdraw", authMiddleware, async (req, res) => {
    try {
        const { amount } = req.body;
        const userId = req.user.id;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }
        if (!user.accountNumber || !user.ifscCode) {
            return res.status(400).json({ error: "User has not saved bank account details." });
        }
        if (!amount || amount <= 0) {
            return res.status(400).json({ error: "Invalid amount" });
        }
        if (user.wallet < amount) {
            return res.status(400).json({ error: "Insufficient funds" });
        }

        // Create a withdrawal request with a snapshot of bank details
        const withdrawal = await Withdrawal.create({
            user: userId,
            amount,
            bankDetails: {
              accountHolderName: user.accountHolderName,
              bankName: user.bankName,
              accountNumber: user.accountNumber,
              ifscCode: user.ifscCode,
            },
            status: "pending"
        });

        res.json({ success: true, message: "Withdrawal request submitted successfully.", withdrawal });

    } catch (err) {
        console.error("Error submitting withdrawal request:", err);
        res.status(500).json({ error: "Something went wrong" });
    }
});


export default router;