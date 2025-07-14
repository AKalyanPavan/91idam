'use client';
import React, { useState } from 'react';
import { Clock, Heart, MessageCircle, ChevronRight, Star, Trash2, Camera } from 'lucide-react';
import Image from 'next/image';
import fold1image1 from '@/images/user-listing/fold1image1.svg';

const UserListingPage = () => {
  const [activeTab, setActiveTab] = useState('latest');

  const tabs = [
    { id: 'latest', label: 'Latest searches', icon: Clock },
    { id: 'wishlist', label: 'Wish Listed', icon: Heart },
    { id: 'contacted', label: 'Contacted', icon: MessageCircle }
  ];

  const sampleListings = [
    {
      id: 1,
      title: 'Buy in Coimbatore, Residential Land',
      icon: Clock
    },
    {
      id: 2,
      title: 'Buy in Coimbatore, Residential Land',
      icon: Clock
    }
  ];

  const wishlistProperties = [
    {
      id: 1,
      title: 'Residential Plots/Land',
      location: 'In Coimbatore',
      postedBy: 'Posted By Owner',
      image: fold1image1,
      saved: true
    }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'latest':
        return (
          <div className="space-y-4">
            <div className="text-lg font-medium text-gray-900 mb-6">
              Today - Friday( 27 June 2025)
            </div>
            {sampleListings.map((listing) => (
              <div key={listing.id} className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <Clock className="w-5 h-5 text-gray-600" />
                    </div>
                    <span className="text-gray-900 font-medium">{listing.title}</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        );
      case 'wishlist':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
                Wish Listed Properties
              </h2>
              <p className="text-sm sm:text-base text-gray-600">
                Click on property to view contact details again
              </p>
            </div>
            
            {wishlistProperties.length > 0 ? (
              <div className="space-y-4">
                {wishlistProperties.map((property) => (
                  <div key={property.id} className="bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200">
                    <div className="flex flex-col sm:flex-row gap-5">
                      {/* Property Image */}
                      <div className="relative sm:w-75 h-48 sm:h-50 flex-shrink-0">
                        <Image
                          src={property.image}
                          alt={property.title}
                          fill
                          className="object-cover rounded-lg"
                        />
                        <div className="absolute bottom-2 right-2 bg-white bg-opacity-90 rounded-sm p-2">
                          <Camera className="w-4 h-4 text-gray-600" />
                        </div>
                      </div>
                      
                      {/* Property Details */}
                      <div className="flex-1 min-w-0 p-5">
                        <div className="flex flex-col sm:items-start sm:justify-between gap-3 h-full">
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1">
                              {property.title}
                            </h3>
                            <p className="text-sm sm:text-base text-gray-600 mb-1">
                              {property.location}
                            </p>
                            <p className="text-sm sm:text-base text-gray-600">
                              {property.postedBy}
                            </p>
                          </div>
                          
                          {/* Action Buttons */}
                          <div className="flex flex-row gap-2 sm:gap-1 flex-shrink-0 ml-auto">
                            <button className="flex items-center gap-1 px-2 py-1 text-sm text-[#175973] hover:text-blue-700 transition-colors">
                              <Star className="w-4 h-4 fill-[#175973]" />
                              <span className="inline">Saved</span>
                            </button>
                            <button className="flex items-center gap-1 px-2 py-1 text-sm text-gray-500 hover:text-red-600 transition-colors">
                              <Trash2 className="w-4 h-4" />
                              <span className="inline">Remove list</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Heart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Your wishlist is empty</p>
                <p className="text-sm text-gray-400 mt-2">Save properties you're interested in</p>
              </div>
            )}
          </div>
        );
      case 'contacted':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
                Contacted Properties
              </h2>
              <p className="text-sm sm:text-base text-gray-600">
                Click on property to view contact details again
              </p>
            </div>
            
            {wishlistProperties.length > 0 ? (
              <div className="space-y-4">
                {wishlistProperties.map((property) => (
                  <div key={property.id} className="bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200">
                    <div className="flex flex-col sm:flex-row gap-5">
                      {/* Property Image */}
                      <div className="relative sm:w-75 h-48 sm:h-50 flex-shrink-0">
                        <Image
                          src={property.image}
                          alt={property.title}
                          fill
                          className="object-cover rounded-lg"
                        />
                        <div className="absolute bottom-2 right-2 bg-white bg-opacity-90 rounded-sm p-2">
                          <Camera className="w-4 h-4 text-gray-600" />
                        </div>
                      </div>
                      
                      {/* Property Details */}
                      <div className="flex-1 min-w-0 p-5">
                        <div className="flex flex-col sm:items-start sm:justify-between gap-3 h-full">
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1">
                              {property.title}
                            </h3>
                            <p className="text-sm sm:text-base text-gray-600 mb-1">
                              {property.location}
                            </p>
                            <p className="text-sm sm:text-base text-gray-600">
                              {property.postedBy}
                            </p>
                          </div>
                          
                          {/* Action Buttons */}
                          <div className="flex flex-row gap-2 sm:gap-1 flex-shrink-0 ml-auto">
                            <button className="flex items-center gap-1 px-2 py-1 text-sm text-[#175973] hover:text-blue-700 transition-colors">
                              <Star className="w-4 h-4 fill-[#175973]" />
                              <span className="inline">Saved</span>
                            </button>
                            <button className="flex items-center gap-1 px-2 py-1 text-sm text-gray-500 hover:text-red-600 transition-colors">
                              <Trash2 className="w-4 h-4" />
                              <span className="inline">Remove list</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Heart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Your wishlist is empty</p>
                <p className="text-sm text-gray-400 mt-2">Save properties you're interested in</p>
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Menu Navigation */}
        <div className="bg-white">
          <div className="flex flex-col sm:flex-row">
            {tabs.map((tab, index) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-3 py-3 sm:px-6 sm:py-4 text-center font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-[#21325b1a] text-black sm:border-2 border-[#175973]'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                } ${
                  index === 0 ? 'rounded-sm' : ''
                } ${
                  index === tabs.length - 1 ? 'rounded-sm' : ''
                } ${
                  index > 0 && index < tabs.length - 1 ? 'rounded-sm' : ''
                }`}
              >
                <div className="flex items-center justify-center space-x-2 sm:space-x-3">
                  <tab.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-sm sm:text-base whitespace-nowrap">{tab.label}</span>
                </div>
              </button>
            ))}
          </div>
          {/* Horizontal line separator */}
          <div className="border-t border-gray-200 mt-5"></div>
        </div>

        {/* Content Section */}
        <div className="p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default UserListingPage;