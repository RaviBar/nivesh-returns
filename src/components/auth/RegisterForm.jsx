
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff, ChevronDown } from "lucide-react";
import signupImg from "../../assets/signupProfile1.svg";
import bg from "../../assets/profile-bg.svg";
export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [countryCode, setCountryCode] = useState("+91");

const handleCountryCodeSelect = (code) => {
  setCountryCode(code);
  setShowDropdown(false);
};
  return (
    <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-7xl mt-12 pt-20 px-12 gap-8 md:gap-8 lg:gap-24">
      {/* Left side - Form */}
      <div className="max-w-md w-full md:mr-8">
        <div className="text-start">
          <h1 className="text-[30px] font-semibold font-inter text-[#191A15] mb-2">Join Nivesh Returns Today</h1>
        </div>
          <p className="text-[#666D80] text-[18px] mb-8 font-inter">Secure your spot, choose a plan, and start earning effortlessly.</p>

        <form className="space-y-4 max-w-[444px]">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-inter text-[#212B36] mb-1">
                First Name<span className="text-red-500"> *</span>
              </label>
              <input
                id="firstName"
                type="text"
                placeholder="Enter first name"
                className="w-full px-4 py-3 font-inter text-base border border-gray-300 text-[#999DAA] rounded-full focus:border-transparent"
                required
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-inter text-[#212B36] mb-1">
                Last Name<span className="text-red-500"> *</span>
              </label>
              <input
                id="lastName"
                type="text"
                placeholder="Enter last name"
                className="w-full px-4 py-3 font-inter text-base border border-gray-300 text-[#999DAA] rounded-full focus:border-transparent"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-inter text-[#212B36] mb-1">
              Email Address<span className="text-red-500"> *</span>
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter email address"
              className="w-full px-4 py-3 font-inter text-base border border-gray-300 text-[#999DAA] rounded-lg focus:border-transparent"
              required
            />
          </div>

          <div>
  <label htmlFor="phone" className="block text-sm font-inter text-[#212B36] mb-1">
    Phone Number<span className="text-red-500"> *</span>
  </label>
  <div className="flex items-center gap-5">
    {/* Dropdown for country code */}
    <div className="relative">
      <button
        type="button"
        className="w-20 px-3 py-3 font-inter text-base text-[#999DAA] border border-gray-300 rounded-lg bg-[#D0D5DD] flex items-center justify-between"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        {countryCode} {/* Dynamically display the selected country code */}
        <ChevronDown className="h-4 w-4 text-[#999DAA]" />
      </button>
      {showDropdown && (
        <ul className="absolute mt-2 w-20 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
          <li
            className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => handleCountryCodeSelect("+1")}
          >
            +1
          </li>
          <li
            className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => handleCountryCodeSelect("+44")}
          >
            +44
          </li>
          <li
            className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => handleCountryCodeSelect("+91")}
          >
            +91
          </li>
        </ul>
      )}
    </div>

    {/* Input for phone number */}
    <input
      id="phone"
      type="tel"
      placeholder="12345 67890"
      className="flex-1 px-4 py-3 border border-gray-300 text-[#999DAA] rounded-lg focus:border-transparent"
      required
    />
  </div>
</div>

          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <label htmlFor="password" className="block text-sm font-inter text-[#212B36] mb-1">
                Create Password<span className="text-red-500"> *</span>
              </label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                className="w-full px-4 py-3 font-inter text-base border border-gray-300 text-[#999DAA] rounded-lg focus:border-transparent pr-10"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 text-[#374957]"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            <div className="relative">
              <label htmlFor="confirmPassword" className="block text-sm font-inter text-[#212B36] mb-1">
                Confirm Password<span className="text-red-500"> *</span>
              </label>
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Enter Password"
                className="w-full px-4 py-3 font-inter text-base border border-gray-300 text-[#999DAA] rounded-lg focus:border-transparent pr-10"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 text-[#374957]"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-[444px] h-[44px] rounded-full mb-2 bg-[#25703A] hover:bg-[#1E5C2E] py-4 text-lg text-white font-inter font-medium"
          >
            Create Account
          </Button>
        </form>

        <p className="text-center mt-2 text-sm text-[#595959]">
          Already have an account?{' '}
          <Link to="/signin" className="text-[#25703A] font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </div>

      {/* Right side - Image */}
      <div className="hidden md:flex relative w-full max-w-md">
        <div className="relative w-[400px] h-[500px]">
          {/* Background Image (wider) */}
          <div className="absolute top-8 left-0 w-[170%] h-full -translate-x-[25%] z-10">
            <img
              src={bg}
              alt="Sign up background illustration"
              fill
              className="object-contain"
              priority
            />
          </div>
          
          {/* Foreground Image (centered) */}
          <div className="absolute top-0 left-0 w-full h-full z-0">
            <img
              src={signupImg}
              alt="Sign up foreground illustration"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}