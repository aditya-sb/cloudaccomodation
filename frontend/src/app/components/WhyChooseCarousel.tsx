"use client";

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Award, Headphones, CreditCard, DollarSign } from 'lucide-react';

const WhyChooseCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const features = [
    {
      icon: <img src="/images/icons/ribbon.svg" alt="" width={150} height={150} />,
      title: "Verified Listings",
      description: "Every property is thoroughly verified to ensure safety, quality, and reliability.",
      bgColor: "bg-gradient-to-bl from-pink-300 to-pink-100"
    },
    {
      icon: <img src="/images/icons/support.svg" alt="" width={150} height={150} />,
      title: "24/7 Support",
      description: "After your move, our support team is here around the clock to help.",
      bgColor: "bg-gradient-to-bl from-yellow-300 to-yellow-100"
    },
    {
      icon: <img src="/images/icons/card1.svg" alt="" width={150} height={150} />,
      title: "No Payment Upfront",
      description: "Pay nothing upfront. Book your accommodation and settle the rest directly with the owner upon arrival.",
      bgColor: "bg-gradient-to-bl from-purple-300 to-purple-100"
    },
    {
      icon: <img src="/images/icons/discount.svg" alt="" width={150} height={150} />,
      title: "Best Price- Guaranteed",
      description: "We're committed to offering you the best deals without compromising on quality.",
      bgColor: "bg-gradient-to-bl from-pink-300 to-pink-100"
    }
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % features.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + features.length) % features.length);
  };

  const goToSlide = (index: React.SetStateAction<number>) => {
    setCurrentSlide(index);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 mt-10 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-700 mb-2">
          WHY CHOOSE CLOUD
        </h2>
        <h3 className="text-lg md:text-xl text-gray-600">
          ACCOMMODATION?
        </h3>
      </div>

      {/* Desktop View - All cards visible */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`${feature.bgColor} rounded-2xl p-6 text-center relative overflow-hidden min-h-[280px] flex flex-col justify-between`}
          >
            {/* Icon */}
            <div className="flex justify-center mb-4">
                {feature.icon}
            </div>
            
            {/* Content */}
            <div className="flex-1">
              <h4 className="font-bold text-lg text-gray-700 mb-3">
                {feature.title}
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile View - Carousel */}
      <div className="md:hidden">
        <div className="relative">
          {/* Carousel Container */}
          <div className="overflow-hidden rounded-2xl">
            <div 
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`${feature.bgColor} min-w-full p-8 text-center relative overflow-hidden min-h-[320px] flex flex-col justify-between`}
                >
                  {/* Icon */}
                  <div className="flex justify-center mb-6">
                      {feature.icon}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <h4 className="font-bold text-xl text-gray-700 mb-4">
                      {feature.title}
                    </h4>
                    <p className="text-gray-600 text-base leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg z-10"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg z-10"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-6 space-x-2">
          {features.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                currentSlide === index ? 'bg-purple-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

    </div>
  );
};

export default WhyChooseCarousel;