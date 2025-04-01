"use client"

import React, { useState, useCallback, useEffect } from "react";
import Slider from "react-input-slider";
import { FaFilter, FaUniversity, FaMapMarkerAlt, FaDollarSign, FaCalendarAlt, FaBed, FaUtensils, FaBath } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";
import { createPortal } from "react-dom";
import { useGetUniversitiesByLocationQuery } from "../redux/slices/apiSlice";
import { useSearchParams } from 'next/navigation';

export type RoomType = 'private' | 'shared';
export type KitchenType = 'private' | 'shared';
export type BathroomType = 'private' | 'shared';
export type PropertyType = 'apartment' | 'house' | 'commercial' | 'land';

export interface FilterState {
  sort?: string;
  university?: string;
  locality?: string;
  city?: string;
  country?: string;
  minPrice?: number;
  maxPrice?: number;
  moveInMonth?: string[];
  stayDuration?: string;
  roomType?: RoomType[];
  kitchenType?: KitchenType[];
  bathroomType?: BathroomType[];
}

interface FilterProps {
  onFilterChange: (filters: FilterState) => void;
}

// Function to return the correct icon for each filter
const getFilterIcon = (filter: string) => {
  const iconStyle = { className: "mr-2", size: 16 };
  switch (filter) {
    case "Sort":
      return <FaFilter {...iconStyle} />;
    case "University":
      return <FaUniversity {...iconStyle} />;
    case "City":
      return <FaMapMarkerAlt {...iconStyle} />;
    case "Locality":
      return <FaMapMarkerAlt {...iconStyle} />;
    case "Budget":
      return <FaDollarSign {...iconStyle} />;
    case "Move in Month":
      return <FaCalendarAlt {...iconStyle} />;
    case "Stay Duration":
    case "Room Type":
      return <FaBed {...iconStyle} />;
    case "Kitchen Type":
      return <FaUtensils {...iconStyle} />;
    case "Bathroom Type":
      return <FaBath {...iconStyle} />;
    default:
      return null;
  }
};

// Room type options with display names
const roomTypeOptions = [
  { value: 'private' as RoomType, label: 'Private Room' },
  { value: 'shared' as RoomType, label: 'Shared Room' }
];

const kitchenTypeOptions = [
  { value: 'private' as KitchenType, label: 'Private Kitchen' },
  { value: 'shared' as KitchenType, label: 'Shared Kitchen' }
];

const bathroomTypeOptions = [
  { value: 'private' as BathroomType, label: 'Private Bathroom' },
  { value: 'shared' as BathroomType, label: 'Shared Bathroom' }
];

const cleanFilters = (filters: FilterState): FilterState => {
  const cleanedFilters: Partial<FilterState> = {};
  
  Object.entries(filters).forEach(([key, value]) => {
    // Skip empty arrays, undefined, empty strings, and default values
    if (
      value !== undefined && 
      value !== '' && 
      !(Array.isArray(value) && value.length === 0) &&
      !(key === 'minPrice' && value === 500)
    ) {
      cleanedFilters[key as keyof FilterState] = value;
    }
  });
  
  return cleanedFilters;
};

export default function Filter({ onFilterChange }: FilterProps) {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    roomType: [],
    kitchenType: [],
    bathroomType: [],
    moveInMonth: [],
    sort: '',
    university: '',
    locality: '',
    city: '',
    country: 'Canada', // Default country
    minPrice: 500,
    stayDuration: ''
  });
  const [budget, setBudget] = useState({ x: 500 });
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);

  // Add searchParams to get URL parameters
  const searchParams = useSearchParams();

  // Add these states to manage city input for university fetching
  const [debouncedCity, setDebouncedCity] = useState('');

  // Extract city from URL search parameter on component mount
  useEffect(() => {
    const searchQuery = searchParams.get('search');
    if (searchQuery) {
      // Assume the search query is the city name
      const cityFromUrl = searchQuery.trim();
      if (cityFromUrl) {
        // Update the city in filters
        setFilters(prev => ({
          ...prev,
          city: cityFromUrl
        }));
        // Immediately set the debounced city to trigger university search
        setDebouncedCity(cityFromUrl);
      }
    }
  }, [searchParams]);

  // Auto-load universities when University filter is clicked
  useEffect(() => {
    if (activeDropdown === "University" && !debouncedCity && searchParams.get('search')) {
      // If no city is set yet but we have a search parameter, use it
      setDebouncedCity(searchParams.get('search')?.trim() || '');
    }
  }, [activeDropdown, debouncedCity, searchParams]);

  // Debounce the city input to prevent too many API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      if (filters.city) {
        setDebouncedCity(filters.city);
      }
    }, 500); // 500ms debounce
    
    return () => clearTimeout(timer);
  }, [filters.city]);

  // Fetch universities based on city
  const {
    data: universities = [],
    isLoading: isLoadingUniversities,
  } = useGetUniversitiesByLocationQuery(
    { city: debouncedCity, country: filters.country || 'Canada' },
    { skip: !debouncedCity }
  );

  // Set up portal container on mount
  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof document !== 'undefined') {
      // Create portal container if it doesn't exist
      let container = document.getElementById('filter-dropdown-portal');
      if (!container) {
        container = document.createElement('div');
        container.id = 'filter-dropdown-portal';
        container.style.position = 'fixed';
        container.style.top = '0';
        container.style.left = '0';
        container.style.width = '100%';
        container.style.height = '0';
        container.style.zIndex = '9999';
        container.style.pointerEvents = 'none';
        document.body.appendChild(container);
      }
      setPortalContainer(container);
    }

    // Clean up on unmount
    return () => {
      if (typeof document !== 'undefined') {
        const container = document.getElementById('filter-dropdown-portal');
        if (container && container.childNodes.length === 0) {
          document.body.removeChild(container);
        }
      }
    };
  }, []);

  const handleFilterChange = useCallback((type: keyof FilterState, value: any) => {
    setFilters(prev => ({
      ...prev,
      [type]: value
    }));
  }, []);

  // Add effect to handle filter changes
  useEffect(() => {
    onFilterChange(cleanFilters(filters));
  }, [filters, onFilterChange]);

  const handleBudgetChange = useCallback(({ x }: { x: number }) => {
    setBudget({ x });
    handleFilterChange('minPrice', x);
  }, [handleFilterChange]);

  const toggleDropdown = useCallback((filter: string, event: React.MouseEvent) => {
    const buttonElement = event.currentTarget as HTMLElement;
    const rect = buttonElement.getBoundingClientRect();
    
    setDropdownPosition({
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX,
      width: 240 // Fixed width for dropdown
    });
    
    // If University filter is being opened and we have a search parameter but no debounced city
    if (filter === "University" && activeDropdown !== filter && searchParams.get('search')) {
      const cityFromUrl = searchParams.get('search')?.trim() || '';
      if (cityFromUrl && !debouncedCity) {
        setDebouncedCity(cityFromUrl);
      }
    }
    
    setActiveDropdown(activeDropdown === filter ? null : filter);
  }, [activeDropdown, debouncedCity, searchParams]);

  const clearAllFilters = useCallback(() => {
    const emptyFilters = {
      roomType: [],
      kitchenType: [],
      bathroomType: [],
      moveInMonth: [],
      sort: '',
      university: '',
      locality: '',
      city: '',
      country: 'Canada', // Keep default country
      minPrice: 500,
      maxPrice: undefined,
      stayDuration: ''
    };
    setFilters(emptyFilters);
    setBudget({ x: 500 });
    setActiveDropdown(null);
    onFilterChange({}); // Send empty object when clearing filters
  }, [onFilterChange]);

  // Check if any filters are applied
  const hasActiveFilters = useCallback(() => {
    return (
      (filters.roomType && filters.roomType.length > 0) ||
      (filters.kitchenType && filters.kitchenType.length > 0) ||
      (filters.bathroomType && filters.bathroomType.length > 0) ||
      (filters.moveInMonth && filters.moveInMonth.length > 0) ||
      filters.sort ||
      filters.university ||
      filters.locality ||
      filters.city ||
      (filters.country && filters.country !== 'Canada') ||
      (filters.minPrice && filters.minPrice !== 500) ||
      filters.stayDuration
    );
  }, [filters]);

  // Update filterButtons
  const filterButtons = [
    "Sort", "City", "University", "Locality", "Budget", "Move in Month", 
    "Stay Duration", "Room Type", "Kitchen Type", "Bathroom Type"
  ];

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (activeDropdown && 
          !(event.target as HTMLElement).closest('.filter-dropdown') && 
          !(event.target as HTMLElement).closest('.filter-button')) {
        setActiveDropdown(null);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [activeDropdown]);

  // Render dropdown content
  const renderDropdownContent = (filter: string) => {
    return (
      <div
        className="filter-dropdown p-4 rounded-lg shadow-lg"
        style={{
          backgroundColor: "var(--background)",
          border: `1px solid var(--cta)`,
          position: "absolute",
          top: `${dropdownPosition.top}px`,
          left: `${dropdownPosition.left}px`,
          transform: "translateX(0)",
          width: `${dropdownPosition.width}px`,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          pointerEvents: "auto",
          maxHeight: "80vh",
          overflowY: "auto",
          marginTop: "8px" // Added this line
        }}
      >
        {filter === "Sort" && (
          <ul className="space-y-2">
            {["Price: Low to High", "Price: High to Low", "Newest Listings"].map((option) => (
              <li key={option} className="flex items-center">
                <input
                  type="radio"
                  id={`sort-${option}`}
                  name="sort"
                  checked={filters.sort === option}
                  onChange={() => handleFilterChange("sort", option)}
                  className="mr-2 rounded"
                />
                <label htmlFor={`sort-${option}`}>{option}</label>
              </li>
            ))}
          </ul>
        )}

        {filter === "Budget" && (
          <div>
            <p className="mb-2 text-sm font-medium" style={{ color: "var(--copy-secondary)" }}>
              ${budget.x}+
            </p>
            <Slider
              axis="x"
              xstep={100}
              xmin={100}
              xmax={5000}
              x={budget.x}
              onChange={handleBudgetChange}
              styles={{
                track: {
                  backgroundColor: "var(--gray-border)",
                  height: "6px",
                },
                active: {
                  backgroundColor: "var(--cta)",
                },
                thumb: {
                  width: "16px",
                  height: "16px",
                  backgroundColor: "var(--cta)",
                },
              }}
            />
          </div>
        )}

        {filter === "Room Type" && (
          <ul className="space-y-2">
            {roomTypeOptions.map(({ value, label }) => (
              <li key={value} className="flex items-center">
                <input
                  type="checkbox"
                  id={`room-${value}`}
                  checked={filters.roomType?.includes(value)}
                  onChange={(e) => {
                    const currentTypes = filters.roomType || [];
                    handleFilterChange(
                      "roomType",
                      e.target.checked
                        ? [...currentTypes, value]
                        : currentTypes.filter(type => type !== value)
                    );
                  }}
                  className="mr-2 rounded"
                />
                <label htmlFor={`room-${value}`}>{label}</label>
              </li>
            ))}
          </ul>
        )}

        {filter === "Kitchen Type" && (
          <ul className="space-y-2">
            {kitchenTypeOptions.map(({ value, label }) => (
              <li key={value} className="flex items-center">
                <input
                  type="checkbox"
                  id={`kitchen-${value}`}
                  checked={filters.kitchenType?.includes(value)}
                  onChange={(e) => {
                    const currentTypes = filters.kitchenType || [];
                    handleFilterChange(
                      "kitchenType",
                      e.target.checked
                        ? [...currentTypes, value]
                        : currentTypes.filter(type => type !== value)
                    );
                  }}
                  className="mr-2 rounded"
                />
                <label htmlFor={`kitchen-${value}`}>{label}</label>
              </li>
            ))}
          </ul>
        )}

        {filter === "Bathroom Type" && (
          <ul className="space-y-2">
            {bathroomTypeOptions.map(({ value, label }) => (
              <li key={value} className="flex items-center">
                <input
                  type="checkbox"
                  id={`bathroom-${value}`}
                  checked={filters.bathroomType?.includes(value)}
                  onChange={(e) => {
                    const currentTypes = filters.bathroomType || [];
                    handleFilterChange(
                      "bathroomType",
                      e.target.checked
                        ? [...currentTypes, value]
                        : currentTypes.filter(type => type !== value)
                    );
                  }}
                  className="mr-2 rounded"
                />
                <label htmlFor={`bathroom-${value}`}>{label}</label>
              </li>
            ))}
          </ul>
        )}

        {filter === "Move in Month" && (
          <div className="grid grid-cols-3 gap-2">
            {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((month) => (
              <div key={month} className="flex items-center">
                <input
                  type="checkbox"
                  id={`month-${month}`}
                  checked={filters.moveInMonth?.includes(month)}
                  onChange={(e) => {
                    const currentMonths = filters.moveInMonth || [];
                    handleFilterChange(
                      "moveInMonth",
                      e.target.checked
                        ? [...currentMonths, month]
                        : currentMonths.filter(m => m !== month)
                    );
                  }}
                  className="mr-2 rounded"
                />
                <label htmlFor={`month-${month}`}>{month}</label>
              </div>
            ))}
          </div>
        )}

        {filter === "Stay Duration" && (
          <ul className="space-y-2">
            <li>
              <h4 className="text-sm font-semibold mb-2">General Durations</h4>
              <ul className="space-y-2 ml-2 mb-4">
                {["Month-to-Month", "Less than 6 months", "6-12 months", "1 year+"].map((option) => (
                  <li key={option} className="flex items-center">
                    <input
                      type="radio"
                      id={`duration-${option}`}
                      name="duration"
                      checked={filters.stayDuration === option}
                      onChange={() => handleFilterChange("stayDuration", option)}
                      className="mr-2 rounded"
                    />
                    <label htmlFor={`duration-${option}`}>{option}</label>
                  </li>
                ))}
              </ul>
            </li>
            
            <li>
              <h4 className="text-sm font-semibold mb-2">Specific Durations</h4>
              <ul className="space-y-2 ml-2 grid grid-cols-1 gap-2">
                <li className="flex items-center">
                  <input
                    type="radio"
                    id="duration-jan-to-mar"
                    name="duration"
                    checked={filters.stayDuration === "Jan to Mar"}
                    onChange={() => handleFilterChange("stayDuration", "Jan to Mar")}
                    className="mr-2 rounded"
                  />
                  <label htmlFor="duration-jan-to-mar">Jan to Mar (Q1)</label>
                </li>
                <li className="flex items-center">
                  <input
                    type="radio"
                    id="duration-apr-to-jun"
                    name="duration"
                    checked={filters.stayDuration === "Apr to Jun"}
                    onChange={() => handleFilterChange("stayDuration", "Apr to Jun")}
                    className="mr-2 rounded"
                  />
                  <label htmlFor="duration-apr-to-jun">Apr to Jun (Q2)</label>
                </li>
                <li className="flex items-center">
                  <input
                    type="radio"
                    id="duration-jul-to-sep"
                    name="duration"
                    checked={filters.stayDuration === "Jul to Sep"}
                    onChange={() => handleFilterChange("stayDuration", "Jul to Sep")}
                    className="mr-2 rounded"
                  />
                  <label htmlFor="duration-jul-to-sep">Jul to Sep (Q3)</label>
                </li>
                <li className="flex items-center">
                  <input
                    type="radio"
                    id="duration-oct-to-dec"
                    name="duration"
                    checked={filters.stayDuration === "Oct to Dec"}
                    onChange={() => handleFilterChange("stayDuration", "Oct to Dec")}
                    className="mr-2 rounded"
                  />
                  <label htmlFor="duration-oct-to-dec">Oct to Dec (Q4)</label>
                </li>
                <li className="flex items-center">
                  <input
                    type="radio"
                    id="duration-jan-to-dec"
                    name="duration"
                    checked={filters.stayDuration === "Jan to Dec"}
                    onChange={() => handleFilterChange("stayDuration", "Jan to Dec")}
                    className="mr-2 rounded"
                  />
                  <label htmlFor="duration-jan-to-dec">Jan to Dec (Full Year)</label>
                </li>
              </ul>
            </li>
          </ul>
        )}

        {filter === "University" && (
          <div>
            {isLoadingUniversities ? (
              <div className="py-2 text-sm">Loading universities...</div>
            ) : universities.length > 0 ? (
              <div>
                <select
                  className="w-full p-2 rounded border"
                  value={filters.university || ''}
                  onChange={(e) => handleFilterChange("university", e.target.value)}
                >
                  <option value="">All Universities</option>
                  {universities.map((uni, index) => (
                    <option key={index} value={uni.name}>
                      {uni.name}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <div className="py-2 text-sm">No universities found for {debouncedCity}</div>
            )}
          </div>
        )}

        {filter === "Locality" && (
          <input
            type="text"
            placeholder="Enter locality..."
            className="w-full z-64 p-2 rounded border"
            value={filters.locality || ''}
            onChange={(e) => handleFilterChange("locality", e.target.value)}
          />
        )}

        {filter === "City" && (
          <div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">City</label>
              <input
                type="text"
                placeholder="Enter city name"
                className="w-full p-2 rounded border"
                value={filters.city || ''}
                onChange={(e) => handleFilterChange("city", e.target.value)}
              />
            </div>
            
            <div className="mb-2">
              <label className="block text-sm font-medium mb-1">Country</label>
              <select
                className="w-full p-2 rounded border"
                value={filters.country || 'Canada'}
                onChange={(e) => handleFilterChange("country", e.target.value)}
              >
                <option value="Canada">Canada</option>
                <option value="USA">United States</option>
                <option value="UK">United Kingdom</option>
                <option value="India">India</option>
                <option value="Australia">Australia</option>
              </select>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="relative">
      <div 
        className="overflow-x-auto flex-nowrap hide-scrollbar"
        style={{
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
      >
        <div
          className="flex gap-4 p-4 rounded-lg shadow-md relative"
          style={{
            backgroundColor: "var(--background)",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          {filterButtons.map((filter) => (
            <div key={filter} className="relative flex-shrink-0">
              <button
                className="filter-button px-4 py-2 rounded-full text-sm font-semibold shadow-md flex items-center whitespace-nowrap"
                style={{
                  backgroundColor: "var(--card)",
                  border: activeDropdown === filter ? `1px solid var(--cta)` : "1px solid var(--gray-border)",
                }}
                onClick={(e) => toggleDropdown(filter, e)}
              >
                {getFilterIcon(filter)}
                <span className="truncate">{filter}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
      
      {/* Render dropdowns in portal */}
      {portalContainer && activeDropdown && createPortal(
        renderDropdownContent(activeDropdown),
        portalContainer
      )}
      
      {/* Clear All Button - Only show when filters are applied */}
      {hasActiveFilters() && (
        <div className="flex justify-end mt-4 px-4">
          <button
            className="text-sm font-semibold py-2 px-6 rounded-full shadow-md transition-transform hover:scale-105"
            style={{
              color: "var(--background)",
              backgroundColor: "var(--cta-active)",
            }}
            onClick={clearAllFilters}
          >
            Clear All Filters
          </button>
        </div>
      )}
      
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @media (max-width: 768px) {
          .flex-nowrap {
            flex-wrap: nowrap !important;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            padding-bottom: 1rem;
          }
        }
      `}</style>
    </div>
  );
}