import React from "react"
import icon1 from "../assets/support1.svg"
import icon2 from "../assets/support2.svg"
import icon3 from "../assets/support3.svg"
import icon4 from "../assets/support4.svg"
import mobile from "../assets/iPhone 15 Pro Max White Titanium.svg"
const FeatureSection = () => {
  return (
    <section className="py-24 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        {/* Added mobile padding */}
        <div className="px-4 lg:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Content Column - unchanged laptop styles */}
            <div className="space-y-10 max-w-[500px]">
              <div className="max-w-[30rem]">
                <h2 className="text-3xl sm:text-5xl md:leading-[1.3] font-manrope mb-4 font-semibold">
                  Let's Start Growing Your Money
                </h2>
                <p className="text-[#595959] font-inter mb-6">
                  By combining smart investments with modern fintech, Nivesh Returns makes earning monthly returns simple, 
                  secure, and accessible — all managed in one easy-to-use platform.
                </p>
              </div>

              <div className="space-y-8">
                {[1,2,3,4].map((_, i) => (
                  <div key={i} className="flex">
                    <div className="flex-shrink-0 mr-4">
                      <div className="h-10 w-10 bg-[#F1F5F9] rounded-full flex items-center justify-center">
                        <img
                          src={[icon1, icon2, icon3, icon4][i]}
                          alt="Support" 
                          width={24} 
                          height={24}
                        />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-manrope font-semibold mb-2">
                        {[
                          'First of all create an account',
                          'Choose a plan',
                          'Get Monthly returns',
                          'Track in Dashboard'
                        ][i]}
                      </h3>
                      <p className="text-[#595959] font-inter">
                        {[
                          'Create an account using your email address or social media profile. Quick and straightforward registration process.',
                          'Select an investment plan from ₹13,500 to ₹80,000 and make a secure payment.',
                          'Earn up to 10% returns every month, credited to your wallet after admin approval.',
                          'View your returns and wallet balance anytime in your personal dashboard.'
                        ][i]}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Image Column - unchanged laptop styles */}
            <div className="flex items-center justify-center">
              <div className="relative w-[600px] h-[710px]">
                <div className="absolute top-[239px] left-1/2 transform -translate-x-1/2 w-[576px] h-[468px] rounded-[40px] bg-[#F0F0F2] z-0" />
                <img 
                  src={mobile}
                  alt="Nivesh Returns mobile app interface"
                  width={477}
                  height={800}
                  className="relative z-10 mx-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeatureSection