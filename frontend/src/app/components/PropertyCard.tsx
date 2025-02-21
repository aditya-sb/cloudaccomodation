import Image from "next/image";
import Link from "next/link";
import { FaHeart, FaBed, FaBath, FaVectorSquare, FaStar } from "react-icons/fa";
import ImageSlider from "./ImageSlider";
import styles from "./ImageSlider.module.css";

interface PropertyCardProps {
  images: string[];
  title: string;
  location: string;
  price: number;
  beds: number;
  baths: number;
  area: number;
  rating: number;
  reviewsCount: number;
}

export default function PropertyCard({
  images,
  title,
  location,
  price,
  beds,
  baths,
  area,
  rating,
  reviewsCount,
}: PropertyCardProps) {
  return (
    <div  className="flex-shrink-0">
      <div className="rounded-2xl shadow-lg hover:shadow-xl transition-all border bg-white cursor-pointer max-sm:w-64 w-50 relative flex-shrink-0">
        {/* Image Slider */}
        <div className="relative w-full text-[10px] overflow-hidden rounded-t-2xl">
          <ImageSlider images={images} />
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
          <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:opacity-80">
            <FaHeart className="text-gray-500" />
          </button>
        </div>

        {/* Property Details */}
        <div className="p-4">
          <h2 className="text-base font-semibold text-gray-800 truncate">{title}</h2>
          <p className="text-sm text-gray-500 mt-1">{location}</p>

          {/* Price and Ratings */}
          <div className="flex items-center justify-between mt-4">
            <span className="text-lg font-bold text-gray-800">CAD {price}</span>
            <div className="flex items-center space-x-1">
              <FaStar className="text-yellow-500" />
              <span className="text-sm text-gray-700 font-medium">{4.1}</span>
              <span className="text-sm text-gray-500">({12} reviews)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
