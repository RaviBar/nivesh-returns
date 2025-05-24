import React from "react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import logo from "../assets/logo2.svg";
import mailIcon from "../assets/mailIcon.svg";
const Footer = ({ paddingTop = 'pt-[100px]', paddingTopMd = 'md:pt-[400px]' }) => (
  <footer className={`bg-[#F0F0F2] ${paddingTop} ${paddingTopMd} pb-8 relative z-10`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0">
          {/* Left Column - Subscribe Section */}
          <div className="w-full lg:w-[565px] lg:mr-[236px] font-inter">
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <div className="flex items-center justify-center">
                <img
                  src={logo} 
                  alt="logo" 
                  width={101} 
                  height={44}
                  className="mx-auto"
                />
              </div>
            </Link>
            
            <div className="mb-6">
              <h4 className="font-medium mb-2 font-manrope text-[#171717]">Subscribe</h4>
              <p className="text-base md:text-[16px] text-[#595959] max-w-[400px] mb-4">
                Join our newsletter to stay up to date on features and releases.
              </p>
              <div className="flex">
                <div className="relative w-full md:w-[420px]">
                  <div className="absolute left-2 top-1/2 transform -translate-y-1/2">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-[#F6F7F9]">
                      <img
                        src={mailIcon}
                        alt="mail icon" 
                        width={24} 
                        height={24}
                      />
                    </div>
                  </div>
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="w-full pl-14 md:pl-15 pr-24 py-3 bg-white text-[#595959] rounded-full text-sm md:text-[16px] focus:outline-none focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent"
                  />
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="absolute right-2 top-1/2 font-manrope transform -translate-y-1/2 rounded-full font-normal bg-[#171717] px-4 md:px-6 py-2 h-10 text-sm md:text-[15px] text-white"
                  >
                    Subscribe
                  </Button>
                </div>
              </div>
              <p className="text-xs md:text-[12px] text-[#595959] mt-4">
                By subscribing you agree to with our{' '}
                <span className="font-semibold text-black underline">Privacy Policy</span>
              </p>
            </div>
          </div>

          {/* Right Columns - Links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-[100px] font-inter w-full md:w-[565px] h-auto md:h-[178px]">
            {/* Quick Links Column */}
            <div>
              <h4 className="font-semibold text-base md:text-[16px] mb-4 font-manrope">Quick Links</h4>
              <ul className="space-y-3 text-[#595959]">
                <li>
                  <Link to="/" className="text-sm hover:text-[#2E7D32] transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-sm hover:text-[#2E7D32] transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="text-sm hover:text-[#2E7D32] transition-colors">
                    Services
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-sm hover:text-[#2E7D32] transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* Products Column */}
            <div>
              <h4 className="font-semibold mb-4 text-base md:text-[16px] font-manrope">Products</h4>
              <ul className="space-y-3 text-[#595959]">
                <li>
                  <Link to="/ai-assistant" className="text-sm hover:text-[#2E7D32] transition-colors">
                    AI Assistant
                  </Link>
                </li>
                <li>
                  <Link to="/mobile-app" className="text-sm hover:text-[#2E7D32] transition-colors">
                    Mobile App
                  </Link>
                </li>
                <li>
                  <Link to="/account" className="text-sm hover:text-[#2E7D32] transition-colors">
                    Account
                  </Link>
                </li>
                <li>
                  <Link to="/credit-card" className="text-sm hover:text-[#2E7D32] transition-colors">
                    Credit Card
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* Company Column */}
            <div>
              <h4 className="font-semibold mb-4 text-base md:text-[16px] font-manrope">Company</h4>
              <ul className="space-y-3 text-[#595959]">
                <li>
                  <Link to="/about" className="text-sm hover:text-[#2E7D32] transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/privacy-policy" className="text-sm hover:text-[#2E7D32] transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/support" className="text-sm hover:text-[#2E7D32] transition-colors">
                    Support
                  </Link>
                </li>
                <li>
                  <Link to="/terms-of-service" className="text-sm hover:text-[#2E7D32] transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Copyright Section */}
        <div className="border-t-[2px] border-[#17171714] mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm md:text-[15px] text-[#595959] mb-4 md:mb-0 text-center md:text-left">
              Copyright © {new Date().getFullYear()} Investo. All Rights Reserved
            </p>
            
            <div className="flex gap-3">
              <a href="#" className="bg-white rounded-full p-2 flex items-center justify-center h-10 w-10">
                <img src="/facebook-icon.svg" alt="Facebook" className="h-5 w-5" />
              </a>
              <a href="#" className="bg-white rounded-full p-2 flex items-center justify-center h-10 w-10">
                <img src="/twitter-icon.svg" alt="Twitter" className="h-5 w-5" />
              </a>
              <a href="#" className="bg-white rounded-full p-2 flex items-center justify-center h-10 w-10">
                <img src="/instagram-icon.svg" alt="Instagram" className="h-5 w-5" />
              </a>
              <a href="#" className="bg-white rounded-full p-2 flex items-center justify-center h-10 w-10">
                <img src="/youtube-icon.svg" alt="YouTube" className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
  </footer>
);

export default Footer;