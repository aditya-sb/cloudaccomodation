import { useState, useEffect, ReactNode } from "react";
import { FaArrowRight, FaEye, FaEyeSlash, FaChevronDown, FaChevronUp } from "react-icons/fa";
import ImageSlider from "../components/ImageSlider";
import Link from "next/link";
import { useParams } from "next/navigation";

// Define the BedroomDetail interface
export interface BedroomDetail {
  _id: string;
  floor: ReactNode;
  leaseTerms: ReactNode;
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
  status?: 'booked' | 'available' | 'reserved' | 'occupied' | 'unavailable'
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
  floor,
  onBookClick,
}: BedroomSectionProps) {
  const [showBookedRooms, setShowBookedRooms] = useState(false);
  const [expandedLeaseTerms, setExpandedLeaseTerms] = useState<{ [key: number]: boolean }>({});
  
  // Get the property ID from URL
  const params = useParams();
  const propertyId = params?.propertyId || "";
  console.log("BedroomSection - propertyId from params:", propertyId);
  
  // Separate available and booked bedrooms
  const availableBedrooms = bedrooms.filter(
    bedroom => !bedroom.status || bedroom.status === 'available' || bedroom.status === 'reserved'
  );
  
  const bookedBedrooms = bedrooms.filter(
    bedroom => bedroom.status === 'booked' || bedroom.status === 'occupied' || bedroom.status === 'unavailable'
  );

  const handleBookClick = (bedroom: BedroomDetail) => {
    if (bedroom.status !== 'occupied' && 
        bedroom.status !== 'unavailable' && 
        onBookClick) {
      onBookClick(bedroom);
    }
  };

  const toggleLeaseTerms = (bedroomId: number) => {
    setExpandedLeaseTerms(prev => ({
      ...prev,
      [bedroomId]: !prev[bedroomId]
    }));
  };

  const removeHtmlTags = (str: string): string => {
    if (!str) return "";
    return str.replace(/<[^>]*>/g, "");
  };

  const renderBedroomCard = (bedroom: BedroomDetail, index: number) => (
    <div key={bedroom.id || `bedroom-${index}`} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm mb-4">      {/* Bedroom content */}
      <div className="p-4">
        {/* Top section with image and key details */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left column - Image */}
          <div className="w-full md:w-40">
            <ImageSlider images={bedroom.images} />
          </div>

          {/* Right column - Details */}
          <div className="md:flex-1 flex flex-col">
            {/* Bedroom header moved here */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                {/* <span className={`w-2 h-2 rounded-full ${
                  bedroom.status === 'reserved' ? 'bg-yellow-500' : 
                  bedroom.status === 'occupied' ? 'bg-red-500' :
                  bedroom.status === 'unavailable' ? 'bg-gray-500' :
                  'bg-green-500'
                }`}></span> */}
                <h3 className="text-lg font-semibold">{bedroom.name || `Bedroom ${bedroom.id || index + 1}`}</h3>
              </div>
              <span className={`inline-block text-white text-xs px-3 py-1 rounded-md ${
                bedroom.status === 'reserved' ? 'bg-yellow-500' : 
                bedroom.status === 'occupied' ? 'bg-red-500' :
                bedroom.status === 'unavailable' ? 'bg-gray-500' :
                'bg-green-500'
              }`}>
                Available from: {bedroom.availableFrom}
              </span>
            </div>

            {/* Amenities in a row */}
            <div className="flex flex-wrap gap-4 mb-6">
              {bedroom.sharedWashroom && (
                <div className="flex items-center text-sm">
                  <span className="inline-block w-5 h-5 mr-2">🚽</span>
                  <span>Shared washroom</span>
                </div>
              )}
              {bedroom.furnished && (
                <div className="flex items-center text-sm">
                  <span className="inline-block w-5 h-5 mr-2">🪑</span>
                  <span>Furnished</span>
                </div>
              )}
              {bedroom.sharedKitchen && (
                <div className="flex items-center text-sm">
                  <span className="inline-block w-5 h-5 mr-2">🍳</span>
                  <span>Shared kitchen</span>
                </div>
              )}
              {bedroom.sizeSqFt && (
                <div className="flex items-center text-sm">
                  <span className="inline-block w-5 h-5 mr-2">📏</span>
                  <span>{bedroom.sizeSqFt} sqft</span>
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
                <div className="font-medium text-sm">{bedroom.lease}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Move In</div>
                <div className="font-medium text-sm">
                  {new Date(bedroom.moveInDate).toLocaleDateString()}
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Floor</div>
                <div className="font-medium text-sm">{bedroom.floor}</div>
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
                  {bedroom.rent}/month
                </div>
              </div>
              {bedroom.status === 'occupied' || bedroom.status === 'unavailable' ? (
                <button 
                  className="px-8 py-2 rounded-md text-sm font-medium bg-gray-400 cursor-not-allowed text-white"
                  disabled
                >
                  Not Available
                </button>
              ) : (
                <button 
                  onClick={() => window.location.href = `/booking?propertyId=${encodeURIComponent(propertyId.toString())}&bedRoomId=${encodeURIComponent(bedroom?._id || "")}&bedroomName=${encodeURIComponent(bedroom.name)}&price=${encodeURIComponent(bedroom.rent)}`}
                  className="px-8 py-2 rounded-md text-sm font-medium bg-blue-500 hover:bg-blue-600 transition-colors text-white"
                >
                  Book
                </button>
              )}
            </div>
          </div>

          {/* Note text */}
          {bedroom.note && (
            <div className="text-xs text-gray-500 mt-4">{bedroom.note}</div>
          )}
        </div>

        {/* Lease Terms */}
        {bedroom.leaseTerms && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <button 
              onClick={() => toggleLeaseTerms(bedroom.id)}
              className="w-full flex items-center justify-between text-left hover:bg-gray-50 p-2 rounded-md transition-colors"
            >
              <div className="text-base font-semibold text-gray-700">Lease Terms</div>
              {expandedLeaseTerms[bedroom.id] ? 
                <FaChevronUp className="text-gray-400" /> : 
                <FaChevronDown className="text-gray-400" />
              }
            </button>
            {expandedLeaseTerms[bedroom.id] && (
              <div className="mt-2 p-3 bg-gray-50 rounded-md border border-gray-200">
                <div className="text-sm text-gray-700">
                  {removeHtmlTags(bedroom.leaseTerms as string)}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );

  if (bedrooms.length === 0) return null;

  return (
    <div className="mt-6 w-full bg-white border border-gray-100 rounded-lg overflow-hidden shadow-sm">
      {/* Section header with available rooms count and toggle - KEPT UNCHANGED */}
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

      {/* Main Content - Vertical List of Bedrooms */}
      <div className="p-4">
        {/* Available Bedrooms */}
        <div className="space-y-4">
          {availableBedrooms.map((bedroom, index) => renderBedroomCard(bedroom, index))}
        </div>

        {/* Booked Bedrooms - only shown when toggle is on */}
        {showBookedRooms && bookedBedrooms.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-600 mb-4">Booked Rooms</h3>
            <div className="space-y-4">
              {bookedBedrooms.map((bedroom, index) => renderBedroomCard(bedroom, index))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}