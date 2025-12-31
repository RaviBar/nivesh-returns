import mongoose from "mongoose";

const planSchema = new mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: Number, required: true }, // principal required to join
  monthlyReturn: { type: Number, required: true }, // monthly return amount or percentage base (interpretation up to business logic)
  durationMonths: { type: Number, required: true }, // total duration of plan
  isPercentage: { type: Boolean, default: false } // if true, monthlyReturn is percentage applied to amount
}, { timestamps: true });

export default mongoose.model("Plan", planSchema);
