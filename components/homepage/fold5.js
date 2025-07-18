import React from 'react';
import { Lock, Building2, Star, Landmark, CheckCircle, Play, Calculator, Trophy, RotateCcw, TrendingUp, Globe, FileText, Download } from 'lucide-react';

const EnhancedServices = () => {
  // const handleServiceClick = (linkText) => {
  //   if (linkText.includes('Consultation')) {
  //     window.alert('Legal Consultation Booking:\n\n• Property legal verification\n• Document review\n• Fraud protection\n• Digital locker setup\n• Rental agreement creation');
  //   } else if (linkText.includes('Franchise')) {
  //     window.alert('Franchise Application Form:\n\n• Business interest type\n• Territory selection\n• Investment capacity\n• Experience details\n• Business documents\n• Financial information');
  //   } else if (linkText.includes('Vendor')) {
  //     window.alert('Vendor Registration Form:\n\n• Service type (Builder/Lawyer/Surveyor/Loan Agent)\n• Service areas\n• Experience & pricing\n• Certifications\n• Portfolio upload');
  //   } else if (linkText.includes('Demo')) {
  //     window.alert('Enterprise Demo Booking:\n\n• Project type & scale\n• Multi-location requirements\n• Budget & timeline\n• Organization details\n• Compliance requirements');
  //   }
  // };

  const services = [
    {
      id: 'property-search',
      icon: <Lock className="w-12 h-12 text-white" />,
      title: 'Property. Done Right.',
      description: 'Complete legal verification, digital document locker, rental agreements, and fraud protection for buyers, sellers, tenants, and NRIs.',
      features: [
        { icon: <CheckCircle className="w-4 h-4" />, text: 'Anti-fraud Protection' },
        { icon: <CheckCircle className="w-4 h-4" />, text: 'Digital Locker' },
        { icon: <CheckCircle className="w-4 h-4" />, text: 'CRM Support' }
      ],
      link: 'Book Consultation →',
      linkAction: 'Book Consultation'
    },
    {
      id: 'franchise-info',
      icon: <Building2 className="w-12 h-12 text-white" />,
      title: 'Your Business. Our System.',
      description: 'Complete business-in-a-box for entrepreneurs, brokers, and job seekers. Proven franchise system with recurring income potential.',
      features: [
        { icon: <Calculator className="w-4 h-4" />, text: 'ROI Calculator' },
        { icon: <Play className="w-4 h-4" />, text: 'Demo Video' },
        { icon: <FileText className="w-4 h-4" />, text: 'CRM Tools' }
      ],
      link: 'Apply for Franchise →',
      linkAction: 'Apply for Franchise'
    },
    {
      id: 'service-stakeholders',
      icon: <Star className="w-12 h-12 text-white" />,
      title: 'Earn More. Get Recognized.',
      description: 'Verified vendor status for builders, surveyors, lawyers, and loan agents. Regular projects with professional recognition and CRM integration.',
      features: [
        { icon: <Trophy className="w-4 h-4" />, text: 'Verified Badge' },
        { icon: <RotateCcw className="w-4 h-4" />, text: 'Regular Projects' },
        { icon: <TrendingUp className="w-4 h-4" />, text: 'CRM Access' }
      ],
      link: 'Join as Vendor →',
      linkAction: 'Join as Vendor'
    },
    {
      id: 'institutional-clients',
      icon: <Landmark className="w-12 h-12 text-white" />,
      title: 'Enterprise Real Estate Execution.',
      description: 'Multi-location SLA delivery for PGs, corporates, government, and investors. Compliance dashboards with risk management.',
      features: [
        { icon: <Globe className="w-4 h-4" />, text: 'Multi-Location SLA' },
        { icon: <FileText className="w-4 h-4" />, text: 'Case Studies' },
        { icon: <Download className="w-4 h-4" />, text: 'Download Proposal' }
      ],
      link: 'Book Demo →',
      linkAction: 'Book Demo'
    }
  ];

  return (
    <div className="my-12 py-12 bg-gradient-to-br from-[#2C5F7E] to-[#5A9FD4] text-white">
      <div className="max-w-7xl mx-auto px-5">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-5">
            Beyond Property Listings
          </h2>
          <p className="text-xl md:text-2xl opacity-90 leading-relaxed">
            Complete real estate ecosystem with legal safety, business opportunities, and enterprise solutions
          </p>
        </div>
        
        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              id={service.id}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 transition-all duration-300 hover:bg-white/15 hover:-translate-y-2 cursor-pointer"
            >
              {/* Service Icon */}
              <div className="mb-5">
                {service.icon}
              </div>
              
              {/* Service Title */}
              <h3 className="text-2xl font-semibold mb-4">
                {service.title}
              </h3>
              
              {/* Service Description */}
              <p className="opacity-90 leading-relaxed mb-4 text-base">
                {service.description}
              </p>
              
              {/* Service Features */}
              <div className="flex flex-wrap gap-2 my-4">
                {service.features.map((feature, index) => (
                  <span
                    key={index}
                    className="bg-white/20 text-white px-2 py-1 rounded-xl text-xs font-medium flex items-center gap-1"
                  >
                    {feature.icon}
                    {feature.text}
                  </span>
                ))}
              </div>
              
              {/* Service Link */}
              <button
                // onClick={handleServiceClick(service.linkAction)}
                className="text-white font-semibold border-b-2 border-transparent hover:border-white transition-all duration-300 mt-5 inline-block"
              >
                {service.link}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EnhancedServices;