// src/app/propertyContent.tsx
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ListView from "./ListView";
import MapView from "./MapView";
import { FaThList, FaMapMarkedAlt } from "react-icons/fa";
import { Property } from "@/types";
import Filter from "../components/Filter";

// Example properties data
const mockProperties: Property[] = [
  {
    image: "/images/mordenhouse.webp",
    title: "Modern Family Home",
    location: "Beverly Hills, CA",
    price: "$2,500,000",
    description: "A beautiful home with four bedrooms, a spacious living area, and a private pool.",
  },
  // Add more properties as needed...
];

function PropertyContent() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(mockProperties);
  const [view, setView] = useState<"list" | "map">("list");

  useEffect(() => {
    if (typeof search === "string" && search.trim() !== "") {
      const filtered = mockProperties.filter((property) =>
        property.title.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredProperties(filtered);
    } else {
      setFilteredProperties(mockProperties);
    }
  }, [search]);

  return (
    <>
      <Filter />
      <div className="flex justify-between items-center mt-8 space-x-4">
        {/* Showing Properties Text */}
        <div className="text-lg font-semibold ml-5" style={{ color: "var(--foreground)" }}>
          Showing {filteredProperties.length} properties
        </div>

        {/* View Toggle Buttons */}
        <div className="flex space-x-3 mr-5">
          <button
            onClick={() => setView("list")}
            className={`flex items-center px-4 py-2 rounded-lg shadow-lg text-sm transition-all duration-200 ${
              view === "list" ? "bg-gradient-to-r from-green-500 to-teal-500 text-white" : "bg-gray-200 text-gray-700"
            } hover:bg-gradient-to-r hover:from-green-600 hover:to-teal-600`}
          >
            <FaThList className="mr-2 text-lg" /> List View
          </button>
          <button
            onClick={() => setView("map")}
            className={`flex items-center px-4 py-2 rounded-lg shadow-lg text-sm transition-all duration-200 ${
              view === "map" ? "bg-gradient-to-r from-green-500 to-teal-500 text-white" : "bg-gray-200 text-gray-700"
            } hover:bg-gradient-to-r hover:from-green-600 hover:to-teal-600`}
          >
            <FaMapMarkedAlt className="mr-2 text-lg" /> Map View
          </button>
        </div>
      </div>

      <div className="p-4 mx-5 mt-6">
        {view === "list" ? (
          <ListView properties={filteredProperties} />
        ) : (
          <div>
            <MapView
              properties={filteredProperties}
              mapLocation="Beverly Hills, CA"
              mapLat={34.0736204}
              mapLon={-118.4003563}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default PropertyContent;
