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
import SelectedBedroomDropdown, { BedroomDetail } from "../components/SelectedBedroomDropdown";

// Country code mapping
const COUNTRY_CODES: Record<string, string> = {
  'Canada': 'CA',
  'United States': 'US',
  'United Kingdom': 'GB',
  'Australia': 'AU',
  'European Union': 'EU',
  'Singapore': 'SG',
  'Hong Kong': 'HK',
  'Japan': 'JP',
  'India': 'IN',
  'Brazil': 'BR',
  'Mexico': 'MX',
  'South Africa': 'ZA',
  'United Arab Emirates': 'AE',
  'South Korea': 'KR'
};

// Currency mapping
const CURRENCY_CODES: Record<string, string> = {
  'CA': 'cad',
  'US': 'usd',
  'GB': 'gbp',
  'AU': 'aud',
  'EU': 'eur',
  'SG': 'sgd',
  'HK': 'hkd',
  'JP': 'jpy',
  'IN': 'inr',
  'BR': 'brl',
  'MX': 'mxn',
  'ZA': 'zar',
  'AE': 'aed',
  'KR': 'krw'
};

// Define the BookingDetailsType interface to match what StripePayment expects
interface BookingDetailsType {
  name: string;
  email: string;
  phone: string;
  rentalDays: number;
  moveInMonth: string;
  propertyId: string;
  price: number;
  securityDeposit?: number;
  lastMonthPayment?: number;
  currency?: string;
  country?: string;
  userId?: string; // This will be added during payment processing
  selectedBedroom?: BedroomDetail | null;
  bedroomName?: string; // Add explicit bedroomName field
}

const BookingForm = ({ price, propertyId, currency, securityDeposit, bookingOptions, bedroomDetails, initialSelectedBedroom }: { 
  price: number; 
  propertyId: string;
  currency: string;
  securityDeposit?: number;
  bookingOptions?: {
    allowSecurityDeposit: boolean;
    allowFirstRent: boolean;
    allowFirstAndLastRent: boolean;
  };
  bedroomDetails?: BedroomDetail[];
  initialSelectedBedroom?: BedroomDetail | null;
}) => {
  const [rentalDays, setRentalDays] = useState(30);
  const [moveInMonth, setMoveInMonth] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedBedroom, setSelectedBedroom] = useState<BedroomDetail | null>(initialSelectedBedroom || null);
  const [bookingDetails, setBookingDetails] = useState<BookingDetailsType>({
    name: "",
    email: "",
    phone: "",
    rentalDays: 30,
    moveInMonth: "",
    propertyId: "",
    price: 0,
    securityDeposit: 0,
    lastMonthPayment: 0,
    currency: currency || "inr",
    country: "IN",
    selectedBedroom: null
  });

  // Default booking options if not provided
  const options = bookingOptions || {
    allowSecurityDeposit: false,
    allowFirstRent: false,
    allowFirstAndLastRent: false
  };

  // Calculate payment details based on booking options
  const calculatePaymentDetails = (basePrice: number) => {
    // Use selected bedroom's rent if available, otherwise use the property price
    const effectivePrice = selectedBedroom ? selectedBedroom.rent : basePrice;
    
    if (options.allowSecurityDeposit) {
      return {
        price: 0, // No rent charged when only security deposit is required
        securityDeposit: securityDeposit || effectivePrice,
        lastMonthPayment: 0
      };
    } else if (options.allowFirstAndLastRent) {
      return {
        price: effectivePrice, // First month rent
        securityDeposit: 0, // No security deposit
        lastMonthPayment: effectivePrice // Last month is same as first month
      };
    } else {
      // Default to first month only (allowFirstRent or no option selected)
      return {
        price: effectivePrice, // Only first month rent
        securityDeposit: 0,
        lastMonthPayment: 0
      };
    }
  };

  // Calculate payment totals for display
  const paymentDetails = calculatePaymentDetails(price);
  const totalPayment = paymentDetails.price + paymentDetails.securityDeposit + paymentDetails.lastMonthPayment;

  const [createBooking] = useCreateBookingMutation();

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
    if (bedroomDetails && bedroomDetails.length > 0 && !selectedBedroom) return "Please select a bedroom";
    return "";
  };

  const handlePaymentSuccess = async () => {
    alert("Payment successful! Your booking is being created.");
    
    const bookingData = {
      name,
      email,
      phone,
      rentalDays,
      moveInMonth,
      propertyId,
      price: selectedBedroom ? selectedBedroom.rent : price,
      selectedBedroomName: selectedBedroom ? selectedBedroom.name : undefined,
      bedroomName: selectedBedroom ? selectedBedroom.name : undefined,
      currency: currency || "inr",
      securityDeposit: paymentDetails.securityDeposit || 0,
      lastMonthPayment: paymentDetails.lastMonthPayment || 0
    };

    try {
      // Commenting out API call
      // const response = await createBooking(bookingData).unwrap();
      // console.log("Booking created successfully:", response);
      // setBookingId(response.booking._id);
      
      console.log("Booking data:", bookingData); // For debugging
      setBookingId("mock-booking-id"); // Mock booking ID
      setShowPayment(false);
    } catch (error) {
      console.error("Error creating booking:", error);
      setError("Failed to create booking. Please try again.");
    }
  };

  const handlePaymentError = (message: string) => {
    setError(`Payment failed: ${message}`);
  };

  const handleBookingSubmit = async () => {
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    setIsSubmitting(true);
    
    try {
      const paymentDetails = calculatePaymentDetails(price);
      const countryCode = COUNTRY_CODES[currency] || "IN";
      
      const bookingData: BookingDetailsType = {
        name,
        email,
        phone,
        rentalDays,
        moveInMonth,
        propertyId,
        ...paymentDetails,
        currency: currency || "inr",
        country: countryCode,
        selectedBedroom: selectedBedroom || undefined,
        bedroomName: selectedBedroom ? selectedBedroom.name : undefined
      };

      setBookingDetails(bookingData);
      setShowPayment(true);
    } catch (error) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBedroomChange = (bedroom: BedroomDetail | null) => {
    setSelectedBedroom(bedroom);
  };

  useEffect(() => {
    const paymentDetails = calculatePaymentDetails(price);
    const countryCode = COUNTRY_CODES[currency] || "IN";
    
    setBookingDetails({
      name,
      email,
      phone,
      rentalDays,
      moveInMonth,
      propertyId,
      ...paymentDetails,
      currency: currency || "inr",
      country: countryCode,
      selectedBedroom: selectedBedroom || undefined,
      bedroomName: selectedBedroom ? selectedBedroom.name : undefined
    });
  }, [name, email, phone, rentalDays, moveInMonth, propertyId, price, currency, options, securityDeposit, selectedBedroom]);

  // Use effect to set the selected bedroom when initialSelectedBedroom changes
  useEffect(() => {
    if (initialSelectedBedroom) {
      setSelectedBedroom(initialSelectedBedroom);
    }
  }, [initialSelectedBedroom]);

  return (
    <div className="flex flex-col text-sm space-y-3">
      {!showPayment ? (
        <>
          {/* Bedroom Selection */}
          {bedroomDetails && bedroomDetails.length > 0 && (
            <div className="space-y-1.5">
              <div className="relative">
                <SelectedBedroomDropdown
                  selectedBedroom={selectedBedroom}
                  onBedroomChange={handleBedroomChange}
                  bedroomDetails={bedroomDetails}
                  currency={currency}
                />
              </div>
            </div>
          )}

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

          {/* Payment summary */}
          {selectedBedroom && (
            <div className="mt-4 p-3 bg-gray-50 rounded-md">
            <h3 className="font-medium mb-2 text-gray-700">Payment Summary</h3>
            <div className="space-y-1 text-sm">
              {selectedBedroom && (
                <div className="pb-2 mb-1 border-b border-gray-200">
                  <div className="font-medium text-gray-800">{selectedBedroom.name}</div>
                  <div className="text-xs text-gray-500">{selectedBedroom.sizeSqFt} sq.ft {selectedBedroom.furnished ? '• Furnished' : ''}</div>
                </div>
              )}

              <div className="flex justify-between">
                <span>First Month Rent:</span>
                <span>{currency.toUpperCase()} {(selectedBedroom ? selectedBedroom.rent : price)}</span>
              </div>
              
              {paymentDetails.securityDeposit > 0 && (
                <div className="flex justify-between">
                  <span>Security Deposit:</span>
                  <span>{currency.toUpperCase()} {paymentDetails.securityDeposit}</span>
                </div>
              )}
              
              {paymentDetails.lastMonthPayment > 0 && (
                <div className="flex justify-between">
                  <span>Last Month Rent:</span>
                  <span>{currency.toUpperCase()} {paymentDetails.lastMonthPayment}</span>
                </div>
              )}
              
              <div className="flex justify-between font-semibold border-t pt-1 mt-1">
                <span>Total Payment:</span>
                <span>{currency.toUpperCase()} {
                  options.allowSecurityDeposit ? 
                  (paymentDetails.securityDeposit) : 
                  options.allowFirstAndLastRent ? 
                  ((selectedBedroom ? selectedBedroom.rent : price) * 2) : 
                  (selectedBedroom ? selectedBedroom.rent : price)
                }</span>
              </div>
              
              <div className="mt-2 text-xs text-gray-500">
                {options.allowSecurityDeposit && (
                  <p>* Includes security deposit, which is refundable at the end of your stay.</p>
                )}
                {options.allowFirstAndLastRent && (
                  <p>* Includes first and last month's rent as per the rental agreement.</p>
                )}
                {options.allowFirstRent && (
                  <p>* Only first month's rent is required now.</p>
                )}
              </div>
            </div>
          </div>
          )}

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
          bookingDetails={{
            ...bookingDetails,
            // StripePayment will extract the userId from the token internally
            userId: 'pending' // Temporary userId that will be replaced in StripePayment
          }}
          isOpen={showPayment}
          onClose={() => setShowPayment(false)}
          onSuccess={handlePaymentSuccess}
          onError={handlePaymentError}
        />
      )}
    </div>
  );
};

const EnquiryForm = ({ price, propertyId }: { price: number; propertyId: string }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [submitEnquiry, { isLoading: isSubmitting, isSuccess, reset }] = useSubmitEnquiryMutation();

  const validateForm = () => {
    if (!name.trim()) return "Name is required";
    if (!email.trim()) return "Email is required";
    if (!/\S+@\S+\.\S+/.test(email)) return "Email is invalid";
    if (!message.trim()) return "Message is required";
    if (message.trim().length < 10) return "Message must be at least 10 characters";
    return "";
  };

  useEffect(() => {
    if (isSuccess) {
      alert("Enquiry submitted successfully!");
      setName("");
      setEmail("");
      setMessage("");
      reset();
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
  securityDeposit,
  currency = "inr",
  bookingOptions = {
    allowSecurityDeposit: false,
    allowFirstRent: false,
    allowFirstAndLastRent: false
  },
  bedroomDetails,
  selectedBedroom
}: {
  price: number;
  booking: boolean;
  propertyId: string;
  securityDeposit?: number;
  currency?: string;
  bookingOptions?: {
    allowSecurityDeposit: boolean;
    allowFirstRent: boolean;
    allowFirstAndLastRent: boolean;
  };
  bedroomDetails?: BedroomDetail[];
  selectedBedroom?: BedroomDetail | null;
}) => {
  const [isMinimized, setIsMinimized] = useState(true);
  const [activeForm, setActiveForm] = useState<"booking" | "enquiry">("enquiry");
  const [shake, setShake] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState("");
  const [bookingDetails, setBookingDetails] = useState<BookingDetailsType>({
    name: "",
    email: "",
    phone: "",
    rentalDays: 30,
    moveInMonth: "",
    propertyId,
    price,
    securityDeposit: 0,
    lastMonthPayment: 0,
    currency: currency || "inr",
    country: "IN",
    selectedBedroom: null
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

  useEffect(() => {
    if (showPayment) {
      const paymentDetails = calculatePaymentDetails(price);
      
      // Make sure we have the latest booking details with the country code
      setBookingDetails(prevDetails => ({
        ...prevDetails,
        propertyId,
        ...paymentDetails,
        currency: currency || "inr",
        country: "IN" // Use country code
      }));
    }
  }, [showPayment, propertyId, price, currency, bookingOptions, securityDeposit]);

  const handleAuthCheck = (formType: "booking" | "enquiry") => {
    if (isAuthenticated()) {
      setActiveForm(formType);
      setIsMinimized(false);
    } else {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Calculate payment amounts based on booking options
  const calculatePaymentDetails = (basePrice: number) => {
    if (bookingOptions.allowSecurityDeposit) {
      // Add security deposit to the amount
      return {
        price: 0, // No rent charged when only security deposit is required
        securityDeposit: securityDeposit || basePrice, // Use provided security deposit or fall back to price
        lastMonthPayment: 0
      };
    } else if (bookingOptions.allowFirstRent) {
      // Only first month's rent
      return {
        price: basePrice,
        securityDeposit: 0,
        lastMonthPayment: 0
      };
    } else if (bookingOptions.allowFirstAndLastRent) {
      // First and last month's rent
      return {
        price: basePrice, // First month rent
        securityDeposit: 0, // No security deposit
        lastMonthPayment: basePrice // Last month is same as first month
      };
    } else {
      // Default: only first month's rent
      return {
        price: basePrice,
        securityDeposit: 0,
        lastMonthPayment: 0
      };
    }
  };

  const handlePaymentSuccess = () => {
    setShowPayment(false);
    alert("Payment successful!");
  };

  const handlePaymentError = (message: string) => {
    setShowPayment(false);
    setError(message);
  };

  return (
    <>
      {!isMinimized && (
        <div
          className="fixed inset-0 bg-black bg-opacity-65 backdrop-blur-sm z-10"
          onClick={() => setIsMinimized(true)}
        />
      )}

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

      <StripePayment
        bookingDetails={{
          ...bookingDetails,
          // StripePayment will extract the userId from the token internally
          userId: 'pending' // Temporary userId that will be replaced in StripePayment
        }}
        isOpen={showPayment}
        onClose={() => setShowPayment(false)}
        onSuccess={handlePaymentSuccess}
        onError={handlePaymentError}
      />

      <div
        id="bookingDetails"
        className={`fixed transition-all duration-500 ease-in-out transform ${
          isMinimized ? "bottom-4 left-6 right-6 md:left-auto md:right-6 h-12 flex justify-center md:justify-end items-center gap-2" : "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full md:max-w-md p-4 md:p-6 rounded-lg z-20"
        }`}
        style={{
          background: isMinimized ? "transparent" : "var(--card)",
          color: "var(--foreground)",
          border: isMinimized ? "none" : "1px solid var(--border-color)",
          maxHeight: isMinimized ? "auto" : "70vh",
          overflow: isMinimized ? "visible" : "auto"
        }}
      >
        {isMinimized && (
          <div className="flex justify-center w-full md:w-[400px] gap-4 px-4">
            {booking && (
              <button
                className={`px-6 py-3 w-full border-2 items-center flex rounded-full font-semibold ${
                  shake ? "animate-shake" : ""
                }`}
                onClick={() => handleAuthCheck("booking")}
                style={{
                  background:  "linear-gradient(to right, var(--cta), var(--cta-active))",
                  color: "var(--cta-text)",
                }}
                data-action="book"
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
                background:  "linear-gradient(to right, var(--cta), var(--cta-active))",
                color: "var(--cta-text)",
              }}
            >
              <FaQuestionCircle className="mr-2" /> Enquire
            </button>
          </div>
        )}

        {!isMinimized && (
          <div className="max-h-[80vh] md:max-h-none overflow-y-auto">
            {booking && activeForm === "booking" ? (
              <BookingForm 
                price={price} 
                propertyId={propertyId} 
                currency={currency} 
                securityDeposit={securityDeposit}
                bookingOptions={bookingOptions}
                bedroomDetails={bedroomDetails}
                initialSelectedBedroom={selectedBedroom}
              />
            ) : (
              <EnquiryForm price={price} propertyId={propertyId} />
            )}

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
