"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaSearch, FaBolt } from "react-icons/fa";
import { motion } from "framer-motion";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const cities = [
    "Toronto",
    "Montreal",
    "Vancouver",
    "Ottawa",
    "Waterloo",
    "Calgary",
    "Edmonton",
    "Halifax",
    "Victoria",
    "Quebec City",
  ];
  const universities = [
    "University of Toronto",
    "Humber College",
    "Seneca College",
    "Polytechnique Montréal",
    "Toronto Metropolitan University",
    "McGill University",
    "University of British Columbia",
    "University of Waterloo",
    "University of Alberta",
    "Dalhousie University",
  ];

  const router = useRouter();
  
  const handleSearch = (term: string) => {
    if (term.trim()) {
      router.push(`/properties?search=${encodeURIComponent(term.trim())}`);
    } else {
      router.push('/properties');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch(searchTerm);
    }
  };

  const handleCityClick = (city: string) => {
    setSearchTerm(city);
    setShowDropdown(false);
    handleSearch(city);
  };

  const handleUniversityClick = (university: string) => {
    setSearchTerm(university);
    setShowDropdown(false);
    handleSearch(university);
  };

  return (
    <div
      className="relative transition-all duration-300 ease-in-out"
      style={{ height: "540px" }}
    >
      <Image
        src="/images/bg3.png"
        alt="Cityscape"
        layout="fill"
        objectFit="cover"
        className="opacity-100 transition-all duration-300 "
      />
      <div className="absolute inset-0 flex flex-col justify-center items-center px-4 sm:px-8">
        {/* Logo and Header */}
        {/* <div className="flex items-center mb-8">
          <a className="flex items-center cursor-pointer">
            <Image
              src="/images/cloudlogo.png"
              alt="Property Logo"
              className="h-12 w-auto rounded-2xl"
              height={160}
              width={160}
            />
            <h1
              className="ml-4 text-2xl font-bold sm:text-3xl"
              style={{ color: "var(--cta-text)" }}
            >
              Cloud Accommodation
            </h1>
          </a>
        </div> */}

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative w-full max-w-md sm:max-w-lg lg:max-w-2xl"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex px-3 py-1 items-center rounded-full shadow-lg border border-gray-300 overflow-hidden bg-white"
            style={{
              backgroundColor: "var(--card)",
              color: "var(--copy-primary)",
            }}
          >
            <input
              type="text"
              placeholder="Search by City, University, or Property..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              className="px-4 py-3 w-full text-base bg-white sm:text-base border-none focus:ring-0 outline-none"
              style={{
                color: "var(--copy-primary)",
              }}
              onFocus={() => setShowDropdown(true)}
              onBlur={(e) => {
                // Delay hiding dropdown to allow clicking on items
                setTimeout(() => {
                  if (!e.relatedTarget || !e.relatedTarget.closest('.dropdown-container')) {
                    setShowDropdown(false);
                  }
                }, 200);
              }}
            />
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-full p-2 px-4 text-white flex items-center justify-center transition-all"
              style={{
                backgroundColor: "var(--cta)",
                color: "var(--cta-text)",
              }}
              onClick={() => handleSearch(searchTerm)}
            >
              <FaSearch className="w-5 h-5" />
            </motion.button>
          </motion.div>

          {/* Dropdown */}
          {showDropdown && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="dropdown-container absolute mt-2 shadow-xl rounded-xl w-full z-10"
              style={{
                backgroundColor: "var(--card)",
                color: "var(--copy-primary)",
                top: "100%",
                left: 0,
                maxHeight: "400px",
                overflowY: "auto"
              }}
            >
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-3 flex items-center">
                  <FaBolt className="mr-2" style={{ color: "var(--cta)" }} />
                  Top Cities in Canada
                </h2>
                <div className="flex flex-wrap gap-2">
                  {cities.map((city) => (
                    <button
                      key={city}
                      onClick={() => handleCityClick(city)}
                      className="px-4 py-2 rounded-full text-sm transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2"
                      style={{
                        backgroundColor: "var(--gray-bg)",
                        color: "var(--copy-primary)",
                        border: "1px solid var(--cta)",
                      }}
                      onFocus={() => setShowDropdown(true)}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              </div>
              <hr
                className="border-t"
                style={{ borderColor: "var(--gray-border)" }}
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-3 flex items-center">
                  <FaBolt className="mr-2" style={{ color: "var(--cta)" }} />
                  Top Universities in Canada
                </h2>
                <div className="flex flex-wrap gap-2">
                  {universities.map((university) => (
                    <button
                      key={university}
                      onClick={() => handleUniversityClick(university)}
                      className="px-4 py-2 rounded-full text-sm transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2"
                      style={{
                        backgroundColor: "var(--gray-bg)",
                        color: "var(--copy-primary)",
                        border: "1px solid var(--cta)",
                      }}
                      onFocus={() => setShowDropdown(true)}
                    >
                      {university}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Scroll Down Arrow */}
        {/* <div className="absolute right-8 bottom-8">
          <div
            className="flex justify-center items-center w-16 h-16 rounded-full animate-bounce shadow-lg"
            style={{
              backgroundColor: "var(--cta)",
              color: "var(--cta-text)",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="currentColor"
              className="bi bi-arrow-down"
              viewBox="0 0 16 16"
            >
              <path d="M8 12a.5.5 0 0 1-.5-.5V3.707l-3.646 3.647a.5.5 0 1 1-.708-.708l4-4a.5.5 0 0 1 .708 0l4 4a.5.5 0 1 1-.708.708L8.5 3.707V11.5a.5.5 0 0 1-.5.5z" />
            </svg>
          </div>
        </div> */}
      </div>
    </div>
  );
} 