import Image from 'next/image';
import { Mail, Phone, Instagram, Facebook, Youtube, Twitter } from 'lucide-react';
import logoWhite from '@/images/logo-white.svg'

export default function Footer() {
  const companyLinks = [
    { name: 'About', href: '#' },
    { name: 'Contact', href: '#' },
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms & Condition', href: '#' },
    { name: 'Feedback', href: '#' },
    { name: 'Report a Problem', href: '#' }
  ];

  const partners = [
    { name: 'VKV Realty', href: '#' }
  ];

  const socialMediaIcons = [
    { Icon: Instagram, href: '#', label: 'Instagram' },
    { Icon: Facebook, href: '#', label: 'Facebook' },
    { Icon: Youtube, href: '#', label: 'YouTube' },
    { Icon: Twitter, href: '#', label: 'Twitter' }
  ];

  return (
    <footer className="bg-[#175973] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Logo Section */}
          <div className="flex justify-center md:justify-start lg:col-span-1">
            <div className="w-32 h-16 relative">
              <Image
                src={logoWhite} // Replace with your actual logo path
                alt="IDAM Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Company Section */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-6">Company</h3>
            <nav className="space-y-4">
              {companyLinks.map((link) => (
                <div key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 block"
                  >
                    {link.name}
                  </a>
                </div>
              ))}
            </nav>
          </div>

          {/* Our Partners Section */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-6">Our Partners</h3>
            <nav className="space-y-4">
              {partners.map((partner) => (
                <div key={partner.name}>
                  <a
                    href={partner.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 block"
                  >
                    {partner.name}
                  </a>
                </div>
              ))}
            </nav>
          </div>

          {/* Contact Us Section */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
            <div className="space-y-4 mb-8">
              {/* Email */}
              <div className="flex items-center justify-center md:justify-start space-x-3">
                <Mail className="w-5 h-5 text-gray-300 flex-shrink-0" />
                <span className="text-gray-300">Email id</span>
              </div>
              
              {/* Phone */}
              <div className="flex items-center justify-center md:justify-start space-x-3">
                <Phone className="w-5 h-5 text-gray-300 flex-shrink-0" />
                <span className="text-gray-300">+1 (062) 109-9222</span>
              </div>
            </div>

            {/* Connect Us Section */}
            <div>
              <h4 className="text-lg font-semibold mb-1">Connect Us</h4>
              <div className="flex justify-center md:justify-start space-x-4">
                {socialMediaIcons.map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    className="w-10 h-10 hover:bg-opacity-20 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-105"
                    aria-label={label}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Bottom Border Line */}
        <div className="border-t border-white/20 border-opacity-20 my-12"></div>
      </div>
    </footer>
  );
}