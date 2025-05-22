"use client";
import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

interface BookingButtonProps {
  bedroomName: string;
  price: number;
  className?: string;
}

const BookingButton: React.FC<BookingButtonProps> = ({ 
  bedroomName, 
  price,
  className = "px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
}) => {
  // Get the property ID from the URL path
  // This assumes the component is used within a property page
  const params = useParams();
  const propertyId = params?.propertyId || "";
  
  return (
    <Link 
      href={`/booking?propertyId=${encodeURIComponent(propertyId.toString())}&bedroomName=${encodeURIComponent(bedroomName)}&price=${encodeURIComponent(price)}`}
      className={className}
    >
      Book Now
    </Link>
  );
};

export default BookingButton;
  