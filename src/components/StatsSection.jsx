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
              <div className="w-[104px] flex-shrink-0 md:flex-shrink">
                <img
                  src={testimonial1}
                  alt="User avatar"
                  className="w-full h-[40px] object-contain"
                />
              </div>
              <div className="text-xl md:text-2xl font-semibold ml-4">120K+</div>
            </div>
            <p className="text-[#595959] text-sm md:text-base font-inter pl-[104px] md:pl-0">
              Our platform is a trusted choice for money transfers.
            </p>
          </div>

          {/* Second Stat */}
          <div className="flex flex-col">
            <div className="flex items-center mb-2">
              <div className="w-[104px] flex-shrink-0 md:flex-shrink">
                <img
                  src={testimonial2}
                  alt="User avatar"
                  className="w-full h-[40px] object-contain"
                />
              </div>
              <div className="text-xl md:text-3xl font-semibold ml-4">4.9</div>
            </div>
            <p className="text-[#595959] text-sm md:text-base font-inter pl-[104px] md:pl-0">
              Our high rating proves our platform's quality and positive global user impact.
            </p>
          </div>

          {/* Third Stat */}
          <div className="flex flex-col">
            <div className="flex items-center mb-2">
              <div className="w-[104px] flex-shrink-0 md:flex-shrink">
                <img
                  src={testimonial3}
                  alt="User avatar"
                  className="w-full h-[40px] object-contain"
                />
              </div>
              <div className="text-xl md:text-3xl font-semibold ml-4">89+</div>
            </div>
            <p className="text-[#595959] text-sm md:text-base font-inter pl-[104px] md:pl-0">
              Our global presence ensures reliable, efficient financial solutions.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default StatsSection