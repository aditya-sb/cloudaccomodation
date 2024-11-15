// src/app/components/CityCardSlider.tsx
"use client";
import { useState } from "react";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

interface CityCardProps {
  name: string;
  shortCode: string;
}

const cities: CityCardProps[] = [
  { name: "Toronto", shortCode: "TOR" },
  { name: "Vancouver", shortCode: "VAN" },
  { name: "Montreal", shortCode: "MTL" },
  { name: "Calgary", shortCode: "CAL" },
  { name: "Ottawa", shortCode: "OTT" },
  { name: "Edmonton", shortCode: "EDM" },
  { name: "Winnipeg", shortCode: "WPG" },
  { name: "Quebec", shortCode: "QUE" },
  { name: "Halifax", shortCode: "HAL" },
  { name: "Victoria", shortCode: "VIC" },
];

const CARD_WIDTH = 240; // width of each card in pixels

export default function CityCardSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevClick = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleNextClick = () => {
    if (currentIndex < cities.length - 1) setCurrentIndex(currentIndex + 1);
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto py-8 px-4 lg:px-0">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={handlePrevClick}
          disabled={currentIndex === 0}
          className={`text-4xl transition duration-200 ${
            currentIndex === 0
              ? "opacity-50 cursor-not-allowed"
              : "hover:opacity-80"
          }`}
          style={{
            color: currentIndex === 0 ? "var(--gray-text)" : "var(--gray-hover-text)",
          }}
        >
          <MdArrowBackIos />
        </button>
  
        <div className="overflow-hidden w-full">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * CARD_WIDTH}px)`,
              width: `${cities.length * CARD_WIDTH}px`,
            }}
          >
            {cities.map((city, index) => (
              <div
                key={index}
                className="w-full flex-shrink-0 p-4"
                style={{ width: CARD_WIDTH }}
              >
                <div
                  className="cursor-pointer rounded-lg shadow-xl p-8 text-center transform hover:scale-105 duration-300"
                  style={{
                    background: "linear-gradient(to right, var(--gray-bg), var(--gray-hover-bg))",
                    color: "var(--cta-text)",
                  }}
                >
                  <h2
                    className="text-5xl font-extrabold tracking-wide"
                    style={{ color: "var(--grape)" }}
                  >
                    {city.shortCode}
                  </h2>
                  <p
                    className="mt-3 text-xl font-semibold tracking-wide"
                    style={{ color: "var(--copy-secondary)" }}
                  >
                    {city.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
  
        <button
          onClick={handleNextClick}
          disabled={currentIndex === cities.length - 1}
          className={`text-4xl transition duration-200 ${
            currentIndex === cities.length - 1
              ? "opacity-50 cursor-not-allowed"
              : "hover:opacity-80"
          }`}
          style={{
            color: currentIndex === cities.length - 1
              ? "var(--gray-text)"
              : "var(--gray-hover-text)",
          }}
        >
          <MdArrowForwardIos />
        </button>
      </div>
    </div>
  );
  
}
