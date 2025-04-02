"use client";

import React, { useEffect, useRef, useState } from "react";
import { Property } from "@/types";
import PropertyCard from "./PropertyCard";
import MapPropertyCard from "./MapPropertyCard";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { createRoot } from 'react-dom/client';

interface MapViewProps {
  properties: Property[];
  mapAddress: string; // Changed from mapLat/mapLon
  mapLocation: string;
}

const CURRENCY_SYMBOLS: { [key: string]: string } = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  // Add more currency symbols as needed
};

const MapView: React.FC<MapViewProps> = ({ properties, mapAddress, mapLocation }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const layerControlRef = useRef<L.Control.Layers | null>(null);
  const activePopupRef = useRef<L.Popup | null>(null);
  const [isMapInitialized, setIsMapInitialized] = useState(false);
  const [mapCenter, setMapCenter] = useState<[number, number]>([0, 0]);

  // Geocoding function
  const geocodeAddress = async (address: string): Promise<[number, number]> => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
      );
      const data = await response.json();
      if (data && data[0]) {
        return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
      }
      return [0, 0];
    } catch (error) {
      console.error('Geocoding error:', error);
      return [0, 0];
    }
  };

  // Initialize map with geocoded address
  useEffect(() => {
    let isMounted = true;

    const initMap = async () => {
      if (!mapRef.current || mapInstanceRef.current) return;

      try {
        const coordinates = await geocodeAddress(mapAddress);
        
        if (!isMounted || !mapRef.current) return;

        // Get city bounds
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(mapLocation)}&type=city`
        );
        const cityData = await response.json();
        const cityBounds = cityData[0] ? [
          [cityData[0].boundingbox[0], cityData[0].boundingbox[2]],
          [cityData[0].boundingbox[1], cityData[0].boundingbox[3]]
        ] : null;

        mapInstanceRef.current = L.map(mapRef.current, {
          zoomControl: true,
          scrollWheelZoom: true,
          preferCanvas: true,
          minZoom: 11, // Restrict minimum zoom
          maxZoom: 18,
          maxBounds: cityBounds, // Restrict map panning to city bounds
          maxBoundsViscosity: 1.0 // Make the bounds "hard" - no panning outside
        }).setView(coordinates, 13);

        if (cityBounds) {
          mapInstanceRef.current.fitBounds(cityBounds);
        }

        if (mapRef.current) {
          mapRef.current.style.zIndex = "0";
        }
        
        // Define multiple tile layers for different map styles
        const osmStandard = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 19
        });
        
        const esriWorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
          attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
          maxZoom: 20
        });
        
        const openTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
          attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
          maxZoom: 17
        });
        
        const osmHumanitarian = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>',
          maxZoom: 19
        });
        
        const cartoDetailedWithLabels = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          subdomains: 'abcd',
          maxZoom: 20
        });
        
        osmHumanitarian.addTo(mapInstanceRef.current);
        
        const baseLayers = {
          "Neighborhood": osmHumanitarian,
          "Detailed Map": cartoDetailedWithLabels,
          "Standard": osmStandard,
          "Satellite": esriWorldImagery,
          "Terrain": openTopoMap,
        };
        
        layerControlRef.current = L.control.layers(baseLayers, {}, {
          collapsed: false
        }).addTo(mapInstanceRef.current);
        
        L.control.scale({
          imperial: false,
          position: 'bottomleft'
        }).addTo(mapInstanceRef.current);
        
        L.control.zoom({
          position: 'bottomright'
        }).addTo(mapInstanceRef.current);
        
        setIsMapInitialized(true);
      } catch (error) {
        console.error('Map initialization error:', error);
      }
    };

    initMap();

    // Cleanup function
    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        setIsMapInitialized(false);
      }
    };
  }, []); // Empty dependency array since we only want to initialize once

  // Update map view when address changes
  useEffect(() => {
    if (!mapInstanceRef.current || !isMapInitialized) return;

    const updateMapView = async () => {
      try {
        const coordinates = await geocodeAddress(mapAddress);
        if (mapInstanceRef.current) {
          mapInstanceRef.current.setView(coordinates, 13);
        }
      } catch (error) {
        console.error('Error updating map view:', error);
      }
    };

    updateMapView();
  }, [mapAddress, isMapInitialized]);

  // Update markers with geocoded property addresses
  useEffect(() => {
    const updateMarkers = async () => {
      if (!mapInstanceRef.current || !isMapInitialized) return;

      markersRef.current.forEach(marker => marker.remove());
      markersRef.current = [];

      const markers = L.layerGroup().addTo(mapInstanceRef.current);

      for (const property of properties) {
        const coordinates = await geocodeAddress(property.location);
        
        const currencySymbol = CURRENCY_SYMBOLS[property.currency as keyof typeof CURRENCY_SYMBOLS] || '$';
        const formattedPrice = typeof property.price === 'number' 
          ? `${currencySymbol}${property.price.toLocaleString()}`
          : `${currencySymbol}${property.price}`;
          
        const markerHtml = document.createElement('div');
        markerHtml.innerHTML = `
          <div class="flex items-center justify-center">
            <div class="bg-white shadow-lg px-3 py-2 rounded-full border-2 border-blue-500 font-bold text-blue-700 text-sm whitespace-nowrap">
              ${formattedPrice}
            </div>
          </div>
        `;
        
        const customIcon = L.divIcon({
          html: markerHtml.innerHTML,
          className: 'property-marker',
          iconSize: [80, 40],
          iconAnchor: [40, 20]
        });
        
        const marker = L.marker(coordinates, {
          icon: customIcon,
          riseOnHover: true,
          title: property.title
        }).addTo(markers);
        
        const popupContent = document.createElement('div');
        popupContent.style.width = "150px";
        popupContent.style.padding = "10px";        
        const root = createRoot(popupContent);
        root.render(
          <a href={`/property/${property._id}`} target="_blank" rel="noopener noreferrer">
            <MapPropertyCard
              images={property.images || []}
              title={property.title}
              location={property.location}
              price={property.price.toString()}
              country={property.country}
              currencyCode={property.currency}
              isMapPopup={true}
            />
          </a>
        );
        
        const popup = L.popup({
          className: 'detailed-popup',
          closeButton: true,
          autoClose: true,
          closeOnEscapeKey: true,
          maxWidth: 320
        }).setContent(popupContent);
        
        marker.bindPopup(popup);
        
        marker.on('popupopen', () => {
          // Close previously active popup
          if (activePopupRef.current && activePopupRef.current !== popup) {
            mapInstanceRef.current?.closePopup(activePopupRef.current);
          }
          activePopupRef.current = popup;
        });

        markersRef.current.push(marker);
      }

      // After adding all markers, fit bounds if there are multiple properties
      if (markersRef.current.length > 1) {
        const group = L.featureGroup(markersRef.current);
        mapInstanceRef.current.fitBounds(group.getBounds(), {
          padding: [50, 50],
          maxZoom: 15
        });
      }
    };

    updateMarkers();
  }, [properties, isMapInitialized]);

  return (
    <div className="flex h-screen">
      <div ref={mapRef} className="relative w-3/5 h-full shadow-lg" />
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
                key={property.id || `property-${index}`} 
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
                onClick={() => {
                  if (mapInstanceRef.current) {
                    // Close any existing popup
                    if (activePopupRef.current) {
                      mapInstanceRef.current.closePopup(activePopupRef.current);
                    }
                    
                    geocodeAddress(property.location).then(coordinates => {
                      mapInstanceRef.current?.setView(coordinates, 15);
                      const marker = markersRef.current.find(m => 
                        m.getLatLng().lat === coordinates[0] && 
                        m.getLatLng().lng === coordinates[1]
                      );
                      if (marker) {
                        marker.openPopup();
                        // Update active popup reference
                        activePopupRef.current = marker.getPopup();
                      }
                    });
                  }
                }}
              >
                <PropertyCard
                  images={property.images}
                  title={property.title}
                  location={property.location}
                  price={property.price}
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