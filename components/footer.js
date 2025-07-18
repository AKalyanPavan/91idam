import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#175973] text-white pt-12 pb-6 mt-15">
      <div className="max-w-6xl mx-auto px-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* IDAM Platform Section */}
        <div className="footer-section w-50 mx-auto">
          <h3 className="mb-5 text-blue-300 text-xl font-medium">IDAM Platform</h3>
          <a href="#" className="no-underline block mb-2 py-1 transition-all duration-300 hover:text-blue-300 hover:pl-2">Property Buying</a>
          <a href="#" className="no-underline block mb-2 py-1 transition-all duration-300 hover:text-blue-300 hover:pl-2">Property Selling</a>
          <a href="#" className="no-underline block mb-2 py-1 transition-all duration-300 hover:text-blue-300 hover:pl-2">Property Search</a>
          <a href="#" className="no-underline block mb-2 py-1 transition-all duration-300 hover:text-blue-300 hover:pl-2">Legal Verification</a>
          <a href="#" className="no-underline block mb-2 py-1 transition-all duration-300 hover:text-blue-300 hover:pl-2">Digital Documentation</a>
          <a href="#" className="no-underline block mb-2 py-1 transition-all duration-300 hover:text-blue-300 hover:pl-2">Rental Services</a>
        </div>

        {/* Business Services Section */}
        <div className="footer-section w-50 mx-auto">
          <h3 className="mb-5 text-blue-300 text-xl font-medium">Business Services</h3>
          <a href="#" className="no-underline block mb-2 py-1 transition-all duration-300 hover:text-blue-300 hover:pl-2">Franchise Opportunities</a>
          <a href="#" className="no-underline block mb-2 py-1 transition-all duration-300 hover:text-blue-300 hover:pl-2">Vendor Registration</a>
          <a href="#" className="no-underline block mb-2 py-1 transition-all duration-300 hover:text-blue-300 hover:pl-2">Enterprise Solutions</a>
          <a href="#" className="no-underline block mb-2 py-1 transition-all duration-300 hover:text-blue-300 hover:pl-2">Partner Network</a>
          <a href="#" className="no-underline block mb-2 py-1 transition-all duration-300 hover:text-blue-300 hover:pl-2">CRM Solutions</a>
        </div>

        {/* Company Section */}
        <div className="footer-section w-50 mx-auto">
          <h3 className="mb-5 text-blue-300 text-xl font-medium">Company</h3>
          <a href="#" className="no-underline block mb-2 py-1 transition-all duration-300 hover:text-blue-300 hover:pl-2">About IDAM</a>
          <a href="#" className="no-underline block mb-2 py-1 transition-all duration-300 hover:text-blue-300 hover:pl-2">Why Choose Us</a>
          <a href="#" className="no-underline block mb-2 py-1 transition-all duration-300 hover:text-blue-300 hover:pl-2">How It Works</a>
          <a href="#" className="no-underline block mb-2 py-1 transition-all duration-300 hover:text-blue-300 hover:pl-2">Our Services</a>
          <a href="#" className="no-underline block mb-2 py-1 transition-all duration-300 hover:text-blue-300 hover:pl-2">Careers</a>
          <a href="#" className="no-underline block mb-2 py-1 transition-all duration-300 hover:text-blue-300 hover:pl-2">Contact Us</a>
        </div>

        {/* Support & Partners Section */}
        <div className="footer-section w-50 mx-auto">
          <h3 className="mb-5 text-blue-300 text-xl font-medium">Support & Partners</h3>
          <a href="#" className="no-underline block mb-2 py-1 transition-all duration-300 hover:text-blue-300 hover:pl-2">📧 info@91idam.com</a>
          <a href="#" className="no-underline block mb-2 py-1 transition-all duration-300 hover:text-blue-300 hover:pl-2">📞 +91 (062) 109-9222</a>
          <a href="#" className="no-underline block mb-2 py-1 transition-all duration-300 hover:text-blue-300 hover:pl-2">FAQ</a>
          <a href="#" className="no-underline block mb-2 py-1 transition-all duration-300 hover:text-blue-300 hover:pl-2">Legal Documents</a>
          <a href="#" className="no-underline block mb-2 py-1 transition-all duration-300 hover:text-blue-300 hover:pl-2">Privacy Policy</a>
          <a href="#" className="no-underline block mb-2 py-1 transition-all duration-300 hover:pl-2">Terms & Conditions</a>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center pt-7 border-t border-[#F8F7F5] mt-10 text-white-400 max-w-5xl mx-auto">
        <p>&copy; 2025 IDAM. All rights reserved. | Real Estate Reimagined</p>
      </div>
    </footer>
  );
};

export default Footer;