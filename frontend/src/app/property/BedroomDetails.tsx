import React from "react";
import { FaBed, FaRuler, FaCheck, FaTrash, FaCouch, FaBath, FaUtensils } from "react-icons/fa";
import { getCurrencySymbol } from "@/constants/currency";
import ImageSlider from "../components/ImageSlider";

interface BedroomDetail {
  name: string;
  rent: number;
  sizeSqFt: number;
  furnished: boolean;
  privateWashroom: boolean;
  sharedWashroom: boolean;
  sharedKitchen: boolean;
  images: string[];
  availableFrom?: string;
  lease?: string;
  moveInDate?: string;
  note?: string;
  leaseTerms?: string;
}

interface BedroomDetailsProps {
  bedroomDetails?: BedroomDetail[];
  currency: string;
  country: string;
}

const BedroomDetails: React.FC<BedroomDetailsProps> = ({
  bedroomDetails,
  currency,
  country,
}) => {
  if (!bedroomDetails || bedroomDetails.length === 0) {
    return (
      <div className="text-center p-4 text-gray-500">
        No bedroom details available
      </div>
    );
  }

  const currencySymbol = getCurrencySymbol(country);

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold mb-4">Bedroom Details</h3>
      
      {bedroomDetails.map((bedroom, index) => (
        <div key={index} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
          {/* Bedroom Images */}
          {bedroom.images && bedroom.images.length > 0 ? (
            <div className="h-48 overflow-hidden relative">
              <ImageSlider images={bedroom.images} />
            </div>
          ) : (
            <div className="h-48 bg-gray-200 flex items-center justify-center">
              <p className="text-gray-500">No images available</p>
            </div>
          )}
          
          {/* Bedroom Info */}
          <div className="p-4">
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-lg font-semibold">{bedroom.name}</h4>
              <div className="text-right">
                <div className="text-lg font-bold text-blue-600">{currencySymbol}{bedroom.rent}</div>
                <div className="text-sm text-gray-500">per month</div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2">
                <FaRuler className="text-blue-500" />
                <span>{bedroom.sizeSqFt} sq.ft</span>
              </div>
              
              <div className="flex items-center gap-2">
                <FaCouch className="text-blue-500" />
                <span>{bedroom.furnished ? 'Furnished' : 'Unfurnished'}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                <FaBath className="text-blue-500" />
                <span>
                  {bedroom.privateWashroom ? 'Private washroom' : 
                   bedroom.sharedWashroom ? 'Shared washroom' : 'No washroom'}
                </span>
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                <FaUtensils className="text-blue-500" />
                <span>{bedroom.sharedKitchen ? 'Shared kitchen' : 'Private kitchen'}</span>
              </div>
            </div>
            
            {bedroom.availableFrom && (
              <div className="mt-3 text-sm bg-green-100 p-2 rounded-md">
                <span className="font-medium">Available from:</span> {bedroom.availableFrom}
                {bedroom.lease && <span> • {bedroom.lease} lease</span>}
              </div>
            )}
            
            {bedroom.note && (
              <div className="mt-3 text-sm border-t pt-2 border-gray-200">
                <p className="text-gray-600">{bedroom.note}</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BedroomDetails; 