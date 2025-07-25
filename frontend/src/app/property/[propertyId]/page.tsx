"use client";

import {
  FaBolt,
  FaDollarSign,
  FaHeadset,
  FaUndo,
  FaCheck,
  FaLocationArrow,
  FaAngleDown,
} from "react-icons/fa";
import { use } from "react";
import { useParams } from "next/navigation";
import Header from "@/app/components/Header";
import PropertyGallery from "../PropertyGallery";
import PropertyDetails from "../PropertyDetails";
import Map from "../Map";
import NearbyPlaces from "../NearbyPlaces";
import BuyerReviews from "../BuyerReviews";
import Dropdown from "@/app/components/Dropdown";
import PropertyCard from "@/app/components/PropertyCard";
import BookingDetails from "../BookingDetails";
import Footer from "@/app/components/Footer";
import { useGetPropertiesQuery } from "@/app/redux/slices/apiSlice";
import PropertyDetailsMobile from "../propertyDetailsMobile";
import { getCurrencySymbol } from "@/constants/currency";
import { Pin } from "lucide-react";
import { FaLocationPin, FaMapLocationDot } from "react-icons/fa6";
import ReviewForm from "@/app/components/ReviewForm";
import { useEffect, useState, useRef } from "react";
import { BedroomDetail as BookingBedroomDetail } from "@/app/components/SelectedBedroomDropdown";
import BedroomSection, { BedroomDetail as BedroomSectionDetail } from "../bedroomsDetails";
import Features from "@/app/components/Features";

// Function to format the date as Month DD, YYYY
const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

export default function PropertyPage() {
  const { propertyId } = useParams();
  const { data: property, error, isLoading } = useGetPropertiesQuery({ id: propertyId });
  console.log(property);
  const thisProperty = property?.[0];
  const currencySymbol = getCurrencySymbol(thisProperty?.country);
  const [bedroomInView, setBedroomInView] = useState<BedroomSectionDetail | null>(null);
  const [selectedBedroomForBooking, setSelectedBedroomForBooking] = useState<BookingBedroomDetail | null>(null);
  const bedroomSectionRef = useRef<HTMLDivElement>(null);
  const nearbyPlacesRef = useRef<HTMLDivElement>(null);
  const rentDetailsRef = useRef<HTMLDivElement>(null);
  const [bookingFormType, setBookingFormType] = useState<"booking" | "enquiry" | null>(null);
  const [isBookingMinimized, setIsBookingMinimized] = useState(true);

  useEffect(() => {
    if (thisProperty?.overview?.bedroomDetails?.length > 0) {
      setBedroomInView(thisProperty.overview.bedroomDetails[0]);
    }
  }, [thisProperty]);

  const scrollToBedroomSection = () => {
    if (bedroomSectionRef.current) {
      bedroomSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Function to open the booking panel
  const openBookingPanel = (formType: "booking" | "enquiry") => {
    setBookingFormType(formType);
    setIsBookingMinimized(false);
    
    // Scroll to the booking details element
    const bookingDetailsElement = document.getElementById("bookingDetails");
    if (bookingDetailsElement) {
      bookingDetailsElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Handler for when the Book button is clicked in the BedroomSection
  const handleBedroomBookClick = (bedroom: BedroomSectionDetail) => {
    // Instead of opening the modal, navigate directly to the booking page
    window.location.href = `/booking?propertyId=${encodeURIComponent(propertyId as string)}&bedroomName=${encodeURIComponent(bedroom.name)}&price=${encodeURIComponent(bedroom.rent)}`;
  };
  const removeHtmlTags = (str: string): string => {
    if (!str) return "";
    return str.replace(/<[^>]*>/g, "");
  };
  // Function to render rent payment details
  const renderRentPaymentDetails = () => {
    if (!thisProperty) return null;
    
    const getPaymentRows = () => {
      const rows: { type: string; dueDate: string; amount: number; }[] = [];
      const rent = bedroomInView?.rent || thisProperty.price;
      const securityDeposit = thisProperty.securityDeposit || 0;
      
      // Case 1: First and last rent with security deposit
      if (thisProperty?.bookingOptions?.allowFirstAndLastRent) {
        // Add first month rent
        rows.push({
          type: "First month rent",
          dueDate: "Now",
          amount: rent
        });
        
        // Add last month rent
        rows.push({
          type: "Last month rent",
          dueDate: "Now",
          amount: rent
        });
        
        // Add security deposit if it exists
        if (securityDeposit > 0) {
          rows.push({
            type: "Security deposit",
            dueDate: "Now",
            amount: securityDeposit
          });
        }
        
        return rows;
      }
      
      // Case 2: First rent with separate security deposit
      if (thisProperty?.bookingOptions?.allowFirstRent) {
        // Add first month rent
        rows.push({
          type: "First month rent",
          dueDate: "Now",
          amount: rent
        });
        
        // Add security deposit if it exists
        if (securityDeposit > 0) {
          rows.push({
            type: "Security deposit",
            dueDate: "Now",
            amount: securityDeposit
          });
        }
        
        return rows;
      }
      
      // Case 3: Security deposit only (separate from rent)
      if (thisProperty?.bookingOptions?.allowSecurityDeposit && securityDeposit > 0) {
        // Add security deposit
        rows.push({
          type: "Security deposit",
          dueDate: "Now",
          amount: securityDeposit
        });
        
        // Add first month rent
        rows.push({
          type: "First month rent",
          dueDate: "On arrival",
          amount: rent
        });
        
        return rows;
      }
      
      // Default case - just show the monthly rent
      rows.push({
        type: "Monthly rent",
        dueDate: "On arrival",
        amount: rent
      });
      
      return rows;
    };

    const paymentRows = getPaymentRows();
    
    return (
      <div className="mt-6 w-full px-4 py-5 bg-white rounded-lg shadow-sm max-sm:hidden">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Rent payment</h2>
          {thisProperty?.overview?.bedroomDetails && thisProperty.overview.bedroomDetails.length > 0 && (
            <div className="relative">
              <select 
                className="appearance-none bg-white border border-gray-200 rounded-md px-3 py-1 pr-8 text-blue-500 focus:outline-none focus:border-blue-500"
                defaultValue={bedroomInView?.name || "bedroom-1"}
                onChange={(e) => {
                  const selectedBedroom = thisProperty.overview.bedroomDetails.find(
                    (b: BedroomSectionDetail) => b.name === e.target.value
                  );
                  if (selectedBedroom) setBedroomInView(selectedBedroom);
                }}
              >
                {thisProperty.overview.bedroomDetails.map((bedroom: BedroomSectionDetail, index: number) => (
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
        
        <div className="w-full">
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
    );
  };
  // Function to render cancellation policy
  const renderCancellationPolicy = () => {
    const [isCancellationOpen, setIsCancellationOpen] = useState(false);

    if (!thisProperty?.cancellationPolicy) return null;

    return (
      <div className="mt-6 w-full bg-white rounded-lg shadow-sm max-sm:hidden">
        <div 
          className="px-4 py-4 flex items-center justify-between border-b cursor-pointer"
          onClick={() => setIsCancellationOpen(!isCancellationOpen)}
        >
          <h2 className="text-xl font-semibold">Cancellation policy</h2>
          <button className="text-blue-500 transition-transform duration-200" style={{ transform: isCancellationOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
            <FaAngleDown />
          </button>
        </div>
        {isCancellationOpen && (
          <div className="p-4">
            <div className="text-sm text-gray-600 whitespace-pre-wrap">
              {removeHtmlTags(thisProperty.cancellationPolicy)}
            </div>
          </div>
        )}
      </div>
    );
  };

  // Function to render lease terms
  const renderLeaseTerms = () => {
    if (!thisProperty) return null;
    
    return (
      <div className="mt-6 w-full bg-white rounded-lg shadow-sm">
        <div className="px-4 py-4 flex items-center justify-between border-b">
          <h2 className="text-xl font-semibold">Lease terms</h2>
          <button className="text-blue-500">
            <FaAngleDown />
          </button>
        </div>
        {/* <div className="p-4">
          <div className="grid grid-cols-4 gap-3">
            <div className="col-span-1 text-gray-500">Lease</div>
            <div className="col-span-1 font-medium">Month to month</div>
            
            <div className="col-span-1 text-gray-500">Floor</div>
            <div className="col-span-1 font-medium">7</div>
            
            <div className="col-span-1 text-gray-500">Security Deposit</div>
            <div className="col-span-1 font-medium">{currencySymbol}{thisProperty.securityDeposit || thisProperty.price}</div>
            
            <div className="col-span-1 text-gray-500">Move-In</div>
            <div className="col-span-1 font-medium">{formatDate(new Date())}</div>
            
            <div className="col-span-4 text-sm text-gray-500 mt-2">
              Note: Only for females
            </div>
          </div>
        </div> */}
      </div>
    );
  };

  // Function to render action buttons
  const renderActionButtons = () => {
    if (!thisProperty) return null;

    return (
      <div className="flex flex-col w-full gap-3 mt-3">
        <button 
          onClick={scrollToBedroomSection}
          className="w-full py-3 bg-white text-blue-600 border border-blue-600 rounded-md font-medium hover:bg-blue-50 transition-colors"
        >
          View Rooms
        </button>
        
        {thisProperty.instantBooking ? (
          <button 
            onClick={() => window.location.href = `/booking?propertyId=${encodeURIComponent(propertyId as string)}&bedroomName=Default&price=${encodeURIComponent(thisProperty.price)}`}
            className="w-full py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
          >
            Book Now
          </button>
        ) : (
          <button 
            onClick={() => window.location.href = `/enquiry?propertyId=${encodeURIComponent(propertyId as string)}&bedroomName=Default&price=${encodeURIComponent(thisProperty.price)}`}
            className="w-full py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
          >
            Enquire Now
          </button>
        )}
      </div>
    );
  };

  return (
    <>
      <Header isPropertyPage={true} />
      <div
        className="min-h-screen max-sm:p-0 flex flex-col md:flex-row gap-8"
        style={{
          backgroundColor: "var(--gray-bg)",
          color: "var(--foreground)",
        }}
      >
        {/* Left Section: 60% */}
        <div
          className="w-full pt-[60px] md:ml-10 pb-5 rounded-lg  md:w-4/5"
          style={{
            color: "var(--foreground)",
            
          }}
        >
          {/* Property Gallery */}
          <div className="relative bg-white rounded-lg shadow-sm">
          <PropertyGallery images={thisProperty?.images || []} />

          {/* Property Details */}
          <div className="hidden md:block">
            <PropertyDetails
              title={thisProperty?.title}
              location={thisProperty?.location}
              price={thisProperty?.price}
              securityDeposit={thisProperty?.securityDeposit}
              termsOfStay={thisProperty?.termsOfStay}
              country={thisProperty?.country}
              description={thisProperty?.description}
              amenities={thisProperty?.amenities}
              overview={{
                bedrooms: thisProperty?.overview?.bedrooms,
                bathrooms: thisProperty?.overview?.bathrooms,
                squareFeet: thisProperty?.overview?.squareFeet,
                bedroomDetails: thisProperty?.overview?.bedroomDetails
              }}
              features={[]}
              currency={thisProperty?.currency}
              latitude={thisProperty?.latitude}
              longitude={thisProperty?.longitude}
              onExploreNearbyClick={() => {
                nearbyPlacesRef.current?.scrollIntoView({ behavior: 'smooth' });
              }}
              onRentDetailsClick={() => {
                rentDetailsRef.current?.scrollIntoView({ behavior: 'smooth' });
              }}
            />
          </div>
          <div className="block md:hidden">
            <PropertyDetailsMobile
              title={thisProperty?.title}
              location={thisProperty?.location}
              universities={thisProperty?.nearbyUniversities}
              price={thisProperty?.price}
              country={thisProperty?.country}
              onSiteVerification={thisProperty?.onSiteVerification}
              description={thisProperty?.description}
              amenities={thisProperty?.amenities}
              instantBooking={thisProperty?.instantBooking}
              bedroomDetails={thisProperty?.overview?.bedroomDetails}
              cancellationPolicy={thisProperty?.cancellationPolicy}
              bookingOptions={thisProperty?.bookingOptions}
              availableFrom={thisProperty?.availableFrom}
              currency={thisProperty?.currency}
              overview={{
                bedrooms: thisProperty?.overview?.bedrooms,
                bathrooms: thisProperty?.overview?.bathrooms,
                squareFeet: thisProperty?.overview?.squareFeet
              }}
              distanceFromUniversity={""}
              utilities={[]}
              securityDeposit={thisProperty?.securityDeposit}
              rentPayments={[]}
              rent={0}
            />
          </div>
          </div>

          {/* Bedroom Details Section */}
          <div className="hidden md:block" ref={bedroomSectionRef} id="bedroomSection">
            <BedroomSection 
              bedrooms={thisProperty?.overview?.bedroomDetails || []} 
              securityDeposit={thisProperty?.securityDeposit}
              currency={thisProperty?.currency}
              instantBooking={thisProperty?.instantBooking}
              country={thisProperty?.country}
              floor={7}
              onBookClick={handleBedroomBookClick}
            />
          </div>

          {/* Payment Details Section */}
          <div ref={rentDetailsRef}>
            {renderRentPaymentDetails()}
            {renderCancellationPolicy()}
          </div>

          {/* NearbyPlaces component */}
          <div ref={nearbyPlacesRef} className="mt-6 bg-white rounded-lg shadow-sm">
            {/* <h2 className="text-2xl font-semibold p-4 border-b">Explore Nearby Places</h2> */}
            {thisProperty?.latitude && thisProperty?.longitude ? (
              <NearbyPlaces 
                latitude={parseFloat(thisProperty.latitude)} 
                longitude={parseFloat(thisProperty.longitude)} 
              />
            ) : thisProperty?.location ? (
              <NearbyPlaces 
                location={thisProperty.location}
              />
            ) : (
              <div className="p-6 text-center text-gray-500">
                Location information is not available for this property.
              </div>
            )}
          </div>

{/* 
          Buyer Reviews
          <BuyerReviews />

          <div className="mt-6">
            <ReviewForm propertyId={propertyId as string} />
          </div> */}
        </div>

        {/* Right Section: 40% */}
        <div
          className="w-full rounded-lg md:w-2/5 p-4 max-sm:hidden"
          style={{
            backgroundColor: "var(--background)",
            color: "var(--foreground)",
          }}
        >
          <div className="sticky top-20 p-4 rounded-lg shadow-sm">
            <div className="flex justify-between">
              <h1 className="text-xl font-semibold">
                {thisProperty?.title}
              </h1>
              <p className="text-lg font-semibold">
                {currencySymbol}{thisProperty?.price}
              </p>
            </div>
            <p className="text-sm mt-2 gap-2 text-gray-500 flex items-center">
              <FaMapLocationDot className="text-blue-500 mr-1" />
               {thisProperty?.location}
            </p>
            
            {/* Action Buttons (View Rooms, Book Now/Enquire Now) */}
            {renderActionButtons()}
            
            <Features/>
          </div>
        </div>
      </div>

      {/* Related Properties (Full-Width Section) */}
      {/* <div
        className="bg-gray-100 py-10 w-full"
        style={{
          backgroundColor: "var(--background)",
        }}
      >
        <h2
          className="text-3xl sm:text-4xl mt-7 font-extrabold text-center mb-10"
          style={{
            color: "var(--foreground)",
          }}
        >
          Related Properties
        </h2>

        <section className="pb-5 grid grid-cols-1 md:grid-cols-3 gap-8 px-10 max-w-[1440px] mx-auto">
          <PropertyCard
            images={["/images/mordenhouse.webp"]}
            title="Modern Family Home"
            location="Beverly Hills, CA"
            price={250}
            beds={4}
            baths={3}
            area={2500}
            rating={4.8}
            reviewsCount={24}
            country="USA"
          />
          <PropertyCard
            images={["/images/luxuryinside.jpeg"]}
            title="Luxury City Apartment"
            location="New York, NY"
            price={1800}
            beds={2}
            baths={2}
            area={1200}
            rating={4.9}
            reviewsCount={42}
            country="USA"
          />
          <PropertyCard
            images={["/images/cottage.jpeg"]}
            title="Cozy Country Cottage"
            location="Aspen, CO"
            price={850}
            beds={2}
            baths={1}
            area={900}
            rating={4.7}
            reviewsCount={18}
            country="USA"
          />
        </section>
      </div> */}

      {/* Booking Details - Only show for enquiries */}
      {bookingFormType === "enquiry" && (
        <BookingDetails 
          currency={thisProperty?.currency} 
          price={thisProperty?.price || 5000} 
          booking={false} 
          propertyId={propertyId as string} 
          bedroomDetails={thisProperty?.overview?.bedroomDetails}
          securityDeposit={thisProperty?.securityDeposit}
          bookingOptions={thisProperty?.bookingOptions}
          selectedBedroom={selectedBedroomForBooking}
          activeForm="enquiry"
          isMinimized={isBookingMinimized}
          setIsMinimized={setIsBookingMinimized}
          setActiveForm={setBookingFormType}
        />
      )}
      <Footer />
    </>
  );
}
