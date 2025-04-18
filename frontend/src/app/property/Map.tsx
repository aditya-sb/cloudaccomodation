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
      className={`relative bg-[var(--card)] rounded-lg shadow-lg ${
        isFullScreen ? "fixed inset-0 z-50" : "p-0"
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        
        <button
          onClick={toggleFullScreen}
          className="text-[var(--cta-text)] bg-[var(--cta)] p-2 rounded-full hover:bg-[var(--cta-active)] transition"
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
