import React from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../../components/ui/card";
import axios from "axios";

const PlansPage = () => {

  const handleBuyNow = async (plan) => {
    try {
      // 1. Create Razorpay order from backend
      const { data: order } = await axios.post("http://localhost:5000/api/create-order", 
      { 
        amount: plan.amount,
        planName: plan.name
      }, 
      {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        credentials: "include",
      });

      // 2. Razorpay options
      const options = {
        key: "rzp_test_RBWTNSJF2mGBao", // Replace with your actual Key ID
        amount: order.amount,
        currency: order.currency,
        name: "Nivesh Returns",
        description: `Purchase of ${plan.name}`,
        order_id: order.id,
        handler: async function (response) {
          // 3. Verify payment with backend
          await axios.post("http://localhost:5000/api/verify-payment", {
            ...response,
            plan: plan
          },
          {
             headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            credentials: "include",
          });

          alert("✅ Payment Successful! Your investment is activated.");
        },
        prefill: {
          name: "Your Name", // Fetch from user profile if available
          email: "your.email@example.com", // Fetch from user profile
          contact: "9999999999" // Fetch from user profile
        },
        notes: {
            address: "Nivesh Returns Corporate Office"
        },
        theme: {
            color: "#25703A"
        }
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Payment failed. Try again.");
    }
  };

  const plans = [
    { name: "Starter Plan", amount: 13500, monthlyReturn: 1350, description: "Ideal for beginners looking to explore steady returns with minimal investment risk.", features: ["₹1,350 Monthly returns", "Low-risk, entry-level plan for beginners", "Quick onboarding and easy tracking", "100% secure wallet credit with real-time updates"] },
    { name: "Growth Plan", amount: 25000, monthlyReturn: 2500, description: "A balanced plan offering better returns for those ready to scale up their investments.", features: ["Everything included in Basic", "Exchange up to $1MM per month", "Windows & macOS App", "Premium Support"] },
    { name: "Pro Plan", amount: 50000, monthlyReturn: 5000, description: "Designed for serious investors seeking consistent high-yield monthly income.", features: ["Everything included in Basic", "Exchange to $3MM per month", "Windows & macOS App", "Premium Support"] },
  ];

  return (
    <div className="flex-1 font-inter">
      <h1 className="text-3xl font-medium mb-6 text-[#F1F2FF] px-4 lg:px-0">Our Plans</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <Card key={plan.name} className="bg-[#161D29] border-gray-800 font-manrope pl-4 pt-6 sm:pl-2 sm:pt-8 rounded-2xl overflow-hidden">
            <CardHeader>
              <div className="w-fit bg-[#25703A] text-white px-3 py-2 rounded-md text-sm font-medium mb-4">
                {plan.name.split(' ')[0].toUpperCase()}
              </div>
              <div className="text-4xl font-semibold font-manrope text-white mb-2">
                ₹{plan.amount}
              </div>
              <p className="text-gray-300 mb-4 font-[400] text-[15px] leading-[32px] align-middle">
                {plan.description}
              </p>
            </CardHeader>
            <CardContent>
              <div className="mt-2">
                <h4 className="text-md font-semibold uppercase tracking-wider text-[#25703A] mb-3">
                  FEATURES
                </h4>
                <ul className="space-y-3 list-disc list-outside max-w-[270px] font-DMsans pl-4 leading-[20px] text-[14px] text-gray-400">
                  {plan.features.map(feature => <li key={feature}>{feature}</li>)}
                </ul>
              </div>
            </CardContent>
            <CardFooter className="pt-10 sm:pt-21">
              <Button
                className="w-full py-4 sm:py-6 bg-[#25703A] text-white hover:bg-[#24503A]"
                onClick={() => handleBuyNow(plan)}
              >
                BUY NOW
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PlansPage;
