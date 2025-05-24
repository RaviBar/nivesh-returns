import React from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";

const PricingSection = () => {
  return (
    <section>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl max-w-xl md:leading-[1.3] font-manrope font-semibold mb-6 mx-auto">
            Choose a plan that suits your goals best.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 h-auto md:h-[610px]">
          {/* Starter Plan */}
          <Card className="bg-[#F5F5F5] border-none font-manrope pl-4 pt-6 sm:pl-2 sm:pt-8 rounded-2xl overflow-hidden">
            <CardHeader>
              <div className="w-fit bg-[#25703A] text-white px-3 py-2 rounded-md text-sm font-medium mb-4">
                STARTER
              </div>
              <div className="text-4xl font-semibold font-manrope text-[#246B62] mb-2">
                ₹13,500
              </div>
              <p className="text-[#212B36] mb-4 font-[400] text-[15px] leading-[32px] align-middle">
                Ideal for beginners looking to explore steady returns with minimal investment risk.
              </p>
            </CardHeader>

            <CardContent>
              <div className="mt-2">
                <h4 className="text-md font-semibold uppercase tracking-wider text-[#25703A] mb-3">
                  FEATURES
                </h4>
                <ul className="space-y-3 list-disc list-outside max-w-[270px] font-DMsans pl-4 leading-[20px] text-[14px] text-[#474747]">
                  <li>
                    <span className="text-[#246B62] font-semibold">₹1,350</span> Monthly returns
                  </li>
                  <li>Low-risk, entry-level plan for beginners</li>
                  <li>Quick onboarding and easy tracking</li>
                  <li>100% secure wallet credit with real-time updates</li>
                </ul>
              </div>
            </CardContent>

            <CardFooter className="pt-10 sm:pt-21">
              <Button className="w-full py-4 sm:py-6 bg-[#25703A] text-white hover:bg-[#24503A]">
                BUY NOW
              </Button>
            </CardFooter>
          </Card>

          {/* Growth Plan - Highlighted */}
          <Card className="bg-[#25703A] font-DMsans text-white pl-2 pt-5 sm:pl-1 sm:pt-5 border-none rounded-2xl overflow-hidden scale-y-105 w-full sm:w-[385px] shadow-lg">
            <CardHeader className="pb-0">
              <div className="w-fit bg-[#24523182] text-white px-3 py-2 rounded-md text-sm font-medium mb-2">
                GROWTH
              </div>
              <div className="text-4xl font-semibold font-manrope mb-2">₹25,000</div>
              <p className="text-white max-w-xs mb-2 font-[360] text-[18px] leading-[32px] align-middle">
                A balanced plan offering better <br /> returns for those ready to scale up <br /> their investments.
              </p>
            </CardHeader>

            <CardContent>
              <div className="mt-4">
                <h4 className="text-md font-semibold uppercase tracking-wider text-white mb-3">
                  FEATURES
                </h4>
                <ul className="space-y-3 list-disc list-inside text-md text-white">
                  <li>Everything included in Basic</li>
                  <li>Exchange up to $1MM per month</li>
                  <li>Windows & macOS App</li>
                  <li>Premium Support</li>
                </ul>
              </div>
            </CardContent>

            <CardFooter className="pt-10 sm:pt-16">
              <Button className="w-full font-manrope py-4 sm:py-6 bg-black text-white hover:bg-black">
                BUY NOW
              </Button>
            </CardFooter>
          </Card>

          {/* Pro Plan */}
          <Card className="bg-[#F5F5F5] font-manrope pl-4 pt-6 sm:pl-2 sm:pt-8 border-none rounded-2xl overflow-hidden">
            <CardHeader className="pb-0">
              <div className="w-fit bg-[#25703A] text-white px-3 py-2 rounded-md text-sm font-medium mb-4">
                PRO
              </div>
              <div className="text-4xl text-[#246B62] font-semibold mb-2">₹50,000</div>
              <p className="text-[#212B36] max-w-xs mb-4 font-[400] text-[15px] leading-[32px] align-middle">
                Designed for serious investors seeking consistent high-yield monthly income.
              </p>
            </CardHeader>

            <CardContent>
              <div className="mt-4">
                <h4 className="text-md font-semibold uppercase tracking-wider text-[#25703A] mb-3">
                  FEATURES
                </h4>
                <ul className="space-y-3 list-disc font-DMsans list-inside text-[14px] text-[#474747]">
                  <li>Everything included in Basic</li>
                  <li>Exchange to $3MM per month</li>
                  <li>Windows & macOS App</li>
                  <li>Premium Support</li>
                </ul>
              </div>
            </CardContent>

            <CardFooter className="pt-10 sm:pt-16">
              <Button className="w-full py-4 sm:py-6 bg-[#25703A] text-white hover:bg-[#24503A]">
                BUY NOW
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;