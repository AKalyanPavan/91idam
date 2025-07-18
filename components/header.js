'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { User, Menu, X, ChevronDown } from 'lucide-react'
import logo from '@/images/logo.svg'
import { UserAuthentication } from "@/components/user-authentication.js";

export default function Header() {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [activeMobileDropdown, setActiveMobileDropdown] = useState(null)

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleDropdownToggle = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown)
  }

  const handleMobileDropdownToggle = (dropdown) => {
    setActiveMobileDropdown(activeMobileDropdown === dropdown ? null : dropdown)
  }

  const closeAllDropdowns = () => {
    setActiveDropdown(null)
    setIsProfileMenuOpen(false)
  }

  // Dropdown menu data
  const dropdownMenus = {
    customers: {
      title: "For Customers",
      items: [
        
      ]
    },
    owners: {
      title: "Franchise / Owners",
      items: [
        
      ]
    },
    partners: {
      title: "Partners",
      items: [
        { label: "Service Stakeholders", href: "#" },
        { label: "Institutional Clients", href: "#" }
      ]
    },
    contact: {
      title: "Contact",
      items: [
        
      ]
    }
  }

  return (
    <>
      <header className="shadow-sm py-3 bg-[#DFDBCF] sticky top-0 z-50">
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
              {/* For Buyers Dropdown */}
              <div className="relative">
                <button 
                  onClick={() => handleDropdownToggle('For Customers')}
                  className="flex items-center text-[#B59327] hover:text-[#9d7e1f] font-medium transition-colors duration-200"
                >
                  For Customers
                  {dropdownMenus.customers.items.length > 0 &&
                    <ChevronDown className={`ml-1 w-4 h-4 transition-transform duration-200 ${activeDropdown === 'customers' ? 'rotate-180' : ''}`} />
                  }
                </button>

                {activeDropdown === 'customers' && (
                  <>
                    <div 
                      className="fixed inset-0 z-10" 
                      onClick={closeAllDropdowns}
                    ></div>
                    <div className="absolute left-0 mt-2 w-64 bg-white rounded-md shadow-lg border border-gray-200 py-2 z-20">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-semibold text-[#175973]">Plots/Land</p>
                      </div>
                      {dropdownMenus.customers.items.map((item, index) => (
                        <Link
                          key={index}
                          href={item.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#DFDBCF] transition-colors duration-200"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* For Owners Dropdown */}
              <div className="relative">
                <button 
                  onClick={() => handleDropdownToggle('owners')}
                  className="flex items-center text-gray-700 hover:text-[#175973] font-medium transition-colors duration-200"
                >
                  Franchise / Owners
                  {dropdownMenus.owners.items.length > 0 &&
                    <ChevronDown className={`ml-1 w-4 h-4 transition-transform duration-200 ${activeDropdown === 'owners' ? 'rotate-180' : ''}`} />
                  }
                </button>

                {activeDropdown === 'owners' && (
                  <>
                    <div 
                      className="fixed inset-0 z-10" 
                      onClick={closeAllDropdowns}
                    ></div>
                    <div className="absolute left-0 mt-2 w-64 bg-white rounded-md shadow-lg border border-gray-200 py-2 z-20">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-semibold text-[#175973]">Owners Offering</p>
                      </div>
                      {dropdownMenus.owners.items.map((item, index) => (
                        <Link
                          key={index}
                          href={item.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#DFDBCF] transition-colors duration-200"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* For Dealers/Builders Dropdown */}
              <div className="relative">
                <button 
                  onClick={() => handleDropdownToggle('partners')}
                  className="flex items-center text-gray-700 hover:text-[#175973] font-medium transition-colors duration-200"
                >
                  Partners
                  {dropdownMenus.partners.items.length > 0 &&
                    <ChevronDown className={`ml-1 w-4 h-4 transition-transform duration-200 ${activeDropdown === 'partners' ? 'rotate-180' : ''}`} />
                  }
                </button>

                {activeDropdown === 'partners' && (
                  <>
                    <div 
                      className="fixed inset-0 z-10" 
                      onClick={closeAllDropdowns}
                    ></div>
                    <div className="absolute left-0 mt-2 w-64 bg-white rounded-md shadow-lg border border-gray-200 py-2 z-20">
                      {dropdownMenus.partners.items.map((item, index) => (
                        <Link
                          key={index}
                          href={item.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#DFDBCF] transition-colors duration-200"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Contact Dropdown */}
              <div className="relative">
                <button 
                  onClick={() => handleDropdownToggle('contact')}
                  className="flex items-center text-gray-700 hover:text-[#175973] font-medium transition-colors duration-200"
                >
                  Contact
                  {dropdownMenus.contact.items.length > 0 &&
                    <ChevronDown className={`ml-1 w-4 h-4 transition-transform duration-200 ${activeDropdown === 'contact' ? 'rotate-180' : ''}`} />
                  }
                </button>

                {activeDropdown === 'contact' && (
                  <>
                    <div 
                      className="fixed inset-0 z-10" 
                      onClick={closeAllDropdowns}
                    ></div>
                    <div className="absolute left-0 mt-2 w-80 bg-white rounded-md shadow-lg border border-gray-200 py-2 z-20">
                      
                      {dropdownMenus.contact.items.map((item, index) => (
                        <div key={index} className="px-4 py-3 hover:bg-[#DFDBCF] transition-colors duration-200">
                          <div className="flex items-center">
                            <span className="text-gray-600 mr-2">📞</span>
                            <div>
                              <p className="text-sm text-gray-700">{item.label}</p>
                              {item.subtitle && (
                                <p className="text-xs text-gray-500">{item.subtitle}</p>
                              )}
                              <p className="text-sm font-medium text-[#175973]">{item.phone}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
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
                {/* Mobile For Buyers */}
                <div>
                  <button
                    onClick={() => handleMobileDropdownToggle('buyers')}
                    className="flex items-center justify-between w-full px-3 py-2 text-base font-medium text-[#B59327] hover:text-[#9d7e1f] hover:bg-[#DFDBCF] rounded-md transition-colors duration-200"
                  >
                    For Buyers
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeMobileDropdown === 'buyers' ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {activeMobileDropdown === 'buyers' && (
                    <div className="ml-4 mt-2 space-y-1">
                      <div className="px-3 py-1 text-sm font-semibold text-[#175973] border-b border-gray-200">
                        Plots/Land
                      </div>
                      {dropdownMenus.buyers.items.map((item, index) => (
                        <Link
                          key={index}
                          href={item.href}
                          className="block px-3 py-2 text-sm text-gray-600 hover:bg-[#DFDBCF] hover:text-[#175973] rounded-md transition-colors duration-200"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Mobile For Owners */}
                <div>
                  <button
                    onClick={() => handleMobileDropdownToggle('owners')}
                    className="flex items-center justify-between w-full px-3 py-2 text-base font-medium text-gray-700 hover:text-[#175973] hover:bg-[#DFDBCF] rounded-md transition-colors duration-200"
                  >
                    For Owners
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeMobileDropdown === 'owners' ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {activeMobileDropdown === 'owners' && (
                    <div className="ml-4 mt-2 space-y-1">
                      <div className="px-3 py-1 text-sm font-semibold text-[#175973] border-b border-gray-200">
                        Owners Offering
                      </div>
                      {dropdownMenus.owners.items.map((item, index) => (
                        <Link
                          key={index}
                          href={item.href}
                          className="block px-3 py-2 text-sm text-gray-600 hover:bg-[#DFDBCF] hover:text-[#175973] rounded-md transition-colors duration-200"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Mobile For Dealers/Builders */}
                <div>
                  <button
                    onClick={() => handleMobileDropdownToggle('dealers')}
                    className="flex items-center justify-between w-full px-3 py-2 text-base font-medium text-gray-700 hover:text-[#175973] hover:bg-[#DFDBCF] rounded-md transition-colors duration-200"
                  >
                    For Dealers/Builders
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeMobileDropdown === 'dealers' ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {activeMobileDropdown === 'dealers' && (
                    <div className="ml-4 mt-2 space-y-1">
                      <div className="px-3 py-1 text-sm font-semibold text-[#175973] border-b border-gray-200">
                        Dealers Offering
                      </div>
                      {dropdownMenus.dealers.items.map((item, index) => (
                        <Link
                          key={index}
                          href={item.href}
                          className="block px-3 py-2 text-sm text-gray-600 hover:bg-[#DFDBCF] hover:text-[#175973] rounded-md transition-colors duration-200"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Mobile Contact */}
                <div>
                  <button
                    onClick={() => handleMobileDropdownToggle('contact')}
                    className="flex items-center justify-between w-full px-3 py-2 text-base font-medium text-gray-700 hover:text-[#175973] hover:bg-[#DFDBCF] rounded-md transition-colors duration-200"
                  >
                    Contact
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeMobileDropdown === 'contact' ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {activeMobileDropdown === 'contact' && (
                    <div className="ml-4 mt-2 space-y-1">
                      <div className="px-3 py-1 text-sm font-semibold text-[#175973] border-b border-gray-200">
                        Contact us
                      </div>
                      {dropdownMenus.contact.items.map((item, index) => (
                        <div key={index} className="px-3 py-2 hover:bg-[#DFDBCF] rounded-md transition-colors duration-200">
                          <div className="flex items-center">
                            <span className="text-gray-600 mr-2">📞</span>
                            <div>
                              <p className="text-sm text-gray-700">{item.label}</p>
                              {item.subtitle && (
                                <p className="text-xs text-gray-500">{item.subtitle}</p>
                              )}
                              <p className="text-sm font-medium text-[#175973]">{item.phone}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

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