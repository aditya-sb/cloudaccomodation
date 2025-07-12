import { useEffect, useState, useMemo, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import ListView from "./ListView";
import dynamic from 'next/dynamic';
import { FaThList, FaMapMarkedAlt } from "react-icons/fa";
import Filter, { FilterState } from "../components/Filter";
import { useGetPropertiesQuery } from "../redux/slices/apiSlice";

// Dynamically import MapView with no SSR
const MapView = dynamic(() => import('./MapView'), { ssr: false });

function PropertyContent() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const city = searchParams.get("city");
  const [isMobile, setIsMobile] = useState(false);
  const [view, setView] = useState<"list" | "map">("list");
  const [filters, setFilters] = useState<FilterState>({});
  const [isClient, setIsClient] = useState(false);

  // Check if we're on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setView("list"); // Force list view on mobile
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Memoize query params to prevent unnecessary re-renders
  const queryParams = useMemo(() => {
    // Build query params object, removing empty values
    const params: Record<string, any> = {};
    
    // Use search parameter for the enhanced search functionality
    if (search) {
      params.search = search;
    } else if (city) {
      params.search = city; // Fallback to city if no search param
    }
    
    // Add other filter parameters
    if (filters.sort) params.sortBy = filters.sort;
    if (filters.university) params.university = filters.university;
    if (filters.locality) params.locality = filters.locality;
    if (filters.minPrice) params.minPrice = filters.minPrice;
    if (filters.maxPrice) params.maxPrice = filters.maxPrice;
    if (filters.country) params.country = filters.country;
    if (filters.type) params.type = filters.type;
    // if (filters.verified !== undefined) params.verified = filters.verified;
    
    // Handle array parameters
    if (filters.roomType && filters.roomType.length > 0) {
      params.roomType = filters.roomType.join(',');
    }
    if (filters.kitchenType && filters.kitchenType.length > 0) {
      params.kitchenType = filters.kitchenType.join(',');
    }
    if (filters.bathroomType && filters.bathroomType.length > 0) {
      params.bathroomType = filters.bathroomType.join(',');
    }
    if (filters.moveInMonth && filters.moveInMonth.length > 0) {
      params.moveInMonth = filters.moveInMonth.join(',');
    }
    if (filters.stayDuration) params.stayDuration = filters.stayDuration;
    
    return params;
  }, [search, city, filters]);

  const { data: properties = [], isLoading, isError, error } = useGetPropertiesQuery(queryParams);

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

  // Clear all filters
  const clearAllFilters = useCallback(() => {
    setFilters({});
  }, []);

  // Get search term for display
  const getSearchTerm = () => {
    if (search) return search;
    if (city) return city;
    return "All Properties";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <div className="sticky top-16 z-20 bg-white dark:bg-gray-900 shadow-md">
          <div className="h-16 bg-gray-200 animate-pulse"></div>
        </div>
        <div className="p-8">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-48 mb-4"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-gray-200 rounded-lg h-64"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Properties</h2>
          <p className="text-gray-600 mb-4">
            {error?.message || "There was an error loading the properties. Please try again."}
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      {/* Sticky filter container */}
      <div className="sticky top-16 z-20 bg-white dark:bg-gray-900 shadow-md"
        style={{ marginBottom: "5rem" }}>
        <Filter onFilterChange={handleFilterChange} currentFilters={filters} />
      </div>
      
      <div className="relative mt-16">
        <div className="flex justify-between items-center mx-8 mt-6 space-x-4">
          {/* Showing Properties Text */}
          <div className="text-lg font-semibold ml-5" style={{ color: "var(--foreground)" }}>
            {search || city ? (
              <span>
                Showing {properties.length} properties for "{getSearchTerm()}"
              </span>
            ) : (
              <span>Showing {properties.length} properties</span>
            )}
          </div>

          {/* View Toggle Buttons */}
          <div className="hidden md:flex space-x-3 mt-8 mr-5">
            <button
              onClick={() => setView("list")}
              className={`flex items-center px-4 py-2 rounded-lg shadow-lg text-sm transition-all duration-200 ${
                view === "list"
                  ? "bg-gradient-to-r from-green-500 to-teal-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              <FaThList className="mr-2 text-lg" /> List View
            </button>
            <button
              onClick={() => setView("map")}
              className={`flex items-center px-4 py-2 rounded-lg shadow-lg text-sm transition-all duration-200 ${
                view === "map"
                  ? "bg-gradient-to-r from-green-500 to-teal-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              <FaMapMarkedAlt className="mr-2 text-lg" /> Map View
            </button>
          </div>
        </div>

        <div className="p-4 mx-5 mt-2 min-h-[calc(100vh-200px)]">
          {properties.length === 0 ? (
            // No properties found state
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-300px)] text-center">
              <svg
                width="200"
                height="200"
                viewBox="0 0 200 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mb-8"
              >
                {/* Background circle */}
                <circle cx="100" cy="100" r="90" fill="#F3F4F6" stroke="#E5E7EB" strokeWidth="2"/>
                
                {/* House outline */}
                <path d="M60 120 L100 80 L140 120 L140 160 L60 160 Z" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="2"/>
                
                {/* Roof */}
                <path d="M55 120 L100 75 L145 120" fill="none" stroke="#DC2626" strokeWidth="3" strokeLinecap="round"/>
                
                {/* Door */}
                <rect x="90" y="135" width="20" height="25" fill="#8B5CF6" stroke="#7C3AED" strokeWidth="1"/>
                <circle cx="106" cy="147" r="1.5" fill="#7C3AED"/>
                
                {/* Windows */}
                <rect x="70" y="130" width="12" height="12" fill="#60A5FA" stroke="#3B82F6" strokeWidth="1"/>
                <rect x="118" y="130" width="12" height="12" fill="#60A5FA" stroke="#3B82F6" strokeWidth="1"/>
                
                {/* Cross lines on windows */}
                <line x1="76" y1="130" x2="76" y2="142" stroke="#3B82F6" strokeWidth="1"/>
                <line x1="70" y1="136" x2="82" y2="136" stroke="#3B82F6" strokeWidth="1"/>
                <line x1="124" y1="130" x2="124" y2="142" stroke="#3B82F6" strokeWidth="1"/>
                <line x1="118" y1="136" x2="130" y2="136" stroke="#3B82F6" strokeWidth="1"/>
                
                {/* Sad face */}
                <circle cx="85" cy="95" r="3" fill="#6B7280"/>
                <circle cx="115" cy="95" r="3" fill="#6B7280"/>
                <path d="M85 110 Q100 120 115 110" stroke="#6B7280" strokeWidth="2" fill="none" strokeLinecap="round"/>
                
                {/* Search magnifying glass */}
                <circle cx="150" cy="50" r="15" fill="none" stroke="#9CA3AF" strokeWidth="3"/>
                <line x1="161" y1="61" x2="170" y2="70" stroke="#9CA3AF" strokeWidth="3" strokeLinecap="round"/>
                <line x1="145" y1="45" x2="155" y2="55" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round"/>
                <line x1="155" y1="45" x2="145" y2="55" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                No Properties Found
              </h3>
              <p className="text-gray-600 text-lg mb-6 max-w-md">
                {search || city ? (
                  <>We couldn't find any properties matching "{getSearchTerm()}". Try adjusting your search or filters.</>
                ) : (
                  <>We couldn't find any properties matching your criteria. Try adjusting your filters.</>
                )}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={clearAllFilters}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg"
                >
                  Clear All Filters
                </button>
                <button 
                  onClick={() => window.location.href = '/properties'}
                  className="px-6 py-3 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-all duration-200"
                >
                  View All Properties
                </button>
              </div>
            </div>
          ) : (view === "list" || isMobile) ? (
            <ListView properties={properties} />
          ) : isClient ? (
            <MapView 
              properties={properties} 
              mapAddress={search || city || "Canada"} // Use address instead of coordinates
              mapLocation={getSearchTerm()} 
            />
          ) : (
            <div className="flex h-screen">
              <div className="relative w-3/5 h-full shadow-lg bg-gray-100 animate-pulse" />
              <div className="flex-1 h-full overflow-y-auto p-6 bg-gray-50">
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PropertyContent;