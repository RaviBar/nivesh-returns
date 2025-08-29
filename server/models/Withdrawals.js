import mongoose from "mongoose";
const withdrawalSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  amount: Number,
  bankDetails: String,
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  date: { type: Date, default: Date.now },
});
export default mongoose.model("Withdrawal", withdrawalSchema);