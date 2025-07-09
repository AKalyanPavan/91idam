'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { User, Menu, X } from 'lucide-react'
import logo from '@/images/logo.svg'
import { UserAuthentication } from "@/components/user-authentication.js";

export default function Header() {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <>
      <header className="shadow-sm py-3 bg-[#DFDBCF] sticky top-0 z-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex-shrink-0 cursor-pointer">
              <Link href="/">
                <Image
                  src={logo}
                  alt="91 IDAM"
                  width={200}
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center space-x-8">
              <Link 
                href="#" 
                className="text-[#B59327] hover:text-[#9d7e1f] font-medium transition-colors duration-200"
              >
                For Buyers
              </Link>
              <Link 
                href="#" 
                className="text-gray-700 hover:text-[#175973] font-medium transition-colors duration-200"
              >
                For Owners
              </Link>
              <Link 
                href="#" 
                className="text-gray-700 hover:text-[#175973] font-medium transition-colors duration-200"
              >
                For Dealers/Builders
              </Link>
              <Link 
                href="#" 
                className="text-gray-700 hover:text-[#175973] font-medium transition-colors duration-200"
              >
                Contact
              </Link>
            </nav>

            {/* Right side buttons and profile */}
            <div className="flex items-center space-x-4">
              {/* Start Selling Button */}
              <button className="hidden md:inline-flex items-center px-6 py-2 bg-[#175973] text-white font-medium rounded-md hover:bg-[#144a5e] transition-colors duration-200 cursor-pointer">
                Start Selling
              </button>

              {/* Start Buying Button */}
              <button className="hidden md:inline-flex items-center px-6 py-2 bg-[#175973] text-white font-medium rounded-md hover:bg-[#144a5e] transition-colors duration-200 cursor-pointer">
                Start Buying
              </button>

              {/* Profile Menu */}
              <div className="relative">
                <button
                  onClick={toggleProfileMenu}
                  className="flex items-center justify-center w-10 h-10 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors duration-200 cursor-pointer"
                >
                  <User className="w-6 h-6 text-white" />
                </button>

                {/* Profile Dropdown Menu */}
                {isProfileMenuOpen && (
                  <>
                    {/* Backdrop */}
                    <div 
                      className="fixed inset-0 z-10" 
                      onClick={() => setIsProfileMenuOpen(false)}
                    ></div>
                    
                    {/* Menu */}
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-2 z-20">
                      {/* LOGIN text at top */}
                      <div className="px-4 py-2 border-b border-gray-100 cursor-pointer">
                        <p className="text-sm font-medium text-[#175973]" onClick={() => setIsAuthModalOpen(true)}>LOGIN</p>
                      </div>
                      
                      <Link
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#DFDBCF] transition-colors duration-200"
                      >
                        My Activity
                      </Link>
                      <Link
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#DFDBCF] transition-colors duration-200"
                      >
                        Latest searches
                      </Link>
                      <Link
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#DFDBCF] transition-colors duration-200"
                      >
                        Wish Listed
                      </Link>
                      <Link
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#DFDBCF] transition-colors duration-200"
                      >
                        Contacted
                      </Link>
                    </div>
                  </>
                )}
              </div>

              {/* Mobile menu button */}
              <button 
                onClick={toggleMobileMenu}
                className="xl:hidden p-2 rounded-md text-gray-600 hover:text-[#175973] hover:bg-gray-100"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="xl:hidden border-t border-gray-200">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <Link
                  href="#"
                  className="block px-3 py-2 text-base font-medium text-[#B59327] hover:text-[#9d7e1f] hover:bg-[#DFDBCF] rounded-md transition-colors duration-200"
                >
                  For Buyers
                </Link>
                <Link
                  href="#"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-[#175973] hover:bg-[#DFDBCF] rounded-md transition-colors duration-200"
                >
                  For Owners
                </Link>
                <Link
                  href="#"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-[#175973] hover:bg-[#DFDBCF] rounded-md transition-colors duration-200"
                >
                  For Dealers/Builders
                </Link>
                <Link
                  href="#"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-[#175973] hover:bg-[#DFDBCF] rounded-md transition-colors duration-200"
                >
                  Contact
                </Link>
                <div className="flex flex-col space-y-2 pt-4">
                  <button className="w-full px-4 py-2 bg-[#175973] text-white font-medium rounded-md hover:bg-[#144a5e] transition-colors duration-200">
                    Start Selling
                  </button>
                  <button className="w-full px-4 py-2 bg-[#175973] text-white font-medium rounded-md hover:bg-[#144a5e] transition-colors duration-200">
                    Start Buying
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
      <UserAuthentication 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </>
  )
}