// src/app/components/SearchBar.tsx
"use client";

import Image from "next/image";
import Header from "./Header";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaHome, FaSortAmountUpAlt, FaFilter, FaSearch } from "react-icons/fa";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [imageHeight, setImageHeight] = useState(380);

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
    <div className="relative mt-20 transition-all duration-300 ease-in-out" style={{ height: `${imageHeight}px` }}>
      <Header />
      <Image
        src="/images/cityscape.jpeg"
        alt="Cityscape"
        layout="fill"
        objectFit="cover"
        className="opacity-80 transition-all duration-300 ease-in-out"
      />
      <div className="absolute inset-0 flex flex-col justify-center items-center px-4 sm:px-8">
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-4 rounded-full shadow-xl flex items-center space-x-2 transform transition-transform duration-300 hover:scale-105 w-full max-w-md sm:max-w-lg lg:max-w-2xl">
          <input
            type="text"
            placeholder="Search for properties..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            className="px-4 py-2 w-full sm:w-80 rounded-l-full border-none bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-400 focus:outline-none text-sm sm:text-base"
          />
          <select className="hidden sm:block w-24 px-3 py-2 border-l border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-r-none shadow-md hover:border-indigo-400 transition duration-200 ease-in-out">
            <option className="bg-gray-800 text-white">Cities</option>
            <option className="bg-gray-800 text-white">Toronto</option>
            <option className="bg-gray-800 text-white">Vancouver</option>
            <option className="bg-gray-800 text-white">Montreal</option>
            <option className="bg-gray-800 text-white">Calgary</option>
            <option className="bg-gray-800 text-white">Ottawa</option>
          </select>
          <Link href={`/properties?search=${searchTerm}`} passHref>
            <button className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 px-4 py-2 rounded-r-full transition-all focus:ring-2 focus:ring-yellow-300 text-sm sm:text-base">
              Search
            </button>
          </Link>
        </div>
        
        {/* Filter Tags */}
        <div className="mt-6 flex flex-wrap justify-center gap-3 text-xs sm:text-sm">
          <button className="bg-gray-800 text-white px-3 py-1 rounded-full shadow-md hover:bg-yellow-500 transition duration-200 ease-in-out flex items-center space-x-2">
            <FaHome /> <span>Property Type</span>
          </button>
          <button className="bg-gray-800 text-white px-3 py-1 rounded-full shadow-md hover:bg-yellow-500 transition duration-200 ease-in-out flex items-center space-x-2">
            <FaSearch /> <span>Looking For</span>
          </button>
          <button className="bg-gray-800 text-white px-3 py-1 rounded-full shadow-md hover:bg-yellow-500 transition duration-200 ease-in-out flex items-center space-x-2">
            <FaSortAmountUpAlt /> <span>Sort</span>
          </button>
          <button className="bg-gray-800 text-white px-3 py-1 rounded-full shadow-md hover:bg-yellow-500 transition duration-200 ease-in-out flex items-center space-x-2">
            <FaFilter /> <span>Filters</span>
          </button>
        </div>
      </div>
    </div>
  );
}
