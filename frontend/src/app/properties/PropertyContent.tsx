import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ListView from "./ListView";
import MapView from "./MapView";
import { FaThList, FaMapMarkedAlt } from "react-icons/fa";
import { Property } from "@/types";
import Filter from "../components/Filter";

// Mock data is unchanged
const mockProperties: Property[] = [
  {
    image: "/images/mordenhouse.webp",
    title: "Modern Family Home",
    location: "Beverly Hills, CA",
    price: "$2,500,000",
    description: "A beautiful home with four bedrooms, a spacious living area, and a private pool.",
    mapLat: 34.0736204,
    mapLon: -118.4003563,
  },
  {
    image: "/images/torontohome.webp",
    title: "Luxury Condo",
    location: "Toronto, ON",
    price: "$1,800,000",
    description: "A premium condo located in downtown Toronto with a stunning view of the CN Tower.",
    mapLat: 43.651070,
    mapLon: -79.347015,
  },
  {
    image: "/images/vancouverhouse.webp",
    title: "Seaside Villa",
    location: "Vancouver, BC",
    price: "$3,200,000",
    description: "An elegant villa near the waterfront with breathtaking mountain and ocean views.",
    mapLat: 49.282729,
    mapLon: -123.120738,
  },
  {
    image: "/images/montrealhome.webp",
    title: "Charming Stone House",
    location: "Montreal, QC",
    price: "$1,250,000",
    description: "A historic stone house with modern upgrades and a spacious backyard.",
    mapLat: 45.501689,
    mapLon: -73.567256,
  },
  {
    image: "/images/ottawahome.webp",
    title: "Cozy Suburban Home",
    location: "Ottawa, ON",
    price: "$950,000",
    description: "A peaceful home located in a quiet suburb, perfect for families.",
    mapLat: 45.421530,
    mapLon: -75.697193,
  },
  {
    image: "/images/calgaryhome.webp",
    title: "Contemporary Townhouse",
    location: "Calgary, AB",
    price: "$750,000",
    description: "A stylish townhouse with modern interiors and easy access to downtown Calgary.",
    mapLat: 51.044733,
    mapLon: -114.071883,
  },
  {
    image: "/images/edmontonhome.webp",
    title: "Spacious Bungalow",
    location: "Edmonton, AB",
    price: "$850,000",
    description: "A large bungalow with an open concept design and a finished basement.",
    mapLat: 53.546124,
    mapLon: -113.493823,
  },
  {
    image: "/images/halifaxhome.webp",
    title: "Coastal Retreat",
    location: "Halifax, NS",
    price: "$1,500,000",
    description: "A serene coastal home with a private dock and stunning ocean views.",
    mapLat: 44.648618,
    mapLon: -63.585948,
  },
  {
    image: "/images/quebeccityhome.webp",
    title: "Colonial-Style House",
    location: "Quebec City, QC",
    price: "$1,300,000",
    description: "A beautiful colonial-style house with traditional architecture and modern amenities.",
    mapLat: 46.813878,
    mapLon: -71.207981,
  },
  {
    image: "/images/winnipeghome.webp",
    title: "Family-Friendly Home",
    location: "Winnipeg, MB",
    price: "$600,000",
    description: "A budget-friendly family home located in a welcoming neighborhood.",
    mapLat: 49.895077,
    mapLon: -97.138451,
  },
  {
    image: "/images/victoriahome.webp",
    title: "Garden View Cottage",
    location: "Victoria, BC",
    price: "$1,200,000",
    description: "A cozy cottage surrounded by lush gardens, ideal for nature lovers.",
    mapLat: 48.428421,
    mapLon: -123.365644,
  },
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

  // Calculate average latitude and longitude for the filtered properties
  const mapLat =
    filteredProperties.reduce((sum, property) => sum + property.mapLat, 0) /
    filteredProperties.length;
  const mapLon =
    filteredProperties.reduce((sum, property) => sum + property.mapLon, 0) /
    filteredProperties.length;
  const title = search || "Properties";

  return (
    <div className="mb-10">
      <Filter />
      <div className="flex justify-between items-center mx-8 mt-6 space-x-4">
        {/* Showing Properties Text */}
        <div className="text-lg font-semibold ml-5" style={{ color: "var(--foreground)" }}>
          Showing {filteredProperties.length} properties
        </div>

        {/* View Toggle Buttons */}
        <div className="flex space-x-3 mr-5">
          <button
            onClick={() => setView("list")}
            className={`flex items-center px-4 py-2 rounded-lg shadow-lg text-sm transition-all duration-200 ${
              view === "list"
                ? "bg-gradient-to-r from-green-500 to-teal-500 text-white"
                : "bg-gray-200 text-gray-700"
            } hover:bg-gradient-to-r hover:from-green-600 hover:to-teal-600`}
          >
            <FaThList className="mr-2 text-lg" /> List View
          </button>
          <button
            onClick={() => setView("map")}
            className={`flex items-center px-4 py-2 rounded-lg shadow-lg text-sm transition-all duration-200 ${
              view === "map"
                ? "bg-gradient-to-r from-green-500 to-teal-500 text-white"
                : "bg-gray-200 text-gray-700"
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
          <MapView properties={filteredProperties} mapLat={mapLat} mapLon={mapLon} mapLocation={title} />
        )}
      </div>
    </div>
  );
}

export default PropertyContent;
