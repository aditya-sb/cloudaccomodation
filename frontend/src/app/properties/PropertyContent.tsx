// src/app/propertyContent.tsx
"use client";

import {  useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ListView from "./ListView";
import MapView from "./MapView";
import SearchBar from "../components/SearchBar";
import { FaThList, FaMapMarkedAlt } from "react-icons/fa";
import { Property } from "@/types";

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
      <SearchBar />
      <div className="flex justify-center mt-8 space-x-4">
        <button
          onClick={() => setView("list")}
          className={`flex items-center px-5 py-3 rounded-full shadow-lg transition-colors ${
            view === "list" ? "bg-gradient-to-r from-green-500 to-teal-500 text-white" : "bg-gray-300 text-gray-700"
          }`}
        >
          <FaThList className="mr-2" /> List View
        </button>
        <button
          onClick={() => setView("map")}
          className={`flex items-center px-5 py-3 rounded-full shadow-lg transition-colors ${
            view === "map" ? "bg-gradient-to-r from-green-500 to-teal-500 text-white" : "bg-gray-300 text-gray-700"
          }`}
        >
          <FaMapMarkedAlt className="mr-2" /> Map View
        </button>
      </div>

      <div className="text-center mt-4 text-lg font-semibold" style={{
          color: "var(--foreground)",
        }}>
        Showing {filteredProperties.length} properties
      </div>

      <div className="p-4 mx-5">
        {view === "list" ? (
          <ListView properties={filteredProperties} />
        ) : (
          <div >
            <MapView properties={filteredProperties} mapLocation="Beverly Hills, CA" mapLat={34.0736204} mapLon={-118.4003563} />
          </div>
        )}
      </div>
    </>
  );
}

export default PropertyContent;
