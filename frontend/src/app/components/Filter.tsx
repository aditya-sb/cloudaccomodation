import React, { useState } from "react";
import Slider from "react-input-slider";
import { FaFilter, FaUniversity, FaMapMarkerAlt, FaDollarSign, FaCalendarAlt, FaBed } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";

// Define the types for each filter and other states
type Filter = "Sort" | "University" | "Locality" | "Budget" | "Move in Month" | "Stay Duration" | "Room Type";

interface Budget {
  x: number;
}

interface FilterProps {
  budget: Budget;
  setBudget: React.Dispatch<React.SetStateAction<Budget>>;
  moveInDate?: Date | null;
  setMoveInDate?: React.Dispatch<React.SetStateAction<Date | null>>;
}

export default function Filter() {
  const [activeDropdown, setActiveDropdown] = useState<Filter | null>(null);
  const [budget, setBudget] = useState<Budget>({ x: 500 });
  const [moveInDate, setMoveInDate] = useState<Date | null>(null);

  const toggleDropdown = (filter: Filter) => {
    setActiveDropdown(activeDropdown === filter ? null : filter);
  };

  return (
    <div
      className="flex flex-wrap gap-4 p-4 rounded-lg shadow-md mt-16"
      style={{
        backgroundColor: "var(--background)",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Filter Buttons */}
      {["Sort", "University", "Locality", "Budget", "Move in Month", "Stay Duration", "Room Type"].map((filter) => (
        <div key={filter} className="relative">
          <button
            className="px-4 py-2 rounded-full text-sm font-semibold shadow-md flex items-center"
            style={{
              backgroundColor: "var(--card)",
              border: activeDropdown === filter ? `1px solid var(--cta)` : "1px solid var(--gray-border)",
            }}
            onClick={() => toggleDropdown(filter as Filter)}
          >
            {getFilterIcon(filter as Filter)}
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
              {renderDropdownContent(filter as Filter, { budget, setBudget, moveInDate, setMoveInDate })}
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
        onClick={() => setActiveDropdown(null)}
      >
        Clear All
      </button>
    </div>
  );
}

// Render dropdown content dynamically
function renderDropdownContent(
  filter: Filter,
  { budget, setBudget }: FilterProps
) {
  switch (filter) {
    case "Sort":
    case "University":
    case "Locality":
    case "Stay Duration":
    case "Room Type":
      const options = getDropdownOptions(filter);
      return (
        <ul className="space-y-2">
          {options.map((option, index) => (
            <li key={index} className="flex items-center">
              <input
                type="checkbox"
                id={`${filter}-${option}`}
                className="mr-2 rounded"
                style={{
                  accentColor: "var(--cta)",
                  border: `1px solid var(--cta)`,
                }}
              />
              <label
                htmlFor={`${filter}-${option}`}
                className="text-sm font-medium"
                style={{ color: "var(--copy-secondary)" }}
              >
                {option}
              </label>
            </li>
          ))}
        </ul>
      );
    case "Budget":
      return (
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
            onChange={({ x }) => setBudget({ x })}
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
      );
    case "Move in Month":
      return (
        <div className="grid grid-cols-3 gap-2">
          {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((month) => (
            <div key={month} className="flex items-center">
              <input
                type="checkbox"
                id={`month-${month}`}
                className="mr-2 rounded"
                style={{
                  accentColor: "var(--cta)",
                  border: `1px solid var(--cta)`,
                }}
              />
              <label
                htmlFor={`month-${month}`}
                className="text-sm font-medium"
                style={{ color: "var(--copy-secondary)" }}
              >
                {month}
              </label>
            </div>
          ))}
        </div>
      );
    default:
      return null;
  }
}

// Function to return dropdown options dynamically
function getDropdownOptions(filter: Filter) {
  switch (filter) {
    case "Sort":
      return ["Price: Low to High", "Price: High to Low", "Newest Listings"];
    case "University":
      return ["University of Toronto", "McGill University", "University of British Columbia"];
    case "Locality":
      return ["Downtown", "Midtown", "Suburbs"];
    case "Stay Duration":
      return ["Less than 6 months", "6-12 months", "1 year+"];
    case "Room Type":
      return ["Single", "Couple", "Family"];
    default:
      return [];
  }
}

// Function to return the correct icon for each filter
function getFilterIcon(filter: Filter) {
  switch (filter) {
    case "Sort":
      return <FaFilter className="mr-2" />;
    case "University":
      return <FaUniversity className="mr-2" />;
    case "Locality":
      return <FaMapMarkerAlt className="mr-2" />;
    case "Budget":
      return <FaDollarSign className="mr-2" />;
    case "Move in Month":
      return <FaCalendarAlt className="mr-2" />;
    case "Stay Duration":
      return <FaBed className="mr-2" />;
    default:
      return null;
  }
}
