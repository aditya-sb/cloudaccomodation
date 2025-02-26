// src/components/ListView.tsx
import Link from "next/link";
import PropertyCard from "../components/PropertyCard";
import { Property } from "@/types";
import { useState } from "react";

interface ListViewProps {
  properties: Property[];
}

const ListView: React.FC<ListViewProps> = ({ properties }) => {
  const [showMore, setShowMore] = useState(false);

  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  const visibleProperties = showMore ? properties : properties.slice(0, 5);

  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 w-full">
        {visibleProperties.map((property, index) => (
          <Link target="_blank" key={index}  href={`/property/${property._id}`}>
              <PropertyCard
                images={property.images || []}
                title={property.title}
                location={property.location}
                price={property.price}
                beds={property.overview.bedrooms}
                baths={property.overview.bathrooms}
                area={property.squareFeet}
                rating={4.1}
                reviewsCount={12}
                className="max-sm:w-full mb-5"
              />
          </Link>
        ))}
      </div>

      {properties.length > 20 && (
        <button
          className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300"
          onClick={handleShowMore}
        >
          {showMore ? "Show Less" : "Load More"}
        </button>
      )}
    </div>
  );
};

export default ListView;

