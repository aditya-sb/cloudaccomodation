import React, { useState } from "react";
import { FaBed, FaRuler, FaCheck, FaTrash, FaCouch, FaBath, FaUtensils, FaEye, FaEyeSlash } from "react-icons/fa";
import { getCurrencySymbol } from "@/constants/currency";
import ImageSlider from "../components/ImageSlider";
import Link from "next/link";
import { useParams } from "next/navigation";

interface BedroomDetail {
  name: string;
  rent: number;
  sizeSqFt: number;
  furnished: boolean;
  privateWashroom: boolean;
  sharedWashroom: boolean;
  sharedKitchen: boolean;
  images: string[];
  availableFrom?: string;
  lease?: string;
  moveInDate?: string;
  note?: string;
  leaseTerms?: string;
  status?: string;
}

interface BedroomDetailsProps {
  bedroomDetails?: BedroomDetail[];
  currency: string;
  country: string;
}

const BedroomDetails: React.FC<BedroomDetailsProps> = ({
  bedroomDetails,
  currency,
  country,
}) => {
  const [showUnavailable, setShowUnavailable] = useState(true);
  const [activeBedroom, setActiveBedroom] = useState<BedroomDetail | null>(null);
  const params = useParams();
  const propertyId = params?.propertyId || "";

  if (!bedroomDetails || bedroomDetails.length === 0) {
    return (
      <div className="text-center p-4 text-gray-500">
        No bedroom details available
      </div>
    );
  }

  // Set initial active bedroom when component mounts
  React.useEffect(() => {
    if (bedroomDetails && bedroomDetails.length > 0 && !activeBedroom) {
      setActiveBedroom(bedroomDetails[0]);
    }
  }, [bedroomDetails, activeBedroom]);

  const currencySymbol = getCurrencySymbol(country);

  // Get status color for bedroom status badges
  const getStatusColor = (status: string = "available") => {
    switch (status.toLowerCase()) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'booked':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-green-100 text-green-800';
    }
  };

  // Filter bedrooms based on showUnavailable state
  const filteredBedrooms = bedroomDetails.filter(
    bedroom => showUnavailable || bedroom.status?.toLowerCase() !== 'booked'
  );

  const bookedBedroomsCount = bedroomDetails.filter(
    bedroom => bedroom.status?.toLowerCase() === 'booked'
  ).length;

  // Separate available and booked bedrooms for displaying
  const availableBedrooms = bedroomDetails.filter(
    bedroom => !bedroom.status || bedroom.status.toLowerCase() !== 'booked'
  );
  
  const bookedBedrooms = bedroomDetails.filter(
    bedroom => bedroom.status?.toLowerCase() === 'booked'
  );

  const handleBedroomClick = (bedroom: BedroomDetail) => {
    setActiveBedroom(bedroom);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Bedroom Details</h3>
        {bookedBedroomsCount > 0 && (
          <button 
            onClick={() => setShowUnavailable(!showUnavailable)} 
            className="px-4 py-2 text-sm font-medium rounded-md bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors flex items-center gap-2"
          >
            {showUnavailable ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
            <span>
              {showUnavailable ? 'Hide' : 'Show'} Unavailable Bedrooms ({bookedBedroomsCount})
            </span>
          </button>
        )}
      </div>

      {/* Bedroom Tabs for Navigation */}
      <div className="flex overflow-x-auto mb-4 pb-2 gap-2">
        {/* Available rooms */}
        {availableBedrooms.map((bedroom, index) => (
          <button
            key={`bedroom-${index}`}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 flex items-center gap-2 ${
              activeBedroom?.name === bedroom.name
                ? "bg-blue-100 text-blue-800"
                : "bg-gray-50 text-gray-600 hover:bg-gray-100"
            }`}
            onClick={() => handleBedroomClick(bedroom)}
          >
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            <span>{bedroom.name}</span>
          </button>
        ))}

        {/* Booked rooms - only shown when toggle is on */}
        {showUnavailable && bookedBedrooms.map((bedroom, index) => (
          <button
            key={`booked-bedroom-${index}`}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 flex items-center gap-2 ${
              activeBedroom?.name === bedroom.name
                ? "bg-red-100 text-red-800"
                : "bg-gray-50 text-gray-600 hover:bg-gray-100"
            }`}
            onClick={() => handleBedroomClick(bedroom)}
          >
            <span className="w-2 h-2 rounded-full bg-red-500"></span>
            <span>{bedroom.name}</span>
          </button>
        ))}
      </div>
      
      {/* Display Active Bedroom */}
      {activeBedroom && (
        <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
          {/* Bedroom Images */}
          {activeBedroom.images && activeBedroom.images.length > 0 ? (
            <div className="h-48 overflow-hidden relative">
              <ImageSlider images={activeBedroom.images} />
            </div>
          ) : (
            <div className="h-48 bg-gray-200 flex items-center justify-center">
              <p className="text-gray-500">No images available</p>
            </div>
          )}
          
          {/* Bedroom Info */}
          <div className="p-4">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2">
                <h4 className="text-lg font-semibold">{activeBedroom.name}</h4>
                {activeBedroom.status && (
                  <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(activeBedroom.status)}`}>
                    {activeBedroom.status.charAt(0).toUpperCase() + activeBedroom.status.slice(1)}
                  </span>
                )}
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-blue-600">{currencySymbol}{activeBedroom.rent}</div>
                <div className="text-sm text-gray-500">per month</div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2">
                <FaRuler className="text-blue-500" />
                <span>{activeBedroom.sizeSqFt} sq.ft</span>
              </div>
              
              <div className="flex items-center gap-2">
                <FaCouch className="text-blue-500" />
                <span>{activeBedroom.furnished ? 'Furnished' : 'Unfurnished'}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                <FaBath className="text-blue-500" />
                <span>
                  {activeBedroom.privateWashroom ? 'Private washroom' : 
                   activeBedroom.sharedWashroom ? 'Shared washroom' : 'No washroom'}
                </span>
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                <FaUtensils className="text-blue-500" />
                <span>{activeBedroom.sharedKitchen ? 'Shared kitchen' : 'Private kitchen'}</span>
              </div>
            </div>
            
            {activeBedroom.availableFrom && (
              <div className="mt-3 text-sm bg-green-100 p-2 rounded-md">
                <span className="font-medium">Available from:</span> {activeBedroom.availableFrom}
                {activeBedroom.lease && <span> • {activeBedroom.lease} lease</span>}
              </div>
            )}
            
            {activeBedroom.note && (
              <div className="mt-3 text-sm border-t pt-2 border-gray-200">
                <p className="text-gray-600">{activeBedroom.note}</p>
              </div>
            )}

            {/* Display book button only for available bedrooms */}
            {(!activeBedroom.status || activeBedroom.status.toLowerCase() !== 'booked') && (
              <div className="mt-4 flex justify-end">
                <Link 
                  href={`/booking?propertyId=${encodeURIComponent(propertyId.toString())}&bedroomName=${encodeURIComponent(activeBedroom.name)}&price=${encodeURIComponent(activeBedroom.rent)}`}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  Book Now
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BedroomDetails; 