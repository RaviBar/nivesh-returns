import React from "react";
import { Button } from "./ui/button";
import bg from "../assets/CTAbackground.svg";
const CTASection = () => {
  return (
    <section className="relative font-manrope z-20 -mb-[150px] md:-mb-[300px]">
      <div className="text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="relative overflow-hidden rounded-xl md:rounded-3xl min-h-[300px] md:min-h-[500px] flex items-center justify-center">
            <img 
              src={bg}
              alt="Background pattern"
              className="absolute inset-0 w-full h-full object-cover z-0"
            />

            <div className="relative z-10 text-center px-4 sm:px-16 -mt-0 md:-mt-6">
              <h2 className="text-2xl md:text-[48px] font-semibold leading-[1.2] md:leading-[124%] max-w-3xl mx-auto mb-4 md:mb-6">
                Ready to Start Earning Monthly Returns?
              </h2>
              <p className="text-[14px] md:text-[17px] text-gray-200 mb-6 md:mb-10 max-w-2xl mx-auto">
                Choose a plan that fits your goals and start building passive income today.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4">
                <Button 
                  variant="black" 
                  className="border-2 border-[#25703A] text-white hover:bg-white hover:text-black rounded-full py-4 md:py-6 px-6 md:px-8 text-base md:text-lg"
                >
                  Create Account
                </Button>
                <Button 
                  className="rounded-full bg-[#25703A] hover:bg-[#1E5C2E] py-4 md:py-6 px-6 md:px-8 text-base md:text-lg"
                >
                  Choose Plan
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;