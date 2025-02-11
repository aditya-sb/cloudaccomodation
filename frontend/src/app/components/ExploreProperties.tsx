import React, { useState } from 'react';
import PropertyCard from './PropertyCard';
import { useGetPropertiesQuery } from '../redux/slices/apiSlice';
import { Property } from '../../types/index';


const canadianCities = [
  'Toronto',
  'Brampton',
  'Vancouver',
  'Montreal',
  'Niagara Falls',
  'Halifax'
];

const ExploreProperties = () => {
  const [selectedCity, setSelectedCity] = useState('All');
  
  // Query with city parameter when a city is selected
  const { data: properties, error, isLoading } = useGetPropertiesQuery({
    city: selectedCity === 'All' ? undefined : selectedCity
  });

  const maxPropertiesToShow = 5;

  return (
    <section className="w-full max-w-screen-2xl mx-auto px-5 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl sm:text-2xl font-bold">Explore Properties</h2>
      </div>
      
      {/* City filter buttons and View More link */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            onClick={() => setSelectedCity('All')}
            className={`px-4 py-2 rounded-md text-sm ${
              selectedCity === 'All'
                ? 'bg-blue-100 text-blue-700 border border-blue-400'
                : 'bg-white hover:bg-blue-50 border border-gray-200'
            }`}
          >
            All Cities
          </button>
          {canadianCities.map((city) => (
            <button
              key={city}
              onClick={() => setSelectedCity(city)}
              className={`px-4 py-2 rounded-md text-sm ${
                selectedCity === city
                  ? 'bg-blue-100 text-blue-700 border border-blue-400'
                  : 'bg-white hover:bg-blue-50 border border-gray-200'
              }`}
            >
              {city}
            </button>
          ))}
        </div>
        
        {/* View More link - shown if properties exceed maxPropertiesToShow */}
        {properties && properties.length >= maxPropertiesToShow && (
          <div className="flex justify-end">
            <a
              href={`http://localhost:3000/properties?search=${selectedCity}`}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              View more {selectedCity === 'All' ? 'Properties' : `Properties in ${selectedCity}`}
            </a>
          </div>
        )}
      </div>

      {/* Properties grid */}
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error loading properties</div>
      ) : (
        <div className="flex overflow-x-auto gap-6 pb-4 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {properties?.slice(0, maxPropertiesToShow).map((property: Property, index: number) => (
            <PropertyCard
              key={index}
              images={property.images}
              title={property.title}
              location={property.location}
              price={property.price}
              beds={property.overview.bedrooms}
              baths={property.overview.bathrooms}
              area={property.overview.squareFeet}
              rating={4}
              reviewsCount={12}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default ExploreProperties;