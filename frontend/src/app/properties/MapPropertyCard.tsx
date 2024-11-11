// src/components/MapPropertyCard.tsx
import React from "react";
import Image from "next/image";

interface MapPropertyCardProps {
  image: string;
  title: string;
  location: string;
  price: string;
  onClick: () => void;
}

export default function MapPropertyCard({
  image,
  title,
  location,
  price,
  onClick,
}: MapPropertyCardProps) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 mb-6"
    >
      <Image
        src={image}
        alt={title}
        width={300}
        height={200}
        className="rounded-xl object-cover w-full h-48"
      />
      <div className="mt-4">
        <h3 className="font-semibold text-xl text-gray-800">{title}</h3>
        <p className="text-gray-500 text-sm mt-2">{location}</p>
        <p className="text-teal-600 font-semibold text-lg mt-2">{price}</p>
      </div>
    </div>
  );
}
