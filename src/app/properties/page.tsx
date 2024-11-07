// src/app/propertyPage.tsx
"use client";

import {  useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import PropertyCard from "../components/PropertyCard";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import { FaThList, FaMapMarkedAlt } from "react-icons/fa"; // Import icons

// Define the property type separately
interface Property {
  image: string;
  title: string;
  location: string;
  price: string;
  description: string;
}

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

function MapView({ properties }: { properties: Property[] }) {
  return (
    <div className="flex bg-blue-50 shadow-lg rounded-lg overflow-hidden">
      {/* Map Section */}
      <div className="w-2/3 bg-blue-100 h-[600px] flex items-center justify-center rounded-l-lg">
        <span className="text-gray-700 font-semibold text-lg">Map Placeholder</span>
      </div>
      {/* Property List */}
      <div className="w-1/3 overflow-y-auto h-[600px] p-4 bg-white rounded-r-lg border-l border-gray-200">
        {properties.map((property, index) => (
          <PropertyCard
            key={index}
            image={property.image}
            title={property.title}
            location={property.location}
            price={property.price}
            description={property.description}
          />
        ))}
      </div>
    </div>
  );
}


export default function PropertyPage() {
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
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      <Header />
      <SearchBar />
  
      {/* View Toggle Buttons */}
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
  
      {/* Property Count */}
      <div className="text-center mt-4 text-lg font-semibold text-gray-600">
        Showing {filteredProperties.length} properties
      </div>
  
      {/* Property Cards and Map View */}
      <div className="p-8 max-w-7xl mx-auto">
        {view === "list" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property, index) => (
              <PropertyCard
                key={index}
                image={property.image}
                title={property.title}
                location={property.location}
                price={property.price}
                description={property.description}
                // className="shadow-md rounded-lg hover:shadow-xl transition-shadow"
              />
            ))}
          </div>
        ) : (
          <div className=" mt-6 rounded-lg overflow-hidden shadow-lg">
            <MapView properties={filteredProperties} />
          </div>
        )}
      </div>
  
      <Footer />
    </div>
  );
  
}
