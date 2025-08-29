import mongoose from "mongoose";

const investmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  totalInvested: { type: Number, default: 0 },   
  totalEarned: { type: Number, default: 0 },    
  activePlans: { type: Number, default: 0 }      
});

export default mongoose.model("Investment", investmentSchema);
