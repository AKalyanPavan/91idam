'use client';

import { useState } from 'react';
import { Star, Mail, Eye, Trash2, User, Lock, LogOut, Home, Menu, X, Phone } from 'lucide-react';
import Image from 'next/image';
import fold1image1 from '@/images/user-profile/fold1image1.png'
import userprofile from '@/images/user-profile/user-profile.png'

import ProfileSection from '@/components/user-profile/profile-section.js'
import ChangePassword from '@/components/user-profile/change-password.js'

export default function SellerListPage() {
  const [activeMenuItem, setActiveMenuItem] = useState('My Listings');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItems = [
    { name: 'My Listings', icon: Home },
    { name: 'View Responses', icon: Eye },
    { name: 'My Profile', icon: User },
    { name: 'Contacted', icon: Mail },
    { name: 'Change password', icon: Lock },
    { name: 'Logout', icon: LogOut }
  ];

  const sampleListings = [
    {
      id: 1,
      title: 'Residential Plots/Land in Thudiyalur, coimbatore',
      price: '₹19.50 Lac',
      originalPrice: '₹19.58 Lac',
      pricePerSqft: '₹3,330 /sqft',
      area: '588 sqft (55 sqm)',
      type: 'Plot/Land',
      status: 'Ready To Move',
      plotArea: 'Plot Area',
      description: 'This superb one bedroom flat rests a stones throw from Kenningon tube station and Elephantland Castle train station as well as the leafy Paisley Park.',
      dealer: 'Monica Fox',
      postedTime: '1 mon ago',
      postedDate: 'Jun 6, 2025',
      image: fold1image1,
      viewCount: 4,
    },
    {
      id: 2,
      title: 'Residential Plots/Land in Thudiyalur, coimbatore',
      price: '₹19.50 Lac',
      originalPrice: '₹19.58 Lac',
      pricePerSqft: '₹3,330 /sqft',
      area: '588 sqft (55 sqm)',
      type: 'Plot/Land',
      status: 'Ready To Move',
      plotArea: 'Plot Area',
      description: 'This superb one bedroom flat rests a stones throw from Kenningon tube station and Elephantland Castle train station as well as the leafy Paisley Park.',
      dealer: 'Monica Fox',
      postedTime: '1 mon ago',
      postedDate: 'Jun 6, 2025',
      image: fold1image1,
      viewCount: 4,
    },
    {
      id: 3,
      title: 'Residential Plots/Land in Thudiyalur, coimbatore',
      price: '₹19.50 Lac',
      originalPrice: '₹19.58 Lac',
      pricePerSqft: '₹3,330 /sqft',
      area: '588 sqft (55 sqm)',
      type: 'Plot/Land',
      status: 'Ready To Move',
      plotArea: 'Plot Area',
      description: 'This superb one bedroom flat rests a stones throw from Kenningon tube station and Elephantland Castle train station as well as the leafy Paisley Park.',
      dealer: 'Monica Fox',
      postedTime: '1 mon ago',
      postedDate: 'Jun 6, 2025',
      image: fold1image1,
      viewCount: 4,
    }
  ];

  const sampleResponses = [
    {
      id: 1,
      name: 'Maria Williams',
      email: 'maria@gmail.com',
      phone: '+1 (062) 109-9222'
    },
    {
      id: 2,
      name: 'Maria Williams',
      email: 'maria@gmail.com',
      phone: '+1 (062) 109-9222'
    },
    {
      id: 3,
      name: 'Maria Williams',
      email: 'maria@gmail.com',
      phone: '+1 (062) 109-9222'
    },
    {
      id: 4,
      name: 'Maria Williams',
      email: 'maria@gmail.com',
      phone: '+1 (062) 109-9222'
    }
  ];

  const renderContent = () => {
    switch(activeMenuItem) {
      case 'My Listings':
        return (
          <div className="space-y-6">
            {sampleListings.map((listing) => (
              <div key={listing.id} className="mb-15">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  {/* Header */}
                  <div className="flex items-center justify-between p-4 border-b border-gray-100">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-gray-600" />
                      </div>
                      <span className="text-gray-700 font-medium">Posted On {listing.postedDate}</span>
                    </div>
                    <button className="text-gray-400 hover:text-red-500 cursor-pointer flex items-center space-x-1">
                      <Trash2 className="w-4 h-4" />
                      <span>Delete</span>
                    </button>
                  </div>

                  {/* Content */}
                  <div className="p-4 sm:p-6">
                    <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
                      {/* Image */}
                      <div className="w-full lg:w-1/3">
                        <div className="relative aspect-video rounded-lg overflow-hidden">
                          <Image
                            src={listing.image}
                            alt={listing.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>

                      {/* Details */}
                      <div className="w-full lg:w-2/3 space-y-4">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                          <div className="flex-1">
                            <p className="text-sm text-gray-500 uppercase tracking-wider">FOR SALE</p>
                            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mt-1 leading-tight">{listing.title}</h3>
                          </div>
                          <div className="text-left sm:text-right">
                            <p className="text-xl sm:text-2xl font-bold text-[#B59327]">{listing.price}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-sm">
                          <div>
                            <p className="font-semibold text-gray-900">{listing.originalPrice}</p>
                            <p className="text-gray-500">{listing.pricePerSqft}</p>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{listing.area}</p>
                            <p className="text-gray-500">{listing.plotArea}</p>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{listing.type}</p>
                            <p className="text-gray-500">{listing.status}</p>
                          </div>
                        </div>

                        <p className="text-gray-600 text-sm leading-relaxed">{listing.description}</p>

                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 pt-4">
                          <div className="flex flex-col gap-1">
                            <span className="text-sm text-gray-500">Dealer - {listing.postedTime}</span>
                            <span className="font-semibold text-gray-900">{listing.dealer}</span>
                          </div>
                          <div className="flex flex-wrap gap-2 sm:gap-3">
                            <button className="px-3 sm:px-4 py-2 bg-[#175973] text-white rounded-md hover:bg-[#175973]/90 cursor-pointer text-sm whitespace-nowrap">
                              View Contact
                            </button>
                            <button className="px-3 sm:px-4 py-2 bg-[#175973] text-white rounded-md hover:bg-[#175973]/90 cursor-pointer text-sm flex items-center space-x-1 whitespace-nowrap">
                              <Mail className="w-4 h-4" />
                              <span>Contact</span>
                            </button>
                            <button className="px-3 sm:px-4 py-2 text-gray-600 hover:text-[#175973] cursor-pointer text-sm flex items-center space-x-1 whitespace-nowrap">
                              <Star className="w-4 h-4" />
                              <span>Save</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right text-[#175973] mt-5">
                  (Viewed by {listing.viewCount})
                </div>
              </div>
            ))}
          </div>
        );
      
      case 'View Responses':
        return (
          <div className="space-y-4">
            {sampleResponses.map((response) => (
              <div key={response.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                      {response.name}
                    </h3>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm sm:text-base text-gray-600">
                      <div className="flex items-center gap-1">
                        <Mail className="w-4 h-4" />
                        <span>{response.email}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="w-4 h-4" />
                        <span>{response.phone}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button className="px-4 sm:px-6 py-2 sm:py-3 bg-[#175973] text-white rounded-md hover:bg-[#175973]/90 cursor-pointer text-sm sm:text-base flex items-center gap-2 whitespace-nowrap">
                      <Phone className="w-4 h-4" />
                      <span>Call</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      
      case 'My Profile':
        return (
          <ProfileSection />
          // <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-8">
          //   <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">My Profile</h2>
          //   <p className="text-gray-600 text-sm sm:text-base">Manage your profile information here.</p>
          // </div>
        );
      
      case 'Contacted':
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-8">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Contacted</h2>
            <p className="text-gray-600 text-sm sm:text-base">View your contact history here.</p>
          </div>
        );
      
      case 'Change password':
        return (
          <ChangePassword />
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="">
      <div className="flex max-lg:flex-col">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="lg:hidden absolute top-6 z-40 p-2 bg-[#175973] text-white rounded-md cursor-pointer h-fit w-fit"
        >
          {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Sidebar */}
        <div className={`${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 fixed lg:static left-0 z-40 w-64 transition-transform duration-300 ease-in-out h-fit border border-[#5680907d] rounded-md`}>
          {/* Profile Section */}
          <div className="px-6 py-6 pt-16 lg:pt-6 bg-white rounded-t-md">
            <div className="flex flex-col items-center text-center">
              <div className="relative w-16 h-16 mb-3">
                <Image
                  src={userprofile}
                  alt="Profile"
                  fill
                  className="object-cover rounded-full"
                />
              </div>
              <h3 className="font-medium text-sm">Monica Fox</h3>
              <p className="text-gray-900 text-sm mt-1">Dealer</p>
            </div>
          </div>

          <nav className="py-6 bg-[#175973] rounded-b-md">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.name}>
                    <button
                      onClick={() => {
                        setActiveMenuItem(item.name);
                        setIsSidebarOpen(false); // Close sidebar on mobile after selection
                      }}
                      className={`w-full flex items-center space-x-3 px-6 py-3 text-left transition-colors cursor-pointer ${
                        activeMenuItem === item.name
                          ? 'bg-[#5680907D] text-white'
                          : 'text-gray-200 hover:bg-[#5680907D] hover:text-white'
                      }`}
                    >
                      {Icon && <Icon className="w-5 h-5" />}
                      <span className="font-medium">{item.name}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden fixed inset-0 bg-[#8b8b8ba0] cursor-pointer"
          />
        )}

        {/* Main Content */}
        <div className="flex-1 lg:ml-0 lg:px-8">
          <div className="max-w-7xl mx-auto pt-4 lg:pt-0">
            <h1 className="text-2xl font-bold text-gray-900 mb-8">{activeMenuItem}</h1>
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}