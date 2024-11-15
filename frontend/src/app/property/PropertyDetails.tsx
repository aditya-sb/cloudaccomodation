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
    <div className="mt-8 bg-[var(--border)] text-[var(--copy-primary)] rounded-lg shadow-lg p-4 md:p-6 border border-[var(--border)]">
      {/* Title and Location */}
      <h2 className="text-2xl md:text-3xl font-semibold">{title}</h2>
      <p className="text-lg md:text-xl mt-2">{location}</p>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap mt-6 mb-4 border-b border-[var(--gray-border)] space-x-4 md:space-x-6 text-[var(--gray-text)]">
        <button
          onClick={() => setActiveSection('overview')}
          className={`flex items-center space-x-2 px-3 py-2 text-sm md:text-lg transition ${
            activeSection === 'overview'
              ? 'text-[var(--copy-primary)] font-bold'
              : 'hover:text-[var(--gray-hover-text)]'
          }`}
        >
          <FaHome />
          <span>Overview</span>
        </button>
        <button
          onClick={() => setActiveSection('amenities')}
          className={`flex items-center space-x-2 px-3 py-2 text-sm md:text-lg transition ${
            activeSection === 'amenities'
              ? 'text-[var(--copy-primary)] font-bold'
              : 'hover:text-[var(--gray-hover-text)]'
          }`}
        >
          <FaConciergeBell />
          <span>Amenities</span>
        </button>
        <button
          onClick={() => setActiveSection('exploreNearby')}
          className={`flex items-center space-x-2 px-3 py-2 text-sm md:text-lg transition ${
            activeSection === 'exploreNearby'
              ? 'text-[var(--copy-primary)] font-bold'
              : 'hover:text-[var(--gray-hover-text)]'
          }`}
        >
          <FaMapMarkerAlt />
          <span>Explore Nearby</span>
        </button>
        <button
          onClick={() => setActiveSection('rentDetails')}
          className={`flex items-center space-x-2 px-3 py-2 text-sm md:text-lg transition ${
            activeSection === 'rentDetails'
              ? 'text-[var(--copy-primary)] font-bold'
              : 'hover:text-[var(--gray-hover-text)]'
          }`}
        >
          <FaDollarSign />
          <span>Rent Details</span>
        </button>
        <button
          onClick={() => setActiveSection('termsOfStay')}
          className={`flex items-center space-x-2 px-3 py-2 text-sm md:text-lg transition ${
            activeSection === 'termsOfStay'
              ? 'text-[var(--copy-primary)] font-bold'
              : 'hover:text-[var(--gray-hover-text)]'
          }`}
        >
          <FaFileContract />
          <span>Terms of Stay</span>
        </button>
      </div>

      {/* Content Sections */}
      <div className="bg-[var(--card)] p-4 md:p-6 rounded-lg shadow-md">
        {activeSection === 'overview' && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Overview</h3>
            <div className="flex flex-wrap space-x-4 text-sm md:text-base text-[var(--gray-text)]">
              <div className="flex items-center mb-2">
                <FaBed className="mr-2 text-[var(--gray-hover-text)]" />
                <span>2 Bedroom</span>
              </div>
              <div className="flex items-center mb-2">
                <FaBath className="mr-2 text-[var(--gray-hover-text)]" />
                <span>2 Bathroom</span>
              </div>
              <div className="flex items-center mb-2">
                <FaRuler className="mr-2 text-[var(--gray-hover-text)]" />
                <span>1200 sq.ft</span>
              </div>
              <div className="flex items-center mb-2">
                <FaCalendarAlt className="mr-2 text-[var(--gray-hover-text)]" />
                <span>Year of Construction: 2020</span>
              </div>
            </div>
            <div className="mt-4 text-[var(--copy-secondary)]">
              <p>North facing</p>
              <p>Semi furnished</p>
            </div>
          </div>
        )}

        {activeSection === 'amenities' && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Amenities</h3>
            <ul className="list-disc ml-6 text-[var(--gray-text)]">
              <li>24/7 Security</li>
              <li>Gymnasium</li>
              <li>Swimming Pool</li>
              <li>Clubhouse</li>
              <li>Parking Space</li>
            </ul>
          </div>
        )}

        {/* Additional Sections */}
        {/* Repeat similar blocks for `exploreNearby`, `rentDetails`, and `termsOfStay` */}
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-6 md:mt-8 space-y-4 md:space-y-0">
        <div className="text-xl font-bold text-[var(--copy-primary)]">{price}</div>
        <button className="flex items-center justify-center bg-[var(--cta)] text-[var(--cta-text)] py-2 px-6 rounded-lg shadow-md transition hover:bg-[var(--cta-active)] w-full md:w-auto">
          <span>Book a Visit</span>
          <FaChevronRight className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default PropertyDetails;
