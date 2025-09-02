import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  planName: { type: String, required: true },
  amount: { type: Number, required: true },
  monthlyReturns: { type: Number, required: true },
  totalEarned: { type: Number, default: 0 },
  status: { type: String, enum: ["active", "awaiting_admin", "completed", "cancellation_requested", "rejected"], default: "awaiting_approval"  },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date },
  nextReturnDate: { type: Date }, 
});

export default mongoose.model("Subscription", subscriptionSchema);