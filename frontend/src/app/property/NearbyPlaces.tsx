"use client";

import React, { useState, useEffect, useRef } from "react";
import { FaMapMarkerAlt, FaExpand, FaCompress, FaStar, FaDirections } from "react-icons/fa";
import { 
  FaUtensils, 
  FaShoppingBag, 
  FaGraduationCap, 
  FaSubway, 
  FaHospital, 
  FaBriefcase,
  FaInfoCircle,
  FaMapMarkedAlt,
  FaWalking,
  FaCar,
  FaBicycle
} from "react-icons/fa";
import { loadGoogleMapsAsync } from "../utils/googleMapsLoader";

interface NearbyPlacesProps {
  latitude?: number;
  longitude?: number;
  location?: string; // Add location prop for address
}

type PlaceType = 'restaurant' | 'shopping_mall' | 'university' | 'transit_station' | 'hospital' | 'office';

interface PlaceCategory {
  type: PlaceType;
  label: string;
  icon: React.ReactNode;
  color: string;
}

interface Place {
  id: string;
  name: string;
  vicinity: string;
  rating?: number;
  types: string[];
  distance?: number;
  category?: PlaceType;
  geometry: {
    location: {
      lat: number;
      lng: number;
    }
  };
}

const NearbyPlaces: React.FC<NearbyPlacesProps> = ({ latitude, longitude, location }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<PlaceType>('restaurant');
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [hoveredPlace, setHoveredPlace] = useState<string | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [propertyCoords, setPropertyCoords] = useState<{lat: number, lng: number} | null>(
    latitude && longitude ? { lat: latitude, lng: longitude } : null
  );
  
  const placeCategories: PlaceCategory[] = [
    { type: 'restaurant', label: 'Restaurants', icon: <FaUtensils />, color: '#2664eb' },
    { type: 'shopping_mall', label: 'Shopping', icon: <FaShoppingBag />, color: '#2664eb' },
    { type: 'university', label: 'Education', icon: <FaGraduationCap />, color: '#2664eb' },
    { type: 'transit_station', label: 'Transport', icon: <FaSubway />, color: '#2664eb' },
    { type: 'hospital', label: 'Healthcare', icon: <FaHospital />, color: '#2664eb' },
    // { type: 'office', label: 'Offices', icon: <FaBriefcase />, color: '#607D8B' }
  ];

  const GOOGLE_PLACES_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY || '';

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
    
    // Trigger resize event after state update
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 100);
  };

  // Initialize map when component mounts
  useEffect(() => {
    let isMounted = true;
    
    const initMap = async () => {
      try {
        // Load Google Maps script if not already loaded
        await loadGoogleMapsAsync(GOOGLE_PLACES_API_KEY);
        
        // If component is still mounted, initialize the map
        if (isMounted) {
          // Check if we need to geocode the address
          if (!propertyCoords && location) {
            await geocodeAddress(location);
          } else {
            initializeMap();
          }
        }
      } catch (err) {
        console.error('Failed to load Google Maps:', err);
        if (isMounted) {
          setError('Failed to load Google Maps. Please try again later.');
        }
      }
    };
    
    initMap();
    
    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, [latitude, longitude, location, propertyCoords]);

  // Geocode address to get coordinates
  const geocodeAddress = async (address: string) => {
    setLoading(true);
    try {
      const geocoder = new google.maps.Geocoder();
      
      geocoder.geocode({ address }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK && results && results[0]) {
          const location = results[0].geometry.location;
          const coords = {
            lat: location.lat(),
            lng: location.lng()
          };
          
          setPropertyCoords(coords);
          setLoading(false);
          // Initialize map now that we have coordinates
          initializeMap();
        } else {
          console.error('Geocode was not successful:', status);
          setError('Could not locate the property address on the map.');
          setLoading(false);
        }
      });
    } catch (err) {
      console.error('Error geocoding address:', err);
      setError('Failed to locate address on the map.');
      setLoading(false);
    }
  };

  // Initialize map and fetch places when map is ready
  const initializeMap = () => {
    if (!mapContainerRef.current || !propertyCoords) return;

    try {
      const mapOptions: google.maps.MapOptions = {
        center: propertyCoords,
        zoom: 15,
        mapTypeControl: true,
        fullscreenControl: false,
        streetViewControl: true,
        zoomControl: true,
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }],
          },
          {
            featureType: "transit",
            elementType: "labels",
            stylers: [{ visibility: "off" }],
          }
        ]
      };

      mapRef.current = new google.maps.Map(mapContainerRef.current, mapOptions);
      infoWindowRef.current = new google.maps.InfoWindow();

      // Add marker for the property location
      const propertyMarker = new google.maps.Marker({
        position: propertyCoords,
        map: mapRef.current,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          fillColor: '#4285F4',
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 2,
          scale: 12,
        },
        title: 'Property Location',
        zIndex: 1000 // Ensure property marker stays on top
      });

      // Add property marker info window
      const propertyInfoContent = `
        <div style="padding: 10px; max-width: 240px; text-align: center;">
          <h3 style="margin: 0 0 8px; font-weight: bold; color: #4285F4;">Your Property</h3>
          <p style="margin: 0; font-size: 13px;">All distances are measured from this point</p>
        </div>
      `;
      
      const propertyInfoWindow = new google.maps.InfoWindow({
        content: propertyInfoContent
      });
      
      propertyMarker.addListener('click', () => {
        propertyInfoWindow.open(mapRef.current, propertyMarker);
      });

      // Add circular radius indicator (1km)
      const radiusCircle = new google.maps.Circle({
        strokeColor: '#4285F4',
        strokeOpacity: 0.2,
        strokeWeight: 1,
        fillColor: '#4285F4',
        fillOpacity: 0.05,
        map: mapRef.current,
        center: propertyCoords,
        radius: 1000, // 1km radius in meters
        clickable: false
      });

      // Fetch places after map is initialized
      fetchNearbyPlaces(selectedCategory);
    } catch (err) {
      console.error('Error initializing map:', err);
      setError('Error initializing map. Please refresh the page.');
    }
  };

  // Fetch nearby places when category changes
  useEffect(() => {
    if (mapRef.current && propertyCoords) {
      fetchNearbyPlaces(selectedCategory);
    }
  }, [selectedCategory, propertyCoords]);

  // Calculate nearby places from Google Places API
  const fetchNearbyPlaces = async (type: PlaceType) => {
    if (!mapRef.current || !propertyCoords) return;
    
    setLoading(true);
    setError(null);
    setSelectedPlace(null);
    
    // Clear existing markers
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];

    try {
      const service = new google.maps.places.PlacesService(mapRef.current);
      
      const request = {
        location: propertyCoords,
        radius: 1000, // 1km radius
        type: type
      };

      service.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          // Process and display results
          const placesData = results.map(place => ({
            id: place.place_id || Math.random().toString(),
            name: place.name || 'Unnamed Place',
            vicinity: place.vicinity || '',
            rating: place.rating,
            types: place.types || [],
            category: type,
            geometry: {
              location: {
                lat: place.geometry?.location?.lat() || propertyCoords.lat,
                lng: place.geometry?.location?.lng() || propertyCoords.lng
              }
            }
          }));

          // Calculate distance from property
          placesData.forEach(place => {
            const placeLocation = new google.maps.LatLng(
              place.geometry.location.lat,
              place.geometry.location.lng
            );
            const propertyLocation = new google.maps.LatLng(propertyCoords.lat, propertyCoords.lng);
            
            // Calculate distance in meters and convert to kilometers
            try {
              // Try to use the geometry library
              if (google.maps.geometry && google.maps.geometry.spherical) {
                const distanceInMeters = google.maps.geometry.spherical.computeDistanceBetween(
                  propertyLocation,
                  placeLocation
                );
                place.distance = parseFloat((distanceInMeters / 1000).toFixed(2));
              } else {
                // Fallback to haversine formula if geometry library isn't available
                place.distance = calculateHaversineDistance(
                  propertyCoords.lat, 
                  propertyCoords.lng,
                  place.geometry.location.lat,
                  place.geometry.location.lng
                );
              }
            } catch (e) {
              // Fallback to haversine formula if geometry library fails
              place.distance = calculateHaversineDistance(
                propertyCoords.lat, 
                propertyCoords.lng,
                place.geometry.location.lat,
                place.geometry.location.lng
              );
            }
          });

          // Sort places by distance
          placesData.sort((a, b) => (a.distance || 0) - (b.distance || 0));
          
          setPlaces(placesData);
          
          // Add markers for each place
          const currentCategory = placeCategories.find(cat => cat.type === type);
          const markerColor = currentCategory?.color || '#FF0000';
          
          placesData.forEach((place, index) => {
            // Create custom marker with SVG
            const markerIcon = {
              path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
              fillColor: markerColor,
              fillOpacity: 1,
              strokeWeight: 1,
              strokeColor: '#FFFFFF',
              scale: 1.8,
              labelOrigin: new google.maps.Point(12, 9),
              anchor: new google.maps.Point(12, 22)
            };
            
            const marker = new google.maps.Marker({
              position: { 
                lat: place.geometry.location.lat, 
                lng: place.geometry.location.lng 
              },
              map: mapRef.current,
              title: place.name,
              icon: markerIcon,
              label: {
                text: (index + 1).toString(),
                color: '#FFFFFF',
                fontSize: '11px',
                fontWeight: 'bold'
              },
              animation: google.maps.Animation.DROP,
              optimized: true
            });
            
            // Create info window content
            const createInfoWindowContent = (place: Place) => {
              const walkingTime = Math.round((place.distance || 0) * 12); // Average 12 min per km
              const drivingTime = Math.round((place.distance || 0) * 2); // Average 2 min per km
              
              return `
                <div style="padding: 8px; max-width: 280px;">
                  <h3 style="margin: 0 0 8px; font-weight: bold; color: ${markerColor};">${place.name}</h3>
                  <p style="margin: 0 0 8px; font-size: 13px;">${place.vicinity}</p>
                  
                  ${place.rating ? `
                    <div style="display: flex; align-items: center; margin-bottom: 8px;">
                      <span style="margin-right: 4px; font-weight: bold;">${place.rating}</span>
                      <div style="color: #FFD700; display: flex; align-items: center;">
                        ${Array(Math.round(place.rating)).fill('★').join('')}${place.rating % 1 >= 0.5 ? '½' : ''}${Array(5 - Math.ceil(place.rating)).fill('☆').join('')}
                      </div>
                    </div>
                  ` : ''}
                  
                  <div style="background-color: #f5f5f5; padding: 8px; border-radius: 4px; margin-top: 8px;">
                    <div style="font-weight: bold; margin-bottom: 4px;">Distance & Time:</div>
                    <div style="display: flex; justify-content: space-between; font-size: 13px;">
                      <div>${place.distance} km away</div>
                      <div style="display: flex; gap: 10px;">
                        <div title="Walking time">🚶 ${walkingTime} min</div>
                        <div title="Driving time">🚗 ${drivingTime} min</div>
                      </div>
                    </div>
                  </div>
                  
                  <div style="margin-top: 12px; display: flex; justify-content: center;">
                    <a href="https://www.google.com/maps/dir/?api=1&origin=${propertyCoords.lat},${propertyCoords.lng}&destination=${place.geometry.location.lat},${place.geometry.location.lng}&travelmode=walking" 
                       target="_blank" 
                       style="text-decoration: none; background-color: #4285F4; color: white; padding: 6px 12px; border-radius: 4px; font-size: 13px; display: inline-flex; align-items: center;">
                      <span style="margin-right: 6px;">Get Directions</span>
                      <span>↗</span>
                    </a>
                  </div>
                </div>
              `;
            };
            
            // Add click listener to open info window
            marker.addListener('click', () => {
              if (infoWindowRef.current) {
                infoWindowRef.current.close();
                infoWindowRef.current.setContent(createInfoWindowContent(place));
                infoWindowRef.current.open(mapRef.current, marker);
                setSelectedPlace(place);
                
                // Pan map to center between property and selected place
                if (mapRef.current) {
                  const bounds = new google.maps.LatLngBounds();
                  bounds.extend({ lat: propertyCoords.lat, lng: propertyCoords.lng });
                  bounds.extend({ lat: place.geometry.location.lat, lng: place.geometry.location.lng });
                  mapRef.current.fitBounds(bounds, { padding: 100 });
                }
              }
            });
            
            // Add hover effect for marker
            marker.addListener('mouseover', () => {
              marker.setAnimation(google.maps.Animation.BOUNCE);
              setTimeout(() => {
                marker.setAnimation(null);
              }, 750);
              setHoveredPlace(place.id);
            });
            
            marker.addListener('mouseout', () => {
              setHoveredPlace(null);
            });
            
            markersRef.current.push(marker);
          });
          
          setLoading(false);
        } else {
          setError('Could not find nearby places');
          setPlaces([]);
          setLoading(false);
        }
      });
    } catch (err) {
      setError('Error fetching nearby places');
      setPlaces([]);
      setLoading(false);
    }
  };

  // Haversine formula to calculate distance between two points on Earth
  const calculateHaversineDistance = (
    lat1: number, 
    lon1: number, 
    lat2: number, 
    lon2: number
  ): number => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
      Math.sin(dLon / 2) * Math.sin(dLon / 2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
    const distance = R * c;
    return parseFloat(distance.toFixed(2));
  };

  // Handle clicking on a place in the list
  const handlePlaceClick = (place: Place) => {
    setSelectedPlace(place);
    
    // Find and trigger click on the corresponding marker
    const marker = markersRef.current.find((marker, index) => 
      index === places.findIndex(p => p.id === place.id)
    );
    
    if (marker && mapRef.current) {
      // Trigger the marker click event
      google.maps.event.trigger(marker, 'click');
    }
  };

  // Calculate travel time
  const calculateTravelTime = (distance: number, mode: 'walking' | 'driving' | 'cycling'): number => {
    // Average speeds: walking 5km/h, cycling 15km/h, driving 30km/h
    const speeds = {
      walking: 5,
      cycling: 15,
      driving: 30
    };
    
    // Convert to minutes
    return Math.round((distance / speeds[mode]) * 60);
  };

  return (
    <div className={`relative bg-white rounded-lg shadow-lg overflow-hidden ${isFullScreen ? 'fixed inset-0 z-50' : 'h-auto'}`}>
      <div className="p-4 border-b bg-gray-50">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <FaMapMarkedAlt className="text-blue-600 text-lg" />
            <h2 className="text-xl font-semibold">Explore Nearby Places</h2>
          </div>
          <button
            onClick={toggleFullScreen}
            className="text-blue-600 bg-blue-100 p-2 rounded-full hover:bg-blue-200 transition"
            title={isFullScreen ? "Exit Full Screen" : "Full Screen"}
          >
            {isFullScreen ? <FaCompress /> : <FaExpand />}
          </button>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-4 overflow-x-auto pb-2">
          {placeCategories.map((category) => (
            <button
              key={category.type}
              onClick={() => setSelectedCategory(category.type)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition shadow-sm
                ${selectedCategory === category.type 
                  ? `bg-[${category.color}] text-white` 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
              style={{
                backgroundColor: selectedCategory === category.type ? category.color : undefined,
                color: selectedCategory === category.type ? 'white' : undefined
              }}
            >
              {category.icon}
              <span>{category.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col md:flex-row">
        {/* Map Container */}
        <div 
          className={`${isFullScreen ? 'h-[calc(100vh-175px)]' : 'h-[400px]'} w-full md:w-2/3 relative`}
          ref={mapContainerRef}
        >
          {propertyCoords ? (
            <>
              {/* Property location legend */}
              <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-md p-3 z-10 text-sm">
                <div className="flex items-center gap-2 mb-2 pb-2 border-b">
                  <div className="w-4 h-4 rounded-full bg-blue-500 border-2 border-white"></div>
                  <span className="font-medium">Your Property</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: placeCategories.find(c => c.type === selectedCategory)?.color || '#FF0000' }}></div>
                  <span>{placeCategories.find(c => c.type === selectedCategory)?.label || 'Places'}</span>
                </div>
              </div>
            </>
          ) : null}
          
          {/* Loading overlay */}
          {loading && (
            <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-4 shadow-lg flex flex-col items-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-2"></div>
                <p className="text-gray-700">{!propertyCoords && location ? 'Locating address...' : 'Loading nearby places...'}</p>
              </div>
            </div>
          )}
        </div>
        
        {/* Places List */}
        <div className={`w-full md:w-1/3 overflow-y-auto ${isFullScreen ? 'max-h-[calc(100vh-175px)]' : 'max-h-[400px]'} border-l`}>
          {!propertyCoords && !loading && !location ? (
            <div className="p-6 text-center">
              <FaInfoCircle className="text-red-500 text-xl mb-2 mx-auto" />
              <p className="text-red-500">No location data available for this property.</p>
              <p className="text-gray-500 text-sm mt-2">Please provide either coordinates or an address.</p>
            </div>
          ) : loading ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="p-6 text-center">
              <FaInfoCircle className="text-red-500 text-xl mb-2 mx-auto" />
              <p className="text-red-500">{error}</p>
            </div>
          ) : places.length === 0 ? (
            <div className="p-6 text-center">
              <FaInfoCircle className="text-gray-400 text-xl mb-2 mx-auto" />
              <p className="text-gray-500">No nearby places found.</p>
              <p className="text-gray-400 text-sm mt-2">Try selecting a different category</p>
            </div>
          ) : (
            <div className="divide-y">
              {places.map((place, index) => {
                const walkingTime = calculateTravelTime(place.distance || 0, 'walking');
                const drivingTime = calculateTravelTime(place.distance || 0, 'driving');
                
                return (
                  <div 
                    key={place.id} 
                    className={`p-4 hover:bg-blue-50 cursor-pointer transition-colors duration-200 ${selectedPlace?.id === place.id ? 'bg-blue-50' : ''} ${hoveredPlace === place.id ? 'bg-blue-50' : ''}`}
                    onClick={() => handlePlaceClick(place)}
                    onMouseEnter={() => setHoveredPlace(place.id)}
                    onMouseLeave={() => setHoveredPlace(null)}
                  >
                    <div className="flex items-start">
                      <div 
                        className="rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 text-white"
                        style={{ backgroundColor: placeCategories.find(c => c.type === selectedCategory)?.color || '#FF0000' }}
                      >
                        {index + 1}
                      </div>
                      <div className="w-full">
                        <h3 className="font-medium">{place.name}</h3>
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">{place.vicinity}</p>
                        
                        <div className="flex flex-wrap items-center justify-between mt-2">
                          <div className="flex items-center">
                            {place.rating && (
                              <div className="flex items-center text-sm text-yellow-500 mr-3">
                                <span className="mr-1">{place.rating}</span>
                                <FaStar />
                              </div>
                            )}
                            <div className="text-sm text-gray-500 flex items-center">
                              <FaMapMarkerAlt className="mr-1 text-gray-400" />
                              {place.distance} km
                            </div>
                          </div>
                          
                          <div className="flex gap-3 mt-2 text-xs text-gray-500">
                            <div className="flex items-center" title="Walking time">
                              <FaWalking className="mr-1" />
                              {walkingTime} min
                            </div>
                            <div className="flex items-center" title="Driving time">
                              <FaCar className="mr-1" />
                              {drivingTime} min
                            </div>
                          </div>
                        </div>
                        
                        {selectedPlace?.id === place.id && (
                          <div className="mt-3">
                            <a 
                              href={`https://www.google.com/maps/dir/?api=1&origin=${propertyCoords.lat},${propertyCoords.lng}&destination=${place.geometry.location.lat},${place.geometry.location.lng}&travelmode=walking`}
                              target="_blank"
                              className="text-blue-600 text-sm flex items-center hover:underline"
                            >
                              <FaDirections className="mr-1" />
                              Get directions
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NearbyPlaces;