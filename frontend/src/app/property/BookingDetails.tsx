"use client";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import {
  FaAngleDown,
  FaArrowRight,
  FaMoneyBillWave,
  FaQuestionCircle,
} from "react-icons/fa";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { useCreateBookingMutation, useSubmitEnquiryMutation } from "../redux/slices/apiSlice";
import dynamic from 'next/dynamic';
import StripePayment from '../components/payment/StripePayment'; // Adjust the path as necessary
import isAuthenticated from "@/utils/auth-util";
import Login from "../auth/Login";

const BookingForm = ({ price, propertyId }: { price: number; propertyId: string }) => {
  const [rentalDays, setRentalDays] = useState(30);
  const [moveInMonth, setMoveInMonth] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // Add this line
  const [bookingDetails, setBookingDetails] = useState({
    name: "",
    email: "",
    phone: "",
    rentalDays: 30,
    moveInMonth: "",
    propertyId: "",
    price: 0
  });

  // Remove the createBooking mutation as it's no longer needed here
  // const [createBooking] = useCreateBookingMutation();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Function to generate future months dynamically
  const getAvailableMonths = (numberOfMonths: number) => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    return Array.from({ length: numberOfMonths }, (_, index) => {
      const adjustedMonth = (currentMonth + index) % 12;
      const year = currentYear + Math.floor((currentMonth + index) / 12);
      return `${months[adjustedMonth]} ${year}`;
    });
  };

  const validateForm = () => {
    if (!name.trim()) return "Name is required";
    if (!email.trim()) return "Email is required";
    if (!/\S+@\S+\.\S+/.test(email)) return "Email is invalid";
    if (!phone.trim()) return "Phone is required";
    if (!moveInMonth) return "Move-in month is required";
    if (rentalDays < 1) return "Rental days must be at least 1";
    return "";
  };

  // Reset form after successful payment
  const handlePaymentSuccess = async () => {
    alert("Payment successful! Your booking is being created.");
    
    // Create the booking after payment is successful
    const bookingData = {
      name,
      email,
      phone,
      rentalDays,
      moveInMonth,
      propertyId,
      price,
    };

    try {
      const response = await createBooking(bookingData).unwrap();
      console.log("Booking created successfully:", response);
      setBookingId(response.booking._id);
      setShowPayment(false); // Hide payment form after booking is created
    } catch (error) {
      console.error("Error creating booking:", error);
      setError("Failed to create booking. Please try again.");
    }
  };

  // Handle payment error
  const handlePaymentError = (message: string) => {
    setError(`Payment failed: ${message}`);
    // Keep the booking form and ID, so they can try again
  };

  const handleBookingSubmit = async () => {
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    setIsSubmitting(true); // Add this line
    
    try {
      // Instead of creating booking immediately, show payment form
      const bookingData = {
        name,
        email,
        phone,
        rentalDays,
        moveInMonth,
        propertyId,
        price,
      };

      setShowPayment(true);
    } catch (error) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false); // Add this line
    }
  };

  // Update booking details whenever form fields change
  useEffect(() => {
    setBookingDetails({
      name,
      email,
      phone,
      rentalDays,
      moveInMonth,
      propertyId,
      price
    });
  }, [name, email, phone, rentalDays, moveInMonth, propertyId, price]);

  return (
    <div className="flex flex-col text-sm space-y-3">
      {!showPayment ? (
        // Booking Form
        <>
          <div className="space-y-1.5">
            <div className="text-gray-600 text-xs font-medium">Rental Days:</div>
            <input
              type="number"
              value={rentalDays}
              onChange={(e) => setRentalDays(Number(e.target.value))}
              min="1"
              className="p-1.5 text-sm rounded-md w-full border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <div className="text-gray-600 text-xs font-medium">Move-in Month:</div>
            <div className="relative">
              <select
                style={{
                  color: "var(--cta)",
                  backgroundColor: "var(--background)",
                }}
                value={moveInMonth}
                onChange={(e) => setMoveInMonth(e.target.value)}
                className="p-1.5 text-sm rounded-md w-full border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white text-gray-700 shadow-sm hover:shadow-md"
              >
                <option value="" disabled>
                  Select move-in month
                </option>
                {getAvailableMonths(24).map((month) => (
                  <option
                    key={month}
                    value={month}
                    className="bg-gray-100 hover:bg-blue-100 text-gray-700"
                  >
                    {month}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="text-gray-600 text-xs font-medium">Name:</div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-1.5 text-sm rounded-md w-full border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="Enter your name"
            />
          </div>

          <div className="space-y-1.5">
            <div className="text-gray-600 text-xs font-medium">Email:</div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-1.5 text-sm rounded-md w-full border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="Enter your email"
            />
          </div>

          <div className="space-y-1.5">
            <div className="text-gray-600 text-xs font-medium">Phone:</div>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="p-1.5 text-sm rounded-md w-full border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="Enter your phone number"
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm font-medium">{error}</div>
          )}

          <button
            className="w-full py-2 rounded-md bg-blue-600 text-white flex justify-center items-center space-x-2 transition-all hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleBookingSubmit}
            disabled={isSubmitting}
          >
            <span>{isSubmitting ? "Submitting..." : "Continue to Payment"}</span>
            {!isSubmitting && <FaArrowRight className="h-5 w-5" />}
          </button>
        </>
      ) : (
        <StripePayment
          bookingDetails={bookingDetails}
          isOpen={showPayment}
          onClose={() => setShowPayment(false)}
          onSuccess={() => {
            setShowPayment(false);
            alert("Payment successful!");
            // Additional success handling
          }}
          onError={(message) => {
            setShowPayment(false);
            setError(message);
          }}
        />
      )}
    </div>
  );
};

const EnquiryForm = ({ price, propertyId }: { price: number; propertyId: string }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  // const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Using the submitEnquiry mutation hook
  const [submitEnquiry, { isLoading: isSubmitting, isSuccess, reset }] = useSubmitEnquiryMutation();

  const validateForm = () => {
    if (!name.trim()) return "Name is required";
    if (!email.trim()) return "Email is required";
    if (!/\S+@\S+\.\S+/.test(email)) return "Email is invalid";
    // if (!phone.trim()) return "Phone is required";
    if (!message.trim()) return "Message is required";
    if (message.trim().length < 10) return "Message must be at least 10 characters";
    return "";
  };

  // Reset form after successful submission
  useEffect(() => {
    if (isSuccess) {
      alert("Enquiry submitted successfully!");
      setName("");
      setEmail("");
      // setPhone("");
      setMessage("");
      reset(); // Reset the mutation state
    }
  }, [isSuccess, reset]);

  const handleEnquirySubmit = async () => {
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");

    try {
      const enquiryData = {
        name,
        email,
        // phone,
        message: `Property ID: ${propertyId}, Price: ${price}. ${message}`,
      };

      await submitEnquiry(enquiryData).unwrap();
    } catch (error) {
      console.error("Error submitting enquiry:", error);
      setError("Failed to submit enquiry. Please try again.");
    }
  };

  return (
    <div className="flex flex-col text-base space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div
          className="flex-1 flex flex-col space-y-2"
          style={{ color: "var(--copy-secondary)" }}
        >
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
        {/* <div
          className="flex-1 flex flex-col space-y-2"
          style={{ color: "var(--copy-secondary)" }}
        >
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
        </div> */}
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

      {error && (
        <div className="text-red-500 text-sm font-medium">{error}</div>
      )}

      <button
        className="w-full py-2 rounded-md flex justify-center items-center space-x-2 transition-all hover:opacity-75 disabled:opacity-50 disabled:cursor-not-allowed"
        style={{
          background: "var(--cta)",
          color: "var(--cta-text)",
        }}
        onClick={handleEnquirySubmit}
        disabled={isSubmitting}
      >
        <span>{isSubmitting ? "Submitting..." : "Submit Enquiry"}</span>
        {!isSubmitting && <FaArrowRight size={20} />}
      </button>
    </div>
  );
};

const BookingDetails = ({
  price,
  booking,
  propertyId,
}: {
  price: number;
  booking: boolean;
  propertyId: string;
}) => {
  const [isMinimized, setIsMinimized] = useState(true);
  const [activeForm, setActiveForm] = useState<"booking" | "enquiry">("enquiry");
  const [shake, setShake] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({
    name: "",
    email: "",
    phone: "",
    rentalDays: 30,
    moveInMonth: "",
    propertyId: "",
    price: 0
  });

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

  const handleAuthCheck = (formType: "booking" | "enquiry") => {
    if (isAuthenticated()) {
      setActiveForm(formType);
      setIsMinimized(false);
    } else {
      // Open login modal if not authenticated
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Overlay when forms are expanded */}
      {!isMinimized && (
        <div
          className="fixed inset-0 bg-black bg-opacity-65 backdrop-blur-sm z-10"
          onClick={() => setIsMinimized(true)}
        />
      )}

      {/* Login Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-65 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-auto" style={{ background: "var(--card)", color: "var(--foreground)" }}>
            <Login
              openForgetPassword={() => {}}
            />
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 transition-all hover:opacity-75"
              style={{ color: "var(--copy-secondary)" }}
            >
              <FaAngleDown size={20} />
            </button>
          </div>
        </div>
      )}

      {/* Payment Modal - Moved outside the booking form */}
      <StripePayment
        bookingDetails={bookingDetails}
        isOpen={showPayment}
        onClose={() => setShowPayment(false)}
        onSuccess={() => {
          setShowPayment(false);
          alert("Payment successful!");
        }}
        onError={(message) => {
          setShowPayment(false);
          setError(message);
        }}
      />

      {/* Main Booking Details Container */}
      <div
        id="bookingDetails"
        className={`fixed transition-all duration-500 ease-in-out transform ${
          isMinimized
            ? "bottom-4 left-6 right-6 md:left-auto md:right-6 h-12 flex justify-center md:justify-end items-center gap-2"
            : "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full md:max-w-md p-4 md:p-6 rounded-lg z-20"
        }`}
        style={{
          background: isMinimized ? "transparent" : "var(--card)",
          color: "var(--foreground)",
          border: isMinimized ? "none" : "1px solid var(--border-color)",
          maxHeight: isMinimized ? "auto" : "70vh", // Changed from 90vh to 70vh
          overflow: isMinimized ? "visible" : "auto"
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
                onClick={() => handleAuthCheck("booking")}
                style={{
                  background:
                    "linear-gradient(to right, var(--cta), var(--cta-active))",
                  color: "var(--cta-text)",
                }}
              >
                <FaMoneyBillTransfer className="mr-2" />
                <span className="block md:hidden">Book</span>
                <span className="hidden md:block">Book Now</span>
              </button>
            )}
            <button
              className={`px-6 py-3 w-full border-2 flex items-center rounded-full font-semibold ${
                shake ? "animate-shake" : ""
              }`}
              onClick={() => handleAuthCheck("enquiry")}
              style={{
                background:
                  "linear-gradient(to right, var(--cta), var(--cta-active))",
                color: "var(--cta-text)",
              }}
            >
              <FaQuestionCircle className="mr-2" /> Enquire
            </button>
          </div>
        )}

        {/* Expanded State */}
        {!isMinimized && (
          <div className="max-h-[80vh] md:max-h-none overflow-y-auto">
            

            {/* Render either Booking Form or Enquiry Form based on activeForm */}
            {booking && activeForm === "booking" ? (
              <BookingForm price={price} propertyId={propertyId} />
            ) : (
              <EnquiryForm price={price} propertyId={propertyId} />
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
    </>
  );
};

export default BookingDetails;
