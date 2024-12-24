import Image from "next/image";
import Link from "next/link";
import { FaHeart, FaUserFriends } from "react-icons/fa";

interface PropertyCardProps {
  image: string;
  title: string;
  location: string;
  price: string;
  description: string;
}

export default function PropertyCard({
  image,
  title,
  location,
  price,
}: PropertyCardProps) {
  return (
      <div
        className="flex rounded-lg shadow-xl p-4 transition hover:scale-105 hover:shadow-2xl cursor-pointer w-full"
        style={{
          backgroundColor: "var(--border)", // Global variable
          color: "var(--cta-text)", // Global variable
        }}
      >
        {/* Left: Image */}
        <div className="w-1/3 relative">
          <Image
            src={image}
            alt={title}
            width={150}
            height={100}
            className="rounded-lg object-cover w-full h-full"
          />
          <div
            className="absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-semibold shadow"
            style={{
              backgroundColor: "var(--success-text)", // Global variable
              color: "var(--cta-text)", // Global variable
            }}
          >
            Featured
          </div>
          <button
            className="absolute top-3 right-3 p-1 rounded-full shadow transition hover:opacity-75"
            style={{
              backgroundColor: "var(--gray-hover-bg)", // Global variable
              color: "var(--cta-text)", // Global variable
            }}
          >
            <FaHeart />
          </button>
        </div>

        {/* Right: Property Details */}
        <div className="w-2/3 pl-4">
          <h2
            className="text-lg font-semibold"
            style={{ color: "var(--copy-primary)" }}
          >
            {title}
          </h2>
          <p
            className="text-sm mt-1 truncate"
            style={{ color: "var(--gray-text)" }}
          >
            {location}
          </p>
          <div className="flex items-center mt-2">
            <FaUserFriends className="mr-2" style={{ color: "var(--hover-color)" }} />
            <span style={{ color: "var(--gray-text)" }}>Family</span>
          </div>
          <div className="grid grid-cols-3 gap-1 mt-3 text-xs">
            <p className="font-bold" style={{ color: "var(--gray-text)" }}>
              {price} /month
            </p>
            <p style={{ color: "var(--gray-text)" }}>Security Deposit</p>
            <p style={{ color: "var(--gray-text)" }}>Area</p>
          </div>
          <Link href="/property" passHref>
          <button
            className="mt-4 py-1 px-3 rounded-lg shadow-md transition hover:opacity-75"
            style={{
              background: "linear-gradient(to right, var(--cta), var(--cta-active))",
              color: "var(--cta-text)",
            }}
          >
            View Details
          </button>
          </Link>
        </div>
      </div>
  );
}
