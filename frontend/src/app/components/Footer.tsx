"use client";

import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaPhoneAlt, FaMapMarkerAlt, FaWhatsapp, FaYoutube, FaEnvelope, FaChevronDown } from "react-icons/fa";
import { useState } from "react";

export default function Footer() {
  const [openSections, setOpenSections] = useState({
    company: false,
    services: false,
    support: false,
    discover: false,
    contact: false
  });

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const companyLinks = [
    { name: "About Us", href: "/about-us" },
    { name: "How it works", href: "/how-it-works" },
    { name: "Refer a Friend", href: "/refer" },
    { name: "List with us", href: "/list-property" }
  ];

  const discoverLinks = [
    { name: "Blog", href: "/blog" },
    // { name: "Podcast", href: "/podcast" },
    { name: "Newsroom", href: "/newsroom" },
    { name: "Media Mention", href: "/media" }
  ];

  const supportLinks = [
    { name: "Help Center", href: "/help" },
    { name: "Contact", href: "/contact" },
    { name: "T&C", href: "/terms" },
    { name: "Privacy Policy", href: "/privacy" }
  ];

  const servicesLinks = [
    { name: "Student Housing", href: "/student-housing" },
    { name: "Short Stay", href: "/short-stay" },
    { name: "Co-living", href: "/co-living" },
    { name: "Hostel Booking", href: "/hostel-booking" }
  ];

  const whatsappNumber = "+14372887804";
  const whatsappLink = `https://wa.me/${whatsappNumber}`;

  return (
    <footer className="bg-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Desktop Layout */}
        <div className="hidden md:flex ">
          <div className="flex w-full mx-auto flex-col gap-10 md:flex-row mb-12 justify-evenly">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 flex items-center justify-center mr-3">
                  <img src="/images/cloudlogo.png" alt="" />
                </div>
                <span className="text-sm text-gray-300">
                  cloud accommodation © 2025 All rights reserved
                </span>
              </div>
              
              {/* Trustpilot-style rating */}
              <div className="flex items-center mb-6">
                <div className="flex items-center mr-3">
                  <span className="text-green-500 text-sm mr-2">★ Trustpilot</span>
                </div>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <div key={star} className="w-4 h-4 bg-green-500 rounded-sm flex items-center justify-center">
                      <span className="text-white text-xs">★</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* App Download */}
              <div className="bg-white rounded-lg p-4 max-w-sm grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-700 mb-3 font-medium">Get the app</p>
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 flex items-center justify-center">
                      <img src="/images/icons/playstore.png" alt="" />
                    </div>
                    <div className="w-14 h-8 flex items-center justify-center">
                      <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="" />
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-700 mb-3 font-medium">Payment Options</p>
                  <div className="w-full">
                    <img 
                      src="/images/paymentOptions.svg" 
                      alt="Payment Partners" 
                      className="h-8 w-auto object-contain" 
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-3">
                {companyLinks.map((link, index) => (
                  <li key={index}>
                    <a href={link.href} className="text-gray-300 hover:text-white transition-colors text-sm">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Discover Links */}
            <div>
              <h3 className="text-white font-semibold mb-4">Discover</h3>
              <ul className="space-y-3">
                {discoverLinks.map((link, index) => (
                  <li key={index}>
                    <a href={link.href} className="text-gray-300 hover:text-white transition-colors text-sm">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h3 className="text-white font-semibold mb-4">Support</h3>
              <ul className="space-y-3">
                {supportLinks.map((link, index) => (
                  <li key={index}>
                    <a href={link.href} className="text-gray-300 hover:text-white transition-colors text-sm">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Section */}
            <div>
              <div className="flex flex-row md:flex-row gap-8">
                <div>
                  <h3 className="text-white font-semibold mb-4">Contact us</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <FaPhoneAlt className="text-blue-400 mr-3" size={14} />
                      <span className="text-gray-300 text-sm">+1 7040701919</span>
                    </div>
                    <div className="flex items-center">
                      <FaEnvelope className="text-blue-400 mr-3" size={14} />
                      <a href="mailto:contact@amberstudent.com" className="text-gray-300 hover:text-white transition-colors text-sm">
                        contact@amberstudent.com
                      </a>
                    </div>
                    <div className="flex items-center">
                      <FaWhatsapp className="text-green-400 mr-3" size={14} />
                      <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors text-sm">
                        WhatsApp
                      </a>
                    </div>
                    <div className="flex items-start">
                      <FaMapMarkerAlt className="text-red-400 mr-3 mt-1" size={14} />
                      <span className="text-gray-300 text-sm">
                        40 E Main St #1215 Newark 19711-4639
                      </span>
                    </div>
                  </div>
                  <div>
                  <h4 className="text-white font-semibold mb-4 mt-6">Follow us on:</h4>
                  <div className="flex space-x-4">
                    <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-400 transition-colors">
                      <FaLinkedinIn size={20} />
                    </a>
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-600 transition-colors">
                      <FaFacebookF size={20} />
                    </a>
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-500 transition-colors">
                      <FaInstagram size={20} />
                    </a>
                    <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="text-red-500 hover:text-red-500 transition-colors">
                      <FaYoutube size={20} />
                    </a>
                  </div>
                </div>
                
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="block md:hidden">
          {/* Company Section */}
          <div className="border-b border-gray-600 py-4">
            <button 
              onClick={() => toggleSection('company')}
              className="flex items-center justify-between w-full text-left"
            >
              <h3 className="text-white font-semibold text-lg">Company</h3>
              <FaChevronDown 
                className={`text-gray-400 transform transition-transform ${openSections.company ? 'rotate-180' : ''}`}
                size={16}
              />
            </button>
            {openSections.company && (
              <ul className="mt-4 space-y-3">
                {companyLinks.map((link, index) => (
                  <li key={index}>
                    <a href={link.href} className="text-gray-300 hover:text-white transition-colors text-sm block">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Services Section */}
          <div className="border-b border-gray-600 py-4">
            <button 
              onClick={() => toggleSection('services')}
              className="flex items-center justify-between w-full text-left"
            >
              <h3 className="text-white font-semibold text-lg">Services</h3>
              <FaChevronDown 
                className={`text-gray-400 transform transition-transform ${openSections.services ? 'rotate-180' : ''}`}
                size={16}
              />
            </button>
            {openSections.services && (
              <ul className="mt-4 space-y-3">
                {servicesLinks.map((link, index) => (
                  <li key={index}>
                    <a href={link.href} className="text-gray-300 hover:text-white transition-colors text-sm block">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Contact us Section */}
          <div className="border-b border-gray-600 py-4">
            <button 
              onClick={() => toggleSection('contact')}
              className="flex items-center justify-between w-full text-left"
            >
              <h3 className="text-white font-semibold text-lg">Contact us</h3>
              <FaChevronDown 
                className={`text-gray-400 transform transition-transform ${openSections.contact ? 'rotate-180' : ''}`}
                size={16}
              />
            </button>
            {openSections.contact && (
              <div className="mt-4 space-y-3">
                <div className="flex items-center">
                  <FaPhoneAlt className="text-gray-400 mr-3" size={14} />
                  <span className="text-gray-300 text-sm">+1 7040701919</span>
                </div>
                <div className="flex items-center">
                  <FaEnvelope className="text-gray-400 mr-3" size={14} />
                  <a href="mailto:contact@amberstudent.com" className="text-gray-300 hover:text-white transition-colors text-sm">
                    contact@amberstudent.com
                  </a>
                </div>
                <div className="flex items-center">
                  <FaWhatsapp className="text-gray-400 mr-3" size={14} />
                  <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors text-sm">
                    WhatsApp
                  </a>
                </div>
                <div className="flex items-start">
                  <FaMapMarkerAlt className="text-gray-400 mr-3 mt-1" size={14} />
                  <span className="text-gray-300 text-sm">
                    40 E Main St #1215 Newark 19711-4639
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Support Section */}
          <div className="border-b border-gray-600 py-4">
            <button 
              onClick={() => toggleSection('support')}
              className="flex items-center justify-between w-full text-left"
            >
              <h3 className="text-white font-semibold text-lg">Support</h3>
              <FaChevronDown 
                className={`text-gray-400 transform transition-transform ${openSections.support ? 'rotate-180' : ''}`}
                size={16}
              />
            </button>
            {openSections.support && (
              <ul className="mt-4 space-y-3">
                {supportLinks.map((link, index) => (
                  <li key={index}>
                    <a href={link.href} className="text-gray-300 hover:text-white transition-colors text-sm block">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Discover Section */}
          <div className="border-b border-gray-600 py-4">
            <button 
              onClick={() => toggleSection('discover')}
              className="flex items-center justify-between w-full text-left"
            >
              <h3 className="text-white font-semibold text-lg">Discover</h3>
              <FaChevronDown 
                className={`text-gray-400 transform transition-transform ${openSections.discover ? 'rotate-180' : ''}`}
                size={16}
              />
            </button>
            {openSections.discover && (
              <ul className="mt-4 space-y-3">
                {discoverLinks.map((link, index) => (
                  <li key={index}>
                    <a href={link.href} className="text-gray-300 hover:text-white transition-colors text-sm block">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Mobile Footer Bottom */}
          <div className="pt-8 space-y-6">
            {/* Company Logo and Copyright */}
            <div className="flex items-center">
              <div className="w-8 h-8 flex items-center justify-center mr-3">
                <img src="/images/cloudlogo.png" alt="" />
              </div>
              <span className="text-sm text-gray-300">
                cloud accommodation © 2025 All rights reserved
              </span>
            </div>

            {/* Trustpilot Rating */}
            <div className="flex items-center">
              <div className="flex items-center mr-3">
                <span className="text-green-500 text-sm mr-2">★ Trustpilot</span>
              </div>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <div key={star} className="w-4 h-4 bg-green-500 rounded-sm flex items-center justify-center">
                    <span className="text-white text-xs">★</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Follow us on Social Media */}
            <div>
              <h4 className="text-white font-semibold mb-3">Follow us on:</h4>
              <div className="flex space-x-4">
                <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors">
                  <FaLinkedinIn size={24} />
                </a>
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600 transition-colors">
                  <FaFacebookF size={24} />
                </a>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-500 transition-colors">
                  <FaInstagram size={24} />
                </a>
                <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-500 transition-colors">
                  <FaYoutube size={24} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}