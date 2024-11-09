"use client";
import React from "react";
import { FaBed, FaBath, FaRuler, FaCalendarAlt, FaArrowCircleRight } from "react-icons/fa";

const PropertyDetails = ({
  title,
  location,
  price,
  description,
  features,
}: {
  title: string;
  location: string;
  price: string;
  description: string;
  features: string[];
}) => {
  const [activeSection, setActiveSection] = React.useState('overview'); // state to track selected section

  return (
    <div className="mt-8 bg-gray-800 text-white rounded-lg shadow-lg p-6">
      {/* Title and Location */}
      <h2 className="text-3xl font-semibold">{title}</h2>
      <p className="text-xl mt-2">{location}</p>

      {/* Navigation Tabs */}
      <div className="flex mt-6 mb-4 border-b border-gray-600">
        <button
          onClick={() => setActiveSection('overview')}
          className={`px-6 py-2 text-lg ${activeSection === 'overview' ? 'font-bold text-gray-300' : 'text-gray-500'}`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveSection('amenities')}
          className={`px-6 py-2 text-lg ${activeSection === 'amenities' ? 'font-bold text-gray-300' : 'text-gray-500'}`}
        >
          Amenities
        </button>
        <button
          onClick={() => setActiveSection('exploreNearby')}
          className={`px-6 py-2 text-lg ${activeSection === 'exploreNearby' ? 'font-bold text-gray-300' : 'text-gray-500'}`}
        >
          Explore Nearby
        </button>
        <button
          onClick={() => setActiveSection('rentDetails')}
          className={`px-6 py-2 text-lg ${activeSection === 'rentDetails' ? 'font-bold text-gray-300' : 'text-gray-500'}`}
        >
          Rent Details
        </button>
        <button
          onClick={() => setActiveSection('termsOfStay')}
          className={`px-6 py-2 text-lg ${activeSection === 'termsOfStay' ? 'font-bold text-gray-300' : 'text-gray-500'}`}
        >
          Terms of Stay
        </button>
      </div>

      {/* Content Sections */}
      {activeSection === 'overview' && (
        <div className="bg-gray-700 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Overview</h3>
          <div className="flex space-x-4">
            <div className="flex items-center">
              <FaBed className="text-gray-300" />
              <span className="ml-2">2 Bedroom</span>
            </div>
            <div className="flex items-center">
              <FaBath className="text-gray-300" />
              <span className="ml-2">2 Bathroom</span>
            </div>
            <div className="flex items-center">
              <FaRuler className="text-gray-300" />
              <span className="ml-2">1200 sq.ft</span>
            </div>
            <div className="flex items-center">
              <FaCalendarAlt className="text-gray-300" />
              <span className="ml-2">Year of Construction: 2020</span>
            </div>
          </div>
          <div className="mt-4">
            <p>North facing</p>
            <p>Semi furnished</p>
          </div>
        </div>
      )}

      {activeSection === 'amenities' && (
        <div className="bg-gray-700 p-6 rounded-lg shadow-md">
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
        <div className="bg-gray-700 p-6 rounded-lg shadow-md">
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
        <div className="bg-gray-700 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Rent Details</h3>
          <p>Monthly Rent: {price}</p>
          <p>Security Deposit: 2 months</p>
          <p>Lease Term: 12 months</p>
        </div>
      )}

      {activeSection === 'termsOfStay' && (
        <div className="bg-gray-700 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Terms of Stay</h3>
          <p>Rent Payment: Monthly</p>
          <p>Allowed Occupants: 4</p>
          <p>Pets: Allowed</p>
          <p>Smoking: Not Allowed</p>
        </div>
      )}

      {/* Bottom Section with Price and Booking Button */}
      {/* <div className="flex justify-between items-center mt-6">
        <div className="text-2xl font-bold">{price}</div>
        <button className="bg-blue-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-700">
          Book a Visit
        </button>
      </div> */}
    </div>
  );
};

export default PropertyDetails;
