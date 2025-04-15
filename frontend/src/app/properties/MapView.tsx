"use client";

import React, { useEffect, useRef, useState } from "react";
import { Property } from "@/types";
import PropertyCard from "./PropertyCard";
import MapPropertyCard from "./MapPropertyCard";
import { createRoot } from 'react-dom/client';

interface MapViewProps {
  properties: Property[];
  mapAddress: string;
  mapLocation: string;
}

const CURRENCY_SYMBOLS: { [key: string]: string } = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  // Add more currency symbols as needed
};

const GOOGLE_PLACES_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY || '';

// Create a singleton for Google Maps API loading
const GoogleMapsLoader = (() => {
  let loadPromise: Promise<void> | null = null;

  return {
    load: () => {
      if (!loadPromise) {
        loadPromise = new Promise((resolve, reject) => {
          // Check if API is already loaded
          if (window.google && window.google.maps) {
            resolve();
            return;
          }

          // Create a unique callback name
          const callbackName = `googleMapsApiCallback_${Math.random().toString(36).substring(2, 9)}`;
          
          // Add the callback to window
          window[callbackName] = () => {
            // Clean up
            delete window[callbackName];
            resolve();
          };

          // Create script tag
          const script = document.createElement('script');
          script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_PLACES_API_KEY}&libraries=places&callback=${callbackName}`;
          script.async = true;
          script.defer = true;
          script.onerror = (err) => {
            // Clean up
            delete window[callbackName];
            loadPromise = null;
            reject(new Error(`Google Maps script loading failed: ${err}`));
          };
          
          // Append script
          document.head.appendChild(script);
        });
      }
      
      return loadPromise;
    }
  };
})();

const MapView: React.FC<MapViewProps> = ({ properties, mapAddress, mapLocation }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const geocoderRef = useRef<google.maps.Geocoder | null>(null);
  const placesServiceRef = useRef<google.maps.places.PlacesService | null>(null);
  const activeInfoWindowRef = useRef<google.maps.InfoWindow | null>(null);
  const [isMapReady, setIsMapReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [propertyMarkers, setPropertyMarkers] = useState<{[key: string]: boolean}>({});

  // Load Google Maps API with singleton
  useEffect(() => {
    setIsLoading(true);
    
    GoogleMapsLoader.load()
      .then(() => {
        setIsMapReady(true);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load Google Maps API:", err);
        setError("Failed to load Google Maps. Please refresh the page.");
        setIsLoading(false);
      });
    
    return () => {
      // Clean up resources when component unmounts
      if (mapInstanceRef.current) {
        google.maps.event.clearInstanceListeners(mapInstanceRef.current);
      }
      
      markersRef.current.forEach(marker => {
        if (marker) {
          google.maps.event.clearInstanceListeners(marker);
          marker.setMap(null);
        }
      });
      
      if (activeInfoWindowRef.current) {
        activeInfoWindowRef.current.close();
      }
    };
  }, []);

  // Geocoding function
  const geocodeAddress = async (address: string): Promise<google.maps.LatLngLiteral> => {
    if (!window.google || !window.google.maps) {
      throw new Error("Google Maps API not loaded");
    }

    if (!geocoderRef.current) {
      geocoderRef.current = new google.maps.Geocoder();
    }

    try {
      const response = await new Promise<google.maps.GeocoderResponse>((resolve, reject) => {
        geocoderRef.current!.geocode(
          { address: address },
          (results, status) => {
            if (status === google.maps.GeocoderStatus.OK && results && results[0]) {
              resolve(results);
            } else {
              reject(new Error(`Geocoding failed: ${status}`));
            }
          }
        );
      });

      const location = response[0].geometry.location;
      return { lat: location.lat(), lng: location.lng() };
    } catch (error) {
      console.error('Geocoding error for address:', address, error);
      // Return a default location instead of throwing error
      return { lat: 0, lng: 0 };
    }
  };

  // Initialize map
  useEffect(() => {
    if (!isMapReady || !mapRef.current || mapInstanceRef.current) return;

    const initMap = async () => {
      try {
        // Default center if we can't geocode the address
        let coordinates = { lat: 40.7128, lng: -74.0060 }; // New York as fallback

        try {
          coordinates = await geocodeAddress(mapAddress);
        } catch (error) {
          console.error('Could not geocode initial address, using default', error);
        }
        
        const mapOptions: google.maps.MapOptions = {
          center: coordinates,
          zoom: 13,
          mapTypeControl: true,
          mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: google.maps.ControlPosition.TOP_RIGHT,
          },
          zoomControl: true,
          zoomControlOptions: {
            position: google.maps.ControlPosition.RIGHT_BOTTOM
          },
          scaleControl: true,
          streetViewControl: true,
          fullscreenControl: true
        };

        mapInstanceRef.current = new google.maps.Map(mapRef.current, mapOptions);
        placesServiceRef.current = new google.maps.places.PlacesService(mapInstanceRef.current);

        // Get city bounds
        if (mapLocation) {
          const request = {
            query: mapLocation,
            fields: ['geometry']
          };
          
          placesServiceRef.current.findPlaceFromQuery(request, (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK && 
                results && 
                results[0] && 
                results[0].geometry && 
                results[0].geometry.viewport) {
              mapInstanceRef.current?.fitBounds(results[0].geometry.viewport);
            }
          });
        }
      } catch (error) {
        console.error('Map initialization error:', error);
        setError("Failed to initialize map. Please check the address and try again.");
      }
    };

    initMap();
  }, [isMapReady, mapAddress, mapLocation]);

  // Update markers
  useEffect(() => {
    const addMarkersToMap = async () => {
      if (!mapInstanceRef.current || !isMapReady || !properties.length) {
        console.log("Map not ready or no properties to show");
        return;
      }
      
      console.log("Adding markers for properties:", properties.length);
      
      // Clear existing markers
      markersRef.current.forEach(marker => marker.setMap(null));
      markersRef.current = [];
      
      if (activeInfoWindowRef.current) {
        activeInfoWindowRef.current.close();
        activeInfoWindowRef.current = null;
      }

      const bounds = new google.maps.LatLngBounds();
      const newPropertyMarkers: {[key: string]: boolean} = {};
      
      // Add styles for custom price labels first
      const styleId = 'map-price-label-styles';
      if (!document.getElementById(styleId)) {
        const styleTag = document.createElement('style');
        styleTag.id = styleId;
        styleTag.textContent = `
          .price-label {
            background-color: white !important;
            border: 2px solid #3b82f6 !important;
            border-radius: 9999px !important;
            padding: 4px 8px !important;
            font-weight: bold !important;
            white-space: nowrap !important;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) !important;
          }
          .gm-style .gm-style-iw-c {
            padding: 0 !important;
            background: white !important;
            border-radius: 8px !important;
            box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1) !important;
          }
          .gm-style .gm-style-iw-d {
            overflow: hidden !important;
            padding: 0 !important;
            margin: 0 !important;
          }
          .gm-style .gm-style-iw-tc {
            display: none !important;
          }
          .gm-style-iw button[title="Close"] {
            display: none !important;
          }
        `;
        document.head.appendChild(styleTag);
      }
      
      for (const property of properties) {
        const propertyId = property._id || property.id || `property-${property.title}`;
        try {
          console.log(`Geocoding property: ${property.title}, location: ${property.location}`);
          const coordinates = await geocodeAddress(property.location);
          
          // Skip properties with invalid coordinates (0,0)
          if (coordinates.lat === 0 && coordinates.lng === 0) {
            console.warn(`Skipping property with invalid coordinates: ${property.title}`);
            continue;
          }
          
          console.log(`Got coordinates for ${property.title}:`, coordinates);
          bounds.extend(coordinates);
          
          // Format price with currency symbol
          const currencySymbol = CURRENCY_SYMBOLS[property.currency as keyof typeof CURRENCY_SYMBOLS] || '$';
          const formattedPrice = typeof property.price === 'number' 
            ? `${currencySymbol}${property.price.toLocaleString()}`
            : `${currencySymbol}${property.price}`;
          
          // Create marker
          const marker = new google.maps.Marker({
            position: coordinates,
            map: mapInstanceRef.current,
            title: property.title,
            label: {
              text: formattedPrice,
              color: "#1e40af", // blue-700
              fontWeight: "bold",
              className: "price-label"
            },
            animation: google.maps.Animation.DROP,
            optimized: false, // Important for custom styled labels
            zIndex: 100 // Keep price labels above other markers
          });
          
          console.log(`Created marker for ${property.title}`);
          
          // Create info window content
          const infoWindowContent = document.createElement('div');
          
          // Use createRoot to render React component directly
          const root = createRoot(infoWindowContent);
          root.render(
            <a href={`/property/${propertyId}`} target="_blank" rel="noopener noreferrer">
            <MapPropertyCard
              images={property.images || []}
              title={property.title}
              beds={property.overview.bedrooms}
              baths={property.overview.bathrooms}
              area={property.squareFeet}
              rating={property.rating}
              reviewsCount={property.reviewsCount}
              verified={property.verified}
              location={property.location}
              price={property.price.toString()}
              country={property.country}
              currencyCode={property.currency}
              isMapPopup={true}
            />
            </a>
          );
          
          // Create info window
          const infoWindow = new google.maps.InfoWindow({
            content: infoWindowContent,
            maxWidth: 200,
            disableAutoPan: false,
            closeButton: false  // Add this line to disable the close button
          });
          
          // Add click event to marker
          marker.addListener('click', () => {
            // Close previously open info window
            if (activeInfoWindowRef.current) {
              activeInfoWindowRef.current.close();
            }
            
            infoWindow.open({
              anchor: marker,
              map: mapInstanceRef.current
            });
            
            activeInfoWindowRef.current = infoWindow;
          });
          
          markersRef.current.push(marker);
          newPropertyMarkers[propertyId] = true;
          console.log(`Marker added for ${property.title}`);
        } catch (error) {
          console.error(`Error creating marker for property ${property.title}:`, error);
        }
      }
      
      // After adding all markers, fit bounds if there are multiple properties
      if (markersRef.current.length > 0) {
        console.log(`Successfully added ${markersRef.current.length} markers to map`);
        if (markersRef.current.length > 1) {
          mapInstanceRef.current?.fitBounds(bounds, {
            top: 50,
            right: 50,
            bottom: 50,
            left: 50
          });
        } else {
          // If only one marker, center on it and zoom in
          const marker = markersRef.current[0];
          const position = marker.getPosition();
          if (position) {
            mapInstanceRef.current?.setCenter(position);
            mapInstanceRef.current?.setZoom(15);
          }
        }
      } else {
        console.warn("No valid markers were added to the map");
      }
      
      setPropertyMarkers(newPropertyMarkers);
    };
    
    // Add a small delay to ensure map is fully initialized
    const timerId = setTimeout(() => {
      addMarkersToMap();
    }, 500);
    
    return () => clearTimeout(timerId);
  }, [properties, isMapReady]);

  // Add direct styling for map container
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.style.position = 'relative';
      mapRef.current.style.overflow = 'hidden';
    }
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-xl font-semibold text-gray-600">Loading map...</p>
          <div className="mt-4 w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center p-6 bg-red-50 rounded-lg max-w-md">
          <p className="text-red-600 font-semibold text-lg">{error}</p>
          <button 
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            onClick={() => window.location.reload()}
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      <div 
        ref={mapRef} 
        className="relative w-3/5 h-full shadow-lg" 
        style={{ minHeight: '500px' }} 
      />
      <div className="flex-1 h-full overflow-y-auto p-6 bg-gray-50">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          {properties.length} Properties Near {mapLocation || 'You'}
        </h2>
        {properties.length === 0 ? (
          <p className="text-gray-500 italic">No properties found in this area.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {properties.map((property, index) => (
              <div 
                key={property.id || property._id || `property-${index}`} 
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
                onClick={async () => {
                  if (mapInstanceRef.current) {
                    // Close any existing info window
                    if (activeInfoWindowRef.current) {
                      activeInfoWindowRef.current.close();
                    }
                    
                    try {
                      console.log(`Centering map on property: ${property.title}`);
                      const coordinates = await geocodeAddress(property.location);
                      
                      // Skip if invalid coordinates
                      if (coordinates.lat === 0 && coordinates.lng === 0) {
                        console.warn(`Cannot center on property with invalid coordinates: ${property.title}`);
                        return;
                      }
                      
                      mapInstanceRef.current.setCenter(coordinates);
                      mapInstanceRef.current.setZoom(15);
                      
                      // Find and trigger click on the corresponding marker
                      const marker = markersRef.current.find(m => {
                        const pos = m.getPosition();
                        return pos && 
                               Math.abs(pos.lat() - coordinates.lat) < 0.0001 && 
                               Math.abs(pos.lng() - coordinates.lng) < 0.0001;
                      });
                      
                      if (marker) {
                        google.maps.event.trigger(marker, 'click');
                      }
                    } catch (error) {
                      console.error('Error centering on property:', error);
                    }
                  }
                }}
              >
                <PropertyCard
                  images={property.images}
                  title={property.title}
                  location={property.location}
                  price={property.price}
                  beds={property.overview.bedrooms}
                  baths={property.overview.bathrooms}
                  area={property.squareFeet}
                  rating={4.1}
                  reviewsCount={12}
                  verified={property.verified}
                  description={property.description}
                  country={property.country}
                  currencyCode={property.currency}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MapView;