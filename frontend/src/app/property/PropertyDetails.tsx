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
  const [moveInDate, setMoveInDate] = React.useState(""); // state for move-in date
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const handleBooking = () => {
    setIsModalOpen(true);
  };

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
        {/* New Move-in Date Tab */}
        <button
          onClick={() => setActiveSection('moveInDate')}
          className={`flex items-center space-x-2 px-3 py-2 text-sm md:text-lg transition ${
            activeSection === 'moveInDate'
              ? 'text-[var(--copy-primary)] font-bold'
              : 'hover:text-[var(--gray-hover-text)]'
          }`}
        >
          <FaCalendarAlt />
          <span>Move-in Date</span>
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

        {activeSection === 'moveInDate' && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Select Move-in Date</h3>
            <input
              type="date"
              value={moveInDate}
              onChange={(e) => setMoveInDate(e.target.value)}
              className="px-4 py-2 border border-[var(--gray-border)] rounded-lg shadow-md w-full md:w-auto text-[var(--copy-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--cta)]"
            />
          </div>
        )}

        {/* Other Sections (amenities, exploreNearby, rentDetails, termsOfStay) */}
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-6 md:mt-8 space-y-4 md:space-y-0">
        <div className="text-xl font-bold text-[var(--copy-primary)]">{price}</div>
        <button onClick={handleBooking} className="flex items-center justify-center bg-[var(--cta)] text-[var(--cta-text)] py-3 px-8 rounded-lg shadow-xl transition hover:bg-[var(--cta-active)] w-full md:w-auto transform hover:scale-105 focus:outline-none">
          <span className="font-semibold">Book a Visit</span>
          <FaChevronRight className="ml-2 text-xl" />
        </button>
      </div>

       {/* Modal Popup */}
       {isModalOpen && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] md:w-[60%]">
            <h3 className="text-2xl font-semibold mb-4">Booking Details</h3>
            <div className="mb-4">
              <p className="font-semibold">Check-in Date:</p>
              <p>{moveInDate ? moveInDate : 'Not selected'}</p>
            </div>
            <div className="mb-4">
              <p className="font-semibold">Price:</p>
              <p>{price}</p>
            </div>
            <div className="mb-4">
              <p className="font-semibold">Tax:</p>
              <p>5% (Calculated on total)</p>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-[var(--border)] text-white py-2 px-6 rounded-lg"
              >
                Close
              </button>
              <button
                className="bg-[var(--cta)] text-white py-2 px-6 rounded-lg"
                onClick={() => {/* Handle Confirm Booking */}}
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetails;
