"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  useCreateBookingMutation,
  useGetPropertiesQuery,
} from "../redux/slices/apiSlice";
import Header from "../components/Header";
import Footer from "../components/Footer";
import StripePayment from "../components/payment/StripePayment";
import Dropdown from "../components/Dropdown";
import {
  FaBolt,
  FaDollarSign,
  FaHeadset,
  FaUndo,
  FaCheck,
  FaLocationArrow,
  FaAngleDown,
} from "react-icons/fa";

// Update PaymentResult interface
interface PaymentResult {
  paymentId: string;
  status: string;
}

// Update BookingData interface
interface BookingData {
  userId: string;
  name: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;
  email: string;
  phone: string;
  address: string;
  addressLine2?: string;
  leaseStart: string;
  leaseEnd?: string | null;
  moveInDate: string;
  moveOutDate?: string | null;
  rentalDays: number;
  moveInMonth: string;
  universityName?: string;
  courseName?: string;
  universityAddress?: string;
  enrollmentStatus?: string;
  hasMedicalConditions: boolean;
  medicalDetails?: string;
  propertyId: string;
  bedroomId?: string;
  bedroomName: string;
  price: number;
  currency: string;
  leaseDuration: string;
}

// Add interface for payment details
interface PaymentDetails {
  amount: number;
  currency: string;
}

// Booking form page component
export default function BookingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [createBooking, { isLoading, isSuccess, error }] =
    useCreateBookingMutation();

  // Payment state and handlers
  const [showPayment, setShowPayment] = useState(false);

  // Get property details from URL params
  const propertyId = searchParams.get("propertyId");
  const bedroomId = searchParams.get("bedroomId");
  const price = searchParams.get("price");

  // State for payment modal and booking data
  const [pendingBookingData, setPendingBookingData] =
    useState<BookingData | null>(null);
  const [selectedBedroomId, setSelectedBedroomId] = useState(bedroomId || "");

  // Handle successful payment
  const handlePaymentSuccess = async (paymentResult: PaymentResult) => {
    try {
      if (pendingBookingData) {
        // Add payment information to booking data
        const bookingDataWithPayment = {
          ...pendingBookingData,
          paymentIntentId: paymentResult.paymentId,
          paymentStatus: "completed",
          status: "confirmed",
        };

        // Create booking after successful payment
        const result = await createBooking(bookingDataWithPayment).unwrap();

        if (result) {
          alert("Booking created successfully!");
          router.push("/bookings");
        }
      }
    } catch (err) {
      console.error("Error in payment success handler:", err);
      alert(
        "An error occurred while processing your booking. Please try again."
      );
    }
  };

  // Handle payment error
  const handlePaymentError = (message: string) => {
    console.error("Payment error:", message);
    alert(`Payment failed: ${message}`);
  };

  // Fetch property details
  const { data: propertyData, isLoading: isLoadingProperty } =
    useGetPropertiesQuery(propertyId ? { id: propertyId } : null);

  // Extract the first property from the results
  const property = propertyData?.[0];
  // Find selected bedroom details using bedroomId
  const selectedBedroom = property?.overview?.bedroomDetails?.find(
    (bed: any) => bed._id === (bedroomId || selectedBedroomId)
  );

  // Update form price when bedroom selection changes
  useEffect(() => {
    if (!bedroomId && selectedBedroomId && property?.overview?.bedroomDetails) {
      const bedroom = property.overview.bedroomDetails.find(
        (bed: any) => bed._id === selectedBedroomId
      );
      if (bedroom) {
        // Update the URL parameters
        const params = new URLSearchParams(window.location.search);
        params.set("bedroomId", selectedBedroomId);
        params.set("price", bedroom.rent.toString());
        window.history.replaceState(
          {},
          "",
          `${window.location.pathname}?${params.toString()}`
        );
      }
    }
  }, [selectedBedroomId, property, bedroomId]);

  // Form state
  const [formData, setFormData] = useState({
    // Accommodation details
    leaseStart: "",
    leaseEnd: "",
    moveInDate: "",
    moveOutDate: "",

    // Personal details
    fullName: "",
    leaseDuration: "",
    dateOfBirth: "",
    gender: "",
    code: "",
    mobileNumber: "",
    emailAddress: "",
    nationality: "",
    address: "",
    addressLine2: "",
    country: "",
    stateProvince: "",

    // Medical conditions
    hasMedicalConditions: false,
    medicalDetails: "",

    // University details
    universityName: "",
    courseName: "",
    universityAddress: "",
    enrollmentStatus: "",
  });

  // Handle form input changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const target = e.target as HTMLInputElement;
      setFormData({
        ...formData,
        [name]: target.checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!propertyId) {
      alert("Property information is missing");
      return;
    }

    try {
      // Get user ID from localStorage
      const token = localStorage.getItem("auth_Token");
      if (!token) {
        alert("Please login to book a property");
        router.push("/auth/login?redirect=/booking");
        return;
      }

      // Extract userId from token
      const getUserId = () => {
        try {
          const base64Url = token.split(".")[1];
          const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
          const jsonPayload = decodeURIComponent(
            atob(base64)
              .split("")
              .map(function (c) {
                return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
              })
              .join("")
          );

          const parsedToken = JSON.parse(jsonPayload);
          return parsedToken._id || parsedToken.id;
        } catch (error) {
          console.error("Error extracting userId:", error);
          return null;
        }
      };

      const userId = getUserId();

      if (!userId) {
        alert("User authentication error");
        return;
      }

      // Get the selected bedroom details
      const selectedBedroomDetails = property?.overview?.bedroomDetails?.find(
        (bedroom: any) => bedroom._id === (bedroomId || selectedBedroomId)
      );

      if (!selectedBedroomDetails) {
        alert("Please select a room");
        return;
      }

      // Calculate days between move in and move out
      const moveInDate = new Date(formData.moveInDate);
      const moveOutDate = formData.moveOutDate
        ? new Date(formData.moveOutDate)
        : null;
      const rentalDays = moveOutDate
        ? Math.ceil(
            (moveOutDate.getTime() - moveInDate.getTime()) /
              (1000 * 60 * 60 * 24)
          )
        : 30;

      // Format move-in month for display
      const moveInMonth = moveInDate.toLocaleString("default", {
        month: "long",
        year: "numeric",
      });

      // Prepare booking data
      const bookingData = {
        userId,
        propertyId,
        bedroomId: bedroomId || selectedBedroomId,
        bedroomName: selectedBedroomDetails.name,
        // Personal Information
        leaseDuration: formData.leaseDuration,
        name: formData.fullName,
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,
        nationality: formData.nationality,
        email: formData.emailAddress,
        phone: `${formData.code}${formData.mobileNumber}`,

        // Address Information
        address: formData.address,
        addressLine2: formData.addressLine2,
        country: formData.country,
        stateProvince: formData.stateProvince,

        // Booking Dates
        leaseStart: formData.moveInDate,
        leaseEnd: formData.moveOutDate || null,
        moveInDate: formData.moveInDate,
        moveOutDate: formData.moveOutDate || null,
        rentalDays,
        moveInMonth,

        // University Information
        universityName: formData.universityName,
        courseName: formData.courseName,
        universityAddress: formData.universityAddress,
        enrollmentStatus: formData.enrollmentStatus,

        // Medical Information
        hasMedicalConditions: formData.hasMedicalConditions,
        medicalDetails: formData.medicalDetails,

        // Pricing Information
        price: selectedBedroomDetails.rent,
        currency: property?.currency || "inr",
      };

      // Store the booking data and show payment modal
      setPendingBookingData(bookingData);
      setShowPayment(true);
    } catch (err) {
      console.error("Form submission error:", err);
      alert(
        "Failed to process booking. Please check your information and try again."
      );
    }
  };

  // Effect for success
  useEffect(() => {
    if (isSuccess) {
      alert("Booking created successfully!");
      router.push("/bookings");
    }
  }, [isSuccess, router]);

  // Effect for errors
  useEffect(() => {
    if (error) {
      if ("data" in error) {
        alert((error.data as any)?.error || "An error occurred");
      } else {
        alert("An unexpected error occurred");
      }
    }
  }, [error]);

  return (
    <>
      <Header isPropertyPage={false} />

      {/* Thanks Banner */}
      <div className="max-w-7xl mt-20  mx-auto gap-10 p-2 my-3 flex flex-row max-sm:flex-col items-center">
        <div className="flex-shrink-0 max-sm:hidden">
          <h1 className="text-3xl font-bold text-black-800">Booking Form</h1>
        </div>
        <div className="bg-green-100 rounded-lg p-5 w-full flex items-start gap-4">
          <div className="flex-shrink-0 w-10 h-10  md:ml-6 flex items-center justify-center bg-green-700 rounded-full text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-black-800">Thanks !</h3>
            <p className="text-sm text-gray-700">
              We're excited to receive your request! Fasten up the booking by
              filling out the details.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content - Property Info and Form */}
      <div className="max-w-7xl mx-auto p-2 my-6">
        <div className="flex flex-col lg:flex-row lg:gap-8">
          {/* Left Column - Property Info */}
          <div className="lg:w-[30%] lg:sticky lg:top-4 lg:self-start">
            <div className="bg-white rounded-lg shadow-sm border border-gray-300 rounded-lg p-3 bg-white shadow-sm mb-6 lg:mb-0">
              {/* <h2 className="text-xl font-semibold mb-4">Property Details</h2> */}
              <div className="flex max-sm:p-2 flex-col items-start gap-4">
                <div className="w-100 h-50 max-sm:w-full max-sm:mt-8 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                  {property?.images?.length > 0 && (
                    <img
                      src={property.images[0]}
                      alt={property.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold">
                    {property?.title || "Loading..."}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {property?.location || "Loading..."}
                  </p>
                  {!bedroomId && property?.overview?.bedroomDetails && (
                    <div className="mt-3">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Select Room
                      </label>
                      <select
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        value={selectedBedroomId}
                        onChange={(e) => setSelectedBedroomId(e.target.value)}
                        required
                      >
                        <option value="">Select a room</option>
                        {property.overview.bedroomDetails.map(
                          (bedroom: any) => (
                            <option key={bedroom._id} value={bedroom._id}>
                              {bedroom.name} - ${bedroom.rent}/month (
                              {bedroom.sizeSqFt} sq ft)
                            </option>
                          )
                        )}
                      </select>
                    </div>
                  )}
                  <p className="text-sm text-gray-600 mt-2">
                    Selected Bedroom:{" "}
                    {selectedBedroom?.name || "Please select a bedroom"}
                  </p>
                  {selectedBedroom && (
                    <p className="text-sm text-gray-600 mt-1">
                      Price: ${selectedBedroom.rent.toLocaleString()} per month
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden mt-4">
              <Dropdown
                className="border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
                title="Instant Booking"
                icon={<FaBolt size={14} />}
              >
                <p>Details about instant booking go here...</p>
              </Dropdown>
              <Dropdown
                className="border border-gray-200 hover:border-gray-300 transition-colors"
                title="Lowest Price Guaranteed"
                icon={<FaDollarSign size={14} />}
              >
                <p>Details about price guarantee go here...</p>
              </Dropdown>
              <Dropdown
                className="border border-gray-200 hover:border-gray-300 transition-colors"
                title="Verified Properties"
                icon={<FaCheck size={14} />}
              >
                <p>Details about verified properties go here...</p>
              </Dropdown>
              <Dropdown
                className="border border-gray-200 hover:border-gray-300 transition-colors"
                title="24x7 Personal Assistance"
                icon={<FaHeadset size={14} />}
              >
                <p>Details about personal assistance go here...</p>
              </Dropdown>
              <Dropdown
                className="border border-gray-200 hover:border-gray-300 transition-colors"
                title="5.8K+ Reviews"
                icon={<FaUndo size={14} />}
              >
                <p>Details about reviews go here...</p>
              </Dropdown>
            </div>
          </div>
          

          {/* Right Column - Booking Form */}
          <div className="lg:w-[70%] ">
            <div className="flex justify-end gap-2 items-center mb-10 max-sm:hidden">
              <p className="text-sm">Need help? We are here.</p>
              <button
                type="button"
                className="text-black-500 font-semibold underline text-sm hover:underline"
              >
                {" "}
                Contact us
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Accommodation Details */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-300 rounded-lg p-6 bg-white shadow-sm">
                <div className="mb-4 flex items-center">
                  <div className="text-black w-6 h-6 border-2 border-blue-500 p-4 rounded-full flex items-center justify-center mr-3">
                    <span>1</span>
                  </div>
                  <h3 className="text-lg font-semibold">
                    Accommodation Details
                  </h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Tell us about your ideal accommodation!
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Lease Duration
                    </label>
                    <select
                      name="leaseDuration"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      onChange={handleChange}
                    >
                      <option value="">Select lease duration</option>
                      <option value="1">1 month</option>
                      <option value="3">3 months</option>
                      <option value="6">6 months</option>
                      <option value="12">12 months</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Move-In Date *
                    </label>
                    <input
                      type="date"
                      name="moveInDate"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      value={formData.moveInDate}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Move-Out Date
                    </label>
                    <input
                      type="date"
                      name="moveOutDate"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      value={formData.moveOutDate}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              {/* Personal Details */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-300 rounded-lg p-6 bg-white shadow-sm">
                <div className="mb-4 flex items-center">
                  <div className="text-black w-6 h-6 border-2 border-blue-500 p-4 rounded-full flex items-center justify-center mr-3">
                    <span>2</span>
                  </div>
                  <h3 className="text-lg font-semibold">Personal Details</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Please add details to book your spot
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Enter Full Name"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date of Birth *
                    </label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Gender *
                    </label>
                    <select
                      name="gender"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      value={formData.gender}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Click to Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Code *
                      </label>
                      <input
                        type="text"
                        name="code"
                        placeholder="Code"
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        value={formData.code}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Mobile number *
                      </label>
                      <input
                        type="tel"
                        name="mobileNumber"
                        placeholder="Enter Mobile Number"
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        value={formData.mobileNumber}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="emailAddress"
                      placeholder="name@example.com"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      value={formData.emailAddress}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="emailAddressConfirm"
                      placeholder="name@example.com"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nationality *
                    </label>
                    <select
                      name="nationality"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      value={formData.nationality}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select</option>
                      <option value="canada">Canada</option>
                      <option value="usa">United States</option>
                      <option value="india">India</option>
                      <option value="uk">United Kingdom</option>
                      <option value="australia">Australia</option>
                      {/* Add more countries as needed */}
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address *
                    </label>
                    <input
                      type="text"
                      name="address"
                      placeholder="Enter your full address"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      value={formData.address}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address line 2 *
                    </label>
                    <input
                      type="text"
                      name="addressLine2"
                      placeholder="Enter address"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      value={formData.addressLine2}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Country of residence*
                    </label>
                    <input
                      type="text"
                      name="country"
                      placeholder="Search and select"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      value={formData.country}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      State/Province*
                    </label>
                    <input
                      type="text"
                      name="stateProvince"
                      placeholder="Enter your state"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      value={formData.stateProvince}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="hasMedicalConditions"
                        checked={formData.hasMedicalConditions}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            hasMedicalConditions: e.target.checked,
                          })
                        }
                        className="rounded text-blue-500 focus:ring-blue-500"
                      />
                      <span className="text-sm font-medium text-gray-700">
                        I have some medical conditions
                      </span>
                    </label>

                    {formData.hasMedicalConditions && (
                      <textarea
                        name="medicalDetails"
                        placeholder="Please type in additional details, if none type N/A."
                        className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        value={formData.medicalDetails}
                        onChange={handleChange}
                        rows={3}
                      ></textarea>
                    )}
                  </div>
                </div>
              </div>

              {/* University Details */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-300 rounded-lg p-6 bg-white shadow-sm">
                <div className="mb-4 flex items-center">
                  <div className="text-black w-6 h-6 border-2 border-blue-500 p-4 rounded-full flex items-center justify-center mr-3">
                    <span>3</span>
                  </div>
                  <h3 className="text-lg font-semibold">University</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      University Name *
                    </label>
                    <input
                      type="text"
                      name="universityName"
                      placeholder="Enter the university name"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      value={formData.universityName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Course Name *
                    </label>
                    <input
                      type="text"
                      name="courseName"
                      placeholder="Enter the course name"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      value={formData.courseName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      University Address *
                    </label>
                    <input
                      type="text"
                      name="universityAddress"
                      placeholder="Enter the university address"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      value={formData.universityAddress}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Enrollment status*
                    </label>
                    <select
                      name="enrollmentStatus"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      value={formData.enrollmentStatus}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Click to select</option>
                      <option value="enrolled">Currently Enrolled</option>
                      <option value="accepted">Accepted but not started</option>
                      <option value="graduated">Graduated</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium flex items-center"
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    "Save and Next →"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <StripePayment
        displayData={{
          ...pendingBookingData,
          userId: "pending",
          leaseDuration: formData.leaseDuration,
          name: formData.fullName,
          email: formData.emailAddress,
          phone: `${formData.code}${formData.mobileNumber}`,
          rentalDays: pendingBookingData?.rentalDays || 30,
          moveInDate: formData.moveInDate,
          moveInMonth: new Date(formData.moveInDate).toLocaleString("default", {
            month: "long",
            year: "numeric",
          }),
          propertyId: propertyId || "",
          price: pendingBookingData?.price || 0,
          currency: pendingBookingData?.currency || "inr",
        }}
        paymentDetails={{
          amount: pendingBookingData?.price || 0,
          currency: pendingBookingData?.currency || "inr",
        }}
        isOpen={showPayment}
        onClose={() => setShowPayment(false)}
        onSuccess={handlePaymentSuccess}
        onError={handlePaymentError}
      />
      <Footer />
    </>
  );
}
