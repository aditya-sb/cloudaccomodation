"use client";
import React from 'react';

export interface BedroomDetail {
  name: string;
  rent: number;
  sizeSqFt: number;
  furnished: boolean;
  privateWashroom: boolean;
  sharedWashroom: boolean;
  sharedKitchen: boolean;
}

interface SelectedBedroomDropdownProps {
  bedroomDetails: BedroomDetail[];
  selectedBedroom: BedroomDetail | null;
  onBedroomChange: (bedroom: BedroomDetail | null) => void;
  currency: string;
}

const SelectedBedroomDropdown: React.FC<SelectedBedroomDropdownProps> = ({
  bedroomDetails,
  selectedBedroom,
  onBedroomChange,
  currency
}) => {
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    if (selectedId) {
      const bedroom = bedroomDetails.find(b => b.name === selectedId);
      onBedroomChange(bedroom || null);
    } else {
      onBedroomChange(null);
    }
  };

  return (
    <div className="space-y-1.5">
      <div className="text-gray-600 text-xs font-medium">Select Bedroom:</div>
      <div className="relative">
        <select
          value={selectedBedroom?.name || ""}
          onChange={handleSelectChange}
          className="p-1.5 text-sm rounded-md w-full border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white text-gray-700 shadow-sm hover:shadow-md"
        >
          <option value="">Select a bedroom</option>
          {bedroomDetails.map((bedroom) => (
            <option key={bedroom.name} value={bedroom.name}>
              {bedroom.name} - {currency.toUpperCase()} {bedroom.rent} (Size: {bedroom.sizeSqFt} sq.ft)
            </option>
          ))}
        </select>
      </div>
      {selectedBedroom && (
        <div className="mt-2 p-2 bg-blue-50 text-xs rounded-md">
          <div className="font-medium">Selected: {selectedBedroom.name}</div>
          <div className="flex justify-between mt-1">
            <span>Rent:</span>
            <span>{currency.toUpperCase()} {selectedBedroom.rent}</span>
          </div>
          <div className="flex justify-between">
            <span>Size:</span>
            <span>{selectedBedroom.sizeSqFt} sq.ft</span>
          </div>
          <div className="flex gap-2 mt-1 flex-wrap">
            {selectedBedroom.furnished && <span className="bg-green-100 text-green-800 px-1.5 py-0.5 rounded text-[10px]">Furnished</span>}
            {selectedBedroom.privateWashroom && <span className="bg-green-100 text-green-800 px-1.5 py-0.5 rounded text-[10px]">Private Washroom</span>}
            {selectedBedroom.sharedWashroom && <span className="bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded text-[10px]">Shared Washroom</span>}
            {selectedBedroom.sharedKitchen && <span className="bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded text-[10px]">Shared Kitchen</span>}
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectedBedroomDropdown; 