'use client'
import React, { useState } from 'react';
import { MapPin, Search, ChevronDown, Phone, Mail, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="h-[117px] px-4 lg:px-8" style={{ backgroundColor: 'rgb(223, 219, 159)' }}>
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <img 
            src="https://in-cdn1.blr1.cdn.digitaloceanspaces.com/figma-images/dbf399a8332532b32ad9b3f557ec48ce54958c55.png" 
            alt="91 IDAM Logo" 
            className="h-16 w-auto"
          />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          <a href="#" className="font-bold text-base" style={{ color: 'rgb(181, 147, 39)', fontFamily: 'Montserrat' }}>
            For Buyers
          </a>
          <a href="#" className="font-bold text-base" style={{ color: 'rgb(30, 32, 34)', fontFamily: 'Montserrat' }}>
            For Owners
          </a>
          <a href="#" className="font-bold text-base" style={{ color: 'rgb(30, 32, 34)', fontFamily: 'Montserrat' }}>
            For Dealers/Builders
          </a>
          <a href="#" className="font-bold text-base" style={{ color: 'rgb(30, 32, 34)', fontFamily: 'Montserrat' }}>
            Contact
          </a>
          
          <div className="flex items-center space-x-4">
            <button 
              className="px-6 py-3 rounded-md font-semibold text-base text-white"
              style={{ backgroundColor: 'rgb(23, 89, 115)', fontFamily: 'Montserrat' }}
            >
              Start Selling
            </button>
            <button 
              className="px-6 py-3 rounded-md font-semibold text-base text-white"
              style={{ backgroundColor: 'rgb(23, 89, 115)', fontFamily: 'Montserrat' }}
            >
              Start Buying
            </button>
          </div>

          {/* Profile Icon */}
          <div className="w-7 h-7 bg-black rounded-full flex items-center justify-center">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: 'rgb(223, 219, 159)' }}></div>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div className="w-6 h-6 flex flex-col justify-center space-y-1">
            <div className="w-full h-0.5" style={{ backgroundColor: 'rgb(30, 32, 34)' }}></div>
            <div className="w-full h-0.5" style={{ backgroundColor: 'rgb(30, 32, 34)' }}></div>
            <div className="w-full h-0.5" style={{ backgroundColor: 'rgb(30, 32, 34)' }}></div>
          </div>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-[117px] left-0 right-0 border-t border-gray-200 z-50" style={{ backgroundColor: 'rgb(223, 219, 159)' }}>
          <nav className="px-4 py-4 space-y-4">
            <a href="#" className="block font-bold text-base" style={{ color: 'rgb(181, 147, 39)', fontFamily: 'Montserrat' }}>
              For Buyers
            </a>
            <a href="#" className="block font-bold text-base" style={{ color: 'rgb(30, 32, 34)', fontFamily: 'Montserrat' }}>
              For Owners
            </a>
            <a href="#" className="block font-bold text-base" style={{ color: 'rgb(30, 32, 34)', fontFamily: 'Montserrat' }}>
              For Dealers/Builders
            </a>
            <a href="#" className="block font-bold text-base" style={{ color: 'rgb(30, 32, 34)', fontFamily: 'Montserrat' }}>
              Contact
            </a>
            <div className="space-y-2 pt-4">
              <button 
                className="w-full px-6 py-3 rounded-md font-semibold text-base text-white"
                style={{ backgroundColor: 'rgb(23, 89, 115)', fontFamily: 'Montserrat' }}
              >
                Start Selling
              </button>
              <button 
                className="w-full px-6 py-3 rounded-md font-semibold text-base text-white"
                style={{ backgroundColor: 'rgb(23, 89, 115)', fontFamily: 'Montserrat' }}
              >
                Start Buying
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

const HeroSection = () => {
  return (
    <section className="relative py-20" style={{ backgroundColor: 'rgba(23, 89, 115, 0.05)' }}>
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 
                className="text-5xl lg:text-6xl font-semibold leading-tight"
                style={{ color: 'rgb(30, 32, 34)', fontFamily: 'Montserrat' }}
              >
                Land you'll love.
              </h1>
              <h2 
                className="text-5xl lg:text-6xl font-semibold leading-tight"
                style={{ color: 'rgb(181, 147, 39)', fontFamily: 'Montserrat' }}
              >
                A place to start.
              </h2>
            </div>

            {/* Search Form */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <input 
                    type="text" 
                    placeholder="Enter location"
                    className="w-full px-4 py-3 border border-gray-200 rounded-md text-base"
                    style={{ color: 'rgb(89, 91, 92)', fontFamily: 'Mongolian Baiti' }}
                  />
                </div>
                <div className="space-y-2">
                  <select 
                    className="w-full px-4 py-3 border border-gray-200 rounded-md text-base"
                    style={{ color: 'rgb(89, 91, 92)', fontFamily: 'Mongolian Baiti' }}
                  >
                    <option>Residential</option>
                    <option>Commercial</option>
                    <option>Agricultural</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <button 
                    className="w-full py-3 rounded-md font-medium text-white text-base"
                    style={{ backgroundColor: 'rgb(23, 89, 115)', fontFamily: 'Mongolian Baiti' }}
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <img 
              src="https://in-cdn1.blr1.cdn.digitaloceanspaces.com/figma-images/49be453f52343aa5a0e84d763a4d6e20c480f1ec.png"
              alt="Land property showcase"
              className="w-full h-auto rounded-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const PlotTypesSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-semibold text-3xl lg:text-4xl mb-4" style={{ color: 'rgb(30, 32, 34)', fontFamily: 'Montserrat' }}>
            Plots/Land in Places
          </h2>
          <p className="text-base mb-8" style={{ color: 'rgb(30, 32, 34)', fontFamily: 'Mongolian Baiti' }}>
            Explore Nearby Neighborhoods
          </p>
          
          {/* Filter Buttons */}
          <div className="flex justify-center space-x-4 mb-12">
            <button 
              className="px-8 py-2 rounded-md border font-medium text-base"
              style={{ 
                backgroundColor: 'rgba(23, 89, 115, 0.1)', 
                borderColor: 'rgb(23, 89, 115)', 
                color: 'rgb(30, 32, 34)',
                fontFamily: 'Mongolian Baiti'
              }}
            >
              Residential Plots
            </button>
            <button 
              className="px-8 py-2 rounded-md border font-medium text-base"
              style={{ 
                borderColor: 'rgba(137, 152, 164, 0.125)', 
                color: 'rgb(30, 32, 34)',
                fontFamily: 'Mongolian Baiti'
              }}
            >
              Commercial Plots
            </button>
          </div>
        </div>

        {/* Plot Type Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <PlotCard
            image="https://in-cdn1.blr1.cdn.digitaloceanspaces.com/figma-images/4e0a7866be1adb71579d52e7c5dc5c0672577e0c.png"
            title="Corner Plots"
          />
          <PlotCard
            image="https://in-cdn1.blr1.cdn.digitaloceanspaces.com/figma-images/9d8619d8551e775f7b16a6ecd29abf47a8fb652f.png"
            title="Plots in Gated Community"
          />
          <PlotCard
            image="https://in-cdn1.blr1.cdn.digitaloceanspaces.com/figma-images/477fd50e4b50e960f766a5813143a23a276c6e6b.png"
            title="East facing plots"
          />
          <PlotCard
            image="https://in-cdn1.blr1.cdn.digitaloceanspaces.com/figma-images/45da984af4d799aba2662b8c45e1fa16512f6a44.png"
            title="Plots with Compound wall"
          />
        </div>
      </div>
    </section>
  );
};

const PlotCard = ({ image, title }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg">
      <div className="relative">
        <img 
          src={image} 
          alt={title}
          className="w-full h-60 object-cover rounded-lg"
        />
      </div>
      
      <div className="p-6">
        <h3 className="font-semibold text-lg text-center" style={{ color: 'rgb(30, 32, 34)', fontFamily: 'Montserrat' }}>
          {title}
        </h3>
      </div>
    </div>
  );
};

const PropertyCard = ({ image, title, price, location, type = "project" }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg">
      <div className="relative">
        <img 
          src={image} 
          alt={title}
          className="w-full h-60 object-cover rounded-t-lg"
        />
      </div>
      
      <div className="p-6">
        <h3 className="font-semibold text-lg mb-2" style={{ color: 'rgb(30, 32, 34)', fontFamily: 'Montserrat' }}>
          {type === "project" ? "Project name" : "Residential Land"}
        </h3>
        
        {type === "project" && (
          <div className="flex items-center font-semibold text-base mb-4" style={{ color: 'rgb(181, 147, 39)', fontFamily: 'Montserrat' }}>
            <MapPin className="w-4 h-4 mr-2" />
            <span>7.95L - 96.59L</span>
            <MapPin className="w-4 h-4 ml-4" />
          </div>
        )}
        
        {type === "land" && (
          <p className="text-base" style={{ color: 'rgb(103, 119, 136)', fontFamily: 'Mongolian Baiti' }}>
            City name
          </p>
        )}
      </div>
    </div>
  );
};

const TrendingSection = () => {
  const properties = [
    {
      id: 1,
      image: "https://in-cdn1.blr1.cdn.digitaloceanspaces.com/figma-images/275a0daee60e09660ef4b047a9f00de52101fe0a.png",
      title: "Project 1"
    },
    {
      id: 2,
      image: "https://in-cdn1.blr1.cdn.digitaloceanspaces.com/figma-images/610f374aa84820f15a2b30c0d21290a5815c4121.png",
      title: "Project 2"
    },
    {
      id: 3,
      image: "https://in-cdn1.blr1.cdn.digitaloceanspaces.com/figma-images/b5239a76b6712c05e37b536b8c3bb8e5f3591146.png",
      title: "Project 3"
    },
    {
      id: 4,
      image: "https://in-cdn1.blr1.cdn.digitaloceanspaces.com/figma-images/b5239a76b6712c05e37b536b8c3bb8e5f3591146.png",
      title: "Project 4"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-semibold text-3xl lg:text-4xl mb-4" style={{ color: 'rgb(30, 32, 34)', fontFamily: 'Montserrat' }}>
            Trending Plot/Land Listings
          </h2>
          <p className="text-base" style={{ color: 'rgb(30, 32, 34)', fontFamily: 'Mongolian Baiti' }}>
            Discover Plots near you
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {properties.map(property => (
            <PropertyCard
              key={property.id}
              image={property.image}
              title={property.title}
              type="project"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const RecentlyAddedSection = () => {
  const properties = [
    {
      id: 1,
      image: "https://in-cdn1.blr1.cdn.digitaloceanspaces.com/figma-images/275a0daee60e09660ef4b047a9f00de52101fe0a.png"
    },
    {
      id: 2,
      image: "https://in-cdn1.blr1.cdn.digitaloceanspaces.com/figma-images/610f374aa84820f15a2b30c0d21290a5815c4121.png"
    },
    {
      id: 3,
      image: "https://in-cdn1.blr1.cdn.digitaloceanspaces.com/figma-images/b5239a76b6712c05e37b536b8c3bb8e5f3591146.png"
    },
    {
      id: 4,
      image: "https://in-cdn1.blr1.cdn.digitaloceanspaces.com/figma-images/b5239a76b6712c05e37b536b8c3bb8e5f3591146.png"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-semibold text-3xl lg:text-4xl mb-4" style={{ color: 'rgb(30, 32, 34)', fontFamily: 'Montserrat' }}>
            Recently added
          </h2>
          <p className="text-base" style={{ color: 'rgb(30, 32, 34)', fontFamily: 'Mongolian Baiti' }}>
            Handpicked Just for You
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {properties.map(property => (
            <PropertyCard
              key={property.id}
              image={property.image}
              type="land"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const ListPropertySection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-base mb-4" style={{ color: 'rgb(103, 119, 136)', fontFamily: 'Mongolian Baiti', textTransform: 'uppercase' }}>
            Do you have land for sale?
          </p>
          <h2 className="font-semibold text-3xl lg:text-4xl mb-4" style={{ color: 'rgb(30, 32, 34)', fontFamily: 'Montserrat' }}>
            List Your Land for Sale on 91 IDAM
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <p className="text-base mb-4" style={{ color: 'rgb(103, 119, 136)', fontFamily: 'Mongolian Baiti', textTransform: 'uppercase' }}>
                Add Your Property
              </p>
              <h3 className="font-semibold text-xl mb-4" style={{ color: 'rgb(30, 32, 34)', fontFamily: 'Montserrat' }}>
                Want to Find Land Buyers?
              </h3>
              <p className="text-base mb-8" style={{ color: 'rgb(103, 119, 136)', fontFamily: 'Mongolian Baiti' }}>
                Sell out your property—fast & easy
              </p>
              
              <button 
                className="px-8 py-3 rounded-md font-semibold text-white text-base"
                style={{ backgroundColor: 'rgb(23, 89, 115)', fontFamily: 'Montserrat' }}
              >
                List Your Property Free
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <img 
              src="https://in-cdn1.blr1.cdn.digitaloceanspaces.com/figma-images/3920cf718b6b33916c6db37b337df8dfe33265d1.png"
              alt="Property showcase"
              className="w-full h-auto rounded-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const SellerCategorySection = () => {
  return (
    <section className="py-16" style={{ backgroundColor: 'rgb(181, 147, 39)' }}>
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white">
            <h2 className="font-semibold text-3xl lg:text-4xl mb-4" style={{ fontFamily: 'Montserrat' }}>
              Plots/Land Posted by
            </h2>
            <p className="text-base mb-8" style={{ fontFamily: 'Mongolian Baiti' }}>
              Browse by Seller Category
            </p>
          </div>

          {/* Right Image */}
          <div className="relative">
            <img 
              src="https://in-cdn1.blr1.cdn.digitaloceanspaces.com/figma-images/486947993cf624e9ad6984e35c0810a5b329f3b4.png"
              alt="Property by seller category"
              className="w-full h-auto rounded-2xl"
            />
          </div>
        </div>

        {/* Seller Categories Section */}
        <div className="mt-16 bg-gray-50 rounded-lg p-8">
          <div className="text-center mb-12">
            <h3 className="font-semibold text-2xl lg:text-3xl mb-4" style={{ color: 'rgb(30, 32, 34)', fontFamily: 'Montserrat' }}>
              Choose Who's Selling
            </h3>
            <p className="text-base" style={{ color: 'rgb(103, 119, 136)', fontFamily: 'Mongolian Baiti' }}>
              Discover Listings You'll Like
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Dealer Card */}
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgb(23, 89, 115)' }}>
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/>
                  </svg>
                </div>
                <h4 className="font-semibold text-lg mb-2" style={{ color: 'rgb(30, 32, 34)', fontFamily: 'Montserrat' }}>
                  Dealer
                </h4>
                <p className="text-base" style={{ color: 'rgb(103, 119, 136)', fontFamily: 'Mongolian Baiti' }}>
                  3000+ Properties
                </p>
              </div>
            </div>

            {/* Owner Card */}
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgb(23, 89, 115)' }}>
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7v10c0 5.55 3.84 9.95 9 11 5.16-1.05 9-5.45 9-11V7l-10-5z"/>
                  </svg>
                </div>
                <h4 className="font-semibold text-lg mb-2" style={{ color: 'rgb(30, 32, 34)', fontFamily: 'Montserrat' }}>
                  Owner
                </h4>
                <p className="text-base" style={{ color: 'rgb(103, 119, 136)', fontFamily: 'Mongolian Baiti' }}>
                  3000+ Properties
                </p>
              </div>
            </div>

            {/* Builder Card */}
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgb(23, 89, 115)' }}>
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <h4 className="font-semibold text-lg mb-2" style={{ color: 'rgb(30, 32, 34)', fontFamily: 'Montserrat' }}>
                  Builder
                </h4>
                <p className="text-base" style={{ color: 'rgb(103, 119, 136)', fontFamily: 'Mongolian Baiti' }}>
                  3000+ Properties
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const CitiesSection = () => {
  const cities = [
    {
      id: 1,
      name: "Delhi",
      properties: "15,000+ Properties",
      image: "https://in-cdn1.blr1.cdn.digitaloceanspaces.com/figma-images/7e47f3ecffd0d65076e64a6b1f1f12ca0a3c936d.png"
    },
    {
      id: 2,
      name: "Mumbai", 
      properties: "15,000+ Properties",
      image: "https://in-cdn1.blr1.cdn.digitaloceanspaces.com/figma-images/dcae0469056a0c4d221aaaf4e520de25d84a7f31.png"
    },
    {
      id: 3,
      name: "Bangalore",
      properties: "15,000+ Properties", 
      image: "https://in-cdn1.blr1.cdn.digitaloceanspaces.com/figma-images/c93c67184ff554ca37fb7cd91f6cd073d22e33e2.png"
    },
    {
      id: 4,
      name: "Hyderabad",
      properties: "15,000+ Properties",
      image: "https://in-cdn1.blr1.cdn.digitaloceanspaces.com/figma-images/a75dff7e5e33730f25de81b8cbc09716356220c5.png"
    },
    {
      id: 5,
      name: "Chennai", 
      properties: "15,000+ Properties",
      image: "https://in-cdn1.blr1.cdn.digitaloceanspaces.com/figma-images/9e077fcb22a2ee4dcd958780ac07a35f86284c44.png"
    },
    {
      id: 6,
      name: "Pune",
      properties: "15,000+ Properties",
      image: "https://in-cdn1.blr1.cdn.digitaloceanspaces.com/figma-images/3c8da4da6576b1c86a577e46e4b20a6b5165fb4b.png"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-base mb-4" style={{ color: 'rgb(103, 119, 136)', fontFamily: 'Mongolian Baiti', textTransform: 'uppercase' }}>
            Cities You'll Love
          </p>
          <h2 className="font-semibold text-3xl lg:text-4xl mb-4" style={{ color: 'rgb(30, 32, 34)', fontFamily: 'Montserrat' }}>
            Choose Plots in India's Most Popular Cities
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cities.map(city => (
            <CityCard key={city.id} {...city} />
          ))}
        </div>
      </div>
    </section>
  );
};

const CityCard = ({ name, properties, image }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg">
      <div className="relative">
        <img 
          src={image} 
          alt={name}
          className="w-full h-60 object-cover rounded-t-lg"
        />
      </div>
      
      <div className="p-6">
        <h3 className="font-semibold text-xl mb-2" style={{ color: 'rgb(30, 32, 34)', fontFamily: 'Montserrat' }}>
          {name}
        </h3>
        <p className="text-base" style={{ color: 'rgb(30, 32, 34)', fontFamily: 'Mongolian Baiti' }}>
          {properties}
        </p>
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="text-white py-16" style={{ backgroundColor: 'rgb(23, 89, 115)' }}>
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Logo Section */}
        <div className="mb-12">
          <img 
            src="https://in-cdn1.blr1.cdn.digitaloceanspaces.com/figma-images/948ac9ea38441b7910b16d13c3a4e68d0aed76f5.png"
            alt="91 IDAM Logo"
            className="h-16 w-auto"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Section */}
          <div>
            <h3 className="font-semibold text-base mb-6" style={{ fontFamily: 'Montserrat' }}>Company</h3>
            <nav className="space-y-4">
              <a href="#" className="block text-sm" style={{ color: 'rgb(246, 250, 255)', fontFamily: 'Mongolian Baiti' }}>
                About
              </a>
              <a href="#" className="block text-sm" style={{ color: 'rgb(246, 250, 255)', fontFamily: 'Mongolian Baiti' }}>
                Contact
              </a>
              <a href="#" className="block text-sm" style={{ color: 'rgb(246, 250, 255)', fontFamily: 'Mongolian Baiti' }}>
                Privacy Policy
              </a>
              <a href="#" className="block text-sm" style={{ color: 'rgb(246, 250, 255)', fontFamily: 'Mongolian Baiti' }}>
                Terms & Condition
              </a>
              <a href="#" className="block text-sm" style={{ color: 'rgb(246, 250, 255)', fontFamily: 'Mongolian Baiti' }}>
                Feedback
              </a>
              <a href="#" className="block text-sm" style={{ color: 'rgb(246, 250, 255)', fontFamily: 'Mongolian Baiti' }}>
                Report a Problem
              </a>
            </nav>
          </div>

          {/* Our Partners Section */}
          <div>
            <h3 className="font-semibold text-base mb-6" style={{ fontFamily: 'Montserrat' }}>Our Partners</h3>
            <nav className="space-y-4">
              <a href="#" className="block text-sm" style={{ color: 'rgb(246, 250, 255)', fontFamily: 'Mongolian Baiti' }}>
                VKV Realty
              </a>
            </nav>
          </div>

          {/* Contact Us Section */}
          <div>
            <h3 className="font-semibold text-base mb-6" style={{ fontFamily: 'Montserrat' }}>Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4" style={{ color: 'rgb(246, 250, 255)' }} />
                <span className="text-sm" style={{ color: 'rgb(246, 250, 255)', fontFamily: 'Inter' }}>
                  +1 (062) 109-9222
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-white" />
                <span className="text-sm" style={{ color: 'rgb(246, 250, 255)', fontFamily: 'Inter' }}>
                  Email id
                </span>
              </div>
            </div>
          </div>

          {/* Connect Us Section */}
          <div>
            <h3 className="font-semibold text-base mb-6" style={{ fontFamily: 'Montserrat' }}>Connect Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="w-8 h-8 bg-white bg-opacity-10 rounded-full flex items-center justify-center hover:bg-opacity-20 transition-colors">
                <Facebook className="w-4 h-4" style={{ color: 'rgb(246, 250, 255)' }} />
              </a>
              <a href="#" className="w-8 h-8 bg-white bg-opacity-10 rounded-full flex items-center justify-center hover:bg-opacity-20 transition-colors">
                <Twitter className="w-4 h-4 text-white" />
              </a>
              <a href="#" className="w-8 h-8 bg-white bg-opacity-10 rounded-full flex items-center justify-center hover:bg-opacity-20 transition-colors">
                <Instagram className="w-4 h-4" style={{ color: 'rgb(246, 250, 255)' }} />
              </a>
              <a href="#" className="w-8 h-8 bg-white bg-opacity-10 rounded-full flex items-center justify-center hover:bg-opacity-20 transition-colors">
                <Linkedin className="w-4 h-4 text-white" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t mt-12 pt-8" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
          <div className="text-center">
            <p className="text-sm" style={{ color: 'rgb(246, 250, 255)', fontFamily: 'Mongolian Baiti' }}>
              © 2024 91 IDAM. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <PlotTypesSection />
        <TrendingSection />
        <RecentlyAddedSection />
        <ListPropertySection />
        <SellerCategorySection />
        <CitiesSection />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;