'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import { Eye, Mail, Star, Camera, X } from 'lucide-react';
import fold1image1 from '@/images/buyer-wishlist/fold1image1.png';

const WishlistCard = () => {
  const [isImageZoomed, setIsImageZoomed] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 bg-white">
      {/* Header */}
      <div className="my-6">
        <h1 className="text-2xl font-medium text-gray-800">Your lists</h1>
      </div>

      {/* Property Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Price Header inside card */}
        <div className="flex justify-end p-4 pb-4">
          <div className="text-2xl font-semibold" style={{ color: '#B59327' }}>
            ₹19.50 Lac
          </div>
        </div>
        <div className="flex flex-col lg:flex-row">
          {/* Image Section */}
          <div className="lg:w-1/3 relative">
            <div className="aspect-video lg:aspect-square bg-green-100 relative overflow-hidden cursor-pointer" onClick={() => setIsImageZoomed(true)}>
              <Image
                src={fold1image1}
                alt="Property aerial view"
                className="w-full h-full object-cover"
              />
              {/* Camera icon overlay */}
              <div className="absolute bottom-3 right-3 bg-white bg-opacity-90 rounded-md p-2">
                <Camera className="w-4 h-4 text-gray-600" />
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="lg:w-2/3 p-6">
            {/* For Sale Badge */}
            <div className="mb-3">
              <span className="inline-block px-3 py-1 text-sm font-medium text-gray-600 bg-gray-100 rounded-full">
                FOR SALE
              </span>
            </div>

            {/* Title */}
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Residential Plots/Land in Thudiyalur, Coimbatore
            </h2>

            {/* Property Details Row */}
            <div className="flex flex-wrap gap-8 mb-4">
              {/* Price */}
              <div>
                <div className="text-lg font-semibold text-gray-900">₹19.58 Lac</div>
                <div className="text-sm text-gray-600">₹3,330/sqft</div>
              </div>

              {/* Vertical divider */}
              <div className="hidden sm:block w-px h-12 bg-gray-300"></div>

              {/* Area */}
              <div>
                <div className="text-lg font-semibold text-gray-900">588 sqft</div>
                <div className="text-sm text-gray-600">(55 sqm)</div>
                <div className="text-sm text-gray-600">Plot Area</div>
              </div>

              {/* Vertical divider */}
              <div className="hidden sm:block w-px h-12 bg-gray-300"></div>

              {/* Status */}
              <div>
                <div className="text-lg font-semibold text-gray-900">Plot/Land</div>
                <div className="text-sm text-gray-600">Ready To Move</div>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-700 mb-6 leading-relaxed">
              This superb one bedroom flat rests a stones throw from Kennington tube station 
              and Elephantand Castle train station as well as the leafy Paisley Park.
            </p>

            {/* Dealer Info and Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              {/* Dealer Info */}
              <div>
                <div className="text-sm text-gray-600 mb-1">Dealer - 1 mon ago</div>
                <div className="font-semibold text-gray-900">Monica Fox</div>
              </div>

              {/* Action Buttons */}
              <div className="flex max-sm:flex-col gap-3">
                <button 
                  className="flex items-center justify-center gap-2 px-4 py-2 font-medium text-white rounded-md transition-colors cursor-pointer hover:opacity-90 min-w-fit"
                  style={{ backgroundColor: '#175973' }}
                >
                  <Eye className="w-4 h-4" />
                  View Contact
                </button>
                
                <button 
                  className="flex items-center justify-center gap-2 px-4 py-2 font-medium text-white rounded-md transition-colors cursor-pointer hover:opacity-90 min-w-fit"
                  style={{ backgroundColor: '#175973' }}
                >
                  <Mail className="w-4 h-4" />
                  Contact
                </button>
                
                <button className="flex items-center justify-center gap-2 px-4 py-2 font-medium text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors cursor-pointer min-w-fit">
                  <Star className="w-4 h-4" />
                  Saved
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Zoom Modal */}
      {isImageZoomed && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 cursor-pointer" onClick={() => setIsImageZoomed(false)}>
          <div className="relative max-w-4xl max-h-screen p-4">
            <button
              className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70 transition-colors cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setIsImageZoomed(false);
              }}
            >
              <X className="w-6 h-6" />
            </button>
            <Image
              src={fold1image1}
              alt="Property aerial view - zoomed"
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default WishlistCard;