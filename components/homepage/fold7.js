import React from 'react';

// Testimonials Data (Facts)
const testimonialsData = {
  header: {
    title: "Trusted by Thousands",
    subtitle: "Real stories from our satisfied customers and partners"
  },
  testimonials: [
    {
      id: 1,
      content: "IDAM's legal verification saved us from a potential fraud. The digital locker keeps all our documents safe and accessible.",
      author: "Priya Sharma",
      role: "Property Buyer, Chennai"
    },
    {
      id: 2,
      content: "Started my franchise 6 months ago. The CRM system and brand support helped me close 15+ deals already.",
      author: "Rajesh Kumar",
      role: "IDAM Franchise Partner, Coimbatore"
    },
    {
      id: 3,
      content: "As a verified vendor, I get consistent projects. The platform's CRM helps me manage all client relationships efficiently.",
      author: "Advocate Sunitha",
      role: "Legal Service Provider"
    }
  ],
  trustLogos: [
    { icon: "🏛️", text: "Government Registered" },
    { icon: "⚖️", text: "Legal Compliance" },
    { icon: "🔒", text: "Data Security Certified" },
    { icon: "🏆", text: "ISO Certified Process" },
    { icon: "📱", text: "Technology Partner" }
  ]
};

// Tailwind Component
const TestimonialsSection = ({ data = testimonialsData }) => {
  return (
    <div className="bg-[#B59327]">
      <div className="p-12 my-12 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-white mb-4">
            {data.header.title}
          </h2>
          <p className="text-white text-xl">
            {data.header.subtitle}
          </p>
        </div>
        
        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
          {data.testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-gray-50 p-8 rounded-xl border-l-4 border-[#2c5f7e] transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-lg hover:shadow-[#2c5f7e]/15"
            >
              <div className="mb-5">
                <p className="italic text-gray-700 leading-relaxed text-sm mb-5">
                  "{testimonial.content}"
                </p>
                <div>
                  <strong className="text-[#2c5f7e] block mb-1">
                    {testimonial.author}
                  </strong>
                  <span className="text-gray-600 text-xs">
                    {testimonial.role}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Trust Logos */}
        <div className="flex flex-wrap justify-center gap-8 py-8 border-t border-[#e8e0d4]">
          {data.trustLogos.map((logo, index) => (
            <div
              key={index}
              className="flex items-center gap-2 text-white font-semibold text-sm"
            >
              <span className="text-lg">{logo.icon}</span>
              <span>{logo.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;