"use client";
import { useEffect, useState, useRef, Key } from "react";
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
import { useGetPropertiesQuery } from "./redux/slices/apiSlice";

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
        {isLoading && <p>Loading properties...</p>}
        {error && (
          <p>
            Error loading properties:{" "}
            {"status" in error ? error.status : error.message}
          </p>
        )}
        {properties && properties.map((property: { _id: Key | null | undefined; images: string[]; title: string; location: string; price: { toLocaleString: () => any; }; description: string; }) => (
          <PropertyCard
            key={property._id}
            images={property.images}
            title={property.title}
            location={property.location}
            price={`$${property.price.toLocaleString()}`}
            description={property.description}
          />
        ))}
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
