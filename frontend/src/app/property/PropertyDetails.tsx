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
    <div className="mt-4 bg-[var(--card)] text-[var(--copy-primary)] rounded-lg boreder shadow-lg p-4 md:p-6 border border-[var(--border)]">
      {/* Title and Location */}
      <div className="flex items-center justify-between">
      <h2 className="text-2xl md:text-3xl font-semibold">{title} </h2>
      <span className="text-2xl md:text-xl font-semibold">{price}<span className="text-lg max-sm:text-sm"> /month</span></span>
      </div>
      <p className="text-lg md:text-xl mt-2">{location}</p>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap mt-6 mb-4 border-b border-[var(--gray-border)] space-x-1 md:space-x-0 text-[var(--gray-text)]">
        <button
          onClick={() => setActiveSection('overview')}
          className={`flex items-center space-x-2 px-3 py-2 text-sm md:text-[16px] transition ${
            activeSection === 'overview'
              ? 'text-[var(--copy-primary)] font-bold'
              : 'hover:text-[var(--gray-hover-text)]'
          }`}
        >
          <FaHome className="text-blue-500"/>
          <span>Overview</span>
        </button>
        <button
          onClick={() => setActiveSection('amenities')}
          className={`flex items-center space-x-2 px-3 py-2 text-sm md:text-[16px] transition ${
            activeSection === 'amenities'
              ? 'text-[var(--copy-primary)] font-bold'
              : 'hover:text-[var(--gray-hover-text)]'
          }`}
        >
          <FaConciergeBell className="text-blue-500"/>
          <span>Amenities</span>
        </button>
        <button
          onClick={() => setActiveSection('exploreNearby')}
          className={`flex items-center space-x-2 px-3 py-2 text-sm md:text-[16px] transition ${
            activeSection === 'exploreNearby'
              ? 'text-[var(--copy-primary)] font-bold'
              : 'hover:text-[var(--gray-hover-text)]'
          }`}
        >
          <FaMapMarkerAlt className="text-blue-500" />
          <span>Explore Nearby</span>
        </button>
        <button
          onClick={() => setActiveSection('rentDetails')}
          className={`flex items-center space-x-2 px-3 py-2 text-sm md:text-[16px] transition ${
            activeSection === 'rentDetails'
              ? 'text-[var(--copy-primary)] font-bold'
              : 'hover:text-[var(--gray-hover-text)]'
          }`}
        >
          <FaDollarSign className="text-blue-500"/>
          <span>Rent Details</span>
        </button>
        <button
          onClick={() => setActiveSection('termsOfStay')}
          className={`flex items-center space-x-2 px-3 py-2 text-sm md:text-[16px] transition ${
            activeSection === 'termsOfStay'
              ? 'text-[var(--copy-primary)] font-bold'
              : 'hover:text-[var(--gray-hover-text)]'
          }`}
        >
          <FaFileContract className="text-blue-500"/>
          <span>Terms of Stay</span>
        </button>
        {/* New Move-in Date Tab
        <button
          onClick={() => setActiveSection('moveInDate')}
          className={`flex items-center space-x-2 px-3 py-2 text-sm md:text-[16px] transition ${
            activeSection === 'moveInDate'
              ? 'text-[var(--copy-primary)] font-bold'
              : 'hover:text-[var(--gray-hover-text)]'
          }`}
        >
          <FaCalendarAlt className="text-blue-500"/>
          <span>Move-in Date</span>
        </button> */}
      </div>

      {/* Content Sections */}
      <div className="bg-[var(--card)] p-4 md:p-6 rounded-lg shadow-md">
        {activeSection === 'overview' && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Overview</h3>
            <div className="flex flex-wrap space-x-4 text-sm md:text-[16px] text-[var(--gray-text)]">
              <div className="flex items-center mb-2">
                <FaBed className="mr-2 text-blue-500" />
                <span>2 Bedroom</span>
              </div>
              <div className="flex items-center mb-2">
                <FaBath className="mr-2 text-blue-500" />
                <span>2 Bathroom</span>
              </div>
              <div className="flex items-center mb-2">
                <FaRuler className="mr-2 text-blue-500" />
                <span>1200 sq.ft</span>
              </div>
              <div className="flex items-center mb-2">
                <FaCalendarAlt className="mr-2 text-blue-500" />
                <span>Year of Construction: 2020</span>
              </div>
            </div>
            <div className="mt-4 text-[var(--copy-secondary)]">
              <p>North facing</p>
              <p>Semi furnished</p>
            </div>
          </div>
        )}

        {/* Other Sections (amenities, exploreNearby, rentDetails, termsOfStay) */}
      </div>
       {/* Modal Popup */}
       {isModalOpen && (
  <div className="fixed inset-0 bg-[rgba(0,0,0,0.6)] flex items-center justify-center z-50">
    <div className="bg-[var(--card)] text-[var(--copy-primary)] p-8 rounded-lg shadow-2xl w-[90%] md:w-[50%] lg:w-[40%]">
      <h3 className="text-3xl font-bold mb-6 text-center border-b pb-4 border-[var(--border)]">
        Booking Details
      </h3>
      <div className="mb-6">
        <p className="font-semibold text-[var(--copy-secondary)] mb-1">
          Check-in Date:
        </p>
        <p className="text-lg">{moveInDate ? moveInDate : 'Not selected'}</p>
      </div>
      <div className="mb-6">
        <p className="font-semibold text-[var(--copy-secondary)] mb-1">
          Price:
        </p>
        <p className="text-lg">{price}</p>
      </div>
      <div className="mb-6">
        <p className="font-semibold text-[var(--copy-secondary)] mb-1">
          Tax:
        </p>
        <p className="text-lg">5% (Calculated on total)</p>
      </div>
      <div className="flex justify-end space-x-4">
        <button
          onClick={() => setIsModalOpen(false)}
          className="bg-[var(--card)] text-[var(--cta)] py-2 px-6 rounded-lg border border-[var(--cta)] hover:bg-[var(--cta)] hover:text-white transition duration-300"
        >
          Close
        </button>
        <button
          className="bg-[var(--cta)] text-white py-2 px-6 rounded-lg shadow-md hover:shadow-xl transition duration-300"
          onClick={() => {
            /* Handle Confirm Booking */
          }}
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
