// src/app/components/Map.tsx
"use client";
import { useEffect } from "react";

interface MapProps {
  location: string;
}

export default function Map({ location }: MapProps) {
  useEffect(() => {
    console.log(`Initializing map for ${location}`);
    // Implement Google Maps API or a suitable library here
  }, [location]);

  return (
    <div className="h-96 bg-gray-900 rounded-xl shadow-2xl overflow-hidden mb-10">
      <iframe
        src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent(location)}`}
        width="100%"
        height="100%"
        allowFullScreen
        loading="lazy"
        className="rounded-xl"
      ></iframe>
    </div>
  );
}
