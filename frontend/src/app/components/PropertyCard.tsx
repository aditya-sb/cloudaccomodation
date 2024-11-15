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
    <Link href="/property" passHref>
      <div
        className="rounded-lg shadow-xl p-5 transition hover:scale-105 hover:shadow-2xl cursor-pointer w-full max-w-md mx-auto sm:w-[95%] sm:mx-2"
        style={{
          backgroundColor: "var(--border)",
          color: "var(--cta-text)",
        }}
      >
        <div className="relative">
          <Image
            src={image}
            alt={title}
            width={400}
            height={250}
            className="rounded-lg object-cover w-full h-56"
          />
          <div
            className="absolute top-3 left-3 px-3 py-1 rounded-full text-sm font-semibold shadow"
            style={{
              backgroundColor: "var(--success-text)",
              color: "var(--cta-text)",
            }}
          >
            3 Houses
          </div>
          <button
            className="absolute top-3 right-3 p-2 rounded-full shadow transition hover:opacity-75"
            style={{
              backgroundColor: "var(--gray-hover-bg)",
              color: "var(--cta-text)",
            }}
          >
            <FaHeart />
          </button>
        </div>
        <div className="mt-4">
          <h2
            className="text-lg sm:text-xl font-semibold"
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
          <div className="flex items-center mt-3">
            <FaUserFriends
              className="mr-2"
              style={{ color: "var(--hover-color)" }}
            />
            <span style={{ color: "var(--gray-text)" }}>
              Boys, Girls, Family
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-4 text-xs sm:text-sm">
            <p className="font-bold" style={{ color: "var(--gray-text)" }}>
              {price} /month
            </p>
            <p style={{ color: "var(--gray-text)" }}>Security Deposit</p>
            <p style={{ color: "var(--gray-text)" }}>Area</p>
          </div>
          <button
            className="mt-4 py-2 px-4 rounded-lg shadow-md transition  hover:opacity-75"
            style={{
              background: "linear-gradient(to right, var(--cta), var(--cta-active))",
              color: "var(--cta-text)",
            }}
          >
            View Details
          </button>
        </div>
      </div>
    </Link>
  );
}
