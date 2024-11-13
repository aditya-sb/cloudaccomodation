"use client";
import { useState, useEffect } from "react";
import { FaAngleDown, FaMoneyBillWave, FaArrowRight } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const BookingDetails = ({ price }: { price: string }) => {
  const [isMinimized, setIsMinimized] = useState(true);
  const [rentalDays, setRentalDays] = useState(30);
  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const header = document.getElementById("header");
      const footer = document.getElementById("footer");
      const booking = document.getElementById("bookingDetails");

      if (header && footer && booking) {
        const headerBottom = header.getBoundingClientRect().bottom;
        const footerTop = footer.getBoundingClientRect().top;
        const bookingTop = booking.getBoundingClientRect().top;

        if (bookingTop <= headerBottom || window.innerHeight - footerTop <= 0) {
          booking.classList.add("opacity-100");
          booking.classList.remove("opacity-20");
        } else {
          booking.classList.add("opacity-20");
          booking.classList.remove("opacity-100");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      id="bookingDetails"
      onClick={() => setIsMinimized(false)}
      className={`fixed transition-all duration-500 ease-in-out shadow-xl transform ${
        isMinimized
          ? "bottom-6 right-6 w-16 h-16 rounded-full cursor-pointer bg-gradient-to-r from-purple-500 to-pink-500 text-white flex justify-center items-center text-sm sm:text-base"
          : "top-20 right-6 w-full max-w-md p-6 bg-gray-900 text-white rounded-xl"
      } flex flex-col justify-center items-center z-20 sm:w-96 sm:h-auto sm:bottom-10 sm:right-6 sm:p-6`}
      style={{ zIndex: 10 }}
    >
      {/* Minimized Version */}
      {isMinimized && (
        <div className="text-center font-semibold text-white">
          {price} 
        </div>
      )}

      {/* Expanded Content */}
      {!isMinimized && (
        <div className="flex-grow flex flex-col space-y-4 w-full text-center sm:text-left">
          <div className="space-y-2">
            <div className="text-gray-400">Price:</div>
            <div className="flex items-center justify-center sm:justify-start text-gray-300">
              <FaMoneyBillWave className="mr-2 text-gray-400" />
              {price}
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-gray-400">Rental Days:</div>
            <input
              type="number"
              value={rentalDays}
              onChange={(e) => setRentalDays(Number(e.target.value))}
              min="1"
              className="bg-gray-800 border border-gray-600 p-2 rounded-md text-center w-full sm:w-20 text-white focus:ring-2 focus:ring-indigo-500 transition-all"
            />
          </div>
          <div className="space-y-2">
            <div className="text-gray-400">Check-in:</div>
            <DatePicker
              selected={checkInDate}
              onChange={(date) => setCheckInDate(date)}
              placeholderText="Select date"
              className="bg-gray-800 border border-gray-600 p-2 rounded-md w-full text-white focus:ring-2 focus:ring-indigo-500 transition-all"
            />
          </div>
          <div className="space-y-2">
            <div className="text-gray-400">Check-out:</div>
            <DatePicker
              selected={checkOutDate}
              onChange={(date) => setCheckOutDate(date)}
              placeholderText="Select date"
              className="bg-gray-800 border border-gray-600 p-2 rounded-md w-full text-white focus:ring-2 focus:ring-indigo-500 transition-all"
            />
          </div>
        </div>
      )}

      {/* Expand/Collapse Button */}
      {!isMinimized && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsMinimized(true);
          }}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-100 transition-all"
        >
          <FaAngleDown size={20} />
        </button>
      )}

      {/* Proceed Button */}
      {!isMinimized && (
        <div className="w-full mt-6">
          <button
            className="w-full py-2 bg-indigo-600 text-white rounded-md flex justify-center items-center space-x-2 hover:bg-indigo-700 transition-all"
            onClick={() => alert("Proceeding with booking!")}
          >
            <span>Proceed</span>
            <FaArrowRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default BookingDetails;
