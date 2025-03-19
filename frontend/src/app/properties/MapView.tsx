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
  mapLat: number;
  mapLon: number;
  mapLocation: string;
}

const CURRENCY_SYMBOLS: { [key: string]: string } = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  // Add more currency symbols as needed
};

const MapView: React.FC<MapViewProps> = ({ properties, mapLat, mapLon, mapLocation }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const layerControlRef = useRef<L.Control.Layers | null>(null);
  const [isMapInitialized, setIsMapInitialized] = useState(false);

  // Initialize map only once
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Create map with options for detailed view
    mapInstanceRef.current = L.map(mapRef.current, {
      zoomControl: true,
      scrollWheelZoom: true,
      preferCanvas: true, // Better performance with many markers
    }).setView([mapLat || 0, mapLon || 0], 10); // Zoom level set to 10 as requested
    
    if (mapRef.current) {
      mapRef.current.style.zIndex = "0";
    }
    
    // Define multiple tile layers for different map styles
    const osmStandard = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19
    });
    
    // Using more reliable tile sources that don't require API keys
    const esriWorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
      maxZoom: 20
    });
    
    // Use OpenTopoMap for terrain instead of Stamen
    const openTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
      maxZoom: 17
    });
    
    // Use OpenStreetMap Humanitarian for a detailed neighborhood-like view
    const osmHumanitarian = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>',
      maxZoom: 19
    });
    
    const cartoDetailedWithLabels = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 20
    });
    
    // Add default base layer
    osmHumanitarian.addTo(mapInstanceRef.current);
    
    // Create base layer object for layer control
    const baseLayers = {
      "Neighborhood": osmHumanitarian,
      "Detailed Map": cartoDetailedWithLabels,
      "Standard": osmStandard,
      "Satellite": esriWorldImagery,
      "Terrain": openTopoMap,
    };
    
    // Add layer control to switch between different maps
    layerControlRef.current = L.control.layers(baseLayers, {}, {
      collapsed: false
    }).addTo(mapInstanceRef.current);
    
    // Add a scale control
    L.control.scale({
      imperial: false,
      position: 'bottomleft'
    }).addTo(mapInstanceRef.current);
    
    // Add zoom control to bottom right
    L.control.zoom({
      position: 'bottomright'
    }).addTo(mapInstanceRef.current);
    
    setIsMapInitialized(true);

    // Clean up on component unmount
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        setIsMapInitialized(false);
      }
    };
  }, []);

  // Update map view when coordinates change
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    
    mapInstanceRef.current.setView([mapLat || 0, mapLon || 0], 10); // Ensure zoom level stays at 10
  }, [mapLat, mapLon]);

  // Update markers when properties change
  useEffect(() => {
    if (!mapInstanceRef.current || !isMapInitialized) return;

    // Clear existing markers
    markersRef.current.forEach(marker => {
      marker.remove();
    });
    markersRef.current = [];

    // Create a layer group for markers
    const markers = L.layerGroup().addTo(mapInstanceRef.current);

    // Add new markers with detailed information
    properties.forEach((property) => {
      if (property.latitude && property.longitude) {
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
        
        const marker = L.marker([property.latitude, property.longitude], {
          icon: customIcon,
          riseOnHover: true,
          title: property.title
        }).addTo(markers);
        
        // Create a detailed popup with more property information
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
        
        marker.bindPopup(L.popup({
          className: 'detailed-popup',
          closeButton: true,
          autoClose: false,
          closeOnEscapeKey: true,
          maxWidth: 320
        }).setContent(popupContent));
        
        markersRef.current.push(marker);
      }
    });
    
    // Add custom CSS for enhanced styling
    const style = document.createElement('style');
    style.innerHTML = `
      .detailed-popup .leaflet-popup-content-wrapper {
        border-radius: 8px;
        box-shadow: 0 4px 30px rgba(0,0,0,0.2);
        padding: 0;
        overflow: hidden;
      }
      .detailed-popup .leaflet-popup-content {
        margin: 0;
        width: 100% !important;
      }
      .detailed-popup .leaflet-popup-tip {
        box-shadow: 0 4px 30px rgba(0,0,0,0.2);
      }
      .property-marker {
        background: transparent;
        border: none;
        z-index: 1000;
      }
      .leaflet-container {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      }
      .leaflet-control-layers {
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      if (style.parentNode) {
        document.head.removeChild(style);
      }
    };
    
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
                  if (mapInstanceRef.current && property.latitude && property.longitude) {
                    mapInstanceRef.current.setView([property.latitude, property.longitude], 15);
                    const marker = markersRef.current.find(m => 
                      m.getLatLng().lat === property.latitude && 
                      m.getLatLng().lng === property.longitude
                    );
                    if (marker) marker.openPopup();
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