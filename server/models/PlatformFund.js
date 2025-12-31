import mongoose from "mongoose";

const platformFundSchema = new mongoose.Schema({
  totalDeposited: { type: Number, default: 0 },
  totalInvested: { type: Number, default: 0 },
  totalReturnsDistributed: { type: Number, default: 0 },
  totalWithdrawn: { type: Number, default: 0 }
}, { timestamps: true });

platformFundSchema.virtual('availableForInvestment').get(function() {
  return this.totalDeposited - this.totalInvested - this.totalReturnsDistributed - this.totalWithdrawn;
});

export default mongoose.model('PlatformFund', platformFundSchema);