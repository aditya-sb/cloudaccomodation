"use client";
import { useEffect, useState, useRef } from "react";
import SearchBar from "./components/SearchBar";
import PropertyCard from "./components/PropertyCard";
import CustomerReviews from "./components/CustomerReviews";
import Footer from "./components/Footer";
import Cities from "./components/Cities";
import OtherServices from "./components/OtherServices";
import PrivacySection from "./components/PrivacySection";
import MoveInSection from "./components/MoveInSection";
import SecurityDepositSection from "./components/SecurityDepositSection";
import NestNetworkSection from "./components/NestNetworkSection";
import BookingButton from "./components/BookingButton";
import Header from "./components/Header";
import Refer from "./components/Refer";
import LightHeader from "./components/light-header";

export default function Home() {
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const searchBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeaderVisible(!entry.isIntersecting); // Header shows when search bar is out of view
      },
      { root: null, threshold: 0.5 } // Trigger when the search bar is fully out of view
    );

    if (searchBarRef.current) {
      observer.observe(searchBarRef.current);
    }

    return () => {
      if (searchBarRef.current) {
        observer.unobserve(searchBarRef.current);
      }
    };
  }, []);

  return (
    <div
      className="min-h-screen "
      style={{
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      {isHeaderVisible ? (
        <div className="fixed top-0 left-0 w-full z-20 transition-transform duration-500 ease-in-out">
          <Header />
        </div>
      ) : (
        <LightHeader />
      )}

      {/* Search Bar */}
      <div ref={searchBarRef}>
        <SearchBar />
      </div>

      {/* <Banner /> */}

      {/* Explore Properties Section */}
      <h2
        className="text-3xl sm:text-4xl mt-7 font-extrabold text-center mb-10"
        style={{
          color: "var(--foreground)",
        }}
      >
        Explore Properties
      </h2>
      <section className="px-4 sm:px-6 mb-10 pb-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        <PropertyCard
          image="/images/mordenhouse.webp"
          title="Modern Family Home"
          location="Beverly Hills, CA"
          price="$2,500,000"
          description="A beautiful home with four bedrooms, a spacious living area, and a private pool."
        />
        <PropertyCard
          image="/images/luxuryinside.jpeg"
          title="Luxury City Apartment"
          location="New York, NY"
          price="$1,800,000"
          description="Stylish two-bedroom apartment with stunning views of the skyline."
        />
        <PropertyCard
          image="/images/cottage.jpeg"
          title="Cozy Country Cottage"
          location="Aspen, CO"
          price="$850,000"
          description="Charming cottage with two bedrooms and a beautiful garden in a tranquil setting."
        />
        <PropertyCard
          image="/images/cottage.jpeg"
          title="Cozy Country Cottage"
          location="Aspen, CO"
          price="$850,000"
          description="Charming cottage with two bedrooms and a beautiful garden in a tranquil setting."
        />
        <PropertyCard
          image="/images/cottage.jpeg"
          title="Cozy Country Cottage"
          location="Aspen, CO"
          price="$850,000"
          description="Charming cottage with two bedrooms and a beautiful garden in a tranquil setting."
        />
        <PropertyCard
          image="/images/cottage.jpeg"
          title="Cozy Country Cottage"
          location="Aspen, CO"
          price="$850,000"
          description="Charming cottage with two bedrooms and a beautiful garden in a tranquil setting."
        />
      </section>

      {/* Cities Section */}
      <Cities />

      {/* Other Sections */}
      <div className="space-y-6 mt-8">
        <PrivacySection />
        <MoveInSection />
        <SecurityDepositSection />
        <NestNetworkSection />
      </div>

      {/* Booking Button */}
      <div className="flex justify-center m-10">
        <BookingButton />
      </div>

      {/* Other Services */}
      <OtherServices />

      {/* Customer Reviews */}
      <CustomerReviews />

      <Refer />

      {/* Footer */}
      <Footer />
    </div>
  );
}
