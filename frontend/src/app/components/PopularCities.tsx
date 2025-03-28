"use client";

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ExploreProperties from './ExploreProperties';
import { useRouter } from 'next/navigation';

const cityData = {
  Canada: [
    { name: 'Toronto', image: '/images/cities/toronto.png' },
    { name: 'Calgary', image: '/images/cities/calgary.png' },
    { name: 'Vancouver', image: '/images/cities/vancouver.png' },
    { name: 'Montreal', image: '/images/cities/montreal.png' },
    { name: 'Ottawa', image: '/images/cities/ottawa.png' },
    { name: 'Winnipeg', image: '/images/cities/winnipeg.png' },
  ],
  'United States': [
    { name: 'New York', image: '/path/to/new_york.jpg' },
    { name: 'Los Angeles', image: '/path/to/los_angeles.jpg' },
    { name: 'Chicago', image: '/path/to/chicago.jpg' },
    { name: 'Houston', image: '/path/to/houston.jpg' },
    { name: 'Miami', image: '/path/to/miami.jpg' },
  ],
  'United Kingdom': [
    { name: 'London', image: '/path/to/london.jpg' },
    { name: 'Manchester', image: '/path/to/manchester.jpg' },
    { name: 'Birmingham', image: '/path/to/birmingham.jpg' },
    { name: 'Glasgow', image: '/path/to/glasgow.jpg' },
    { name: 'Liverpool', image: '/path/to/liverpool.jpg' },
  ],
};

const flagData = {
  Canada: '/images/countries/canada-image.png',
  'United States': '/images/countries/usa.png',
  'United Kingdom': '/images/countries/uk.png',
};

const PopularCities = () => {
  const [selectedCountry, setSelectedCountry] = useState('Canada');
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();
  const getItemsPerPage = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) return 2; // Mobile
      if (window.innerWidth < 1024) return 3; // Tablet
      return 6; // Desktop - increased to 6
    }
    return 6; // Default for SSR
  };

  const [itemsPerPage, setItemsPerPage] = useState(getItemsPerPage());

  React.useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(getItemsPerPage());
      setCurrentIndex(0);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNext = () => {
    const maxIndex = Math.ceil(cityData[selectedCountry].length / itemsPerPage) - 1;
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, maxIndex));
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  return (
    <section className="w-full max-w-screen-2xl mx-auto sm:px-4 mb-6">
      <h2 className="text-xl px-5 sm:text-2xl mt-4 font-bold text-start mb-4">
        Popular Cities
      </h2>
      <p className="text-sm px-5 sm:text-base text-gray-600 mb-4">
      Find student accommodations near major cities and top universities worldwide.
      </p>
      <div className="flex flex-col px-5 mb-4">
        {/* Country Buttons */}
        <div className="flex flex-wrap  justify-start gap-2 mb-4">
          {Object.keys(cityData).map((country) => (
            <button
              key={country}
              onClick={() => {
                setSelectedCountry(country);
                setCurrentIndex(0);
              }}
              className={`flex items-center p-2 rounded-md shadow-sm transition duration-300 ease-in-out ${
                selectedCountry === country
                  ? 'bg-blue-100 text-blue-700 border border-blue-400'
                  : 'bg-white hover:bg-blue-50 border border-gray-200'
              }`}
            >
              <img
                src={flagData[country]}
                alt={`${country} flag`}
                className="w-6 h-6 mr-2 rounded-full"
              />
              <span className="text-sm">{country}</span>
            </button>
          ))}
        </div>

        {/* Carousel Container */}
        <div className="relative w-full">
          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`absolute -left-2 sm:-left-4 top-1/2 -translate-y-1/2 z-10 p-1 sm:p-2 rounded-full bg-white shadow-md ${
              currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'
            }`}
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          
          <button
            onClick={handleNext}
            disabled={currentIndex >= Math.ceil(cityData[selectedCountry].length / itemsPerPage) - 1}
            className={`absolute -right-2 sm:-right-4 top-1/2 -translate-y-1/2 z-10 p-1 sm:p-2 rounded-full bg-white shadow-md ${
              currentIndex >= Math.ceil(cityData[selectedCountry].length / itemsPerPage) - 1
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:bg-gray-100'
            }`}
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Cities Grid */}
          <div className="overflow-hidden mx-6 sm:mx-8">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {Array.from({ length: Math.ceil(cityData[selectedCountry].length / itemsPerPage) }).map((_, pageIndex) => (
                <div key={pageIndex} className="w-full flex-shrink-0 flex gap-2 sm:gap-4">
                  {cityData[selectedCountry]
                    .slice(pageIndex * itemsPerPage, (pageIndex + 1) * itemsPerPage)
                    .map((city) => (
                      <div
                        key={city.name}
                        className={`flex-1 min-w-0 ${
                          itemsPerPage === 6 ? 'w-1/6' : 
                          itemsPerPage === 3 ? 'w-1/3' : 
                          'w-1/2'
                        }`}
                      >
                        <div
                          className="relative rounded-lg overflow-hidden shadow-md group cursor-pointer"
                          onClick={() => router.push(`/properties?search=${city.name}`)}
                        >
                          {/* Square aspect ratio container */}
                          <div className="relative pb-[100%]">
                            <img
                              src={city.image}
                              alt={city.name}
                              className="absolute inset-0 w-full h-full object-cover"
                            />
                            {/* Centered city name at bottom */}
                            <div className="absolute bottom-0 left-0 right-0 flex justify-center items-center p-2">
                              <p className="text-white text-lg font-medium text-center">
                                {city.name}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: Math.ceil(cityData[selectedCountry].length / itemsPerPage) }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                currentIndex === idx
                  ? 'bg-blue-600'
                  : 'bg-gray-300'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularCities;