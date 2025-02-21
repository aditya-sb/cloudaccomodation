import React from "react";
import {
  ChevronRight,
  MapPin,
  Wifi,
  PersonStanding,
  Bike,
  Bus,
  Car,
  Wallet,
} from "lucide-react";

interface PropertyDetailsMobileProps {
  title: string;
  location: string;
  price: number;
  rent: number;
  availableFrom: string;
  description: string;
  distanceFromUniversity: string;
  utilities: string[];
  amenities: string | string[];
  overview: Array<{ bedrooms: number; bathrooms: number; squareFeet: number }>;
  securityDeposit: number;
  rentPayments: { type: string; dueDate: string; amount: number }[];
}

const PropertyDetailsMobile: React.FC<PropertyDetailsMobileProps> = ({
  title,
  location,
  price,
  description,
  rent,
  availableFrom,
  distanceFromUniversity,
  utilities,
  amenities,
  securityDeposit,
  rentPayments,
  overview,
}) => {
  if (!amenities) return null;

  let amenitiesList = [];
  try {
    // Handle the double-wrapped format
    // First get the string from the array (taking first element)
    const jsonString = Array.isArray(amenities) ? amenities[0] : amenities;
    // Then parse that string into an array
    amenitiesList = JSON.parse(jsonString);
  } catch (error) {
    console.error("Error parsing amenities:", error);
    return null;
  }

  return (
    <div className=" mx-auto bg-white rounded-lg shadow">
      {/* Header Section */}
      <div className="p-4 space-y-1">
        <div className="flex justify-between items-start">
          <div>
            <div className="inline-block bg-green-500 text-white text-xs px-3 py-2 rounded-lg mb-2">
              Available from {availableFrom}
            </div>
            <h1 className="text-xl font-semibold">{title}</h1>
            <p className="text-sm text-gray-500">{location}</p>
          </div>
          <div className="flex flex-col w-fit justify-center items-center bg-white px-3 py-3 rounded-lg shadow-lg">
            <span className="w-fit flex text-base font-semibold">RENT</span>
            <span className="w-fit flex text-lg font-bold">{price} CAD</span>
            <span className="w-fit text-sm text-gray-500">per month</span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 space-y-8">
        {/* Property Details */}
        <div className="grid grid-cols-3 border border-gray-300 gap-4 px-3 py-4 rounded-lg">
          <div className="text-center border-r py-2 border-gray-400 pr-4">
            <div className="font-semibold">{overview?.bedrooms} Bedrooms</div>
          </div>
          <div className="text-center border-r py-2 border-gray-400 pr-4">
            <div className="font-semibold">{overview?.bathrooms} Bathroom</div>
          </div>
          <div className="text-center py-2">
            <div className="font-semibold">{overview?.squareFeet} sq.ft</div>
          </div>
        </div>

        {/* Distance Info */}
        <div className="space-y-3 border border-blue-400 bg-blue-100 rounded-lg py-5 px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-gray-600" />
              <span className="font-medium text-gray-800">
                1.5 km from{" "}
                <span className="text-gray-800 font-bold">
                  University of Toronto
                </span>
              </span>
            </div>
            <button className="text-blue-600 hover:underline">
              Select
              <ChevronRight size={16} className="inline-block mr-1 mb-1" />
            </button>
          </div>
          {/* Transport Options */}
          <div className="grid grid-cols-4 gap-2">
            {[
              { time: 15, icon: <PersonStanding size={16} />, label: "Walk" },
              { time: 17, icon: <Bike size={16} />, label: "Bike" },
              { time: 12, icon: <Bus size={16} />, label: "Transit" },
              { time: 5, icon: <Car size={16} />, label: "Drive" },
            ].map((item, i) => (
              <div
                key={i}
                className="flex flex-col items-center p-2 bg-gray-100 rounded-md"
              >
                {item.icon}
                <div className="text-sm font-medium text-gray-800">
                  {item.time} min
                </div>
              </div>
            ))}
          </div>

          {/* Map and Street View Options */}
          <div className="flex gap-3 justify-center items-center mt-4">
            <div className="flex w-fit items-center justify-center px-6 py-2 bg-blue-600 rounded-md">
              <MapPin size={16} className="text-white" />
              <span className="ml-2 text-sm font-medium text-white">Map</span>
            </div>
            <div className="flex w-fit items-center justify-center px-4 py-2 bg-blue-600 rounded-md">
              <PersonStanding size={16} className="text-white" />
              <span className="ml-2 text-sm font-medium text-white">
                Street
              </span>
            </div>
          </div>
        </div>

        {/* Security Deposit */}
        <div className="flex flex-row items-center justify-between border border-blue-400 bg-blue-100 rounded-lg py-5 px-4">
          <span className="flex gap-2">
            <Wallet />
            Security Deposit:{" "}
            <span className="font-semibold text-blue-500">${500}</span>
          </span>
          <div className="flex items-center">
            <ChevronRight size={20} className="text-gray-400" />
          </div>
        </div>
            

        {/* Description */}
        <div className="space-y-2">
          <h3 className="font-semibold text-lg">Description</h3>
          {description.split(" ").length > 30 ? (
            <div className="text-gray-600">
              {description.split(" ").slice(0, 30).join(" ")}
              <span className="text-blue-600 hover:underline cursor-pointer">
                , view more
              </span>
            </div>
          ) : (
            <div
              className="text-gray-600"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          )}
        </div>

        {/* Utilities */}
        <div className="space-y-2 border-b pb-4">
          <h3 className="font-semibold">Utilities</h3>
          <div className="flex gap-2">
            {utilities?.map((utility, index) => (
              <div
                key={index}
                className="bg-green-50 text-green-800 px-2 py-1 rounded-full text-sm"
              >
                ✓ {utility}
              </div>
            ))}
          </div>
        </div>

        {/* Amenities */}
        <div className="space-y-2">
          <h3 className="font-semibold text-lg">Amenities</h3>
          <div className="flex flex-wrap gap-2">
            {amenitiesList.map((amenity:any, index:any) => (
              <div
                key={index}
                className="flex items-center gap-2 px-4 py-2 border border-gray-400 rounded-lg text-sm"
              >
                {amenity}
              </div>
            ))}
          </div>
        </div>

        {/* Rent Payment Details */}
        <div className="space-y-2">
          <h3 className="font-semibold">Rent payment</h3>
          <div className="space-y-2">
            {rentPayments?.map((payment, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span>{payment.type}</span>
                <span>{payment.dueDate}</span>
                <span className="font-semibold">${payment.amount}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsMobile;
