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
import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link";
import { motion } from "framer-motion";

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
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <PopularCities />
      </motion.div>

      {/* Explore Properties Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <ExploreProperties />
      </motion.div>

      {/* Other Sections */}
      <div className="flex flex-col text-2xl max-md:text-lg mt-6 mb-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex gap-3 justify-start text-xl max-sm:text-base px-10  font-semibold text-gray-800 mb-10 md:mb-20 w-full"
        >
          <h3 className="font-bold">Why Choose </h3>
          <h3 className="font-bold text-blue-500">Cloud Accommodation?</h3>
        </motion.div>
        <div className="flex flex-col text-base items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <PrivacySection />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <MoveInSection />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <SecurityDepositSection />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <NestNetworkSection />
          </motion.div>
        </div>
      </div>
      <ReviewSection />
      
      {/* WhatsApp Floating Button */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5, type: "spring", stiffness: 200 }}
        className="fixed bottom-8 right-8 z-50"
      >
        <motion.div
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "loop",
          }}
        >
          <Link
            href="https://wa.me/14372887804" // Replace with your actual WhatsApp number
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110 flex items-center justify-center"
            aria-label="Chat on WhatsApp"
          >
            <FaWhatsapp className="w-8 h-8" />
          </Link>
        </motion.div>
      </motion.div>

      {/* Booking Button */}
      {/* <div className="flex justify-center m-10">
        <BookingButton />
      </div> */}

      {/* Other Services */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <OtherServices />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <Refer />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <GetInTouch />
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <Footer />
      </motion.div>
    </div>
  );
}
