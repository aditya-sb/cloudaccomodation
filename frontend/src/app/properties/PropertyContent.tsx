import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ListView from "./ListView";
import MapView from "./MapView";
import { FaThList, FaMapMarkedAlt } from "react-icons/fa";
import Filter from "../components/Filter";
import { useGetPropertiesQuery, useCreatePropertyMutation } from "../redux/slices/apiSlice";

function PropertyContent() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const city = searchParams.get("city");
  const [view, setView] = useState<"list" | "map">("list");
  const [mapCenter, setMapCenter] = useState({ lat: 0, lon: 0 });

  const { data: properties = [], isLoading, isError } = useGetPropertiesQuery({
    city: search || "",
  });
  // Only update map center when properties change AND when the first property exists
  useEffect(() => {
    if (properties.length > 0 && 
        (properties[0].latitude !== mapCenter.lat || 
         properties[0].longitude !== mapCenter.lon)) {
      setMapCenter({
        lat: properties[0].latitude,
        lon: properties[0].longitude,
      });
    }
  }, [properties]); // Remove mapCenter from dependencies

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading properties.</div>;

  return (
    <div className="mb-10">
      <Filter />
      <div className="flex justify-between items-center mx-8 mt-6 space-x-4">
        {/* Showing Properties Text */}
        <div className="text-lg font-semibold ml-5" style={{ color: "var(--foreground)" }}>
          Showing {properties.length} properties
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
          <ListView properties={properties} />
        ) : (
          <MapView 
            properties={properties} 
            mapLat={mapCenter.lat} 
            mapLon={mapCenter.lon} 
            mapLocation={search || "All Properties"} 
          />
        )}
      </div>
    </div>
  );
}

export default PropertyContent;