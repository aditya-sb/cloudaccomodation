import Image from "next/image";
import Link from "next/link";
import { FaHeart, FaBed, FaBath, FaVectorSquare, FaStar, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import ImageSlider from "./ImageSlider";
import styles from "./ImageSlider.module.css";
import { useAddToWishlistMutation, useRemoveFromWishlistMutation, useGetWishlistQuery } from '../redux/slices/apiSlice';
import { useGetUserDetailsQuery } from "../redux/slices/apiSlice";
import { useState, useEffect } from 'react';

// Add currency mapping
const COUNTRY_TO_CURRENCY = {
  'USA': 'USD',
  'India': 'INR',
  'Canada': 'CAD',
  'UK': 'GBP',
  'EU': 'EUR',
  'Australia': 'AUD'
};

// Add currency symbols
const CURRENCY_SYMBOLS = {
  'USD': '$',
  'INR': '₹',
  'CAD': 'C$',
  'GBP': '£',
  'EUR': '€',
  'AUD': 'A$'
};

// Add price formatter function
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US').format(price);
};

interface PropertyCardProps {
  _id: string;
  images: string[];
  title: string;
  location: string;
  price: number;
  beds: number;
  baths: number;
  verified?: boolean;
  area: number;
  rating: number;
  reviewsCount: number;
  country: string; // Add country prop
  currencyCode?: string;
  className?: string;
  isInWishlist?: boolean; // Optional prop to override wishlist status
}

export default function PropertyCard({
  _id,
  images,
  title,
  location,
  price,
  beds,
  baths,
  area,
  rating,
  className,
  verified = false,
  reviewsCount,
  country,
  currencyCode,
  isInWishlist,
}: PropertyCardProps) {
  const { data: user } = useGetUserDetailsQuery();
  const { data: wishlistData, isLoading: wishlistLoading } = useGetWishlistQuery(
    user?.user?._id, 
    { skip: !user?.user?._id }
  );
  
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  // Get currency code and symbol based on country
  const [addToWishlist] = useAddToWishlistMutation();
  const [removeFromWishlist] = useRemoveFromWishlistMutation();

  const currencySymbol = CURRENCY_SYMBOLS[currencyCode || COUNTRY_TO_CURRENCY[country]];

  // Check if property is in wishlist
  useEffect(() => {
    if (isInWishlist !== undefined) {
      // If explicit prop is provided, use it
      setIsWishlisted(isInWishlist);
    } else if (wishlistData && user?.user?._id) {
      // Handle the cleaned up response structure
      let wishlistItems = [];
      
      if (Array.isArray(wishlistData)) {
        wishlistItems = wishlistData;
      } else if (wishlistData.wishlist && Array.isArray(wishlistData.wishlist)) {
        wishlistItems = wishlistData.wishlist;
      } else if (wishlistData.data && Array.isArray(wishlistData.data)) {
        wishlistItems = wishlistData.data;
      }
      
      // Check if property is in the user's wishlist
      const isInWishlist = wishlistItems.some((item: any) => {
        const propertyId = item.property?._id || item.property || item.propertyId;
        return propertyId === _id;
      });
      setIsWishlisted(isInWishlist);
    }
  }, [wishlistData, _id, isInWishlist, user?.user?._id]);

  const handleWishlistClick = async (e: React.MouseEvent) => {
    // Prevent event bubbling to parent container
    e.stopPropagation();
    e.preventDefault();
    
    if (!user?.user?._id) {
      console.error('User not logged in');
      return;
    }
    
    try {
      if (isWishlisted) {
        // Property is currently in wishlist - REMOVE it
        console.log('Removing property from wishlist:', _id);
        await removeFromWishlist({ userId: user.user._id, propertyId: _id }).unwrap();
        setIsWishlisted(false);
        console.log('Property successfully removed from wishlist');
      } else {
        // Property is not in wishlist - ADD it
        console.log('Adding property to wishlist:', _id);
        await addToWishlist({ userId: user.user._id, propertyId: _id }).unwrap();
        setIsWishlisted(true);
        console.log('Property successfully added to wishlist');
      }
    } catch (error) {
      console.error('Failed to update wishlist:', error);
      // Revert optimistic update on error
      setIsWishlisted(!isWishlisted);
    }
  };
  
  return (
    <div className="flex-shrink-0">
      <div className={`rounded-2xl shadow-lg hover:shadow-xl transition-all border bg-white cursor-pointer max-sm:w-64 w-50 relative flex-shrink-0 ${className}`}>
        {/* Image Slider */}
        <div className="relative w-full text-[10px] overflow-hidden rounded-t-2xl">
          <ImageSlider images={images} />
          
          {/* Verification Badge */}
          <div className="absolute top-3 left-3 z-10">
            {verified ? (
              <div className="bg-green-500 text-white px-2 py-1 rounded-md flex items-center text-xs font-medium">
                <FaCheckCircle className="mr-1" />
                Verified
              </div>
            ) : (
              <div className="bg-gray-500 text-white px-2 py-1 rounded-md flex items-center text-xs font-medium">
                <FaTimesCircle className="mr-1" />
                Unverified
              </div>
            )}
          </div>
          
          <div className={styles.infoOverlay}>
            <div className={styles.infoText}>
              <div className={styles.infoItem}>
                <FaBed />
                <span>{beds} Beds</span>
              </div>
              <div className={styles.infoItem}>
                <FaBath />
                <span>{baths} Baths</span>
              </div>
              <div className={styles.infoItem}>
                <FaVectorSquare />
                <span>{area} sq ft</span>
              </div>
            </div>
          </div>
          
          {/* Heart Button - Fixed */}
          <button 
            onClick={handleWishlistClick}
            disabled={wishlistLoading}
            className={`absolute top-3 right-3 p-2 bg-white rounded-full shadow-md transition-all z-10 ${
              wishlistLoading ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-80'
            }`}
          >
            <FaHeart 
              className={`transition-colors duration-200 ${
                isWishlisted ? 'text-red-500' : 'text-gray-500'
              }`} 
            />
          </button>
        </div>

        {/* Property Details */}
        <div className="p-4">
          <h2 className="text-base font-semibold text-gray-800 truncate">{title}</h2>
          <p className="text-sm text-gray-500 mt-1">{location}</p>

          {/* Price and Ratings */}
          <div className="flex items-center justify-between mt-4">
            <span className="flex justify-center items-center gap-1 text-lg font-bold text-gray-800">
              {currencySymbol}{formatPrice(price)}<p className="text-sm">/month</p>
            </span>
            {/* <div className="flex items-center space-x-1">
              <FaStar className="text-yellow-500" />
              <span className="text-sm text-gray-700 font-medium">{rating}</span>
              <span className="text-sm text-gray-500">({reviewsCount} reviews)</span>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}