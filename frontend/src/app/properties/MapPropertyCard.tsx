import React from "react";
import Image from "next/image";
import ImageSlider from "../components/ImageSlider";

interface MapPropertyCardProps {
  images: Array<string>;
  title: string;
  location: string;
  price: string;
  className?: string;
  onClick?: () => void;
  isMapPopup?: boolean;
}

const MapPropertyCard: React.FC<MapPropertyCardProps> = ({
  images,
  title,
  location,
  price,
  onClick,
  className,
  isMapPopup = false,
}) => {
  const containerClasses = isMapPopup
    ? "max-w-[300px]" // Increased from 250px to 300px
    : "cursor-pointer rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 mb-6";

  const imageClasses = isMapPopup
    ? "rounded-lg object-cover w-full h-36" // Increased from h-23 to h-36
    : "rounded-xl object-cover w-full h-48"; // Increased from h-23 to h-48

  const contentClasses = isMapPopup
    ? "mt-2 space-y-1" // Added more spacing
    : "mt-3 space-y-2";

  return (
    <div
      onClick={onClick}
      className={containerClasses}
      role="button"
      tabIndex={0}
    >
      <div className="relative">
        <ImageSlider images={images} />
      </div>
      <div className={contentClasses}>
        <h3 className={`font-semibold ${isMapPopup ? 'text-base leading-tight' : 'text-xl'} text-gray-800`}>
          {title}
        </h3>
        <p className="text-gray-500 text-sm leading-tight">{location}</p>
        <p className="text-teal-600 font-semibold text-sm leading-tight">{price}/month</p>
      </div>
    </div>
  );
};

export default MapPropertyCard;