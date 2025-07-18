import React from 'react';

const ComparisonTable = () => {
  const comparisonData = [
    {
      feature: "Legal Verification",
      traditional: "❌ Manual, time-consuming, unreliable",
      idam: "✅ Automated verification with legal experts"
    },
    {
      feature: "Fraud Protection",
      traditional: "❌ Limited protection, buyer beware",
      idam: "✅ Multi-layer fraud prevention system"
    },
    {
      feature: "Document Management",
      traditional: "❌ Physical papers, risk of loss",
      idam: "✅ Digital locker with cloud backup"
    },
    {
      feature: "Business Support",
      traditional: "❌ Individual efforts, no system",
      idam: "✅ Complete franchise system with CRM"
    },
    {
      feature: "Technology Integration",
      traditional: "❌ Basic listings, no automation",
      idam: "✅ Advanced CRM, WhatsApp automation"
    },
    {
      feature: "Service Provider Network",
      traditional: "❌ Unverified, inconsistent quality",
      idam: "✅ Verified partners with quality standards"
    },
    {
      feature: "Enterprise Solutions",
      traditional: "❌ No standardized processes",
      idam: "✅ Multi-location SLA with compliance"
    }
  ];

  return (
    <div className="bg-white p-8 md:p-12 my-12">
      <h2 className="text-3xl md:text-4xl font-bold text-[#2C5F7E] mb-8 text-center">
        Traditional vs IDAM: See the Difference
      </h2>
      
      <div className="max-w-4xl mx-auto mt-8 rounded-md overflow-hidden shadow-lg">
        {/* Header Row */}
        <div className="grid grid-cols-3 min-h-[60px]">
          <div className="bg-[#2C5F7E] text-white p-5 flex items-center justify-center text-center font-bold text-lg md:text-xl">
            Features
          </div>
          <div className="bg-[#FFEAA7] text-[#D63031] p-5 flex items-center justify-center text-center font-bold text-lg md:text-xl">
            Traditional Approach
          </div>
          <div className="bg-[#D4EDDA] text-[#155724] p-5 flex items-center justify-center text-center font-bold text-lg md:text-xl">
            IDAM Platform
          </div>
        </div>
        
        {/* Data Rows */}
        {comparisonData.map((row, index) => (
          <div 
            key={index} 
            className="grid grid-cols-3 border-b border-amber-100 last:border-b-0 hover:bg-gray-50 transition-colors duration-300"
          >
            {/* Feature Column */}
            <div className="bg-gray-50 text-[#2C5F7E] font-semibold p-5 flex items-center justify-center md:justify-start text-center md:text-left border-b md:border-b-0 md:border-r border-amber-100">
              {row.feature}
            </div>
            
            {/* Traditional Column */}
            <div className="bg-[#FFEAA7] text-[#D63031] p-5 flex items-center justify-center text-center font-medium border-b md:border-b-0 md:border-r border-amber-100">
              {row.traditional}
            </div>
            
            {/* IDAM Column */}
            <div className="bg-[#D4EDDA] text-[#155724] p-5 flex items-center justify-center text-center font-medium">
              {row.idam}
            </div>
          </div>
        ))}
      </div>
      
      {/* Mobile Enhancement: Add visual indicators */}
      <div className="mt-8 md:hidden">
        <div className="flex justify-center space-x-8">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-yellow-100 rounded border border-yellow-200"></div>
            <span className="text-sm text-gray-600">Traditional</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-100 rounded border border-green-200"></div>
            <span className="text-sm text-gray-600">IDAM</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonTable;