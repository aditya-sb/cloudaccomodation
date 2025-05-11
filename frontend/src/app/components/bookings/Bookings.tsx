"use client";
import { useGetUserBookingsQuery } from "../../redux/slices/apiSlice";
import Loader from "@/loader/loader";
import { AwaitedReactNode, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useState, useEffect } from "react";

// Define booking interface to solve type issues
interface Booking {
  _id: string;
  propertyId: {
    title: string;
  };
  status: string;
  moveInMonth: string;
  rentalDays: number;
  createdAt: string;
  currency?: string;
  price: number;
  bedroomName?: string;
  bedroomStatus?: string;
  securityDeposit?: number;
  securityDepositPaid?: boolean;
  paymentStatus?: string;
  paymentAmount?: number;
  lastMonthPayment?: number;
  lastMonthPaymentPaid?: boolean;
}

export default function Bookings() {
  const [activeTab, setActiveTab] = useState("all"); // "all", "active", "completed"

  // Extract userId from token
  const getUserId = () => {
    try {
      const token = localStorage.getItem("auth_Token");
      if (!token) return null;

      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      const parsedToken = JSON.parse(jsonPayload);
      return parsedToken._id || parsedToken.id;
    } catch (error) {
      console.error("Error extracting userId:", error);
      return null;
    }
  };

  const userId = getUserId();
  console.log("User ID extracted from token:", userId);
  
  const {
    data,
    isLoading,
    error,
    refetch
  } = useGetUserBookingsQuery(userId, {
    refetchOnMountOrArgChange: true,
    skip: !userId
  });

  // Debug API response
  useEffect(() => {
    console.log("API Response - Bookings data:", data);
    console.log("API Response - Error:", error);
  }, [data, error]);

  if (isLoading) return <Loader />;
  if (error) {
    console.error('Bookings error:', error);
    return (
      <div className="flex items-center justify-center h-40">
        <div className="p-4 bg-red-50 text-red-500 rounded-lg shadow">
          Unable to load your bookings. Please try again later.
        </div>
      </div>
    );
  }

  // Ensure bookings is always an array and handle potential nested response structure
  let bookings: Booking[] = [];
  
  if (Array.isArray(data)) {
    bookings = data;
  } else if (data && typeof data === 'object') {
    // Check for common API response patterns
    if (Array.isArray(data.bookings)) {
      bookings = data.bookings;
    } else if (Array.isArray(data.data)) {
      bookings = data.data;
    } else if (data.result && Array.isArray(data.result)) {
      bookings = data.result;
    }
  }
  
  console.log("Processed bookings array:", bookings);
  
  // Filter bookings based on active tab
  const filteredBookings = bookings.filter((booking: Booking) => {
    if (activeTab === "all") return true;
    if (activeTab === "active") return booking.status === "confirmed" || booking.status === "pending";
    if (activeTab === "completed") return booking.status === "completed" || booking.status === "cancelled";
    return true;
  });

  console.log("Filtered bookings:", filteredBookings);

  // Format date to be more readable
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get payment status color
  const getPaymentStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return 'text-green-600';
      case 'pending':
        return 'text-yellow-600';
      case 'processing':
        return 'text-blue-600';
      case 'failed':
        return 'text-red-600';
      case 'refunded':
        return 'text-purple-600';
      default:
        return 'text-gray-600';
    }
  };

  // Get currency symbol based on currency code
  const getCurrencySymbol = (currencyCode: string) => {
    if (!currencyCode) return null;
    
    const currencyMap: Record<string, string> = {
      'usd': '$',
      'eur': '€',
      'gbp': '£',
      'inr': '₹',
      'jpy': '¥',
      'cny': '¥',
      'aud': 'A$',
      'cad': 'C$',
      'chf': 'CHF',
      'krw': '₩',
      'sgd': 'S$',
      'hkd': 'HK$',
      'rub': '₽',
      'brl': 'R$',
      'mxn': 'Mex$'
    };
    
    // Convert to lowercase for case-insensitive matching
    const code = currencyCode.toLowerCase();
    return currencyMap[code] || currencyCode;
  };

  return (
    <div className="w-full max-w-full overflow-x-hidden px-4 p-4 sm:px-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">My Bookings</h2>
      </div>

      {/* Tabs */}
      <div className="flex border-b mb-4 overflow-x-auto no-scrollbar">
        <button 
          className={`px-3 py-2 whitespace-nowrap ${activeTab === 'all' ? 'border-b-2 border-blue-500 text-blue-600 font-medium' : 'text-gray-500'}`}
          onClick={() => setActiveTab('all')}
        >
          All Bookings
        </button>
        <button 
          className={`px-3 py-2 whitespace-nowrap ${activeTab === 'active' ? 'border-b-2 border-blue-500 text-blue-600 font-medium' : 'text-gray-500'}`}
          onClick={() => setActiveTab('active')}
        >
          Active
        </button>
        <button 
          className={`px-3 py-2 whitespace-nowrap ${activeTab === 'completed' ? 'border-b-2 border-blue-500 text-blue-600 font-medium' : 'text-gray-500'}`}
          onClick={() => setActiveTab('completed')}
        >
          Completed/Cancelled
        </button>
      </div>

      {/* Bookings List */}
      <div className="max-h-96 overflow-y-auto pb-4 pr-1">
        {filteredBookings.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 bg-gray-50 rounded-lg">
            <div className="text-4xl mb-2">📋</div>
            <p className="text-gray-500">No bookings found</p>
            <p className="text-gray-400 text-xs mt-1">Your bookings will appear here</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredBookings.map((booking: Booking) => (
              <div
                key={booking._id}
                className="bg-white rounded-lg shadow-sm hover:shadow transition-shadow border border-gray-100 overflow-hidden"
              >
                <div className="p-3 sm:p-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold text-base text-gray-800 truncate">
                          {booking.propertyId?.title || "Property"}
                        </h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(booking.status)}`}>
                          {booking.status}
                        </span>
                        {booking.bedroomName && (
                          <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full">
                            {booking.bedroomName}
                          </span>
                        )}
                      </div>
                      
                      <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center text-gray-600">
                          <svg className="w-3 h-3 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                          </svg>
                          <span className="truncate">Move In: {booking.moveInMonth}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <svg className="w-3 h-3 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                          <span className="truncate">Duration: {booking.rentalDays} days</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          Bedroom: <span className="font-semibold ml-1 text-gray-700">{booking.bedroomName}</span>
                        </div>
                        {booking.paymentStatus && (
                          <div className="flex items-center text-gray-600">
                            Payment: 
                            <span className={`ml-1 font-medium ${getPaymentStatusColor(booking.paymentStatus)}`}>
                              {booking.paymentStatus.charAt(0).toUpperCase() + booking.paymentStatus.slice(1)}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="mt-2 text-gray-500 text-xs">
                        Booked on {formatDate(booking.createdAt)}
                      </div>
                    </div>
                    
                    <div className="sm:text-right flex flex-col sm:block justify-between items-end w-full sm:w-auto mt-2 sm:mt-0 gap-1">
                      {/* First Month Payment */}
                      {booking.price > 0 && (
                        <div>
                          <p className="text-sm text-gray-500">First Month Payment</p>
                          <p className="text-lg sm:text-xl font-bold text-blue-600">
                            {getCurrencySymbol(booking.currency || 'inr')}{booking.price}
                          </p>
                        </div>
                      )}
                      
                      {/* Security Deposit */}
                      {booking.securityDepositPaid && booking.securityDeposit && booking.securityDeposit > 0 && (
                        <div className="mt-1 text-right">
                          <p className="text-xs text-gray-500">Security Deposit</p>
                          <p className={`text-sm font-semibold ${booking.securityDepositPaid ? 'text-green-600' : 'text-yellow-600'}`}>
                            {getCurrencySymbol(booking.currency || 'inr')}{booking.securityDeposit}
                            <span className="text-xs ml-1">
                              {booking.securityDepositPaid ? '(Paid)' : '(Pending)'}
                            </span>
                          </p>
                        </div>
                      )}
                      
                      {/* Last Month Payment */}
                      {booking.lastMonthPaymentPaid && booking.lastMonthPayment && booking.lastMonthPayment > 0 && (
                        <div className="mt-1 text-right">
                          <p className="text-xs text-gray-500">Last Month Payment</p>
                          <p className={`text-sm font-semibold ${booking.lastMonthPaymentPaid ? 'text-green-600' : 'text-yellow-600'}`}>
                            {getCurrencySymbol(booking.currency || 'inr')}{booking.lastMonthPayment}
                            <span className="text-xs ml-1">
                              {booking.lastMonthPaymentPaid ? '(Paid)' : '(Pending)'}
                            </span>
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
