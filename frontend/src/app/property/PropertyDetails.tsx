"use client";
import React from "react";
import {
  FaBed,
  FaBath,
  FaRuler,
  FaCalendarAlt,
  FaChevronRight,
  FaHome,
  FaConciergeBell,
  FaMapMarkerAlt,
  FaDollarSign,
  FaFileContract,
} from "react-icons/fa";

const PropertyDetails = ({
  title,
  location,
  price,
}: {
  title: string;
  location: string;
  price: string;
  description: string;
  features: string[];
}) => {
  const [activeSection, setActiveSection] = React.useState('overview'); // state to track selected section

  return (
    <div className="mt-8 bg-gray-800 text-white rounded-lg shadow-lg p-4 md:p-6">
      {/* Title and Location */}
      <h2 className="text-2xl md:text-3xl font-semibold">{title}</h2>
      <p className="text-lg md:text-xl mt-2">{location}</p>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap mt-6 mb-4 border-b border-gray-600 space-x-4 md:space-x-6 text-gray-400">
        <button
          onClick={() => setActiveSection('overview')}
          className={`flex items-center space-x-2 px-3 py-2 text-sm md:text-lg transition ${
            activeSection === 'overview' ? 'text-gray-300 font-bold' : 'hover:text-gray-300'
          }`}
        >
          <FaHome />
          <span>Overview</span>
        </button>
        <button
          onClick={() => setActiveSection('amenities')}
          className={`flex items-center space-x-2 px-3 py-2 text-sm md:text-lg transition ${
            activeSection === 'amenities' ? 'text-gray-300 font-bold' : 'hover:text-gray-300'
          }`}
        >
          <FaConciergeBell />
          <span>Amenities</span>
        </button>
        <button
          onClick={() => setActiveSection('exploreNearby')}
          className={`flex items-center space-x-2 px-3 py-2 text-sm md:text-lg transition ${
            activeSection === 'exploreNearby' ? 'text-gray-300 font-bold' : 'hover:text-gray-300'
          }`}
        >
          <FaMapMarkerAlt />
          <span>Explore Nearby</span>
        </button>
        <button
          onClick={() => setActiveSection('rentDetails')}
          className={`flex items-center space-x-2 px-3 py-2 text-sm md:text-lg transition ${
            activeSection === 'rentDetails' ? 'text-gray-300 font-bold' : 'hover:text-gray-300'
          }`}
        >
          <FaDollarSign />
          <span>Rent Details</span>
        </button>
        <button
          onClick={() => setActiveSection('termsOfStay')}
          className={`flex items-center space-x-2 px-3 py-2 text-sm md:text-lg transition ${
            activeSection === 'termsOfStay' ? 'text-gray-300 font-bold' : 'hover:text-gray-300'
          }`}
        >
          <FaFileContract />
          <span>Terms of Stay</span>
        </button>
      </div>

      {/* Content Sections */}
      {activeSection === 'overview' && (
        <div className="bg-gray-700 p-4 md:p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Overview</h3>
          <div className="flex flex-wrap space-x-4 text-sm md:text-base">
            <div className="flex items-center mb-2">
              <FaBed className="text-gray-300 mr-2" />
              <span>2 Bedroom</span>
            </div>
            <div className="flex items-center mb-2">
              <FaBath className="text-gray-300 mr-2" />
              <span>2 Bathroom</span>
            </div>
            <div className="flex items-center mb-2">
              <FaRuler className="text-gray-300 mr-2" />
              <span>1200 sq.ft</span>
            </div>
            <div className="flex items-center mb-2">
              <FaCalendarAlt className="text-gray-300 mr-2" />
              <span>Year of Construction: 2020</span>
            </div>
          </div>
          <div className="mt-4">
            <p>North facing</p>
            <p>Semi furnished</p>
          </div>
        </div>
      )}

      {activeSection === 'amenities' && (
        <div className="bg-gray-700 p-4 md:p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Amenities</h3>
          <ul className="list-disc ml-6 text-gray-300">
            <li>24/7 Security</li>
            <li>Gymnasium</li>
            <li>Swimming Pool</li>
            <li>Clubhouse</li>
            <li>Parking Space</li>
          </ul>
        </div>
      )}

      {activeSection === 'exploreNearby' && (
        <div className="bg-gray-700 p-4 md:p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Explore Nearby</h3>
          <ul className="list-disc ml-6 text-gray-300">
            <li>Shopping Mall - 5 mins away</li>
            <li>Park - 3 mins away</li>
            <li>School - 10 mins away</li>
            <li>Hospital - 7 mins away</li>
          </ul>
        </div>
      )}

      {activeSection === 'rentDetails' && (
        <div className="bg-gray-700 p-4 md:p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Rent Details</h3>
          <p>Monthly Rent: {price}</p>
          <p>Security Deposit: 2 months</p>
          <p>Lease Term: 12 months</p>
        </div>
      )}

      {activeSection === 'termsOfStay' && (
        <div className="bg-gray-700 p-4 md:p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Terms of Stay</h3>
          <p>Rent Payment: Monthly</p>
          <p>Allowed Occupants: 4</p>
          <p>Pets: Allowed</p>
          <p>Smoking: Not Allowed</p>
        </div>
      )}

      {/* Bottom Section with Price and Booking Button */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-6 md:mt-8 space-y-4 md:space-y-0">
        <div className="text-xl font-bold">{price}</div>
        <button className="flex items-center justify-center bg-blue-600 text-white py-2 px-6 rounded-lg shadow-md transition hover:bg-blue-700 w-full md:w-auto">
          <span>Book a Visit</span>
          <FaChevronRight className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default PropertyDetails;
