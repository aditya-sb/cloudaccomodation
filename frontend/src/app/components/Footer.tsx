// src/app/components/Footer.tsx
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaPhoneAlt, FaMapMarkerAlt, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  const services = [
    "Student Flights",
    "NearBy Tiffins",
    "Student Guarantor",
    "Airport Pickup",
    "Student Loans",
    "Tenant Insurance",
    "Deals",
    "Overseas Sim Card"
  ];

  const whatsappNumber = "+919876543210"; // Replace with your actual WhatsApp number
  const whatsappLink = `https://wa.me/${whatsappNumber}`;

  return (
    <footer id="footer" className="p-8 bg-gray-800 relative bottom-0 w-full text-white text-center">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Cloud Accommodation</h2>
        <p className="text-gray-400 mb-4">
          Providing premium property listings in all major cities across India.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-6">
          <div>
            <h3 className="font-semibold text-lg mb-2">Support</h3>
            <ul className="text-gray-400 text-sm space-y-1">
              <li>
                <a href="about-us" className="hover:text-blue-500 text-gray-400 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="privacy-policy" className="hover:text-blue-500 text-gray-400 transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-2">Services</h3>
            <ul className="text-gray-400 text-sm space-y-1">
              {services.slice(0, 4).map((service, index) => (
                <li key={index}>{service}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-2">Location</h3>
            <p className="text-gray-400 text-sm">
              Suit 903, 1701 Hollis Street, B3J3M8, Halifax, Canada
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white flex justify-center text-lg mb-2">Contact</h3>
            <div className="text-center flex flex-col items-center justify-center space-y-2">
              <p className="w-full justify-center text-gray-400 text-sm flex items-center">
                <FaPhoneAlt className="mr-2" />
                +91 (902) 123 4567
              </p>
              <a href="mailto:info@cloudaccommodation.com" className="text-gray-400 text-sm">
                info@cloudaccommodation.com
              </a>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors text-sm mt-2"
              >
                <FaWhatsapp className="mr-2" />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="flex justify-center space-x-6 mb-6">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
            <FaFacebookF size={24} />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
            <FaTwitter size={24} />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
            <FaInstagram size={24} />
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
            <FaLinkedinIn size={24} />
          </a>
        </div>

        <p className="text-gray-500 mt-4">
          © {new Date().getFullYear()} Cloud Accommodation. All rights reserved.
        </p>
      </div>
    </footer>
  );
}