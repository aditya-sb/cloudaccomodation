"use client";
import { useState, useEffect } from "react";
import { FaAngleDown, FaMoneyBillWave, FaCalendarAlt, FaArrowRight } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const BookingDetails = ({ price }: { price: string }) => {
  const [isMinimized, setIsMinimized] = useState(true);
  const [rentalDays, setRentalDays] = useState(30);
  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);

  const monthlyRent = parseFloat(price.replace(/[^\d.-]/g, ""));

  // Smooth scroll visibility handling
  useEffect(() => {
    const handleScroll = () => {
      const header = document.getElementById("header");
      const footer = document.getElementById("footer");
      const booking = document.getElementById("bookingDetails");

      if (header && footer && booking) {
        const headerBottom = header.getBoundingClientRect().bottom;
        const footerTop = footer.getBoundingClientRect().top;
        const bookingTop = booking.getBoundingClientRect().top;

        // Smooth transition handling without abruptly hiding elements
        if (bookingTop <= headerBottom || window.innerHeight - footerTop <= 0) {
          booking.classList.add("opacity-100");
          booking.classList.remove("opacity-30");
        } else {
          booking.classList.add("opacity-30");
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
      className={`fixed transition-all duration-500 ease-in-out shadow-xl transform ${isMinimized ? 'bottom-8 right-8 w-24 h-24 rounded-full p-2 cursor-pointer bg-gradient-to-r from-gray-300 to-indigo-500 text-black' : 'top-16 right-8 w-full max-w-md p-6 bg-gray-800 text-white rounded-2xl'} flex flex-col justify-between items-center z-20 sm:w-96 sm:h-auto sm:bottom-16 sm:right-8 sm:p-6`}
      style={{ zIndex: 10 }}
    >
      <div className="flex justify-between items-center min-w-fit mb-4">
        <div className={`transition-all duration-300 text-lg font-semibold ${isMinimized ? 'text-white' : 'text-gray-200'}`}>
          {isMinimized ? `${price} - Book` : "Booking Details"}
        </div>
        {!isMinimized && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsMinimized(true);
            }}
            className="text-gray-400 hover:text-gray-100 transition-all"
          >
            <FaAngleDown size={20} />
          </button>
        )}
      </div>

      {/* Expanded Content */}
      {!isMinimized && (
        <div className="flex-grow flex flex-col space-y-6 w-full">
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Price:</span>
            <span className="flex items-center text-gray-300">
              <FaMoneyBillWave className="mr-2 text-gray-400" />
              {price}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Rental Days:</span>
            <input
              type="number"
              value={rentalDays}
              onChange={(e) => setRentalDays(Number(e.target.value))}
              min="1"
              className="bg-gray-700 border border-gray-600 p-2 rounded-md text-center w-20 text-white focus:ring-2 focus:ring-indigo-500 transition-all"
            />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Check-in:</span>
            <DatePicker
              selected={checkInDate}
              onChange={(date) => setCheckInDate(date)}
              placeholderText="Select date"
              className="bg-gray-700 border border-gray-600 p-2 rounded-md w-full text-white focus:ring-2 focus:ring-indigo-500 transition-all"
            />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Check-out:</span>
            <DatePicker
              selected={checkOutDate}
              onChange={(date) => setCheckOutDate(date)}
              placeholderText="Select date"
              className="bg-gray-700 border border-gray-600 p-2 rounded-md w-full text-white focus:ring-2 focus:ring-indigo-500 transition-all"
            />
          </div>
        </div>
      )}

      {/* Proceed Button */}
      {!isMinimized && (
        <div className="w-full mt-6">
          <button
            className="w-full py-2 bg-indigo-600 text-white rounded-md flex justify-center items-center space-x-2 hover:bg-indigo-700 transition-all"
            onClick={() => alert('Proceeding with booking!')}
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
