"use client";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaAngleDown, FaArrowRight, FaMoneyBillWave, FaMoneyCheck, FaQuestion, FaQuestionCircle } from "react-icons/fa";
import {  FaMoneyBillTransfer } from "react-icons/fa6";

const BookingForm = ({ price }: { price: string }) => {
  const [rentalDays, setRentalDays] = useState(30);
  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);
  console.log("price", price);
  const handleBookingSubmit = () => {
    alert(`Booking submitted!\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nCheck-in: ${checkInDate}\nCheck-out: ${checkOutDate}\nRental Days: ${rentalDays}`);
  };

  return (
    <div className="flex flex-col space-y-4">
      
      <div className="space-y-2">
        <div style={{ color: "var(--copy-secondary)" }}>Rental Days:</div>
        <input
          type="number"
          value={rentalDays}
          onChange={(e) => setRentalDays(Number(e.target.value))}
          min="1"
          className="p-2 rounded-md w-full focus:ring-2 transition-all"
          style={{
            background: "var(--input-bg)",
            border: "1px solid var(--input-border)",
          }}
        />
      </div>

      <div className="space-y-2">
        <div style={{ color: "var(--copy-secondary)" }}>Check-in:</div>
        <DatePicker
          selected={checkInDate}
          onChange={(date) => setCheckInDate(date)}
          placeholderText="Select check-in date"
          className="custom-date-picker w-full"
        />
      </div>

      <div className="space-y-2">
        <div style={{ color: "var(--copy-secondary)" }}>Check-out:</div>
        <DatePicker
          selected={checkOutDate}
          onChange={(date) => setCheckOutDate(date)}
          placeholderText="Select check-out date"
          className="custom-date-picker w-full"
        />
      </div>

      <button
        className="w-full py-2 rounded-md flex justify-center items-center space-x-2 transition-all hover:opacity-75"
        style={{
          background: "var(--cta)",
          color: "var(--cta-text)",
        }}
        onClick={handleBookingSubmit}
      >
        <span>Complete Booking</span>
        <FaArrowRight size={20} />
      </button>
    </div>
  );
};

const EnquiryForm = ({ price }: { price: string }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleEnquirySubmit = () => {
    alert(`Enquiry submitted!\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`);
  };
  console.log("price", price);
  return (
    <div className="flex flex-col text-sm space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 flex flex-col space-y-2" style={{ color: "var(--copy-secondary)" }}>
          <div>Name:</div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 rounded-md w-full focus:ring-2 transition-all"
            style={{
              background: "var(--input-bg)",
              border: "1px solid var(--input-border)",
            }}
            placeholder="Enter your name"
          />
        </div>
        <div className="flex-1 flex flex-col space-y-2" style={{ color: "var(--copy-secondary)" }}>
          <div>Phone:</div>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="p-2 rounded-md w-full focus:ring-2 transition-all"
            style={{
              background: "var(--input-bg)",
              border: "1px solid var(--input-border)",
            }}
            placeholder="Enter your phone no."
          />
        </div>
      </div>

      <div className="space-y-2">
        <div style={{ color: "var(--copy-secondary)" }}>Email:</div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 rounded-md w-full focus:ring-2 transition-all"
          style={{
            background: "var(--input-bg)",
            border: "1px solid var(--input-border)",
          }}
          placeholder="Enter your email"
        />
      </div>

      <div className="space-y-2">
        <div style={{ color: "var(--copy-secondary)" }}>Message:</div>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="p-2 rounded-md w-full h-32 focus:ring-2 transition-all"
          style={{
            background: "var(--input-bg)",
            border: "1px solid var(--input-border)",
          }}
          placeholder="Enter your message"
        />
      </div>

      <button
        className="w-full py-2 rounded-md flex justify-center items-center space-x-2 transition-all hover:opacity-75"
        style={{
          background: "var(--cta)",
          color: "var(--cta-text)",
        }}
        onClick={handleEnquirySubmit}
      >
        <span>Submit Enquiry</span>
        <FaArrowRight size={20} />
      </button>
    </div>
  );
};

const BookingDetails = ({ price, booking }: { price: string; booking: boolean }) => {
  const [isMinimized, setIsMinimized] = useState(true);
  const [activeForm, setActiveForm] = useState<'booking' | 'enquiry'>('enquiry');
  const [shake, setShake] = useState(false);

  useEffect(() => {
    if (isMinimized) {
      const interval = setInterval(() => {
        setShake(true);
        setTimeout(() => setShake(false), 500);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [isMinimized]);

  useEffect(() => {
    const handleScroll = () => {
      const header = document.getElementById("header");
      const footer = document.getElementById("footer");
      const bookingDiv = document.getElementById("bookingDetails");

      if (header && footer && bookingDiv) {
        const headerBottom = header.getBoundingClientRect().bottom;
        const footerTop = footer.getBoundingClientRect().top;
        const bookingTop = bookingDiv.getBoundingClientRect().top;

        if (bookingTop <= headerBottom || window.innerHeight - footerTop <= 0) {
          bookingDiv.classList.add("opacity-100");
          bookingDiv.classList.remove("opacity-50");
        } else {
          bookingDiv.classList.add("opacity-50");
          bookingDiv.classList.remove("opacity-100");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      id="bookingDetails"
      className={`fixed transition-all duration-500 ease-in-out transform ${
        isMinimized
          ? "bottom-6 left-6 right-6 md:left-auto md:right-6 h-12 flex justify-center md:justify-end items-center gap-2"
          : "bottom-0 left-0 right-0 md:top-20 md:bottom-auto md:right-6 md:left-auto w-full md:max-w-md p-4 md:p-6 rounded-t-lg md:rounded-lg border-2"
      } z-20`}
      style={{
        zIndex: 10,
        background: isMinimized ? "transparent" : "var(--card)",
        color: "var(--foreground)",
      }}
    >
      {/* Minimized State */}
      {isMinimized && (
        <div className="flex justify-center w-full md:w-[400px] gap-4 px-4">
          {booking && (
            <button
              className={`px-6 py-3 w-full border-2 items-center flex rounded-full font-semibold ${
                shake ? "animate-shake" : ""
              }`}
              onClick={() => {
                setActiveForm('booking');
                setIsMinimized(false);
              }}
              style={{
                background: "linear-gradient(to right, var(--cta), var(--cta-active))",
                color: "var(--cta-text)"
              }}
            >
              <FaMoneyBillTransfer className="mr-2" />  Book Now
            </button>
          )}
          <button
            className={`px-6 py-3 w-full border-2 flex items-center rounded-full font-semibold ${
              shake ? "animate-shake" : ""
            }`}
            onClick={() => {
              setActiveForm('enquiry');
              setIsMinimized(false);
            }}
            style={{
              background: "linear-gradient(to right, var(--cta), var(--cta-active))",
              color: "var(--cta-text)"
            }}
          >
           <FaQuestionCircle className="mr-2" /> Enquire
          </button>
        </div>
      )}

      {/* Expanded State */}
      {!isMinimized && (
        <div className="max-h-[80vh] md:max-h-none overflow-y-auto">
          {/* Price Display */}
          <div className="mb-6">
            <div style={{ color: "var(--copy-secondary)" }}>Price:</div>
            <div className="flex items-center">
              <FaMoneyBillWave
                className="mr-2"
                style={{ color: "var(--copy-secondary)" }}
              />
              {price}
            </div>
          </div>

          {/* Render either Booking Form or Enquiry Form based on activeForm */}
          {booking && activeForm === 'booking' ? (
            <BookingForm price={price} />
          ) : (
            <EnquiryForm price={price} />
          )}

          {/* Minimize Button */}
          <button
            onClick={() => setIsMinimized(true)}
            className="absolute top-2 right-2 transition-all hover:opacity-75"
            style={{ color: "var(--copy-secondary)" }}
          >
            <FaAngleDown size={20} />
          </button>
        </div>
      )}
    </div>
  );
};


export default BookingDetails;