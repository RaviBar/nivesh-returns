import cron from "node-cron";
import Subscription from "../models/Subscription.js";
import User from "../models/User.js";
import Ledger from "../models/Ledger.js";
import Investment from "../models/Investments.js";
import PlatformFund from "../models/PlatformFund.js";

export const initScheduledJobs = () => {
  cron.schedule('0 0 * * *', async () => {
    console.log("Running daily check for monthly returns...");
    await creditMonthlyReturns();
  });
};

export async function creditMonthlyReturns() {
    const today = new Date();
  const activeSubs = await Subscription.find({
    status: "active",
    nextReturnDate: { $lte: today }
  });

  for (const sub of activeSubs) {
    try {
        // Check for maturity before crediting new return
        if (sub.endDate && today >= sub.endDate && !sub.matured) {
          // Return principal upon maturity
          await User.findByIdAndUpdate(sub.userId, { $inc: { wallet: sub.amount } });
          await Ledger.create({
            user: sub.userId,
            type: "credit",
            amount: sub.amount,
            description: `Principal returned for matured ${sub.planName}`
          });
          sub.matured = true;
          sub.status = 'completed';
          await sub.save();
          // Reduce invested capital
          const fundMaturity = await PlatformFund.findOne();
          if (fundMaturity) {
            fundMaturity.totalInvested -= sub.amount;
            await fundMaturity.save();
          }
          continue; // skip monthly return credit on the same day of maturity
        }

        const amount = sub.monthlyReturns;
        await User.findByIdAndUpdate(sub.userId, {
          $inc: { wallet: amount }
        });

        await Ledger.create({
          user: sub.userId,
          type: "credit",
          amount,
          description: `Monthly return for ${sub.planName}`
        });

        await Investment.findOneAndUpdate(
          { userId: sub.userId },
          { $inc: { totalEarned: amount } }
        );

        const newNextReturnDate = new Date(sub.nextReturnDate);
        newNextReturnDate.setMonth(newNextReturnDate.getMonth() + 1);

        await Subscription.findByIdAndUpdate(sub._id, {
          $inc: { totalEarned: amount },
          nextReturnDate: newNextReturnDate,
          $push: { returnsHistory: { date: today, amount } }
        });

        // Update platform fund returns distributed
        const fund = await PlatformFund.findOne();
        if (fund) {
          fund.totalReturnsDistributed += amount;
          await fund.save();
        } else {
          await PlatformFund.create({ totalReturnsDistributed: amount });
        }
        console.log(`Credited ${amount} to user ${sub.userId} for plan ${sub.planName}`);

    } catch (error) {
        console.error(`Failed to process return for subscription ${sub._id}:`, error);
    }
  }
}