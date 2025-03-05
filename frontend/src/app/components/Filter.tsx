import React, { useState, useCallback } from "react";
import Slider from "react-input-slider";
import { FaFilter, FaUniversity, FaMapMarkerAlt, FaDollarSign, FaCalendarAlt, FaBed, FaUtensils, FaBath } from "react-icons/fa";
import type { IconType } from "react-icons";
import "react-datepicker/dist/react-datepicker.css";

export type RoomType = 'private' | 'shared';
export type KitchenType = 'private' | 'shared';
export type BathroomType = 'private' | 'shared';
export type PropertyType = 'apartment' | 'house' | 'commercial' | 'land';

export interface FilterState {
  sort?: string;
  university?: string;
  locality?: string;
  minPrice?: number;
  maxPrice?: number;
  moveInMonth?: string[];
  stayDuration?: string;
  roomType?: RoomType[];
  kitchenType?: KitchenType[];
  bathroomType?: BathroomType[];
  propertyType?: PropertyType;
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
    minPrice: 500,
    stayDuration: ''
  });
  const [budget, setBudget] = useState({ x: 500 });

  const handleFilterChange = useCallback((type: keyof FilterState, value: any) => {
    setFilters(prev => {
      const newFilters = { ...prev, [type]: value };
      // Only call onFilterChange if the filters have actually changed
      if (JSON.stringify(prev) !== JSON.stringify(newFilters)) {
        onFilterChange({
          ...newFilters,
          minPrice: budget.x
        });
      }
      return newFilters;
    });
  }, [budget.x, onFilterChange]);

  const handleBudgetChange = useCallback(({ x }: { x: number }) => {
    setBudget({ x });
    onFilterChange({
      ...filters,
      minPrice: x
    });
  }, [filters, onFilterChange]);

  const toggleDropdown = useCallback((filter: string) => {
    setActiveDropdown(activeDropdown === filter ? null : filter);
  }, [activeDropdown]);

  const clearAllFilters = useCallback(() => {
    const emptyFilters = {
      roomType: [],
      kitchenType: [],
      bathroomType: [],
      moveInMonth: [],
      sort: '',
      university: '',
      locality: '',
      minPrice: 500,
      stayDuration: ''
    };
    setFilters(emptyFilters);
    setBudget({ x: 500 });
    setActiveDropdown(null);
    onFilterChange(emptyFilters);
  }, [onFilterChange]);

  return (
    <div
      className="flex flex-wrap gap-4 p-4 rounded-lg shadow-md mt-16"
      style={{
        backgroundColor: "var(--background)",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Filter Buttons */}
      {["Sort", "University", "Locality", "Budget", "Move in Month", "Stay Duration", "Room Type", "Kitchen Type", "Bathroom Type"].map((filter) => (
        <div key={filter} className="relative">
          <button
            className="px-4 py-2 rounded-full text-sm font-semibold shadow-md flex items-center"
            style={{
              backgroundColor: "var(--card)",
              border: activeDropdown === filter ? `1px solid var(--cta)` : "1px solid var(--gray-border)",
            }}
            onClick={() => toggleDropdown(filter)}
          >
            {getFilterIcon(filter)}
            {filter}
          </button>

          {/* Dropdown */}
          {activeDropdown === filter && (
            <div
              className="absolute top-full mt-3 left-0 w-60 p-4 rounded-lg shadow-lg z-20"
              style={{
                backgroundColor: "var(--background)",
                border: `1px solid var(--cta)`,
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
                    xstep={500}
                    xmin={500}
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
                  {["Less than 6 months", "6-12 months", "1 year+"].map((option) => (
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
              )}

              {(filter === "University" || filter === "Locality") && (
                <input
                  type="text"
                  placeholder={`Enter ${filter.toLowerCase()}...`}
                  className="w-full p-2 rounded border"
                  value={filter === "University" ? filters.university : filters.locality}
                  onChange={(e) => handleFilterChange(
                    filter === "University" ? "university" : "locality",
                    e.target.value
                  )}
                />
              )}
            </div>
          )}
        </div>
      ))}

      {/* Clear All */}
      <button
        className="text-sm font-semibold ml-auto"
        style={{
          color: "var(--cta-active)",
        }}
        onClick={clearAllFilters}
      >
        Clear All
      </button>
    </div>
  );
} 