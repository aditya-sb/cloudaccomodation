import React from "react";
import Image from "next/image";

interface MapPropertyCardProps {
  image: string;
  title: string;
  location: string;
  price: string;
  onClick?: () => void;
  isMapPopup?: boolean;
}

const MapPropertyCard: React.FC<MapPropertyCardProps> = ({
  image,
  title,
  location,
  price,
  onClick,
  isMapPopup = false,
}) => {
  const containerClasses = isMapPopup
    ? "max-w-[250px]"
    : "cursor-pointer rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 mb-6";

  const imageClasses = isMapPopup
    ? "rounded-lg object-cover w-full h-23"
    : "rounded-xl object-cover w-full h-23";

  const contentClasses = isMapPopup
    ? "mt-1 space-y-0.5"
    : "mt-3 space-y-2";

  return (
    <div
      onClick={onClick}
      className={containerClasses}
      role="button"
      tabIndex={0}
    >
      <div className="relative">
        <Image
          src={image}
          alt={title}
          width={isMapPopup ? 250 : 300}
          height={isMapPopup ? 150 : 200}
          className={imageClasses}
        />
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