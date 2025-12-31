import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  planId: { type: mongoose.Schema.Types.ObjectId, ref: "Plan" },
  planName: { type: String, required: true },
  amount: { type: Number, required: true },
  monthlyReturns: { type: Number, required: true },
  totalEarned: { type: Number, default: 0 },
  status: { type: String, enum: ["awaiting_approval", "active", "completed", "cancellation_requested", "rejected"], default: "awaiting_approval" },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date },
  durationMonths: { type: Number },
  nextReturnDate: { type: Date },
  matured: { type: Boolean, default: false },
  returnsHistory: [{
    date: Date,
    amount: Number
  }]
}, { timestamps: true });

export default mongoose.model("Subscription", subscriptionSchema);