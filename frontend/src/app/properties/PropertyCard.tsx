import Image from "next/image";
import { FaHeart, FaUserFriends } from "react-icons/fa";
import ImageSlider from "../components/ImageSlider"; // Adjust the path as necessary

interface PropertyCardProps {
  images: Array<string>;
  title: string;
  location: string;
  price: string;
}

export default function PropertyCard({ images, title, location, price }: PropertyCardProps) {
  return (
    <div
      className="flex rounded-xl shadow-lg p-5 transition-transform transform hover:scale-[1.03] hover:shadow-2xl cursor-pointer w-full bg-[var(--border)] text-[var(--cta-text)]"
    >
      {/* Left: Image */}
      <div className="w-1/3 relative overflow-hidden rounded-lg">
        <ImageSlider images={images} />
        <div
          className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold shadow"
          style={{ backgroundColor: "var(--success-text)", color: "var(--cta-text)" }}
        >
          Featured
        </div>
        <button
          className="absolute top-3 right-3 p-2 rounded-full shadow-md transition hover:opacity-75"
          style={{ backgroundColor: "var(--gray-hover-bg)", color: "var(--cta-text)" }}
        >
          <FaHeart size={16} />
        </button>
      </div>

      {/* Right: Property Details */}
      <div className="w-2/3 pl-5 flex flex-col justify-center">
        <h2 className="text-lg font-bold mb-1" style={{ color: "var(--copy-primary)" }}>
          {title}
        </h2>
        <p className="text-sm text-[var(--gray-text)] mb-2 truncate">{location}</p>
        <div className="flex items-center text-sm mb-3">
          <FaUserFriends className="mr-2 text-[var(--hover-color)]" />
          <span className="text-[var(--gray-text)]">Family</span>
        </div>
        <div className="grid grid-cols-3 gap-2 text-xs font-medium">
          <p className="text-[var(--gray-text)]">{price} /month</p>
          <p className="text-[var(--gray-text)]">Security Deposit</p>
          <p className="text-[var(--gray-text)]">Area</p>
        </div>
      </div>
    </div>
  );
}
