import mongoose from "mongoose";
const withdrawalSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  amount: Number,
  bankDetails: {
    accountHolderName: String,
    bankName: String,
    accountNumber: String,
    ifscCode: String,
  },
  status: { type: String, enum: ["pending", "approved", "rejected", "completed", "failed"], default: "pending" },
  date: { type: Date, default: Date.now },
  transactionId: { type: String } 
});
export default mongoose.model("Withdrawal", withdrawalSchema);