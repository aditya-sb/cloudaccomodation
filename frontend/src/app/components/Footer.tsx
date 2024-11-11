// src/app/components/Footer.tsx
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer id="footer" className="p-8 bg-gray-800 text-white text-center">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Luxury Properties</h2>
        <p className="text-gray-400 mb-4">
          Providing premium property listings in all major cities across India.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-6">
          <div>
            <h3 className="font-semibold text-lg mb-2">About Us</h3>
            <p className="text-gray-400 text-sm">
              Learn more about our company, our team, and our values.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">Services</h3>
            <p className="text-gray-400 text-sm">
              Discover the wide range of services we offer to our clients.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">Locations</h3>
            <p className="text-gray-400 text-sm">
              Explore our listings in all major cities across India.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">Contact</h3>
            <p className="text-gray-400 text-sm">
              Get in touch with us for inquiries and support.
            </p>
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
          © 2024 Luxury Properties. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
