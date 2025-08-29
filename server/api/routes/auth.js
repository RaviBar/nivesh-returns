import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/User.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  console.log("Incoming body:", req.body); 
  try {
    const { firstName, lastName, email, phone, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
      role: "user"
    });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) return res.status(401).json({ error: "Invalid" });
  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
  res.cookie("token", token, { httpOnly: true }).json({ success: true, role: user.role });
});

// User profile API for dashboard
import Subscription from "../../models/Subscription.js";
import Ledger from "../../models/Ledger.js";
router.get("/profile", async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ error: "Unauthorized" });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    const plans = await Subscription.find({ user: user._id, status: "active" }).populate("plan");
    const ledger = await Ledger.find({ user: user._id }).sort({ date: -1 }).limit(10);
    res.json({ email: user.email, wallet: user.wallet, plans, ledger });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
