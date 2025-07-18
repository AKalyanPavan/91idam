import fold8image1 from '@/images/homepage/fold8image1.svg'
import fold8image2 from '@/images/homepage/fold8image2.svg'
import fold8image3 from '@/images/homepage/fold8image3.svg'
import fold8image4 from '@/images/homepage/fold8image4.svg'
import fold8image5 from '@/images/homepage/fold8image5.svg'
import fold8image6 from '@/images/homepage/fold8image6.svg'

import Image from 'next/image'

// Tools & Features Data (Facts)
const toolsData = {
  header: {
    title: "Comprehensive Real Estate Tools",
    subtitle: "Everything you need for successful real estate operations"
  },
  tools: [
    {
      id: 1,
      icon: fold8image1,
      title: "WhatsApp Bot",
      description: "Automated customer support and lead qualification through WhatsApp integration."
    },
    {
      id: 2,
      icon: fold8image2,
      title: "Downloadable Resources",
      description: "Franchise brochures, legal guides, investment calculators, and market reports."
    },
    {
      id: 3,
      icon: fold8image3,
      title: "Franchisee Locator",
      description: "Interactive map to find IDAM franchise partners and service providers in your area."
    },
    {
      id: 4,
      icon: fold8image4,
      title: "CRM Portal Access",
      description: "Dedicated dashboard for franchise partners and vendors to manage leads and projects."
    },
    {
      id: 5,
      icon: fold8image5,
      title: "Email Automation",
      description: "Automated follow-ups, reminders, and nurture campaigns for better lead conversion."
    },
    {
      id: 6,
      icon: fold8image6,
      title: "Multi-Language Support",
      description: "Platform available in English and Tamil with plans for additional regional languages."
    }
  ]
};

// Tailwind Component
const ToolsFeaturesSection = ({ data = toolsData }) => {
  return (
    <div className="bg-white p-12 my-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-[#2c5f7e] mb-4">
          {data.header.title}
        </h2>
        <p className="text-gray-600 text-xl">
          {data.header.subtitle}
        </p>
      </div>
      
      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.tools.map((tool) => (
          <div
            key={tool.id}
            className="bg-gray-50 p-6 rounded-xl text-center transition-all duration-300 border border-[#e8e0d4] hover:bg-white hover:transform hover:-translate-y-2 hover:shadow-lg hover:shadow-black/10"
          >
            <Image className="mx-auto mb-4" src={tool.icon} alt={tool.title} />
            <h4 className="text-[#2c5f7e] mb-2 text-xl font-semibold">
              {tool.title}
            </h4>
            <p className="text-gray-600 text-sm leading-relaxed">
              {tool.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToolsFeaturesSection;