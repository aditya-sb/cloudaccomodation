"use client";
import React, { useState, useEffect } from 'react';

const canadianCities = [
  "Toronto", "Vancouver", "Montreal", "Calgary", "Ottawa", "Edmonton", "Winnipeg", "Quebec City",
  "Hamilton", "Kitchener", "London", "Halifax", "Victoria", "Oshawa", "St. Catharines", "Regina",
  "Saskatoon", "Burnaby", "Kelowna", "Chilliwack"
];

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [imageHeight, setImageHeight] = useState(600);
  const [selectedCity, setSelectedCity] = useState("");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [dates, setDates] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setImageHeight(Math.max(200, 600 - scrollPosition / 2));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = () => {
    // Instead of navigation, we'll just log the search params
    console.log({
      search: searchTerm,
      city: selectedCity,
      adults,
      children,
      dates
    });
  };

  return (
    <div className="relative w-full" style={{ height: `${imageHeight}px` }}>
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/api/placeholder/1920/1080')",
          filter: "brightness(50%)"
        }}
      />
      
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
        {/* Welcome Text */}
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          Welcome to <span className="text-yellow-400">Canada</span>
        </h1>
        <h2 className="text-xl md:text-2xl text-white mb-8">Search Your Destination....</h2>

        {/* Main Search Container */}
        <div className="bg-white rounded-lg shadow-xl w-full max-w-5xl p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Destination */}
            <div className="relative">
              <label className="text-sm text-gray-600 font-semibold mb-1 block">DESTINATIONS</label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              >
                <option value="">Select City</option>
                {canadianCities.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            {/* Duration/Dates */}
            <div>
              <label className="text-sm text-gray-600 font-semibold mb-1 block">DURATION</label>
              <input
                type="date"
                value={dates}
                onChange={(e) => setDates(e.target.value)}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              />
            </div>

            {/* Adults */}
            <div>
              <label className="text-sm text-gray-600 font-semibold mb-1 block">ADULT</label>
              <select
                value={adults}
                onChange={(e) => setAdults(Number(e.target.value))}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              >
                {[1, 2, 3, 4, 5].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>

            {/* Children */}
            <div>
              <label className="text-sm text-gray-600 font-semibold mb-1 block">CHILDREN</label>
              <select
                value={children}
                onChange={(e) => setChildren(Number(e.target.value))}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              >
                {[0, 1, 2, 3, 4].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Search Button */}
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleSearch}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-2 rounded-md transition-colors duration-200 flex items-center space-x-2"
            >
              <span>SEARCH</span>
              {/* Simple search icon using HTML entities */}
              <span className="ml-2">🔍</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}