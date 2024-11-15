"use client";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaAngleDown, FaArrowRight, FaMoneyBillWave } from "react-icons/fa";

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
          booking.classList.remove("opacity-50");
        } else {
          booking.classList.add("opacity-50");
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
      className={`fixed transition-all duration-500 ease-in-out transform shadow-xl ${isMinimized
          ? "bottom-6 right-6 w-12 h-12 rounded-full cursor-pointer flex justify-center items-center"
          : "top-20 right-6 w-full max-w-md p-6 rounded-lg"
        } flex flex-col z-20 sm:w-96`}
      style={{
        zIndex: 10,
        background: isMinimized
          ? "linear-gradient(to right, var(--cta), var(--cta-active))"
          : "var(--card)",
        color: "var(--foreground)",
      }}
    >
      {/* Minimized State */}
      {isMinimized && (
        <div
          className="text-center font-semibold"
          style={{ color: "var(--cta-text)" }}
        >
          {price}
        </div>
      )}

      {/* Expanded Content */}
      {!isMinimized && (
        <div className="flex-grow flex flex-col space-y-4 w-full text-center sm:text-left">
          <div className="space-y-2">
            <div style={{ color: "var(--copy-secondary)" }}>Price:</div>
            <div className="flex items-center justify-center sm:justify-start">
              <FaMoneyBillWave
                className="mr-2"
                style={{ color: "var(--copy-secondary)" }}
              />
              {price}
            </div>
          </div>
          <div className="space-y-2">
            <div style={{ color: "var(--copy-secondary)" }}>Rental Days:</div>
            <input
              type="number"
              value={rentalDays}
              onChange={(e) => setRentalDays(Number(e.target.value))}
              min="1"
              className="p-2 rounded-md text-center w-full sm:w-20 focus:ring-2 transition-all"
              style={{
                background: "var(--input-bg)",
                border: `1px solid var(--input-border)`,
              }}
            />
          </div>
          <div className="space-y-2">
            <div style={{ color: "var(--copy-secondary)" }}>Check-in:</div>
            <DatePicker
              selected={checkInDate}
              onChange={(date) => setCheckInDate(date)}
              placeholderText="Select date"
              className="custom-date-picker"
            />

          </div>
          <div className="space-y-2">
            <div style={{ color: "var(--copy-secondary)" }}>Check-out:</div>
            <DatePicker
              selected={checkOutDate}
              onChange={(date) => setCheckOutDate(date)}
              placeholderText="Select date"
              className="custom-date-picker"
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
          className="absolute top-2 right-2 transition-all hover:opacity-75"
          style={{ color: "var(--copy-secondary)" }}
        >
          <FaAngleDown size={20} />
        </button>
      )}

      {/* Proceed Button */}
      {!isMinimized && (
        <div className="w-full mt-6">
          <button
            className="w-full py-2 rounded-md flex justify-center items-center space-x-2 transition-all hover:opacity-75"
            style={{
              background: "var(--cta)",
              color: "var(--cta-text)",
            }}
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
