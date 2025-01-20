"use client";

import React, { useEffect, useRef } from "react";
import { Property } from "@/types";
import PropertyCard from "./PropertyCard";
import MapPropertyCard from "./MapPropertyCard";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { createRoot } from 'react-dom/client';

interface MapViewProps {
  properties: Property[];
  mapLat: number;
  mapLon: number;
  mapLocation: string;
}

const MapView: React.FC<MapViewProps> = ({ properties, mapLat, mapLon, mapLocation }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize the map if it hasn't been initialized yet
    if (!mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapRef.current).setView([mapLat || 0, mapLon || 0], 13);
      if (mapRef.current) {
        mapRef.current.style.zIndex = "0";
      }
      // Add OpenStreetMap tiles
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(mapInstanceRef.current);
    }

    // Clear existing markers
    markersRef.current.forEach(marker => {
      marker.remove();
    });
    markersRef.current = [];

    // Add markers for each property
    properties.forEach((property) => {
      if (property.latitude && property.longitude) {
        // Create custom marker content with Tailwind classes
        const markerHtml = document.createElement('div');
        markerHtml.className = 'bg-black text-white w-fit px-2 py-1 rounded-lg text-sm whitespace-nowrap';
        markerHtml.textContent = property.price;

        // Create custom icon
        const customIcon = L.divIcon({
          html: markerHtml.outerHTML,
          className: 'custom-marker',
        });

        // Create marker
        const marker = L.marker([property.latitude, property.longitude], {
          icon: customIcon
        }).addTo(mapInstanceRef.current!);

        // Create popup content with React
        const popupContent = document.createElement('div');
        const root = createRoot(popupContent);
        root.render(
          <MapPropertyCard
            image={property.image}
            title={property.title}
            location={property.location}
            price={property.price}
            isMapPopup={true}
          />
        );

        // Add popup
        marker.bindPopup(popupContent);
        markersRef.current.push(marker);
      }
    });

    // Cleanup function
    return () => {
      markersRef.current.forEach(marker => {
        marker.remove();
      });
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [properties, mapLat, mapLon]);

  return (
    <div className="flex h-screen">
      {/* Map Container */}
      <div ref={mapRef} className="relative w-3/5 h-full" />

      {/* Property List */}
      <div className="flex-1 h-full overflow-y-auto p-6">
        <h2 className="text-xl font-semibold text-gray-500 mb-4">
          Properties Near You
        </h2>
        {/* Added key to the mapped parent div */}
        {properties.map((property, index) => (
          <div key={property.id || `property-${index}`} className="mb-4">
            <PropertyCard
              image={property.image}
              title={property.title}
              location={property.location}
              price={property.price}
              description={property.description}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MapView;