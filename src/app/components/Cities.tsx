// src/app/components/CityCardSlider.tsx
"use client";
import { useState } from "react";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

interface CityCardProps {
  name: string;
  shortCode: string;
}

const cities: CityCardProps[] = [
  { name: "Mumbai", shortCode: "MUM" },
  { name: "Delhi", shortCode: "DEL" },
  { name: "Bangalore", shortCode: "BLR" },
  { name: "Chennai", shortCode: "CHE" },
  { name: "Kolkata", shortCode: "KOL" },
  { name: "Hyderabad", shortCode: "HYD" },
  { name: "Pune", shortCode: "PNQ" },
  { name: "Ahmedabad", shortCode: "AMD" },
  { name: "Jaipur", shortCode: "JAI" },
  { name: "Goa", shortCode: "GOA" },
];

export default function CityCardSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? cities.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === cities.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <MdArrowBackIos
          className="text-4xl cursor-pointer text-gray-300 hover:text-gray-100 transition duration-200"
          onClick={handlePrevClick}
        />
        
        <div className="overflow-hidden w-full">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {cities.map((city, index) => (
              <div
                key={index}
                className="w-full flex-shrink-0 p-4"
                style={{ width: "220px" }}
              >
                <div className="bg-gradient-to-r cursor-pointer from-gray-800 to-gray-700 rounded-lg shadow-lg p-8 text-center transition transform hover:scale-105 duration-300">
                  <h2 className="text-4xl font-extrabold text-white tracking-wide">
                    {city.shortCode}
                  </h2>
                  <p className="mt-2 text-lg font-semibold text-gray-300 tracking-wide">
                    {city.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <MdArrowForwardIos
          className="text-4xl cursor-pointer text-gray-300 hover:text-gray-100 transition duration-200"
          onClick={handleNextClick}
        />
      </div>
    </div>
  );
}
