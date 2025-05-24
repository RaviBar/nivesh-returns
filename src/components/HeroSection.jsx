import React from "react"
import { Button } from "./ui/button"
import iphone from "../assets/iPhone 15 Pro Max White Titanium (1).svg"
import iphonebg from "../assets/Group 26.svg" 
import icon from "../assets/Frame1.svg"
const HeroSection = () => {
  return (
    <section className="pt-45 pb-2 bg-[#F3F3F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
            
          <div className="inline-flex items-center space-x-2 bg-[#E9E9E9] text-[#171717] pl-1 pr-5 py-2 rounded-full mb-6">
            <img 
              src={icon}
              alt="circleCheckShield" 
              width={32} 
              height={32}
              className="mr-1"
            />
            <span className="text-lg font-manrope">Smart Finance, Smart Living</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl leading-[1.1] sm:leading-[1.15] md:leading-[1.2] md:text-6xl font-manrope font-semibold tracking-tight mb-7 max-w-4xl mx-auto">
            Revolutionizing Finance for a Better Tomorrow, Today
          </h1>
          
          <p className="text-lg text-muted-foreground font-inter max-w-lg mx-auto mb-5 ">
            Fintech services leverage technology to enhance financial processes, 
            offering innovative solutions for banking
          </p>
          
          <Button variant="outline" size="lg" className="rounded-full font-manrope bg-[#25703A] px-9 h-14 text-[18px] text-white ">
            Start Earning
          </Button>
        </div>
        
    <div className="relative max-w-5xl mx-auto mt-16">
    <div className="relative z-10 w-full h-[320px]">
    <img 
      src={iphone} 
      alt="Mobile app showing financial statistics" 
      width={400} 
      height={450}
      className="absolute top-0 left-1/2 transform -translate-x-1/2 z-10"
    />
    <img 
      src={iphonebg}
      alt="Background visual" 
      width={960} 
      height={490}
      className="absolute top-0 left-1/2 transform -translate-x-1/2 z-20"
    />
  </div>      
</div>

      </div>
    </section>
  )
}

export default HeroSection