import React, { useState } from "react";
import {
  ChevronRight,
  MapPin,
  Wifi,
  PersonStanding,
  Bike,
  Bus,
  Car,
  Wallet,
  Check,
  Square,
  Bed,
  Home,
  Bath,
  UtensilsCrossed,
} from "lucide-react";
import { getCurrencySymbol } from "@/constants/currency";
import BottomDrawer from "../components/BottomDrawer";
import ImageSlider from "../components/ImageSlider";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { FaAngleDown } from "react-icons/fa";
import UniversityDistanceInfo from "../components/UniversityDistanceInfo";
import isAuthenticated from "@/utils/auth-util";
const CURRENCY_SYMBOLS = {
  'USD': '$',
  'CAD': 'C$',
  'INR': '₹',
  'GBP': '£',
  'EUR': '€',
  'AUD': 'A$'
} as const;

interface BedroomDetail {
  images: unknown;
  name: string;
  sizeSqFt: number;
  sharedKitchen: boolean;
  sharedWashroom: boolean;
  furnished: boolean;
  rent: number;
  status: string;
  _id?: string;
}

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
  overview: {
    bedrooms: number; 
    bathrooms: number; 
    squareFeet: number;
  };
  securityDeposit: number;
  rentPayments?: { type: string; dueDate: string; amount: number }[];
  currency: string;
  country: string;
  universities: string[];
  instantBooking?: boolean;
  cancellationPolicy?: string;
  onSiteVerification?: boolean;
  bedroomDetails?: BedroomDetail[];
  bookingOptions?: {
    allowSecurityDeposit: boolean;
    allowFirstRent: boolean;
    allowFirstAndLastRent: boolean;
  };
  propertyLocation: {
    lat: number;
    lng: number;
  };
  onRequireAuth?: () => void;
}

const PropertyDetailsMobile: React.FC<PropertyDetailsMobileProps> = ({
  title,
  location,
  price,
  description,
  availableFrom,
  utilities,
  amenities,
  securityDeposit,
  overview,
  instantBooking,
  universities,
  country,
  cancellationPolicy,
  onSiteVerification,
  bedroomDetails,
  bookingOptions,
  onRequireAuth,
}) => {
  const [openDrawer, setOpenDrawer] = useState<"cancellation" | "verification" | null>(null);
  const router = useRouter();
  const params = useParams();
  const propertyId = params?.propertyId || "";

  // Function to open specific drawer
  const openCancellationDrawer = () => setOpenDrawer("cancellation");
  const openVerificationDrawer = () => setOpenDrawer("verification");
  
  // Function to close drawer
  const closeDrawer = () => setOpenDrawer(null);

  if (!amenities) return null;

  const currencySymbol = getCurrencySymbol(country);

  let amenitiesList = [];
  try {
    // Handle the different possible amenities formats
    if (Array.isArray(amenities)) {
      if (typeof amenities[0] === 'string') {
        try {
          // Try to parse first element if it looks like JSON
          if (amenities[0].startsWith('[') || amenities[0].startsWith('{')) {
            amenitiesList = JSON.parse(amenities[0]);
          } else {
            // If it's just a string, use the array directly
            amenitiesList = amenities;
          }
        } catch {
          // If parsing fails, use the array as is
          amenitiesList = amenities;
        }
      } else {
        // If it's already an array of non-strings, use it directly
        amenitiesList = amenities;
      }
    } else if (typeof amenities === 'string') {
      try {
        // Try to parse if it looks like JSON
        if (amenities.startsWith('[') || amenities.startsWith('{')) {
          amenitiesList = JSON.parse(amenities);
        } else {
          // If it's just a single string value, wrap it in an array
          amenitiesList = [amenities];
        }
      } catch {
        // If parsing fails, wrap the string in an array
        amenitiesList = [amenities];
      }
    }
  } catch (error) {
    console.error("Error handling amenities:", error);
    amenitiesList = Array.isArray(amenities) ? amenities : [amenities];
  }

  // Ensure amenitiesList is always an array
  if (!Array.isArray(amenitiesList)) {
    amenitiesList = [amenitiesList];
  }

  // Generate payment rows based on booking options
  const getPaymentRows = () => {
    const rows: { type: string; dueDate: string; amount: number; }[] = [];
    
    // Case 1: First and last rent
    if (bookingOptions?.allowFirstAndLastRent) {
      rows.push({
        type: "First month rent",
        dueDate: "Now",
        amount: price
      });
      
      rows.push({
        type: "Last month rent",
        dueDate: "Now",
        amount: price
      });
      
      return rows;
    }
    
    // Case 2: First rent only
    if (bookingOptions?.allowFirstRent) {
      rows.push({
        type: "First month rent",
        dueDate: "On arrival",
        amount: price
      });
      
      return rows;
    }
    
    // Case 3: Security deposit only
    if (bookingOptions?.allowSecurityDeposit && securityDeposit) {
      rows.push({
        type: "Security deposit",
        dueDate: "Now",
        amount: securityDeposit
      });
      
      rows.push({
        type: "First month rent",
        dueDate: "On arrival",
        amount: price
      });
      
      return rows;
    }
    
    // Default case - just show the monthly rent
    rows.push({
      type: "Monthly rent",
      dueDate: "On arrival",
      amount: price
    });
    
    return rows;
  };

  const removeHtmlTags = (htmlString: string) => {
    return htmlString.replace(/<[^>]*>/g, '');
  };
  const paymentRows = getPaymentRows();

  const availableBedrooms = bedroomDetails?.filter(bedroom => bedroom.status === 'available') || [];
  const bookedBedrooms = bedroomDetails?.filter(bedroom => bedroom.status === 'booked') || [];

  const navigateWithAuthCheck = (navigate: () => void) => {
    if (!isAuthenticated()) {
      onRequireAuth?.();
      return;
    }
    navigate();
  };

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
            <span className="w-fit flex text-lg font-bold">{currencySymbol}{price}</span>
            <span className="w-fit text-sm text-gray-500">per month</span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 space-y-4">
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
        <UniversityDistanceInfo 
          universities={universities}
          propertyLocation={location}
          onUniversitySelect={(university) => {
            // Here you can add logic to fetch distance data for the selected university
            console.log("Selected university:", university);
          }}
        />

        {/* Security Deposit */}
        {securityDeposit > 0 && !bookingOptions?.allowSecurityDeposit && (
          <div className="flex flex-row items-center justify-between border border-blue-400 bg-blue-100 rounded-lg py-5 px-4">
            <span className="flex gap-2">
              <Wallet />
              Security Deposit:{" "}
              <span className="font-semibold text-blue-500">{currencySymbol}{securityDeposit}</span>
            </span>
            <div className="flex items-center">
              <ChevronRight size={20} className="text-gray-400" />
            </div>
          </div>
        )}
            
        
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
        
        {/* Rent Payment Details - Always show this section */}
        <div className="bg-white rounded-lg shadow p-4 mb-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-base">Rent payment</h3>
            {bedroomDetails && bedroomDetails.length > 0 && (
              <div className="relative">
                <select 
                  className="appearance-none bg-white border border-gray-200 rounded-md px-3 py-1 pr-8 text-blue-500 focus:outline-none focus:border-blue-500"
                  defaultValue={bedroomDetails[0]?.name || "bedroom-1"}
                  onChange={(e) => {
                    const selectedBedroom = bedroomDetails.find(
                      (b) => b.name === e.target.value
                    );
                    if (selectedBedroom) {
                      // Handle bedroom selection if needed
                    }
                  }}
                >
                  {bedroomDetails.map((bedroom, index) => (
                    <option key={index} value={bedroom.name || `Bedroom ${index + 1}`}>
                      {bedroom.name || `Bedroom ${index + 1}`}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-blue-500">
                  <FaAngleDown className="h-4 w-4" />
                </div>
              </div>
            )}
          </div>
          <div className="border-t border-gray-200 pt-2">
            <div className="grid grid-cols-3 font-medium text-gray-500 pb-2 border-b">
              <div>Payment type</div>
              <div>Due date</div>
              <div className="text-right">Amount</div>
            </div>

            {paymentRows.map((row, index) => (
              <div key={index} className="grid grid-cols-3 py-3 border-b">
                <div>{row.type}</div>
                <div>{row.dueDate}</div>
                <div className="text-right font-medium">{currencySymbol}{row.amount}</div>
              </div>
            ))}

            {/* Total amount */}
            <div className="grid grid-cols-3 py-3 mt-2">
              <div className="col-span-2 font-medium">Total</div>
              <div className="text-right font-bold text-blue-600">
                {currencySymbol}{paymentRows.reduce((sum, row) => sum + row.amount, 0)}
              </div>
            </div>

            <div className="flex justify-end mt-2">
              <a href="#" className="text-blue-500 text-sm">See rent details</a>
            </div>
          </div>
        </div>

        {/* Cancellation Policy */}
        <div 
          className="bg-white rounded-lg shadow p-4 mb-4 cursor-pointer transition-all duration-200 hover:shadow-md active:scale-98 relative overflow-hidden"
          onClick={openCancellationDrawer}
        >
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-base">Cancellation policy</h3>
            <ChevronRight size={20} className="text-gray-400" />
          </div>
          <div className="text-xs text-gray-500 mt-1">Click to view full cancellation details</div>
        </div>
        
        {/* On-site Verification */}
        {onSiteVerification && (
          <div 
            className="bg-white rounded-lg shadow p-4 mb-4 cursor-pointer transition-all duration-200 hover:shadow-md active:scale-98 relative overflow-hidden"
            onClick={openVerificationDrawer}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-8 h-8 bg-blue-600 rounded-full text-white">
                  <Check size={16} />
                </div>
                <div>
                  <h3 className="font-semibold text-base">On-site Verification</h3>
                  <p className="text-xs text-gray-500">We've verified this property in person</p>
                </div>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </div>
          </div>
        )}
        
        {/* Bedroom Details */}
        {availableBedrooms && availableBedrooms.map((bedroom, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-4 mb-4">
            <h3 className="font-semibold text-base mb-3">{bedroom.name}</h3>

            <div className="flex items-start gap-3">
              <div className="w-24 h-24">
                <ImageSlider images={bedroom?.images} />
              </div>

              <div className="flex flex-col gap-1 flex-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Square size={16} /> {bedroom.sizeSqFt} sq.ft
                  </div>
                  <div className="font-semibold text-blue-600">{currencySymbol}{bedroom.rent} /<span className="text-xs" >month</span></div>
                </div>
                <div className="flex flex-wrap gap-2 mt-1">
                  {bedroom.sharedKitchen && (
                    <div className="flex items-center gap-1 text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded-full">
                      <UtensilsCrossed size={12} /> Shared kitchen
                    </div>
                  )}
                  {bedroom.sharedWashroom && (
                    <div className="flex items-center gap-1 text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded-full">
                      <Bath size={12} /> Shared washroom
                    </div>
                  )}
                  {bedroom.furnished && (
                    <div className="flex items-center gap-1 text-xs px-2 py-1 bg-green-50 text-green-700 rounded-full">
                      <Home size={12} /> Furnished
                    </div>
                  )}
                </div>
                
                {/* Add Book/Enquire button */}
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => {
                      if (bedroom.status === "booked") {
                        return;
                      }
                      navigateWithAuthCheck(() => {
                        if (instantBooking) {
                          window.location.href = `/booking?propertyId=${encodeURIComponent(
                            propertyId.toString()
                          )}&bedRoomId=${encodeURIComponent(
                            bedroom?._id || ""
                          )}&bedroomName=${encodeURIComponent(
                            bedroom.name
                          )}&price=${encodeURIComponent(bedroom.rent)}`;
                        } else {
                          router.push(`/enquiry?propertyId=${encodeURIComponent(propertyId.toString())}&bedroomId=${encodeURIComponent(bedroom?._id || "")}&bedroomName=${encodeURIComponent(bedroom.name)}&price=${encodeURIComponent(bedroom.rent)}`);
                        }
                      });
                    }}
                    className={`px-6 py-2 rounded-md text-sm font-medium transition-colors text-white ${bedroom.status === "booked" ? "bg-gray-500 hover:bg-gray-500" : "bg-blue-500 hover:bg-blue-600"}`}
                    disabled={bedroom.status === "booked"}
                  >
                    {bedroom.status === "booked" ? "Booked" : instantBooking ? "Book" : "Enquire"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        {bookedBedrooms && bookedBedrooms.map((bedroom, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-4 mb-4">
            <h3 className="font-semibold text-base mb-3">{bedroom.name}</h3>

            <div className="flex items-start gap-3">
              <div className="w-24 h-24">
                <ImageSlider images={bedroom?.images} />
              </div>

              <div className="flex flex-col gap-1 flex-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Square size={16} /> {bedroom.sizeSqFt} sq.ft
                  </div>
                  <div className="font-semibold text-blue-600">{currencySymbol}{bedroom.rent} /<span className="text-xs" >month</span></div>
                </div>
                <div className="flex flex-wrap gap-2 mt-1">
                  {bedroom.sharedKitchen && (
                    <div className="flex items-center gap-1 text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded-full">
                      <UtensilsCrossed size={12} /> Shared kitchen
                    </div>
                  )}
                  {bedroom.sharedWashroom && (
                    <div className="flex items-center gap-1 text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded-full">
                      <Bath size={12} /> Shared washroom
                    </div>
                  )}
                  {bedroom.furnished && (
                    <div className="flex items-center gap-1 text-xs px-2 py-1 bg-green-50 text-green-700 rounded-full">
                      <Home size={12} /> Furnished
                    </div>
                  )}
                </div>
                
                {/* Add Book/Enquire button */}
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => {
                      if (bedroom.status === "booked") {
                        return;
                      }
                      navigateWithAuthCheck(() => {
                        if (instantBooking) {
                          window.location.href = `/booking?propertyId=${encodeURIComponent(
                            propertyId.toString()
                          )}&bedRoomId=${encodeURIComponent(
                            bedroom?._id || ""
                          )}&bedroomName=${encodeURIComponent(
                            bedroom.name
                          )}&price=${encodeURIComponent(bedroom.rent)}`;
                        } else {
                          router.push(`/enquiry?propertyId=${encodeURIComponent(propertyId.toString())}&bedroomId=${encodeURIComponent(bedroom?._id || "")}&bedroomName=${encodeURIComponent(bedroom.name)}&price=${encodeURIComponent(bedroom.rent)}`);
                        }
                      });
                    }}
                    className={`px-6 py-2 rounded-md text-sm font-medium transition-colors text-white ${bedroom.status === "booked" ? "bg-gray-500 hover:bg-gray-500" : "bg-blue-500 hover:bg-blue-600"}`}
                    disabled={bedroom.status === "booked"}
                  >
                    {bedroom.status === "booked" ? "Booked" : instantBooking ? "Book now" : "Enquire"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Drawers */}
      <BottomDrawer 
        isOpen={openDrawer === "cancellation"} 
        onClose={closeDrawer}
        title="Cancellation Policy"
      >
        <div className="text-gray-700">
          {cancellationPolicy ? (
            <div className="text-sm text-gray-600 whitespace-pre-wrap">
              {removeHtmlTags(cancellationPolicy)}
            </div>
          ) : (
            <p>No cancellation policy available.</p>
          )}
        </div>
      </BottomDrawer>
      
      <BottomDrawer 
        isOpen={openDrawer === "verification"} 
        onClose={closeDrawer}
        title="On-site Verification"
      >
        <div className="text-gray-700">
          <div className="mb-6 flex items-center justify-center">
            <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
              <Check size={32} className="text-green-600" />
            </div>
          </div>
          
          <div className="mb-6 text-center">
            <p className="text-lg font-medium">This property has been verified by our team</p>
            <p className="text-sm text-gray-500">Verified on {new Date().toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})}</p>
          </div>
          
          <p className="mb-4">Our verification process ensures that the property meets the following standards:</p>
          
          <ul className="space-y-4 mb-6">
            <li className="flex items-start">
              <div className="h-5 w-5 mt-0.5 mr-3 flex-shrink-0 flex items-center justify-center bg-green-500 rounded-full text-white">
                <Check size={12} />
              </div>
              <div>
                <span className="font-medium">Property Authenticity</span>
                <p className="text-sm text-gray-600">We confirm the property exists and matches the listing description</p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="h-5 w-5 mt-0.5 mr-3 flex-shrink-0 flex items-center justify-center bg-green-500 rounded-full text-white">
                <Check size={12} />
              </div>
              <div>
                <span className="font-medium">Amenities Verification</span>
                <p className="text-sm text-gray-600">All listed amenities are available and in good working condition</p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="h-5 w-5 mt-0.5 mr-3 flex-shrink-0 flex items-center justify-center bg-green-500 rounded-full text-white">
                <Check size={12} />
              </div>
              <div>
                <span className="font-medium">Safety & Quality</span>
                <p className="text-sm text-gray-600">The property meets our safety and quality standards for residents</p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="h-5 w-5 mt-0.5 mr-3 flex-shrink-0 flex items-center justify-center bg-green-500 rounded-full text-white">
                <Check size={12} />
              </div>
              <div>
                <span className="font-medium">Location Accuracy</span>
                <p className="text-sm text-gray-600">The location details and proximity to key points are accurate</p>
              </div>
            </li>
          </ul>
          
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-sm">Our verification gives you peace of mind that what you see online is what you'll get when you arrive.</p>
          </div>
        </div>
      </BottomDrawer>
    </div>
  );
};

export default PropertyDetailsMobile;
