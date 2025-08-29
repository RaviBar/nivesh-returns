import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true, required: true },
  phone: String,
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  kycStatus: { type: String, enum: ["pending", "verified", "rejected"], default: "pending" },
  wallet: { type: Number, default: 0 },
});

const User = mongoose.model("User", userSchema);
export default User;
