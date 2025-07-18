'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import fold2image1 from '@/images/aboutus/fold2image1.svg';
import fold2image2 from '@/images/aboutus/fold2image2.svg';

import fold4image1 from '@/images/aboutus/fold4image1.svg';
import fold4image2 from '@/images/aboutus/fold4image2.svg';
import fold4image3 from '@/images/aboutus/fold4image3.svg';
import fold4image4 from '@/images/aboutus/fold4image4.svg';
import fold4image5 from '@/images/aboutus/fold4image5.svg';

const Aboutus = () => {
  const [activeLanguage, setActiveLanguage] = useState('EN');

  const handleLanguageChange = (lang) => {
    setActiveLanguage(lang);
  };

  return (
    <div className="font-sans bg-white text-gray-800 leading-relaxed">
      {/* Language Switcher */}
      <div className="fixed top-4 right-5 bg-white rounded-full shadow-lg p-1 z-50">
        <button
          onClick={() => handleLanguageChange('EN')}
          className={`px-3 py-2 rounded-2xl text-xs font-medium transition-all duration-300 ${
            activeLanguage === 'EN' 
              ? 'bg-[#2C5F7E] text-white' 
              : 'bg-transparent text-gray-600 hover:bg-gray-100'
          }`}
        >
          EN
        </button>
        <button
          onClick={() => handleLanguageChange('தமிழ்')}
          className={`px-3 py-2 rounded-2xl text-xs font-medium transition-all duration-300 ${
            activeLanguage === 'தமிழ்' 
              ? 'bg-[#2C5F7E] text-white' 
              : 'bg-transparent text-gray-600 hover:bg-gray-100'
          }`}
        >
          தமிழ்
        </button>
      </div>


      {/* Main Content */}
      <div className="max-w-6xl mx-auto py-10 px-5">
        {/* Breadcrumb */}
        <div className="mb-8 text-gray-600 text-sm">
          <Link href="/" className="text-[#2C5F7E] no-underline hover:underline">Home</Link> / About Us
        </div>

        {/* Hero Section */}
        <div className="mb-15 py-15 px-5 bg-[#2C5F7E0D] rounded-md">
          <h1 className="text-6xl text-[#2C5F7E] mb-5 font-bold leading-tight text-center">91 IDAM</h1>
          <p className="text-lg font-['Mongolian_Baiti'] text-gray-600 mb-8 leading-relaxed max-w-4xl mx-auto text-center">
            Redefining the Indian real estate landscape through an integrated, transparent, and tech-enabled ecosystem
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8 max-w-4xl mx-auto">
            <div className="bg-white p-5 rounded-lg shadow-md">
              <div className="text-[#2C5F7E] font-semibold text-sm mb-1">Established</div>
              <div className="text-gray-800 text-base font-medium mt-4">2025</div>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-md">
              <div className="text-[#2C5F7E] font-semibold text-sm mb-1">Headquarters</div>
              <div className="text-gray-800 text-base font-medium mt-4">Coimbatore, Tamil Nadu</div>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-md">
              <div className="text-[#2C5F7E] font-semibold text-sm mb-1">Industry</div>
              <div className="text-gray-800 text-base font-medium mt-4">Real Estate | Tech-Enabled Brokerage</div>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-md">
              <div className="text-[#2C5F7E] font-semibold text-sm mb-1">Business Model</div>
              <div className="text-gray-800 text-base font-medium mt-4">Franchise Model</div>
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
          <div className="bg-white p-10 rounded-2xl border border-gray-100 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
            <Image src={fold2image1} alt="Mission" />
            <h3 className="text-[#2C5F7E] text-3xl font-semibold mb-5 mt-2">Our Mission</h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              91 IDAM delivers end-to-end property services through a tech-first, franchise-based model. 
              We enable individuals and businesses to transact real estate with confidence, while empowering 
              brokers and entrepreneurs with tools, training, and brand equity. Our mission is to bring 
              speed, simplicity, and trust to every real estate journey.
            </p>
          </div>
          
          <div className="bg-white p-10 rounded-2xl border border-gray-100 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
            <Image src={fold2image2} alt="Vision" />
            <h3 className="text-[#2C5F7E] text-3xl font-semibold mb-5 mt-2">Our Vision</h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              To redefine the Indian real estate landscape through an integrated, transparent, and 
              tech-enabled ecosystem. We aim to build a collaborative network that empowers buyers, 
              sellers, brokers, and developers across the state and beyond, backed by 100+ franchise 
              locations and ₹200 Cr+ in annual revenue.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="bg-white rounded-2xl p-12 my-12 shadow-xl border border-gray-100">
          <h2 className="text-[#2C5F7E] text-4xl font-bold mb-8 text-center">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "1. Commitment to Public", desc: "We serve with dedication and honesty to uplift communities." },
              { title: "2. Transparency & Accountability", desc: "Clear pricing, documented processes, and ethical conduct." },
              { title: "3. Confidentiality", desc: "Data privacy and trust in every transaction." },
              { title: "4. Integrity & Ethics", desc: "We stand by what's right, even when no one is watching." },
              { title: "5. Employee Happiness", desc: "Creating an environment of growth, respect, and reward." },
              { title: "6. Collaboration", desc: "Brokers, clients, and partners working together for mutual success." },
              { title: "7. Time Value", desc: "Streamlined operations that respect everyone's time." },
              { title: "8. Customer-Centricity", desc: "Peace of mind and satisfaction at every touchpoint." }
            ].map((value, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-xl border-l-4 border-[#2C5F7E] transition-all duration-300 hover:translate-x-1 hover:bg-white hover:shadow-md">
                <h4 className="text-[#2C5F7E] text-lg font-semibold mb-2">{value.title}</h4>
                <p className="text-gray-600 leading-relaxed text-sm">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-[#2C5F7E] to-[#5A9FD4] text-white">
        <div className="max-w-6xl mx-auto py-10 px-5">
        {/* Key Differentiators */}
          <div className="rounded-2xl my-12 relative">
            <h2 className="text-white text-4xl font-bold mb-8 text-center relative z-10">What Makes Us Different</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 relative z-10">
              {[
                { icon: fold4image1, title: "Franchise-First Model", desc: "Scalable, local empowerment through plug-and-play franchise systems" },
                { icon: fold4image2, title: "One-Stop Real Estate Solution", desc: "Sales, rentals, CRM, property management, and marketing" },
                { icon: fold4image3, title: "Tech-Powered Platform", desc: "CRM dashboards, WhatsApp automation, listing tools" },
                { icon: fold4image4, title: "Legacy + Innovation", desc: "40+ years of industry wisdom with modern execution" },
                { icon: fold4image5, title: "Trust-Focused Brand", desc: "Systems designed to build lasting client relationships" }
              ].map((diff, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 transition-all duration-300 hover:bg-white/15 hover:-translate-y-2">
                  <Image className="mb-4" src={diff.icon} alt={diff.title} />
                  <h4 className="text-xl font-semibold mb-2">{diff.title}</h4>
                  <p className="opacity-90 leading-relaxed text-sm">{diff.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto pt-10 px-5">
        {/* Growth Journey */}
        <div className="bg-white rounded-2xl p-12 my-12 shadow-xl border border-gray-100">
          <h2 className="text-[#2C5F7E] text-4xl font-bold mb-8 text-center">Our Growth Roadmap</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div className="bg-gray-50 p-8 rounded-xl text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg bg-[#2C5F7E] bg-opacity-5">
              <span className="bg-[#2C5F7E] text-white px-4 py-2 rounded-full font-bold text-sm mb-5 inline-block">2025-2026</span>
              <h4 className="text-[#2C5F7E] text-2xl font-bold mb-4">₹5 Cr Revenue</h4>
              <div className="text-gray-600 leading-relaxed text-sm text-left">
                <div className="space-y-2">
                  <div className="flex items-start">
                    <span className="text-green-600 font-bold mr-2">✓</span>
                    <span>Launch Coimbatore operations</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-green-600 font-bold mr-2">✓</span>
                    <span>Serve 200+ property clients</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-green-600 font-bold mr-2">✓</span>
                    <span>Hire 10+ full-time team members</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-green-600 font-bold mr-2">✓</span>
                    <span>Implement CRM and automation</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-xl text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border-2 border-transparent">
              <span className="bg-[#2C5F7E] text-white px-4 py-2 rounded-full font-bold text-sm mb-5 inline-block">2026-2028</span>
              <h4 className="text-[#2C5F7E] text-2xl font-bold mb-4">₹20-25 Cr Revenue</h4>
              <div className="text-gray-600 leading-relaxed text-sm text-left">
                <div className="space-y-2">
                  <div className="flex items-start">
                    <span className="text-green-600 font-bold mr-2">✓</span>
                    <span>Scale to 10+ cities across Tamil Nadu</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-green-600 font-bold mr-2">✓</span>
                    <span>Onboard 50+ franchise partners</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-green-600 font-bold mr-2">✓</span>
                    <span>Launch training modules and publications</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-green-600 font-bold mr-2">✓</span>
                    <span>Virtual expo channels</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-xl text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border-2 border-transparent">
              <span className="bg-[#2C5F7E] text-white px-4 py-2 rounded-full font-bold text-sm mb-5 inline-block">2029-2035</span>
              <h4 className="text-[#2C5F7E] text-2xl font-bold mb-4">₹200+ Cr Revenue</h4>
              <div className="text-gray-600 leading-relaxed text-sm text-left">
                <div className="space-y-2">
                  <div className="flex items-start">
                    <span className="text-green-600 font-bold mr-2">✓</span>
                    <span>100+ active franchises nationally</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-green-600 font-bold mr-2">✓</span>
                    <span>India&apos;s first regional real estate data center</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-green-600 font-bold mr-2">✓</span>
                    <span>1,000+ digital entrepreneur brokers</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-green-600 font-bold mr-2">✓</span>
                    <span>IPO readiness and PE partnerships</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#175973] text-white">
        <div className="bg-quote max-w-3xl mx-auto py-10 px-5">
          {/* Leadership */}
          <div className="my-12 text-white relative">
            <h2 className="text-[40px] font-bold mt-12 mb-8 text-center font-['Montserrat']">Leadership</h2>
            <div className="flex-1 text-center">
              <h3 className="text-[32px] font-bold">Mr. Pratheesh Kumar-E</h3>
              <p className="text-2xl my-5 font-medium">Founder & CEO, 91 IDAM</p>
              <p className="leading-relaxed font-['Mongolian_Baiti'] text-[18px]">
                Visionary leader driving the transformation of Indian real estate through technology and 
                ethical practices. With deep industry expertise and commitment to transparency, 
                Pratheesh is building IDAM as India&apos;s most trusted real estate platform.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto pt-10 px-5">
        {/* Target Segments */}
        <div className="bg-white rounded-2xl p-12 my-12 shadow-xl border border-gray-100">
          <h2 className="text-[#2C5F7E] text-4xl font-bold mb-8 text-center">Who We Serve</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Home Buyers & Sellers", desc: "Individuals and families looking for trusted property transactions with legal verification." },
              { title: "Tenants & Landlords", desc: "Rental market participants seeking transparent agreements and property management." },
              { title: "NRIs", desc: "Non-Resident Indians investing in Indian real estate with remote management needs." },
              { title: "Real Estate Brokers", desc: "Independent brokers looking for technology tools and brand support to scale their business." },
              { title: "Developers", desc: "Property developers seeking marketing support and sales channel partnerships." },
              { title: "Franchise Entrepreneurs", desc: "Business-minded individuals looking to start their own real estate venture with proven systems." }
            ].map((segment, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-xl border-l-4 border-[#2C5F7E] transition-all duration-300 hover:translate-x-1 hover:bg-white hover:shadow-md">
                <h4 className="text-[#2C5F7E] text-xl font-semibold mb-2">{segment.title}</h4>
                <p className="text-gray-600 leading-relaxed text-sm">{segment.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      
      {/* WhatsApp Floating Button */}
      <a 
        href="https://wa.me/916210999222" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 text-white w-15 h-15 rounded-full flex items-center justify-center no-underline text-3xl shadow-lg z-40 transition-all duration-300 hover:scale-110 hover:shadow-xl"
        style={{ boxShadow: '0 5px 20px rgba(37, 211, 102, 0.5)' }}
      >
        📱
      </a>
    </div>
  );
};

export default Aboutus;