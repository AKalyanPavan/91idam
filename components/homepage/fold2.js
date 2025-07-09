'use client'
import React, { useState } from 'react';

const styles = `body {
    font-family: 'Montserrat', 'Mongolian Baiti', system-ui, -apple-system, sans-serif;
    line-height: 1.6;
    color: #1E2022;
    background-color: #ffffff;
}`

// Image URL mappings
const imageMap = {
  '275a0daee60e09660ef4b047a9f00de52101fe0a': 'https://raw.githubusercontent.com/Ravigandhiarul/images/main/275a0daee60e09660ef4b047a9f00de52101fe0a.png',
  '610f374aa84820f15a2b30c0d21290a5815c4121': 'https://raw.githubusercontent.com/Ravigandhiarul/images/main/610f374aa84820f15a2b30c0d21290a5815c4121.png',
  '477fd50e4b50e960f766a5813143a23a276c6e6b': 'https://raw.githubusercontent.com/Ravigandhiarul/images/main/477fd50e4b50e960f766a5813143a23a276c6e6b.png',
  '45da984af4d799aba2662b8c45e1fa16512f6a44': 'https://raw.githubusercontent.com/Ravigandhiarul/images/main/45da984af4d799aba2662b8c45e1fa16512f6a44.png'
};

// Places Section
const Fold2 = () => {

  const [activeFilter, setActiveFilter] = useState('residential');

  const places = [
    {
      id: 1,
      image: imageMap['275a0daee60e09660ef4b047a9f00de52101fe0a'],
      name: 'Corner Plots',
      properties: '15,000+ Properties'
    },
    {
      id: 2,
      image: imageMap['610f374aa84820f15a2b30c0d21290a5815c4121'],
      name: 'Plots in Gated Community',
      properties: '15,000+ Properties'
    },
    {
      id: 3,
      image: imageMap['477fd50e4b50e960f766a5813143a23a276c6e6b'],
      name: 'East facing plots',
      properties: '15,000+ Properties'
    },
    {
      id: 4,
      image: imageMap['45da984af4d799aba2662b8c45e1fa16512f6a44'],
      name: 'Plots with Compound wall',
      properties: '15,000+ Properties'
    }
  ];

  return (
    <section className="py-20 max-w-7xl mx-auto px-6">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="font-montserrat font-semibold text-3xl leading-tight text-gray-900 mb-2">
          Plots/Land in Places
        </h2>
        <p className="font-serif text-base text-gray-500">
          Explore Nearby Neighborhoods
        </p>
        
        {/* Property Type Filters */}
        <div className="flex justify-center gap-4 mt-6">
          <button 
            onClick={() => setActiveFilter('residential')}
            className={`cursor-pointer px-6 py-2 border rounded text-base font-serif transition-all duration-200 ${
              activeFilter === 'residential' 
                ? 'bg-[#1759731A] border-[#175973] text-gray-900' 
                : 'bg-white border-gray-200 text-gray-900 hover:border-blue-600'
            }`}
          >
            Residential Plots
          </button>
          <button 
            onClick={() => setActiveFilter('commercial')}
            className={`cursor-pointer px-6 py-2 border rounded text-base font-serif transition-all duration-200 ${
              activeFilter === 'commercial' 
                ? 'bg-[#1759731A] border-[#175973] text-gray-900' 
                : 'bg-white border-gray-200 text-gray-900 hover:border-blue-600'
            }`}
          >
            Commercial Plots
          </button>
        </div>
      </div>

      {/* Places Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mt-12">
        {places.map(place => (
          <div 
            key={place.id} 
            className="bg-white rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer"
          >
            {/* Place Image */}
            <div className="w-full h-60 overflow-hidden">
              <img 
                src={place.image} 
                alt={place.name} 
                className="w-full h-full object-cover"
                loading="lazy" 
              />
            </div>
            
            {/* Place Info */}
            <div className="p-6">
              <h3 className="font-montserrat font-semibold text-lg text-gray-900">
                {place.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Fold2;