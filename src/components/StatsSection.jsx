import React from "react"
import { Star, Target } from "lucide-react"
import testimonial1 from "../assets/testimonial1.svg"
import testimonial2 from "../assets/testimonial2.svg"   
import testimonial3 from "../assets/testimonial3.svg"
const StatsSection = () => {
  return (
    <section className="py-12 md:py-24 bg-white font-manrope">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16">
          {/* First Stat */}
          <div className="flex flex-col">
            <div className="flex items-center mb-2">
              <img
                src={testimonial1}
                alt="User avatar"
                className="w-20 md:w-[104px] h-8 md:h-[40px] rounded-full border-2 border-white"
              />
              <div className="text-xl md:text-2xl font-semibold ml-2 md:ml-0">120K+</div>
            </div>
            <div className="flex">
              <div className="w-20 md:w-[90px] mr-[-60px] md:mr-[-80px]"></div>
              <p className="text-[#595959] text-sm md:text-base font-inter max-w-[280px]">
                Our platform is a trusted choice for money transfers.
              </p>
            </div>
          </div>

          {/* Second Stat */}
          <div className="flex flex-col">
            <div className="flex items-center mb-2">
              <img
                src={testimonial2}
                alt="User avatar"
                className="w-5 md:w-[104px] h-8 md:h-[40px] rounded-full border-2 border-white"
              />
              <div className="text-xl md:text-3xl font-semibold ml-2 md:ml-[-18]">4.9</div>
            </div>
            <div className="flex">
              <div className="w-20 md:w-[104px] mr-[-15px] md:mr-[-20px]"></div>
              <p className="text-[#595959] text-sm md:text-base font-inter">
                Our high rating proves our platform's quality and positive global user impact.
              </p>
            </div>
          </div>

          {/* Third Stat */}
          <div className="flex flex-col">
            <div className="flex items-center mb-2">
              <img
                src={testimonial3}
                alt="User avatar"
                className="w-20 md:w-[104px] h-8 md:h-[40px] rounded-full border-2 border-white"
              />
              <div className="text-xl md:text-3xl font-semibold ml-2 md:ml-[-18]">89+</div>
            </div>
            <div className="flex">
              <div className="w-20 md:w-[104px] mr-[-20px] md:mr-[-30px]"></div>
              <p className="text-[#595959] text-sm md:text-base font-inter">
                Our global presence ensures reliable, efficient financial solutions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default StatsSection