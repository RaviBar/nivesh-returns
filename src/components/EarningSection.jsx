import React from "react"
import { Card } from "./ui/card"
import { Button } from "./ui/button"
import { Check } from "lucide-react"
import icon1 from "../assets/earning1.svg"
import icon2 from "../assets/earning2.svg"
import icon3 from "../assets/earning3.svg"
const EarningSection = () => {
  return (
    <section className="py-20 md:py-34 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-32 font-manrope items-center">
          {/* Left Column - Card */}
          <div className="order-2 lg:order-1">
            <Card className="shadow-md border-none rounded-2xl bg-[#F0F0F2] p-4 md:p-10 w-full lg:w-[568px] max-w-full lg:max-w-xl">
              <div className="space-y-3 md:space-y-4">
                {/* Investment Plan Row */}
                <div className="flex items-center bg-white rounded-xl md:rounded-2xl p-3 md:p-4">
                  <div className="flex items-center justify-center bg-[#F1F5F9] rounded-lg p-2 md:p-3 mr-3 md:mr-4">
                    <img
                      src={icon1}
                      alt="logo" 
                      width={24}
                      height={24}
                      className="mx-auto w-6 md:w-8"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="text-xl md:text-2xl font-medium text-[#171717]">13,500</div>
                    <div className="text-xs md:text-sm text-[#383838] font-inter">Investment Plan</div>
                  </div>
                  <div className="text-right">
                    <div className="text-base md:text-lg font-semibold text-[#171717]">₹1,350/m</div>
                  </div>
                </div>

                {/* Monthly Return Row */}
                <div className="flex items-center bg-white rounded-xl p-3 md:p-4">
                  <div className="flex items-center justify-center bg-[#F1F5F9] rounded-lg p-2 md:p-3 mr-3 md:mr-4">
                    <img
                      src={icon2} 
                      alt="logo" 
                      width={24}
                      height={24}
                      className="mx-auto w-6 md:w-8"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="text-xl md:text-2xl font-medium text-[#171717]">25,000</div>
                    <div className="text-xs md:text-sm text-[#383838] font-inter">Monthly Return</div>
                  </div>
                  <div className="text-right">
                    <div className="text-base md:text-lg font-semibold text-[#171717]">₹2,500/m</div>
                  </div>
                </div>

                {/* Wallet Credit Row */}
                <div className="flex items-center bg-white rounded-xl p-3 md:p-4">
                  <div className="flex items-center justify-center bg-[#F1F5F9] rounded-lg p-2 md:p-3 mr-3 md:mr-4">
                    <img
                      src={icon3}
                      alt="logo" 
                      width={24}
                      height={24}
                      className="mx-auto w-6 md:w-8"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="text-xl md:text-2xl font-medium text-[#171717]">50,000</div>
                    <div className="text-xs md:text-sm text-[#383838] font-inter">Wallet Credit</div>
                  </div>
                  <div className="text-right">
                    <div className="text-base md:text-lg font-semibold text-[#171717]">₹5,000/m</div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column - Content */}
          <div className="order-1 lg:order-2">
            <h2 className="text-2xl md:text-3xl lg:text-5xl font-semibold max-w-xl leading-[1.2] md:leading-[1.3] lg:leading-[1.2] mb-4 md:mb-6">
              Your Earnings, Tracked in Real-Time
            </h2>
            <p className="text-[#383838] max-w-lg mb-6 md:mb-8 text-sm md:text-base">
              Our platform empowers you to invest confidently — with secure plans, 
              admin-controlled payouts, and instant updates right in your wallet.
            </p>

            <div className="space-y-2 text-[#383838] mb-6 md:mb-8 font-inter">
              <div className="flex items-center">
                <Check className="h-4 w-4 md:h-5 md:w-5 text-[#25703A] mr-2 md:mr-3 flex-shrink-0" />
                <span className="text-sm md:text-base">Get notified when your monthly returns are credited</span>
              </div>
              <div className="flex items-center">
                <Check className="h-4 w-4 md:h-5 md:w-5 text-[#25703A] mr-2 md:mr-3 flex-shrink-0" />
                <span className="text-sm md:text-base">Monitor your plan status and wallet balance in real time</span>
              </div>
            </div>

            <Button 
              variant="outline" 
              size="lg" 
              className="rounded-full font-normal bg-[#171717] px-6 md:px-9 h-12 md:h-14 text-base md:text-[18px] text-white"
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default EarningSection