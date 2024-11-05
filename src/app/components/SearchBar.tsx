// src/app/components/SearchBar.tsx
import Image from "next/image";
import Header from "./Header";

export default function SearchBar() {
  return (
    <div className="relative h-96 mt-20">
      <Header/>
      <Image
        src="/images/cityscape.jpeg"
        alt="Cityscape"
        layout="fill"
        objectFit="cover"
        className="opacity-70"
      />
      <div className="absolute inset-0 flex flex-col justify-center items-center">
        <div className="bg-gray-800 p-2 rounded-full shadow-lg flex items-center">
          <input
            type="text"
            placeholder="Search for properties..."
            className="px-4 py-3 w-72 rounded-l-full border border-gray-500 focus:outline-none bg-gray-700 text-white"
          />
          <select className="px-4 py-4 border-l border-gray-500 bg-gray-700 text-white focus:outline-none">
            <option>Filter by</option>
            <option>Mumbai</option>
            <option>Delhi</option>
            {/* Add more cities */}
          </select>
          <button className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 px-6 py-3 rounded-r-full transition">
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
