"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaHome, FaFilter, FaSearch } from "react-icons/fa";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [imageHeight, setImageHeight] = useState(380);
  const [propertyType, setPropertyType] = useState("All");
  const [sortOption, setSortOption] = useState("Date");
  const [filters, setFilters] = useState({
    familyType: "Single",
    members: "2-4",
    hasKids: false,
    hasPets: false,
    city: "",
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setImageHeight(Math.max(120, 380 - scrollPosition / 2));
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      window.location.href = `/properties?search=${searchTerm}`;
    }
  };

  return (
    <div
      className="relative mt-20 transition-all duration-300 ease-in-out"
      style={{ height: `${imageHeight}px` }}
    >
      <Image
        src="/images/cityscape.jpeg"
        alt="Cityscape"
        layout="fill"
        objectFit="cover"
        className="opacity-80 transition-all duration-300 ease-in-out"
      />
      <div className="absolute inset-0 flex flex-col justify-center items-center px-4 sm:px-8">
        <h1
          className="text-4xl sm:text-5xl font-bold text-center mb-4"
          style={{ color: "var(--cta-text)" }}
        >
          Welcome to <span style={{ color: "var(--crimson)" }}>Canada</span>
        </h1>

        {/* Search Bar */}
        <div
          className="bg-cta p-4 rounded-full shadow-lg flex items-center space-x-2 transform transition-transform duration-300 hover:scale-105 w-full max-w-md sm:max-w-lg lg:max-w-2xl"
          style={{ backgroundColor: "var(--border)", color: "var(--cta-text)" }}
        >
          <input
            type="text"
            placeholder="Search for properties..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            className="px-4 py-2 w-full sm:w-80 rounded-l-full border-none bg-input-bg text-gray-text placeholder-gray-text focus:ring-2 focus:ring-cta focus:outline-none text-sm sm:text-base"
            style={{
              backgroundColor: "var(--input-bg)",
              color: "var(--gray-text)",
              borderColor: "var(--input-border)",
            }}
          />
          <select
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            className="hidden sm:block w-28 px-3 py-2 border-l bg-input-bg text-gray-text focus:outline-none focus:ring-2 focus:ring-cta rounded-r-none shadow-md transition duration-200 ease-in-out"
            style={{
              backgroundColor: "var(--input-bg)",
              color: "var(--gray-text)",
            }}
          >
            <option>All Types</option>
            <option>Flat</option>
            <option>Home</option>
            <option>Apartment</option>
            <option>Condo</option>
          </select>
          <Link href={`/properties?search=${searchTerm}`} passHref>
            <button
              className="bg-cta text-cta-text px-4 py-2 rounded-r-full transition-all focus:ring-2 text-sm sm:text-base hover:opacity-85"
              style={{
                backgroundColor: "var(--cta)",
                color: "var(--cta-text)",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.15)",
              }}
            >
              <FaSearch className="inline-block mr-2" /> Search
            </button>
          </Link>
        </div>


        {/* Filter and Sort Options */}
        {/* Filter and Sort Options */}
        <div className="mt-6 flex flex-wrap justify-center gap-3 text-xs sm:text-sm">
          {/* City Dropdown */}
          <select
            value={filters.city}
            onChange={(e) => setFilters({ ...filters, city: e.target.value })}
            className="px-3 py-1 rounded-full shadow-md transition duration-200 ease-in-out hover:opacity-85"
            style={{ backgroundColor: "var(--crimson)", color: "var(--cta-text)" }}
          >
            <option>Choose City</option>
            <option>Toronto</option>
            <option>Vancouver</option>
            <option>Montreal</option>
            <option>Calgary</option>
            <option>Ottawa</option>
          </select>

          {/* Property Type */}
          {/* <select
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            className="px-3 py-1 rounded-full shadow-md transition duration-200 ease-in-out"
            style={{ backgroundColor: "var(--crimson)", color: "var(--cta-text)" }}
          >
            <option>All Types</option>
            <option>Flat</option>
            <option>Home</option>
            <option>Apartment</option>
            <option>Condo</option>
          </select> */}

          {/* Sort By */}
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="px-3 py-1 rounded-full shadow-md transition duration-200 ease-in-out hover:opacity-85"
            style={{ backgroundColor: "var(--crimson)", color: "var(--cta-text)" }}
          >
            <option>Date</option>
            <option>Price - Low to High</option>
            <option>Price - High to Low</option>
            <option>Distance</option>
          </select>

          {/* Filters */}
          <button
            className="px-3 py-1 rounded-full shadow-md transition duration-200 ease-in-out flex items-center space-x-2 hover:opacity-85"
            onClick={() => setFilters({ ...filters, hasKids: !filters.hasKids })}
            style={{ backgroundColor: "var(--crimson)", color: "var(--cta-text)" }}
          >
            <FaHome /> <span>{filters.hasKids ? "With Kids" : "No Kids"}</span>
          </button>
          <button
            className="px-3 py-1 rounded-full shadow-md transition duration-200 ease-in-out flex items-center space-x-2 hover:opacity-85"
            onClick={() => setFilters({ ...filters, hasPets: !filters.hasPets })}
            style={{ backgroundColor: "var(--crimson)", color: "var(--cta-text)" }}
          >
            <FaFilter /> <span>{filters.hasPets ? "With Pets" : "No Pets"}</span>
          </button>
          <select
            value={filters.familyType}
            onChange={(e) => setFilters({ ...filters, familyType: e.target.value })}
            className="px-3 py-1 rounded-full shadow-md transition duration-200 ease-in-out hover:opacity-85"
            style={{ backgroundColor: "var(--crimson)", color: "var(--cta-text)" }}
          >
            <option>Single</option>
            <option>Family</option>
            <option>Couple</option>
          </select>
        </div>

      </div>
    </div>
  );
}
