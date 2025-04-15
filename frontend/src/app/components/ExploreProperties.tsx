import React, { useState } from "react";
import PropertyCard from "./PropertyCard";
import { useGetPropertiesQuery } from "../redux/slices/apiSlice";
import { Property } from "../../types/index";
import { useRouter } from "next/navigation";
import Link from "next/link";

const canadianCities = [
  "Toronto",
  "Brampton",
  "Vancouver",
  "Ottawa",
  "Montreal",
  "Niagara Falls",
  "Halifax",
  "London",
  "Manchester",
];

const ExploreProperties = () => {
  const router = useRouter();
  const [selectedCity, setSelectedCity] = useState("");

  const {
    data: properties,
    error,
    isLoading,
  } = useGetPropertiesQuery({
    city: selectedCity === "" ? undefined : selectedCity,
  });
  console.log(properties);
  const maxPropertiesToShow = 5;

  return (
    <section className="w-full max-w-screen-2xl mx-auto max-sm:px-4 px-10 py-8">
      <h2 className="text-xl sm:text-2xl mt-4 font-bold text-start mb-4">
        Explore Properties
      </h2>
      <p className="text-sm sm:text-base text-gray-600 mb-4">
        You can browse a wide range of affordable, verified, and fully furnished
        properties that offer unbeatable value.
      </p>

      <div className="mb-2">
        {/* Responsive button grid */}
        <div className="flex flex-wrap gap-3">
          {/* <button
            onClick={() => setSelectedCity("")}
            className={`px-4 py-2 rounded-full text-sm ${
              selectedCity === ""
                ? "bg-blue-100 text-blue-700 border border-blue-400"
                : "bg-white hover:bg-blue-50 border border-gray-200"
            }`}
          >
            All Cities
          </button> */}
          {canadianCities.map((city) => (
            <button
              key={city}
              onClick={() => setSelectedCity(city)}
              className={`px-4 py-2 rounded-full text-sm ${
                selectedCity === city
                  ? "bg-blue-100 text-blue-700 border border-blue-400"
                  : "bg-white hover:bg-blue-50 border border-gray-200"
              }`}
            >
              {city}
            </button>
          ))}
        </div>

        {properties && properties.length >= maxPropertiesToShow && (
          <div className="flex justify-end">
            <div
              onClick={() => router.push(`/properties?search=${selectedCity}`)}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium cursor-pointer"
            >
              View more{" "}
              {selectedCity === ""
                ? "Properties"
                : `Properties in ${selectedCity}`}{" "}
              &rarr;
            </div>
          </div>
        )}
      </div>

      {isLoading ? (
        <div></div>
      ) : error ? (
        <div>Error loading properties</div>
      ) : (
        <div className="flex overflow-x-auto pt-2 gap-6 pb-4 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {properties
            ?.slice(0, maxPropertiesToShow)
            .map((property: Property, index: number) => (
              <Link
                key={index}
                href={`/property/${property._id}`}
                className="hover:opacity-80 transition-all duration-300"
              >
                <PropertyCard
                  images={property.images || []}
                  title={property.title}
                  location={property.location}
                  price={property.price}
                  beds={property.overview.bedrooms}
                  baths={property.overview.bathrooms}
                  area={property.overview.squareFeet}
                  rating={4}
                  verified={property.verified}
                  reviewsCount={12}
                  country={property.country}
                />
              </Link>
            ))}
        </div>
      )}
    </section>
  );
};

export default ExploreProperties;
