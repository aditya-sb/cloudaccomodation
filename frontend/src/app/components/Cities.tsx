"use client";
import { useState } from "react";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

interface CityCardProps {
  name: string;
  image: string;
}

const cities: CityCardProps[] = [
  { name: "Toronto", image: "/images/cities/toronto.png" },
  { name: "Vancouver", image: "/images/cities/vancouver.png" },
  { name: "Montreal", image: "/images/cities/montreal.png" },
  { name: "Calgary", image: "/images/cities/calgary.png" },
  { name: "Ottawa", image: "/images/cities/ottawa.png" },
  { name: "Edmonton", image: "/images/cities/edmonton.png" },
  { name: "Winnipeg", image: "/images/cities/winnipeg.png" },
  { name: "Quebec", image: "/images/cities/quebec.png" },
  { name: "Halifax", image: "/images/cities/halifax.png" },
  { name: "Victoria", image: "/images/cities/victoria.png" },
];

const CARD_WIDTH = 240;

export default function CityCardSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevClick = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleNextClick = () => {
    if (currentIndex < cities.length - 3) setCurrentIndex(currentIndex + 1); // Show 3 cards at a time
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
            color: currentIndex === 0
              ? "var(--gray-text)"
              : "var(--gray-hover-text)",
          }}
        >
          <MdArrowBackIos />
        </button>

        <div className="overflow-hidden w-full">
          <div
            className="flex gap-x-8 transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * CARD_WIDTH}px)`,
              width: `${cities.length * CARD_WIDTH}px`,
            }}
          >
            
            {cities.map((city, index) => (
              <div
                key={index}
                className="flex-shrink-0 p-4"
                style={{ width: CARD_WIDTH }}
              >
                <div className="flex flex-col items-center cursor-pointer" onClick={() =>
              (window.location.href = `/properties?search=${city.name}`)
            }>
                  {/* City Image */}
                  <div
                    className="rounded-lg overflow-hidden shadow-lg"
                    style={{
                      width: "240px",
                      height: "240px",
                      backgroundImage: `url(${city.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  ></div>
                  {/* City Name */}
                  <p
                    className="mt-4 text-lg font-semibold text-center"
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
          disabled={currentIndex === cities.length - 3}
          className={`text-4xl transition duration-200 ${
            currentIndex === cities.length - 3
              ? "opacity-50 cursor-not-allowed"
              : "hover:opacity-80"
          }`}
          style={{
            color: currentIndex === cities.length - 3
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
