import mongoose from "mongoose";
const ledgerSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  type: { type: String, enum: ["credit", "debit"] },
  amount: Number,
  date: { type: Date, default: Date.now },
  description: String,
}, { timestamps: true });
export default mongoose.model("Ledger", ledgerSchema);