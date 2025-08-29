import Subscription from "../models/Subscription.js";
import User from "../models/User.js";
import Ledger from "../models/Ledger.js";
import Investment from "../models/Investment.js";

export async function creditMonthlyReturns() {
  const activeSubs = await Subscription.find({ status: "active" }).populate("plan user");

  for (const sub of activeSubs) {
    const amount = sub.plan.monthlyReturn;

    // Update user wallet
    await User.findByIdAndUpdate(sub.user._id, {
      $inc: { wallet: amount }
    });

    // Log in ledger
    await Ledger.create({
      user: sub.user._id,
      type: "credit",
      amount,
      description: "Monthly return"
    });

    // Update Investment totalEarned
    await Investment.findOneAndUpdate(
      { user: sub.user._id },
      { $inc: { totalEarned: amount } },
      { new: true, upsert: true } // agar record na ho to create bhi ho jaye
    );

    // Update Subscription earnedAmount (individual plan level)
    await Subscription.findByIdAndUpdate(sub._id, {
      $inc: { totalEarned: amount }
    });
  }

  console.log("Monthly returns credited ✅");
}
