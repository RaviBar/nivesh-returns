import React, { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../../components/ui/card";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PlansPage = () => {
  const navigate = useNavigate();
  const [walletBalance, setWalletBalance] = useState(0);
  const [feedback, setFeedback] = useState({ message: '', type: '' });

  useEffect(() => {
    const fetchWalletBalance = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/wallet", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setWalletBalance(data.walletBalance);
      } catch (error) {
        console.error("Failed to fetch wallet balance:", error);
      }
    };
    fetchWalletBalance();
  }, []);


  const handleBuyNow = async (plan) => {
    setFeedback({ message: '', type: '' }); // Clear previous feedback
    try {
      if (walletBalance < plan.amount) {
        setFeedback({ message: "Insufficient wallet balance. Please top up your wallet.", type: 'error' });
        setTimeout(() => navigate("/user/dashboard/wallet"), 3000);
        return;
      }

      const { data } = await axios.post("http://localhost:5000/api/purchase-plan",
      { plan },
      {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setFeedback({ message: data.message, type: 'success' });
      // Refresh wallet balance after purchase
      const updatedWallet = await axios.get("http://localhost:5000/api/wallet", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setWalletBalance(updatedWallet.data.walletBalance);

    } catch (error) {
      console.error("Purchase Error:", error);
      setFeedback({ message: error.response?.data?.error || "Purchase failed. Try again.", type: 'error' });
    }
  };

  const plans = [
    { name: "Starter Plan", amount: 13500, monthlyReturn: 1350, description: "Ideal for beginners looking to explore steady returns with minimal investment risk.", features: ["₹1,350 Monthly returns", "Low-risk, entry-level plan for beginners", "Quick onboarding and easy tracking", "100% secure wallet credit with real-time updates"] },
    { name: "Growth Plan", amount: 25000, monthlyReturn: 2500, description: "A balanced plan offering better returns for those ready to scale up their investments.", features: ["Everything included in Basic", "Exchange up to $1MM per month", "Windows & macOS App", "Premium Support"] },
    { name: "Pro Plan", amount: 50000, monthlyReturn: 5000, description: "Designed for serious investors seeking consistent high-yield monthly income.", features: ["Everything included in Basic", "Exchange to $3MM per month", "Windows & macOS App", "Premium Support"] },
  ];

  return (
    <div className="flex-1 font-inter">
      <h1 className="text-3xl font-medium mb-2 text-[#F1F2FF] px-4 lg:px-0">Our Plans</h1>
      <p className="text-gray-400 mb-6 px-4 lg:px-0">Current Wallet Balance: <span className="font-semibold text-white">₹{walletBalance.toLocaleString()}</span></p>

      {feedback.message && (
        <div className={`p-4 rounded-lg mb-6 ${feedback.type === 'success' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
            {feedback.message}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <Card key={plan.name} className="bg-[#161D29] border-gray-800 font-manrope flex flex-col pl-4 pt-6 sm:pl-2 sm:pt-8 rounded-2xl overflow-hidden">
            <CardHeader>
              <div className="w-fit bg-[#25703A] text-white px-3 py-2 rounded-md text-sm font-medium mb-4">
                {plan.name.split(' ')[0].toUpperCase()}
              </div>
              <div className="text-4xl font-semibold font-manrope text-white mb-2">
                ₹{plan.amount.toLocaleString()}
              </div>
              <p className="text-gray-300 mb-4 font-[400] text-[15px] leading-[32px] align-middle">
                {plan.description}
              </p>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="mt-2">
                <h4 className="text-md font-semibold uppercase tracking-wider text-[#25703A] mb-3">
                  FEATURES
                </h4>
                <ul className="space-y-3 list-disc list-outside max-w-[270px] font-DMsans pl-4 leading-[20px] text-[14px] text-gray-400">
                  {plan.features.map(feature => <li key={feature}>{feature}</li>)}
                </ul>
              </div>
            </CardContent>
            <CardFooter className="pt-10 sm:pt-21 mt-auto">
              <Button
                className="w-full py-4 sm:py-6 bg-[#25703A] text-white hover:bg-[#24503A]"
                onClick={() => handleBuyNow(plan)}
                disabled={walletBalance < plan.amount}
              >
                {walletBalance < plan.amount ? "Insufficient Balance" : "BUY NOW"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PlansPage;