"use client";

import React, { useEffect, useState } from "react";
import { Property } from "@/types";
import PropertyCard from "./PropertyCard";
import { FaCompress, FaExpand } from "react-icons/fa";

interface MapViewProps {
  properties: Property[];
  mapLocation: string;
  mapLat: number;
  mapLon: number;
}

const MapView: React.FC<MapViewProps> = ({ properties,  mapLat, mapLon }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  useEffect(() => {
    const iframe = document.getElementById("iframeId") as HTMLIFrameElement;
    if (iframe) {
      iframe.src = `https://maps.google.com/maps?q=${mapLat},${mapLon}&z=15&hl=en&output=embed`;
    }
  }, [mapLat, mapLon]);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Map Section */}
      <div className={`relative ${isFullScreen ? "w-full" : "w-3/5"} h-full`}>
      <button
          onClick={toggleFullScreen}
          className="text-[var(--cta-text)] bg-[var(--cta)] p-2 rounded-full hover:bg-[var(--cta-active)] transition"
          title={isFullScreen ? "Exit Full Screen" : "Full Screen"}
        >
          {isFullScreen ? <FaCompress /> : <FaExpand />}
        </button>
        <iframe
          id="iframeId"
          className="w-full h-full"
          style={{ border: 0 }}
          loading="lazy"
        />
      </div>

      {/* Property List Section */}
      <div className={`flex-1 h-full overflow-y-scroll p-6 space-y-4 ${isFullScreen ? "hidden" : "block"}`}>
        <div className="text-xl font-semibold text-gray-500 mb-4">Properties Near You</div>
        <div className="space-y-4">
          {properties.map((property) => (
            <PropertyCard
              key={property.title}
              image={property.image}
              title={property.title}
              location={property.location}
              price={property.price}
              description={property.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MapView;
