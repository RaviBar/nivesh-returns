import cron from "node-cron";
import Subscription from "../models/Subscription.js";
import User from "../models/User.js";
import Ledger from "../models/Ledger.js";
import Investment from "../models/Investments.js";

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
          nextReturnDate: newNextReturnDate
        });
        console.log(`Credited ${amount} to user ${sub.userId} for plan ${sub.planName}`);

    } catch (error) {
        console.error(`Failed to process return for subscription ${sub._id}:`, error);
    }
  }
}