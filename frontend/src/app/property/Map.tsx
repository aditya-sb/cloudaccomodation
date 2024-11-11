"use client";
import React, { useState, useEffect } from "react";
import { FaMapMarkerAlt, FaExpand, FaCompress } from "react-icons/fa";

interface MapProps {
  location: string;
  lat: number;
  lon: number;
}

const Map: React.FC<MapProps> = ({ location, lat, lon }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    const iframe = document.getElementById("iframeId") as HTMLIFrameElement;
    if (iframe) {
      iframe.src = `https://maps.google.com/maps?q=${lat},${lon}&z=15&hl=en&output=embed`;
    }
  }, [lat, lon]);

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  return (
    <div
      className={`relative mt-10 bg-gray-800 rounded-lg shadow-lg ${
        isFullScreen ? "fixed inset-0 z-50" : "p-8"
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        <div className="text-white">
          <h3 className="text-xl font-semibold">Explore the Area</h3>
          <p className="mt-2 flex items-center">
            <FaMapMarkerAlt className="mr-2" />
            {location}
          </p>
        </div>
        <button
          onClick={toggleFullScreen}
          className="text-white bg-blue-600 p-2 rounded-full hover:bg-blue-700 transition"
          title={isFullScreen ? "Exit Full Screen" : "Full Screen"}
        >
          {isFullScreen ? <FaCompress /> : <FaExpand />}
        </button>
      </div>

      <div
        className={`overflow-hidden transition-all ${
          isFullScreen ? "h-full w-full" : "h-96 w-full"
        }`}
      >
        <iframe
          id="iframeId"
          width="100%"
          height="100%"
          className="rounded-lg border-none shadow-md"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default Map;
