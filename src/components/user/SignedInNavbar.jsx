import { Link } from "react-router-dom";
import signedProfileLogo from "../../assets/signedProfilelogo.svg";
import shoppingIcon from "../../assets/shoppingIcon.svg";
import newUserIcon from "../../assets/newUserIcon.svg";
const SignedInNavbar = () => {
  return (
    <nav className="bg-[#161D29] text-white py-4 lg:px-20 px-4 flex h-[70px] items-center justify-between">
      <div className="lg:hidden">
        <button className="text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
      </div>
      {/* Logo */}
      <div className="flex items-center lg:flex-1">
            <Link to="/" className="flex items-center">
              <div className="flex items-center justify-center">
                <img
                  src={signedProfileLogo}
                  alt="logo" 
                  width={110} 
                  height={65}
                  className="lg:w-[110px] w-[80px]"
                />
              </div>
            </Link>
          </div>

      {/* Navigation Links */}
      <ul className="lg:flex space-x-12 font-inter font-medium -translate-x-[22%] text-md hidden">
        <li>
          <Link to="/user/dashboard/profile" className="hover:text-[#54BD95]">
            Home
          </Link>
        </li>
        <li>
          <Link to="/plans" className="hover:text-[#54BD95]">
            Plans
          </Link>
        </li>
        <li>
          <Link to="/pricing" className="hover:text-[#54BD95]">
            Pricing
          </Link>
        </li>
        <li>
          <Link to="/contact" className="hover:text-[#54BD95]">
            Contact
          </Link>
        </li>
      </ul>

      {/* Cart Icon and Profile */}
      <div className="flex items-center space-x-4 lg:flex-1 justify-end">
        {/* Cart Icon */}
        <Link to="/user/dashboard/wallet">
          <img
            src={shoppingIcon}
            alt="Cart"
            className="h-5 w-5"
          />
        </Link>

        {/* Profile Image */}
        <Link to="/user/dashboard/profile">
          <img
            src={newUserIcon}
            alt="Profile"
            className="h-7 w-7 rounded-full border border-gray-500"
          />
        </Link>
      </div>
    </nav>
  );
};

export default SignedInNavbar;