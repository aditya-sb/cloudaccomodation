import Image from "next/image";
import { FaHeart, FaBed, FaBath, FaVectorSquare, FaStar, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import ImageSlider from "../components/ImageSlider";

const COUNTRY_TO_CURRENCY = {
  'USA': 'USD',
  'India': 'INR',
  'Canada': 'CAD',
  'UK': 'GBP',
  'EU': 'EUR',
  'Australia': 'AUD'
};

const CURRENCY_SYMBOLS = {
  'USD': '$',
  'INR': '₹',
  'CAD': 'C$',
  'GBP': '£',
  'EUR': '€',
  'AUD': 'A$'
};

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US').format(price);
};

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
  verified?: boolean;
  country: string;
  currencyCode?: string;
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
  verified = false,
  country,
  currencyCode,
}: PropertyCardProps) {
  const currency = currencyCode || COUNTRY_TO_CURRENCY[country as keyof typeof COUNTRY_TO_CURRENCY] || 'USD';
  const currencySymbol = CURRENCY_SYMBOLS[currency as keyof typeof CURRENCY_SYMBOLS] || '$';

  return (
    <div className="flex rounded-xl shadow-lg  transition-transform transform hover:scale-[1.03] hover:shadow-2xl cursor-pointer w-full bg-[var(--border)] text-[var(--cta-text)]">
      
      {/* Image Slider & Badge */}
      <div className="w-1/3 relative overflow-hidden rounded-lg">
        <ImageSlider images={images} />

        <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold shadow"
          style={{
            backgroundColor: verified ? "#22c55e" : "#9ca3af",
            color: "#fff"
          }}>
          {verified ? (
            <div className="flex items-center">
              <FaCheckCircle className="mr-1" /> Verified
            </div>
          ) : (
            <div className="flex items-center">
              <FaTimesCircle className="mr-1" /> Unverified
            </div>
          )}
        </div>

        {/* <button
          className="absolute top-3 right-3 p-2 rounded-full shadow-md transition hover:opacity-75"
          style={{ backgroundColor: "var(--gray-hover-bg)", color: "var(--cta-text)" }}
        >
          <FaHeart size={10} />
        </button> */}
      </div>

      {/* Details */}
      <div className="w-2/3 pl-5 flex flex-col justify-between px-4 py-2">
        <div>
          <h2 className="text-lg font-bold mb-1 text-[var(--copy-primary)]">{title}</h2>
          <p className="text-sm text-[var(--gray-text)] mb-2">{location}</p>

          <div className="grid grid-cols-3 gap-3 text-sm text-[var(--gray-text)] mb-4">
            <div className="flex items-center gap-1"><FaBed /> {beds} Beds</div>
            <div className="flex items-center gap-1"><FaBath /> {baths} Baths</div>
            <div className="flex items-center gap-1"><FaVectorSquare /> {area} sq ft</div>
          </div>
        </div>

        <div className="flex justify-between items-center mt-2">
          <p className="text-base font-semibold text-[var(--copy-primary)]">
            {currencySymbol}{formatPrice(price)} <span className="text-sm font-normal text-[var(--gray-text)]">/month</span>
          </p>

          {/* <div className="flex items-center space-x-1 text-sm text-[var(--gray-text)]">
            <FaStar className="text-yellow-500" />
            <span className="font-medium">{rating}</span>
            <span>({reviewsCount})</span>
          </div> */}
        </div>
      </div>
    </div>
  );
}
