"use client";
import { useEffect, useState, useRef, Key } from "react";
import SearchBar from "./components/SearchBar";
import PropertyCard from "./components/PropertyCard";
import CustomerReviews from "./components/CustomerReviews";
import Footer from "./components/Footer";
import OtherServices from "./components/OtherServices";
import PrivacySection from "./components/PrivacySection";
import MoveInSection from "./components/MoveInSection";
import SecurityDepositSection from "./components/SecurityDepositSection";
import NestNetworkSection from "./components/NestNetworkSection";
import BookingButton from "./components/BookingButton";
import Header from "./components/Header";
import Refer from "./components/Refer";
import LightHeader from "./components/light-header";
import { useGetPropertiesQuery } from "./redux/slices/apiSlice";
import PopularCities from "./components/PopularCities";
import ExploreProperties from "./components/ExploreProperties";

export default function Home() {
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const searchBarRef = useRef<HTMLDivElement>(null);
  const { data: properties, error, isLoading } = useGetPropertiesQuery({});

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
          <Header isPropertyPage={false} />
        </div>
      ) : (
        <LightHeader />
      )}

      {/* Search Bar */}
      <div ref={searchBarRef}>
        <SearchBar />
      </div>

      {/* Popular Cities Section */}
      <PopularCities />
      
      {/* Explore Properties Section */}
      <ExploreProperties />
      
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
