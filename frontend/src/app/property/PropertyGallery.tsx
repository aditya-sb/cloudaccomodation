"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PropertyGalleryProps {
  images: string[];
}
export default function PropertyGallery({ images }: PropertyGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [loadedImages, setLoadedImages] = useState<string[]>([]);

  useEffect(() => {
    const loadImages = async () => {
      const loadedImages = await Promise.all(
        images.map((image) =>
          new Promise<string>((resolve, reject) => {
            const img = new window.Image();
            img.onload = () => resolve(image);
            img.onerror = () => reject(new Error("Image failed to load"));
            img.src = image;
          })
        )
      );
      setLoadedImages(loadedImages);
    };
    loadImages().catch((error) => console.error(error));
  }, [images]);

  const goToNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % loadedImages.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const goToPrevious = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + loadedImages.length) % loadedImages.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  // Navigation Buttons
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

  // Mobile View
  const MobileView = () => (
    <div className="relative h-[250px] overflow-hidden">
      {loadedImages.length > 0 && (
        <div
          className={`absolute w-full h-full transition-opacity duration-500 ${
            isTransitioning ? "opacity-90" : "opacity-100"
          }`}
        >
          <Image
            src={loadedImages[currentIndex]}
            alt={`Property image ${currentIndex + 1}`}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}
      <NavigationButtons />
    </div>
  );

  // Desktop View
  const DesktopView = () => (
    <div className="grid grid-cols-12 p-4 gap-4">
      {/* Main Image */}
      <div className="col-span-8 relative h-[300px] rounded-xl overflow-hidden group">
        {loadedImages.length > 0 && (
          <div
            className={`absolute w-full h-full transition-opacity duration-500 ${
              isTransitioning ? "opacity-90" : "opacity-100"
            }`}
          >
            <Image
              src={loadedImages[currentIndex]}
              alt={`Property image ${currentIndex + 1}`}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}
        {/* Navigation Buttons */}
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <NavigationButtons />
        </div>
        {/* Image Counter */}
        <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
          {currentIndex + 1} / {loadedImages.length}
        </div>
      </div>

      {/* Thumbnails */}
      <div
        className="col-span-4 grid grid-cols-2 gap-3 h-[300px] overflow-y-auto pl-1 pt-1 pr-2"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: '#CBD5E0 #F7FAFC'
        }}
      >
        {loadedImages.map((image, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`relative w-full h-[140px] rounded-lg overflow-hidden transition-all ${
              currentIndex === index
                ? "ring-2 ring-offset-2 ring-blue-500"
                : "opacity-80 hover:opacity-100"
            }`}
          >
            <Image
              src={image}
              alt={`Thumbnail ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Mobile View */}
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

