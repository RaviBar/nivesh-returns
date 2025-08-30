import { Link } from "react-router-dom";
import signedProfileLogo from "../../assets/signedProfilelogo.svg";
import shoppingIcon from "../../assets/shoppingIcon.svg";
import newUserIcon from "../../assets/newUserIcon.svg";
const SignedInNavbar = ({ toggleMobileMenu }) => {
  return (
    <nav className="bg-[#161D29] text-white py-4 lg:px-20 px-4 flex h-[70px] items-center justify-between lg:static fixed w-full z-50">
      {/* Logo - Left side */}
      <div className="lg:flex-1">
        <Link to="/">
          <img
            src={signedProfileLogo}
            alt="logo"
            className="lg:w-[110px] w-[80px]"
          />
        </Link>
      </div>

      {/* Desktop Navigation Links - Center */}
      <ul className="lg:flex space-x-12 font-inter font-medium -translate-x-[22%] text-md hidden">
        <li>
          <Link to="/user/dashboard/profile" className="hover:text-[#54BD95]">
            Home
          </Link>
        </li>
        <li>
          <Link to="/user/dashboard/plans" className="hover:text-[#54BD95]">
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

      {/* Right Section - Icons + Menu Button */}
      <div className="flex items-center gap-4 lg:flex-1 lg:justify-end">
        {/* Cart Icon (original code) */}
        <Link to="/user/dashboard/wallet" className="lg:mr-4">
          <img src={shoppingIcon} alt="Cart" className="h-5 w-5" />
        </Link>

        {/* Profile Icon (original code) */}
        <Link to="/user/dashboard/profile" className="lg:mr-4">
          <img
            src={newUserIcon}
            alt="Profile"
            className="h-7 w-7 rounded-full border border-gray-500"
          />
        </Link>

        {/* Mobile Menu Button (hidden on desktop) */}
        <button
          onClick={toggleMobileMenu}
          className="lg:hidden text-white"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default SignedInNavbar;