"use client";

import React from "react";
import dynamic from "next/dynamic";
import { FaBed, FaBath, FaVectorSquare, FaStar, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

// Dynamically import ImageSlider to avoid SSR issues with antd Carousel
const ImageSlider = dynamic(() => import("../components/ImageSlider"), {
  ssr: false,
  loading: () => <div className="w-full h-48 bg-gray-200 animate-pulse" />
});

const CURRENCY_SYMBOLS = {
  USD: "$",
  INR: "₹",
  CAD: "C$",
  GBP: "£",
  EUR: "€",
  AUD: "A$",
};

interface MapPropertyCardProps {
  images: Array<string>;
  title: string;
  location: string;
  price: number;
  country: string;
  currencyCode?: string;
  className?: string;
  onClick?: () => void;
  isMapPopup?: boolean;

  beds: number;
  baths: number;
  area: number;
  rating: number;
  reviewsCount: number;
  verified?: boolean;
}

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-US").format(price);

const MapPropertyCard: React.FC<MapPropertyCardProps> = ({
  images,
  title,
  location,
  price,
  country,
  currencyCode = "USD",
  onClick,
  className,
  isMapPopup = false,
  beds,
  baths,
  area,
  rating,
  reviewsCount,
  verified = false,
}) => {
  const containerClasses = isMapPopup
    ? "max-w-[150px] text-xs bg-white rounded-lg shadow-lg" // added bg-white and shadow
    : "cursor-pointer p-2 rounded-md shadow-sm hover:shadow-md transition-all duration-300 mb-2 text-xs";
  const contentClasses = isMapPopup ? "p-2 space-y-1" : "mt-2 space-y-1"; // removed mt-1
  const currencySymbol =
    CURRENCY_SYMBOLS[currencyCode as keyof typeof CURRENCY_SYMBOLS] || "$";

  return (
    <div
      onClick={onClick}
      className={`${containerClasses} ${className}`}
      role="button"
      tabIndex={0}
    >
      <div className="relative h-32 overflow-hidden">
        <ImageSlider images={images} />
        {/* Verified Badge */}
        <div className="absolute top-2 left-2 z-10">
          {verified ? (
            <div className="bg-green-500 text-white px-2 py-1 rounded-md flex items-center text-xs font-medium">
              <FaCheckCircle className="mr-1" />
              Verified
            </div>
          ) : (
            <div className="bg-gray-500 text-white px-2 py-1 rounded-md flex items-center text-xs font-medium">
              <FaTimesCircle className="mr-1" />
              Unverified
            </div>
          )}
        </div>
      </div>

      <div className={contentClasses}>
        <h3 className={`font-semibold ${isMapPopup ? "text-[15px]" : "text-sm"} text-gray-800`}>
          {title}
        </h3>
        <p className="text-gray-500">{location}</p>
        <div className="flex items-center justify-between">
          <p className="text-teal-600 font-semibold text-[11px] m-0">
            {currencySymbol}
            {formatPrice(price)} /month
          </p>
          {/* <div className="flex items-center text-[9px] text-gray-700 gap-1">
            <FaStar className="text-yellow-500" />
            <span>{rating}</span>
            <span className="text-gray-500">({reviewsCount} reviews)</span>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default MapPropertyCard;
