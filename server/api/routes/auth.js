  import express from "express";
  import bcrypt from "bcryptjs";
  import jwt from "jsonwebtoken";
  import User from "../../models/User.js";
  import { authMiddleware } from "../../middleware/auth.js";

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
    console.log("User found:", user);
    if (!user || !(await bcrypt.compare(password, user.password))) return res.status(401).json({ error: "Invalid" });
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.cookie("token", token, { httpOnly: true }).json({ success: true, token, role: user.role });
  });


  router.get("/profile", authMiddleware, async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select("-password");
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(user);
    } catch (err) {
      console.error("Profile fetch error:", err.message);
      res.status(500).json({ error: "Server error while fetching profile" });
    }
  });

  router.put("/profile", authMiddleware, async (req, res) => {
      try {
          const { firstName, lastName, phone, profession, dob, gender, about, profilePictureUrl } = req.body;
          
          const user = await User.findByIdAndUpdate(
              req.user.id,
              { firstName, lastName, phone, profession, dob, gender, about, profilePictureUrl },
              { new: true, runValidators: true }
          ).select("-password");

          if (!user) {
              return res.status(404).json({ error: "User not found" });
          }

          res.json({ message: "Profile updated successfully", user });

      } catch (err) {
          console.error("Profile update error:", err.message);
          res.status(500).json({ error: "Server error while updating profile" });
      }
  });

  router.post("/change-password", authMiddleware, async (req, res) => {
      try {
          const { currentPassword, newPassword } = req.body;

          const user = await User.findById(req.user.id);
          if (!user) {
              return res.status(404).json({ error: "User not found" });
          }

          const isMatch = await bcrypt.compare(currentPassword, user.password);
          if (!isMatch) {
              return res.status(400).json({ error: "Incorrect current password" });
          }
          
          const hashedPassword = await bcrypt.hash(newPassword, 10);
          user.password = hashedPassword;
          await user.save();

          res.json({ message: "Password updated successfully" });

      } catch (err) {
          console.error("Change password error:", err.message);
          res.status(500).json({ error: "Server error while changing password" });
      }
  });

  export default router;
