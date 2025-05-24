
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import loginImg from "../../assets/loginProfile.svg";
import bg from "../../assets/profile-bg.svg";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-7xl mt-24 pt-20 px-12 gap-6 md:gap-8 lg:gap-20">
      {/* Left side - Form */}
      <div className="max-w-md w-full font-poppins md:mr-8 -mt-14">
        <div className="text-start">
          <h1 className="text-2xl font-semibold text-[#171717] mb-6">Log in to Your Account</h1>
        </div>
        <p className="text-[#666D80] text-sm mb-8">
          New to Nivesh Returns?{' '}
          <Link to="/signup" className="text-[#00AB9A] text-sm font-semibold hover:underline">
            Create an account
          </Link>
        </p>

        <form className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-poppins text-[#101218] mb-4">
              Email Address<span className="text-red-500"> *</span>
            </label>
            <input
              id="email"
              type="email"
              placeholder="ex: example@gmail.com"
              className="w-full px-4 py-3 border text-base font-poppins border-gray-300 text-[#919EAB] rounded-lg focus:border-transparent"
              required
            />
          </div>

          <div className="relative">
            <label htmlFor="password" className="block text-sm font-inter text-[#212B36] mb-4">
              Enter Password<span className="text-red-500"> *</span>
            </label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              className="w-full px-4 py-3 border border-gray-300 font-inter text-base text-[#999DAA] rounded-lg focus:border-transparent pr-10"
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 translate-y-1/3 text-[#374957]"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>

          <div className="flex justify-end">
            <Link to="/email-verification" className="text-sm text-[#212B36] font-medium hover:underline">
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            className="w-[444px] h-[44px] font-inter font-bold rounded-full bg-[#25703A] hover:bg-[#1E5C2E] py-4 text-lg text-white font-medium"
          >
            Login
          </Button>
        </form>
      </div>

      {/* Right side - Image  */}
      <div className="hidden md:flex relative w-full max-w-[500px]">
        <div className="relative w-full h-[500px]"> {/* Increased height */}
          {/* Background Image */}
          <div className="absolute top-10 left-0 w-[170%] h-full -translate-x-[25%] z-10">
            <img
              src={bg}
              alt="Login background illustration"
              className="object-contain h-full w-full"
              priority
            />
          </div>
          
          {/* Foreground Image */}
          <div className="absolute top-0 left-0 w-full h-full z-0">
            <img
              src={loginImg}
              alt="Login foreground illustration"
              className="object-contain h-full w-full"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}