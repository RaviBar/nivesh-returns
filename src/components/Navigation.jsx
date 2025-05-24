import React, { useState, useEffect } from "react"
import { Button } from "./ui/button"
import { Link } from "react-router-dom"
import { Menu, X } from "lucide-react"
import logo1 from '../assets/logo1.svg';
const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY
      setIsScrolled(offset > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 w-[90%] max-w-7xl left-1/2 transform -translate-x-1/2 z-50 rounded-full transition-all bg-[#171717] text-white duration-300 ${isScrolled ? "shadow-md py-2" : "top-7 py-3"}`}>
      <div className="max-w-7xl mx-auto lg:px-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2" onClick={() => setIsMobileMenuOpen(false)}>
              <div className="flex items-center justify-center">
                <img
                  src={logo1}
                  alt="logo" 
                  width={128} 
                  height={128}
                  className="mx-auto"
                />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center font-inter space-x-8">
            <Link to="/" className="text-lg hover:text-[#A7E3B8]">Home</Link>
            <Link to="/plans" className="text-lg hover:text-[#A7E3B8]">Plans</Link>
            <Link to="/pricing" className="text-lg hover:text-[#A7E3B8]">Pricing</Link>
            <Link to="/contact" className="text-lg hover:text-[#A7E3B8]">Contact</Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <Link to="/signin">
              <Button 
                variant="box" 
                className="border-2 border-[#25703A] font-manrope text-white hover:bg-white hover:text-black rounded-full py-6 px-8 text-lg"
              >
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button 
                variant="fill" 
                className="rounded-full bg-[#25703A] font-manrope py-6 px-8 text-white text-lg h-12"
              >
                Create Account
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:bg-white/10"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </nav>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#171717] shadow-lg mt-2 py-4 rounded-b-xl">
          <div className="flex flex-col space-y-4 px-6">
            <Link 
              to="/" 
              className="text-lg font-medium text-white hover:text-[#A7E3B8] py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/plans" 
              className="text-lg font-medium text-white hover:text-[#A7E3B8] py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Plans
            </Link>
            <Link 
              to="/pricing" 
              className="text-lg font-medium text-white hover:text-[#A7E3B8] py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link 
              to="/contact" 
              className="text-lg font-medium text-white hover:text-[#A7E3B8] py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="flex flex-col space-y-3 pt-4">
              <Link to="/signin" onClick={() => setIsMobileMenuOpen(false)}>
                <Button 
                  variant="outline" 
                  className="w-full rounded-full font-manrope border-2 border-[#25703A] bg-black text-white"
                >
                  Login
                </Button>
              </Link>
              <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                <Button 
                  variant="green" 
                  className="w-full rounded-full font-manrope bg-[#25703A] hover:bg-[#1E5C2E] text-white"
                >
                  Create Account
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navigation