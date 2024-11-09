"use client";
import { useState, useEffect } from "react";
import {
  FaAngleDown,
//   FaRegCheckCircle,
  FaMoneyBillWave,
} from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const BookingDetails = ({ price }: { price: string }) => {
  const [isMinimized, setIsMinimized] = useState(true);
  const [rentalDays, setRentalDays] = useState(30);
//   const [isFirstLastMonth, setIsFirstLastMonth] = useState(false);
//   const [isSecurityDeposit, setIsSecurityDeposit] = useState(false);
  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);

  const monthlyRent = parseFloat(price.replace(/[^\d.-]/g, ""));
//   const bookingFee = (monthlyRent * 0.07).toFixed(2);
//   const totalRent = (monthlyRent * rentalDays).toFixed(2);

  useEffect(() => {
    const handleScroll = () => {
      const header = document.getElementById("header");
      const footer = document.getElementById("footer");
      const booking = document.getElementById("bookingDetails");

      if (header && footer && booking) {
        const headerBottom = header.getBoundingClientRect().bottom;
        const footerTop = footer.getBoundingClientRect().top;
        const bookingTop = booking.getBoundingClientRect().top;

        const isOverlappingHeader = bookingTop <= headerBottom;
        const isOverlappingFooter = window.innerHeight - footerTop <= 0;

        // Set visibility based on header/footer overlap
        booking.style.visibility = isOverlappingHeader || isOverlappingFooter ? "hidden" : "visible";
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      id="bookingDetails"
      onClick={() => setIsMinimized(false)}
      className={`fixed transition-all duration-300 ease-in-out shadow-lg ${
        isMinimized
          ? "bottom-8 right-8 w-24 h-24 rounded-full p-2 cursor-pointer bg-white text-gray-700"
          : "top-16 right-8 h-auto w-96 p-6 bg-gray-700 text-white"
      } flex flex-col justify-between items-center z-10`}
      style={{ zIndex: 10 }}
    >
      <div className="flex justify-between items-center w-full mb-4">
        <div className={`transition-all duration-300 text-lg font-semibold`}>
          {isMinimized ? `${price} - Book` : "Booking Details"}
        </div>
        {!isMinimized && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsMinimized(true);
            }}
            className="text-gray-400 hover:text-gray-100"
          >
            <FaAngleDown size={20} />
          </button>
        )}
      </div>

      {/* Expanded Content */}
      {!isMinimized && (
        <div className="flex-grow flex flex-col space-y-4 w-full">
          <div className="flex justify-between items-center">
            <span>Price:</span>
            <span className="flex items-center">
              <FaMoneyBillWave className="mr-2 text-gray-400" />
              {price}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Rental Days:</span>
            <input
              type="number"
              value={rentalDays}
              onChange={(e) => setRentalDays(Number(e.target.value))}
              min="1"
              className="bg-gray-700 border border-gray-600 p-2 rounded-md text-center w-16 text-white"
            />
          </div>
          <div className="flex justify-between items-center">
            <span>Check-in:</span>
            <DatePicker
              selected={checkInDate}
              onChange={(date) => setCheckInDate(date)}
              placeholderText="Select date"
              className="bg-gray-700 border border-gray-600 p-2 rounded-md w-full text-white"
            />
          </div>
          <div className="flex justify-between items-center">
            <span>Check-out:</span>
            <DatePicker
              selected={checkOutDate}
              onChange={(date) => setCheckOutDate(date)}
              placeholderText="Select date"
              className="bg-gray-700 border border-gray-600 p-2 rounded-md w-full text-white"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingDetails;
