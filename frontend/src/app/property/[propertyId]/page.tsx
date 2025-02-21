"use client";

import {
  FaBolt,
  FaDollarSign,
  FaHeadset,
  FaUndo,
  FaCheck,
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

export default function PropertyPage() {
  const { propertyId } = useParams();
  const { data: property, error, isLoading } = useGetPropertiesQuery({ id: propertyId });
  console.log(property);
  const thisProperty = property?.[0];
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
          className="w-full pt-[60px] pb-5 border rounded-lg  md:w-4/5"
          style={{
            backgroundColor: "var(--card)",
            color: "var(--foreground)",
          }}
        >
          {/* Property Gallery */}
          <PropertyGallery images={thisProperty?.images || []} />

          {/* Property Details */}
          <div className="hidden md:block">
            <PropertyDetails
              title={thisProperty?.title}
              location={thisProperty?.location}
              price={thisProperty?.price}
              description={thisProperty?.description}
              amenities={thisProperty?.amenities}
              overview={thisProperty?.overview}
            />
          </div>
          <div className="block md:hidden">
            <PropertyDetailsMobile
              title={thisProperty?.title}
              location={thisProperty?.location}
              price={thisProperty?.price}
              description={thisProperty?.description}
              amenities={thisProperty?.amenities}
              overview={thisProperty?.overview} rent={0} availableFrom={""} distanceFromUniversity={""} utilities={[]} securityDeposit={0} rentPayments={[]}            />
          </div>

          {/* Map */}
          <Map
            location={thisProperty?.location}
            lat={thisProperty?.latitude}
            lon={thisProperty?.longitude}
          />

          {/* Buyer Reviews */}
          <BuyerReviews />
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
            <h1 className="text-xl font-semibold p-4 ">
              {thisProperty?.title}
            </h1>
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
      <BookingDetails price="$5,000" booking={true} />
      <Footer />
    </>
  );
}
