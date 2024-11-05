// src/app/components/CityCardSlider.tsx
"use client"; 
import { useState } from "react";
import Image from "next/image";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

interface CityCardProps {
  name: string;
  image: string;
}

const cities: CityCardProps[] = [
  { name: "Mumbai", image: "/images/mumbai.jpg" },
  { name: "Delhi", image: "/images/delhi.jpg" },
  { name: "Bangalore", image: "/images/bangalore.jpg" },
  { name: "Chennai", image: "/images/chennai.jpg" },
  { name: "Kolkata", image: "/images/kolkata.jpg" },
  { name: "Hyderabad", image: "/images/hyderabad.jpg" },
  { name: "Pune", image: "/images/pune.jpg" },
  { name: "Ahmedabad", image: "/images/ahmedabad.jpg" },
  { name: "Jaipur", image: "/images/jaipur.jpg" },
  { name: "Goa", image: "/images/goa.jpg" },
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
    <div className="relative w-full max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <MdArrowBackIos
          className="text-3xl cursor-pointer text-gray-500 hover:text-white"
          onClick={handlePrevClick}
        />
        <div className="overflow-hidden w-full">
          <div
            className="flex transition-transform duration-300"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {cities.map((city, index) => (
              <div
                key={index}
                className="w-full flex-shrink-0 p-4"
                style={{ width: "200px" }}
              >
                <div className="bg-gray-800 rounded-lg shadow-lg p-4 text-center">
                  <Image
                    src={city.image}
                    alt={city.name}
                    width={200}
                    height={150}
                    className="rounded-lg object-cover"
                  />
                  <h3 className="mt-2 text-xl font-bold text-white">
                    {city.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
        <MdArrowForwardIos
          className="text-3xl cursor-pointer text-gray-500 hover:text-white"
          onClick={handleNextClick}
        />
      </div>
    </div>
  );
}
