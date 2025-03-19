import { useEffect, useState, useMemo, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import ListView from "./ListView";
import MapView from "./MapView";
import { FaThList, FaMapMarkedAlt } from "react-icons/fa";
import Filter, { FilterState } from "../components/Filter";
import { useGetPropertiesQuery } from "../redux/slices/apiSlice";

function PropertyContent() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const city = searchParams.get("city");
  const [view, setView] = useState<"list" | "map">("list");
  const [mapCenter, setMapCenter] = useState({ lat: 0, lon: 0 });
  const [filters, setFilters] = useState<FilterState>({});

  // Memoize query params to prevent unnecessary re-renders
  const queryParams = useMemo(() => ({
    city: search || city || "",
    sortBy: filters.sort,
    university: filters.university,
    locality: filters.locality,
    minPrice: filters.minPrice,
    roomType: filters.roomType?.join(','),
    kitchenType: filters.kitchenType?.join(','),
    bathroomType: filters.bathroomType?.join(','),
    moveInMonth: filters.moveInMonth?.join(','),
    stayDuration: filters.stayDuration,
  }), [search, city, filters]);

  const { data: properties = [], isLoading, isError } = useGetPropertiesQuery(queryParams);

  // Memoize the filter change handler
  const handleFilterChange = useCallback((newFilters: FilterState) => {
    setFilters(prevFilters => {
      // Only update if filters have actually changed
      if (JSON.stringify(prevFilters) !== JSON.stringify(newFilters)) {
        return newFilters;
      }
      return prevFilters;
    });
  }, []);

  // Only update map center when properties change AND when the first property exists
  useEffect(() => {
    if (properties.length > 0) {
      const firstProperty = properties[0];
      if (firstProperty.latitude !== mapCenter.lat || firstProperty.longitude !== mapCenter.lon) {
        setMapCenter({
          lat: firstProperty.latitude,
          lon: firstProperty.longitude,
        });
      }
    }
  }, [properties]); // Remove mapCenter from dependencies

  if (isLoading) return <div></div>;
  if (isError) return <div>Error loading properties.</div>;

  return (
    <div className="relative">
      {/* Sticky filter container */}
      <div className="sticky top-16 z-50 bg-white dark:bg-gray-900 pb-2 shadow-md">
        <Filter onFilterChange={handleFilterChange} />
      </div>
      
      <div className="relative z-40 mt-16">
        <div className="flex justify-between items-center mx-8 mt-6 space-x-4">
          {/* Showing Properties Text */}
          <div className="text-lg font-semibold ml-5" style={{ color: "var(--foreground)" }}>
            Showing {properties.length} properties
          </div>

          {/* View Toggle Buttons */}
          <div className="hidden md:flex space-x-3 mt-8 mr-5">
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

        <div className="p-4 mx-5 mt-2">
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
    </div>
  );
}

export default PropertyContent;