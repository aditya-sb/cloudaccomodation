"use client";

import Image from "next/image";
import { useState } from "react";
import { FaSearch, FaBolt } from "react-icons/fa";

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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      window.location.href = `/properties?search=${searchTerm}`;
    }
  };

  return (
    <div
      className="relative transition-all duration-300 ease-in-out"
      style={{ height: "540px" }}
    >
      <Image
        src="/images/cityscape.jpeg"
        alt="Cityscape"
        layout="fill"
        objectFit="cover"
        className="opacity-80 transition-all duration-300 ease-in-out"
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

        {/* Headline */}
        <h1
          className="text-4xl sm:text-5xl font-bold text-center mb-4"
          style={{ color: "var(--cta-text)" }}
        >
          Explore <span style={{ color: "var(--background)" }}>Canada</span>
        </h1>

        {/* Search Bar */}
        <div className="relative w-full max-w-md sm:max-w-lg lg:max-w-2xl">
          <div
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
                setTimeout(() => {
                  if (!e.relatedTarget) {
                    setShowDropdown(false);
                  }
                }, 150);
              }}
            />
            <button
              className="rounded-full p-2 px-4  text-white flex items-center justify-center transition-all"
              style={{
                backgroundColor: "var(--cta)",
                color: "var(--cta-text)",
              }}
              onClick={() =>
                (window.location.href = `/properties?search=${searchTerm}`)
              }
            >
              <FaSearch className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div
          className="relative rounded-full shadow-xl flex items-center space-x-2 w-full max-w-md sm:max-w-lg lg:max-w-2xl"
          style={{}}
        >
          {/* ... existing search input and button code ... */}

          {showDropdown && (
            <div
              className="absolute mt-2 shadow-xl rounded-xl w-full z-10"
              style={{
                backgroundColor: "var(--card)",
                color: "var(--copy-primary)",
                top: "100%",
                left: 0,
              }}
            >
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-3 flex items-center">
                  <FaBolt className="mr-2" style={{ color: "var(--cta)" }} />{" "}
                  Top Cities in Canada
                </h2>
                <div className="flex flex-wrap gap-2">
                  {cities.map((city) => (
                    <button
                      key={city}
                      onMouseDown={() =>
                        (window.location.href = `/properties?search=${city}`)
                      }
                      className="px-4 py-2 rounded-full text-sm transition-all hover:scale-105"
                      style={{
                        backgroundColor: "var(--gray-bg)",
                        color: "var(--copy-primary)",
                        border: "1px solid var(--cta)",
                      }}
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
                  <FaBolt className="mr-2" style={{ color: "var(--cta)" }} />{" "}
                  Top Universities in Canada
                </h2>
                <div className="flex flex-wrap gap-2">
                  {universities.map((university) => (
                    <button
                      key={university}
                      onMouseDown={() =>
                        (window.location.href = `/properties?search=${university}`)
                      }
                      className="px-4 py-2 rounded-full text-sm transition-all hover:scale-105"
                      style={{
                        backgroundColor: "var(--gray-bg)",
                        color: "var(--copy-primary)",
                        border: "1px solid var(--cta)",
                      }}
                    >
                      {university}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        {/* Scroll Down Arrow */}
        <div className="absolute right-8 bottom-8">
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
        </div>
      </div>
    </div>
  );
}
