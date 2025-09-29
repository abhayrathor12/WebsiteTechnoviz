import React from 'react';
import { Link } from 'react-router-dom';
import {  Mail, Phone, MapPin, Linkedin, Facebook,Instagram, Youtube } from 'lucide-react';
import logo from  "../public/logo.jpg";
const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0B2B5A] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2 text-white font-bold text-xl">
          
               <img
              src={logo} // <-- put your logo path here
              alt="TechnoViz Automation"
              className="h-10 w-auto" // adjust height as needed
            />

            </Link>
            <p className="text-gray-300 text-sm leading-relaxed">
             Technoviz Automation Solutions Private Limited is a technology firm based at Gurgaon, provides smart solutions for digitization.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/technovizautomation/" className="text-[#ddaf26] hover:text-[#ddaf26] transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/company/technovizautomation/" className="text-[#ddaf26] hover:text-[#ddaf26] transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://www.facebook.com/technovizautomation" className="text-[#ddaf26] hover:text-[#ddaf26] transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://www.youtube.com/@TechnovizAutomation" className="text-[#ddaf26] hover:text-[#ddaf26] transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 font-poppins">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {['Services', 'Products', 'Case Studies', 'Blogs', 'Company', 'Careers', 'Contact'].map((link) => (
                <li key={link}>
                  <Link
                    to={`/${link.toLowerCase().replace(' ', '-')}`}
                    className="text-gray-300 hover:text-[#ddaf26] transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-lg font-semibold mb-4 font-poppins">Products</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/products/immersix" className="text-gray-300 hover:text-[#ddaf26] transition-colors">
                Immersix (AR/VR Training)
              </Link>
            </li>
            <li>
              <Link to="/products/utility360" className="text-gray-300 hover:text-[#ddaf26] transition-colors">
                Utility360
              </Link>
            </li>
            <li>
              <Link to="/products/digital-checksheet" className="text-gray-300 hover:text-[#ddaf26] transition-colors">
                Digital Checksheet
              </Link>
            </li>
            <li>
              <Link to="/products/smart-ems" className="text-gray-300 hover:text-[#ddaf26] transition-colors">
                SmartEMS
              </Link>
            </li>
            <li>
              <Link to="/products/oee-dashboard" className="text-gray-300 hover:text-[#ddaf26] transition-colors">
                OEE Dashboard
              </Link>
            </li>
            <li>
              <Link to="/products/vision-ai" className="text-gray-300 hover:text-[#ddaf26] transition-colors">
                VisionAI
              </Link>
            </li>
          </ul>

          </div>

          {/* Contact Info & Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4 font-poppins">Contact</h3>
            <div className="space-y-3 text-sm text-gray-300 mb-6">
              <div className="flex items-center space-x-2">
                <MapPin className="w-7 h-7 text-[#ddaf26]" />
                <span>311, Paras Trade Center, Sector-2, Gurgaon - 122011, Haryana, India</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-7 h-7 text-[#ddaf26]" />
                <span>Easy Access Business Center, AI Abbas Building-2, Al Mankhool, Dubai, UAE</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-[#ddaf26]"  />
                <span>+91-9999765380 / 0124-4424695</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-[#ddaf26]" />
                <span>support@technovizautomation.com</span>
              </div>
            </div>
            
            {/* Newsletter */}
            <div>
              <h4 className="font-medium mb-2">Newsletter</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 text-sm bg-white/10 border border-white/20 rounded-l-lg focus:outline-none focus:border-[#ddaf26]"
                />
                <button className="px-4 py-2 bg-[#ddaf26] text-white rounded-r-lg hover:bg-[#0D6EFD] transition-colors text-sm">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm text-gray-300">
          <p>&copy; 2025 Technoviz Automation Solutions. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;