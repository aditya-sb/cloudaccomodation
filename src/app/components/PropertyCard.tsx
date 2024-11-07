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
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 text-gray-100 rounded-lg shadow-xl p-5 transition hover:scale-105 hover:shadow-2xl cursor-pointer w-full max-w-md mx-auto">
        <div className="relative">
          <Image
            src={image}
            alt={title}
            width={400}
            height={250}
            className="rounded-lg object-cover w-full h-56"
          />
          <div className="absolute top-3 left-3 bg-green-600 bg-opacity-80 text-white px-3 py-1 rounded-full text-sm font-semibold shadow">
            3 Houses
          </div>
          <button className="absolute top-3 right-3 bg-gray-700 bg-opacity-80 p-2 rounded-full shadow hover:bg-gray-600">
            <FaHeart className="text-white" />
          </button>
        </div>
        <div className="mt-4">
          <h2 className="text-xl font-semibold text-white">{title}</h2>
          <p className="text-gray-400 text-sm mt-1">{location}</p>
          <div className="flex items-center mt-3">
            <FaUserFriends className="text-blue-400 mr-2" />
            <span className="text-gray-300 text-sm">Boys, Girls, Family</span>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-4 text-sm">
            <p className="text-gray-100 font-bold">{price} /month</p>
            <p className="text-gray-400">Security Deposit</p>
            <p className="text-gray-400">Area</p>
          </div>
          <button className="mt-4 bg-gradient-to-r from-green-500 to-green-700 text-white py-2 px-4 rounded-lg shadow-md transition hover:from-green-600 hover:to-green-800">
            View Details
          </button>
        </div>
      </div>
    </Link>
  );
}
