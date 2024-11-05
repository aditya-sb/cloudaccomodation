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
      <div className="bg-white text-gray-800 rounded-lg shadow-lg p-5 transition hover:scale-105 cursor-pointer w-full max-w-md mx-auto">
        <div className="relative">
          <Image
            src={image}
            alt={title}
            width={400}
            height={250}
            className="rounded-lg object-cover w-full h-56"
          />
          <div className="absolute top-3 left-3 bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-semibold">
            3 Houses
          </div>
          <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:bg-gray-100">
            <FaHeart className="text-gray-500" />
          </button>
        </div>
        <div className="mt-4">
          <h2 className="text-lg font-bold text-gray-800">{title}</h2>
          <p className="text-gray-600 text-sm mt-1">{location}</p>
          <div className="flex items-center mt-3">
            <FaUserFriends className="text-blue-500 mr-2" />
            <span className="text-gray-500 text-sm">Boys, Girls, Family</span>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-4">
            <p className="text-gray-800 font-bold">{price} /month</p>
            <p className="text-gray-500 text-sm">Security Deposit</p>
            <p className="text-gray-500 text-sm">Area</p>
          </div>
          <button className="mt-4 bg-gradient-to-r from-green-400 to-green-600 text-white py-2 px-4 rounded-lg shadow-md transition">
            View Details
          </button>
        </div>
      </div>
    </Link>
  );
}
