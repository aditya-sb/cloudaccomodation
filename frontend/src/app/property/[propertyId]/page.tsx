"use client";

import {
  FaBolt,
  FaDollarSign,
  FaHeadset,
  FaUndo,
  FaCheck,
  FaLocationArrow,
} from "react-icons/fa";
import { use } from "react";
import { useParams } from "next/navigation";
import Header from "@/app/components/Header";
import PropertyGallery from "../PropertyGallery";
import PropertyDetails from "../PropertyDetails";
import Map from "../Map";
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

export default function PropertyPage() {
  const { propertyId } = useParams();
  const { data: property, error, isLoading } = useGetPropertiesQuery({ id: propertyId });
  console.log(property);
  const thisProperty = property?.[0];
  const currencySymbol = getCurrencySymbol(thisProperty?.country);

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
              overview={thisProperty?.overview} features={[]} currency={thisProperty?.currency}
              latitude={thisProperty?.latitude}
              longitude={thisProperty?.longitude}
            />
          </div>
          <div className="block md:hidden">
            <PropertyDetailsMobile
              title={thisProperty?.title}
              location={thisProperty?.location}
              price={thisProperty?.price}
              country={thisProperty?.country}
              onSiteVerification={thisProperty?.onSiteVerification}
              description={thisProperty?.description}
              amenities={thisProperty?.amenities}
              bedroomDetails={thisProperty?.overview?.bedroomDetails}
              bookingOptions={thisProperty?.bookingOptions}
              availableFrom={thisProperty?.availableFrom}
              currency={thisProperty?.currency}
              overview={thisProperty?.overview} distanceFromUniversity={""} utilities={[]} securityDeposit={thisProperty?.securityDeposit} rentPayments={[]} rent={0}/>
          </div>
          </div>

          {/* Remove the standalone Map component */}

          {/* Buyer Reviews */}
          <BuyerReviews />

          {/* Add Review Form */}
          <div className="mt-6">
            <ReviewForm propertyId={propertyId as string} />
          </div>
        </div>

        {/* Right Section: 40% */}
        <div
          className="w-full rounded-lg md:w-2/5 p-4"
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
            
            <div className="rounded-lg overflow-hidden mt-4">
              <Dropdown
                className="border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
                title="Instant Booking"
                icon={<FaBolt size={14} />}
              >
                <p>Details about instant booking go here...</p>
              </Dropdown>
              <Dropdown
                className="border border-gray-200 hover:border-gray-300 transition-colors"
                title="Lowest Price Guaranteed"
                icon={<FaDollarSign size={14} />}
              >
                <p>Details about price guarantee go here...</p>
              </Dropdown>
              <Dropdown
                className="border border-gray-200 hover:border-gray-300 transition-colors"
                title="Verified Properties"
                icon={<FaCheck size={14} />}
              >
                <p>Details about verified properties go here...</p>
              </Dropdown>
              <Dropdown
                className="border border-gray-200 hover:border-gray-300 transition-colors"
                title="24x7 Personal Assistance"
                icon={<FaHeadset size={14} />}
              >
                <p>Details about personal assistance go here...</p>
              </Dropdown>
              <Dropdown
                className="border border-gray-200 hover:border-gray-300 transition-colors"
                title="5.8K+ Reviews"
                icon={<FaUndo size={14} />}
              >
                <p>Details about reviews go here...</p>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>

      {/* Related Properties (Full-Width Section) */}
      <div
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
            images="/images/mordenhouse.webp"
            title="Modern Family Home"
            location="Beverly Hills, CA"
            price={250}
            description="A beautiful home with four bedrooms, a spacious living area, and a private pool."
          />
          <PropertyCard
            images="/images/luxuryinside.jpeg"
            title="Luxury City Apartment"
            location="New York, NY"
            price={1800000}
            description="Stylish two-bedroom apartment with stunning views of the skyline."
          />
          <PropertyCard
            image="/images/cottage.jpeg"
            title="Cozy Country Cottage"
            location="Aspen, CO"
            price={850000}
            description="Charming cottage with two bedrooms and a beautiful garden in a tranquil setting."
          />
        </section>
      </div>

      {/* Booking Details */}
      <BookingDetails 
        currency={thisProperty?.currency} 
        price={thisProperty?.price || "$5,000"} 
        booking={true} 
        propertyId={propertyId as string} 
        bedroomDetails={thisProperty?.overview?.bedroomDetails}
        securityDeposit={thisProperty?.securityDeposit}
        bookingOptions={thisProperty?.bookingOptions}
      />
      <Footer />
    </>
  );
}
