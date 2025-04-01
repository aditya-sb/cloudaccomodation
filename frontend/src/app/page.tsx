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
import ReviewSection from "./components/Reviews";
import GetInTouch from "./components/GetInTouch";
import Loader from "@/loader/loader";

export default function Home() {
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const searchBarRef = useRef<HTMLDivElement>(null);
  const { data: properties, error, isLoading } = useGetPropertiesQuery({});

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        setIsHeaderVisible(!entry.isIntersecting);
      });
    }, options);

    if (searchBarRef.current) {
      observer.observe(searchBarRef.current);
    }

    return () => {
      if (searchBarRef.current) {
        observer.unobserve(searchBarRef.current);
      }
    };
  }, []);

  
  if (isLoading) {
    <Loader/>
  }

  return (
    <div
      className="min-h-screen"
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
      <div className="flex flex-col text-2xl max-md:text-lg mt-6 mb-10 w-full">
        <div className="flex gap-3 justify-start text-xl max-sm:text-base px-10  font-semibold text-gray-800 mb-10 md:mb-20 w-full">
          <h3 className="font-bold">Why Choose </h3>
          <h3 className="font-bold text-blue-500">Cloud Accommodation?</h3>
        </div>
        <div className="flex flex-col text-base items-center">
          <PrivacySection />
          <MoveInSection />
          <SecurityDepositSection />
          <NestNetworkSection />
        </div>
      </div>
      <ReviewSection />
      {/* Booking Button */}
      {/* <div className="flex justify-center m-10">
        <BookingButton />
      </div> */}

      {/* Other Services */}
      <OtherServices />
      <Refer />

      <GetInTouch/>

      {/* Footer */}
      <Footer />
    </div>
  );
}
