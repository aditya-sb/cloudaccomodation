import { useState, useEffect, ReactNode } from "react";
import { FaArrowRight, FaEye, FaEyeSlash } from "react-icons/fa";
import ImageSlider from "../components/ImageSlider";

// Define the BedroomDetail interface
export interface BedroomDetail {
  note: string;
  images: unknown;
  lease: ReactNode;
  availableFrom: ReactNode;
  moveInDate: string | number | Date;
  id: number;
  name: string;
  rent: number;
  sizeSqFt: number;
  furnished: boolean;
  privateWashroom?: boolean;
  sharedWashroom: boolean;
  sharedKitchen: boolean;
  available: string;
  status?: 'booked' | 'available' 
}

interface BedroomSectionProps {
  bedrooms: BedroomDetail[];
  securityDeposit?: number;
  currency?: string;
  floor?: number;
  onBookClick?: (bedroom: BedroomDetail) => void;
}

export default function BedroomSection({
  bedrooms,
  securityDeposit,
  currency,
  floor = 7,
  onBookClick,
}: BedroomSectionProps) {
  const [activeBedroom, setActiveBedroom] = useState<BedroomDetail | null>(null);
  const [showBookedRooms, setShowBookedRooms] = useState(false);
  console.log("activeBedroom", activeBedroom);
  // Separate available and booked bedrooms
  const availableBedrooms = bedrooms.filter(
    bedroom => !bedroom.status || bedroom.status === 'available' || bedroom.status === 'reserved'
  );
  
  const bookedBedrooms = bedrooms.filter(
    bedroom => bedroom.status === 'booked' || bedroom.status === 'occupied' || bedroom.status === 'unavailable'
  );

  useEffect(() => {
    // Initially set an available bedroom as active if possible
    if (availableBedrooms.length > 0) {
      setActiveBedroom(availableBedrooms[0]);
    } else if (bedrooms.length > 0) {
      setActiveBedroom(bedrooms[0]);
    }
  }, [bedrooms, availableBedrooms]);

  if (!activeBedroom || bedrooms.length === 0) return null;

  const handleBookClick = (bedroom: BedroomDetail) => {
    if (bedroom.status !== 'occupied' && 
        bedroom.status !== 'unavailable' && 
        onBookClick) {
      onBookClick(bedroom);
    }
  };

  return (
    <div className="mt-6 w-full bg-white border border-gray-100 rounded-lg overflow-hidden shadow-sm">
      {/* Section header with available rooms count and toggle */}
      <div className="px-4 py-3 bg-white border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Bedrooms</h2>
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-500">
            <span className="font-medium">{availableBedrooms.length}</span> of <span className="font-medium">{bedrooms.length}</span> rooms available
          </div>
          {bookedBedrooms.length >= 0 && (
            <button 
              onClick={() => setShowBookedRooms(!showBookedRooms)}
              className="flex items-center gap-2 bg-black-500 border-2z text-sm text-blue-600 hover:text-blue-700 transition-colors"
            >
              {showBookedRooms ? (
                <>
                  <FaEyeSlash size={14} />
                  <span>Hide booked rooms</span>
                </>
              ) : (
                <>
                  <FaEye size={14} />
                  <span>Show booked rooms ({bookedBedrooms.length})</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Bedroom Tabs */}
      <div className="border-b border-gray-200 bg-gray-50">
        <div className="flex overflow-x-auto px-4 py-2 gap-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
          {/* Available rooms */}
          {availableBedrooms.map((bedroom, index) => (
            <button
              key={bedroom.id || `bedroom-${index}`}
              className={`px-6 py-3 text-sm font-medium rounded-lg transition-all duration-200 flex items-center gap-2 ${
                activeBedroom?.id === bedroom.id
                  ? "bg-white text-blue-600 shadow-sm border border-gray-200"
                  : "text-gray-600 hover:bg-white/50 hover:text-blue-500"
              }`}
              onClick={() => setActiveBedroom(bedroom)}
              aria-pressed={activeBedroom?.id === bedroom.id}
              role="tab"
              aria-controls={`bedroom-panel-${bedroom.id || index}`}
            >
              <span className={`w-2 h-2 rounded-full ${
                bedroom.status === 'reserved' ? 'bg-yellow-500' : 
                bedroom.status === 'occupied' ? 'bg-red-500' :
                bedroom.status === 'unavailable' ? 'bg-gray-500' :
                'bg-green-500'
              }`}></span>
              <span>{bedroom.name || `Bedroom ${bedroom.id || index + 1}`}</span>
            </button>
          ))}

          {/* Booked rooms - only shown when toggle is on */}
          {showBookedRooms && bookedBedrooms.map((bedroom, index) => (
            <button
              key={bedroom.id || `booked-bedroom-${index}`}
              className={`px-6 py-3 text-sm font-medium rounded-lg transition-all duration-200 flex items-center gap-2 ${
                activeBedroom?.id === bedroom.id
                  ? "bg-white text-blue-600 shadow-sm border border-gray-200"
                  : "text-gray-600 hover:bg-white/50 hover:text-blue-500"
              }`}
              onClick={() => setActiveBedroom(bedroom)}
              aria-pressed={activeBedroom?.id === bedroom.id}
              role="tab"
              aria-controls={`bedroom-panel-${bedroom.id || index}`}
            >
              <span className={`w-2 h-2 rounded-full ${
                bedroom.status === 'reserved' ? 'bg-yellow-500' : 
                bedroom.status === 'occupied' ? 'bg-red-500' :
                bedroom.status === 'unavailable' ? 'bg-gray-500' :
                'bg-green-500'
              }`}></span>
              <span>{bedroom.name || `Bedroom ${bedroom.id || index + 1}`}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col">
        {/* Main content area */}
        <div className="p-4">
          {/* Top section with image and key details */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left column - Image */}
            <div className="w-40">
              <ImageSlider images={activeBedroom.images} />
            </div>

            {/* Right column - Details */}
            <div className="md:flex-1 flex flex-col">
              {/* Availability tag */}
              <div className="mb-6">
                <span className={`text-white text-xs px-3 py-1 rounded-md ${
                  activeBedroom.status === 'reserved' ? 'bg-yellow-500' : 
                  activeBedroom.status === 'occupied' ? 'bg-red-500' :
                  activeBedroom.status === 'unavailable' ? 'bg-gray-500' :
                  'bg-green-500'
                }`}>
                  Available from: {activeBedroom.availableFrom}
                </span>
              </div>

              {/* Amenities in a row */}
              <div className="flex flex-wrap gap-4 mb-6">
                {activeBedroom.sharedWashroom && (
                  <div className="flex items-center text-sm">
                    <span className="inline-block w-5 h-5 mr-2">🚽</span>
                    <span>Shared washroom</span>
                  </div>
                )}
                {activeBedroom.furnished && (
                  <div className="flex items-center text-sm">
                    <span className="inline-block w-5 h-5 mr-2">🪑</span>
                    <span>Furnished</span>
                  </div>
                )}
                {activeBedroom.sharedKitchen && (
                  <div className="flex items-center text-sm">
                    <span className="inline-block w-5 h-5 mr-2">🍳</span>
                    <span>Shared kitchen</span>
                  </div>
                )}
                {activeBedroom.sizeSqFt && (
                  <div className="flex items-center text-sm">
                    <span className="inline-block w-5 h-5 mr-2">📏</span>
                    <span>{activeBedroom.sizeSqFt} sqft</span>
                  </div>
                )}
              </div>

              {/* View More Details button */}
              <div className="mb-6">
                <button className="text-blue-500 text-sm flex items-center">
                  View More Details <FaArrowRight className="ml-1 text-xs" />
                </button>
              </div>
            </div>
          </div>

          {/* Bottom section with lease terms, etc */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex flex-wrap md:flex-nowrap justify-between gap-4">
              {/* Lease terms grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full">
                <div>
                  <div className="text-xs text-gray-500">Lease</div>
                  <div className="font-medium text-sm">{activeBedroom.lease}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Move In</div>
                  <div className="font-medium text-sm">
                    {new Date(activeBedroom.moveInDate).toLocaleDateString()}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Floor</div>
                  <div className="font-medium text-sm">{floor}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Security Deposit</div>
                  <div className="font-medium text-sm">${securityDeposit}</div>
                </div>
              </div>

              {/* Pricing and Book button */}
              <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-auto">
                <div>
                  <div className="text-xs text-gray-500">Monthly rent</div>
                  <div className="text-lg font-bold">
                    {currency === "CAD" ? "CA$" : "$"}
                    {activeBedroom.rent}/month
                  </div>
                </div>
                <button 
                  className={`px-8 py-2 rounded-md text-sm font-medium ${
                    activeBedroom.status === 'occupied' || activeBedroom.status === 'unavailable' 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-blue-500 hover:bg-blue-600 transition-colors'
                  } text-white`}
                  onClick={() => handleBookClick(activeBedroom)}
                  disabled={activeBedroom.status === 'occupied' || activeBedroom.status === 'unavailable'}
                >
                  {activeBedroom.status === 'occupied' || activeBedroom.status === 'unavailable' 
                    ? 'Not Available' 
                    : 'Book'
                  }
                </button>
              </div>
            </div>

            {/* Note text */}
            {activeBedroom.note && (
              <div className="text-xs text-gray-500 mt-4">{activeBedroom.note}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
