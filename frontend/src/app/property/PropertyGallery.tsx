"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PropertyGalleryProps {
  images: string[];
}

export default function PropertyGallery({ images }: PropertyGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const goToPrevious = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  // Shared Navigation Buttons Component
  const NavigationButtons = () => (
    <>
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white/90 transition-all shadow-lg z-10"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-6 h-6 text-gray-800" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white/90 transition-all shadow-lg z-10"
        aria-label="Next image"
      >
        <ChevronRight className="w-6 h-6 text-gray-800" />
      </button>
    </>
  );

  // Mobile Carousel View
  const MobileView = () => (
    <>
      <div className="relative h-[400px] overflow-hidden rounded-xl">
        <div className={`absolute w-full h-full transition-opacity duration-500 ${
          isTransitioning ? 'opacity-90' : 'opacity-100'
        }`}>
          <Image
            src={images[currentIndex]}
            alt={`Property image ${currentIndex + 1}`}
            layout="fill"
            className="object-cover"
            priority
          />
        </div>
        <NavigationButtons />
      </div>
      <div className="mt-4 flex justify-center gap-2">
        <div className="flex gap-2 p-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden transition-all ${
                currentIndex === index
                  ? 'ring-2 ring-offset-2 ring-blue-500'
                  : 'opacity-70 hover:opacity-100'
              }`}
            >
              <Image
                src={image}
                alt={`Thumbnail ${index + 1}`}
                layout="fill"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </>
  );

  // Desktop Grid View
  const DesktopView = () => (
    <div className="grid grid-cols-12 gap-4">
      {/* Main large image with navigation */}
      <div className="col-span-8 relative h-[400px] rounded-xl overflow-hidden group">
        <Image
          src={images[currentIndex]}
          alt={`Property image ${currentIndex + 1}`}
          layout="fill"
          className="object-cover"
          priority
        />
        {/* Show navigation on hover */}
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <NavigationButtons />
        </div>
        {/* Image counter */}
        <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      {/* Side thumbnails in grid */}
      <div className="col-span-4 grid grid-cols-2 gap-4 h-[400px] overflow-y-auto pl-1 pt-1 pr-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`relative aspect-square rounded-lg overflow-hidden transition-all ${
              currentIndex === index
                ? 'ring-2 ring-offset-2 ring-blue-500'
                : 'opacity-80 hover:opacity-100'
            }`}
          >
            <Image
              src={image}
              alt={`Property image ${index + 1}`}
              layout="fill"
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Mobile/Tablet View */}
      <div className="lg:hidden">
        <MobileView />
      </div>

      {/* Desktop View */}
      <div className="hidden lg:block">
        <DesktopView />
      </div>
    </div>
  );
}