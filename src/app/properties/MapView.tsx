"use client";

import React from "react";
import { Property } from "@/types";  // Make sure the Property type is correctly imported
import Map from "./Map";
interface MapViewProps {
    properties: Property[];
    mapLocation: string;
    mapLat: number;
    mapLon: number;
  }

const PropertyList: React.FC<{ properties: Property[] }> = ({ properties }) => {
    return (
      <div className="w-full h-full overflow-y-auto p-4 bg-white rounded-l-lg border-l border-gray-200">
        {properties.map((property, index) => (
          <div
            key={index}
            className="mb-6 flex flex-col bg-white rounded-lg shadow-lg hover:shadow-xl transition-all"
          >
            <img
              src={property.image}
              alt={property.title}
              className="w-full h-40 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h4 className="text-xl font-semibold text-gray-800">{property.title}</h4>
              <p className="text-gray-600">{property.location}</p>
              <p className="text-lg font-bold text-blue-600 mt-2">{property.price}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  const MapView: React.FC<MapViewProps> = ({ properties, mapLocation, mapLat, mapLon }) => {
    return (
      <div className="flex flex-col lg:flex-row bg-blue-50 shadow-lg rounded-lg overflow-hidden w-full">
        {/* Map Section */}
        <div className="w-full lg:w-2/3 h-[600px] flex items-center justify-center rounded-t-lg lg:rounded-l-lg">
          <Map location={mapLocation} lat={mapLat} lon={mapLon} />
        </div>
  
        {/* Properties List Section */}
        <div className="w-full lg:w-1/3 h-[600px] overflow-y-auto bg-white border-l border-gray-200">
          <PropertyList properties={properties} />
        </div>
      </div>
    );
  };
  
  export default MapView;
  