import React, { useState, useEffect } from "react";
import {
  MapPin,
  PersonStanding,
  Bike,
  Bus,
  Car,
  ChevronRight,
  X,
} from "lucide-react";
import BottomDrawer from "./BottomDrawer";

interface UniversityDistanceInfoProps {
  universities: string[];
  propertyLocation: string; // Should be in the format "lat,lng"
  onUniversitySelect?: (university: string) => void;
}

interface TransportOption {
  time: number;
  distance: string;
  icon: JSX.Element;
  label: string;
  mode: string;
}

const UniversityDistanceInfo: React.FC<UniversityDistanceInfoProps> = ({
  universities,
  propertyLocation,
  onUniversitySelect,
}) => {
  const [selectedUniversity, setSelectedUniversity] = useState<string>(universities[0] || "");
  const [openDrawer, setOpenDrawer] = useState(false);
  const [showStreetView, setShowStreetView] = useState(false);
  const [transportOptions, setTransportOptions] = useState<TransportOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [coordinates, setCoordinates] = useState<string | null>(null);

  useEffect(() => {
    const geocodeAddress = async () => {
      try {
        const response = await fetch(
          `/api/geocode?address=${encodeURIComponent(propertyLocation)}`
        );
        const data = await response.json();
        
        if (data.results && data.results[0]?.geometry?.location) {
          const { lat, lng } = data.results[0].geometry.location;
          setCoordinates(`${lat},${lng}`);
        } else {
          setError('Could not find location coordinates');
        }
      } catch (err) {
        console.error('Error geocoding address:', err);
        setError('Failed to get location coordinates');
      }
    };

    // Check if propertyLocation is already in lat,lng format
    if (propertyLocation.match(/^-?\d+\.\d+,-?\d+\.\d+$/)) {
      setCoordinates(propertyLocation);
    } else {
      geocodeAddress();
    }
  }, [propertyLocation]);

  const handleUniversitySelect = (university: string) => {
    setSelectedUniversity(university);
    setOpenDrawer(false);
    if (onUniversitySelect) {
      onUniversitySelect(university);
    }
  };

  useEffect(() => {
    const fetchDistanceData = async () => {
      if (!selectedUniversity || !coordinates) return;

      setLoading(true);
      setError(null);

      try {
        // First, get the university's coordinates using Places API
        const universitySearchUrl = `/api/places/search?query=${encodeURIComponent(selectedUniversity)}`;
        const universityResponse = await fetch(universitySearchUrl);
        const universityData = await universityResponse.json();

        if (!universityData.results?.[0]?.geometry?.location) {
          throw new Error('University location not found');
        }

        const universityLocation = universityData.results[0].geometry.location;

        // Then, get distance matrix data for different transport modes
        const modes = ['walking', 'bicycling', 'transit', 'driving'];
        const promises = modes.map(mode => {
          const distanceMatrixUrl = `/api/distance-matrix?origins=${coordinates}&destinations=${universityLocation.lat},${universityLocation.lng}&mode=${mode}`;
          return fetch(distanceMatrixUrl).then(res => res.json());
        });

        const results = await Promise.all(promises);

        const newTransportOptions: TransportOption[] = results.map((result, index) => {
          const element = result.rows[0]?.elements[0];
          const mode = modes[index];
          
          return {
            time: Math.round(element?.duration?.value / 60) || 0, // Convert seconds to minutes
            distance: element?.distance?.text || 'N/A',
            icon: getTransportIcon(mode),
            label: getTransportLabel(mode),
            mode
          };
        });

        setTransportOptions(newTransportOptions);
      } catch (err) {
        setError('Failed to fetch distance data');
        console.error('Error fetching distance data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDistanceData();
  }, [selectedUniversity, coordinates]);

  const getTransportIcon = (mode: string) => {
    switch (mode) {
      case 'walking': return <PersonStanding size={16} />;
      case 'bicycling': return <Bike size={16} />;
      case 'transit': return <Bus size={16} />;
      case 'driving': return <Car size={16} />;
      default: return <PersonStanding size={16} />;
    }
  };

  const getTransportLabel = (mode: string) => {
    switch (mode) {
      case 'walking': return 'Walk';
      case 'bicycling': return 'Bike';
      case 'transit': return 'Transit';
      case 'driving': return 'Drive';
      default: return mode;
    }
  };

  return (
    <>
      <div className="space-y-3 border border-blue-400 bg-blue-100 rounded-lg py-5 px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-gray-600" />
            <span className="font-medium text-gray-800">
              {loading ? 'Calculating distance...' : 
               error ? 'Distance calculation failed' :
               transportOptions[0]?.distance} from{" "}
              <span className="text-gray-800 font-bold">
                {selectedUniversity}
              </span>
            </span>
          </div>
          <button 
            className="text-blue-600 hover:underline"
            onClick={() => setOpenDrawer(true)}
          >
            Select
            <ChevronRight size={16} className="inline-block mr-1 mb-1" />
          </button>
        </div>

        {/* Transport Options */}
        <div className="grid grid-cols-4 gap-2">
          {loading ? (
            <div className="col-span-4 text-center text-gray-600">Loading transport options...</div>
          ) : error ? (
            <div className="col-span-4 text-center text-red-600">{error}</div>
          ) : (
            transportOptions.map((item, i) => (
              <div
                key={i}
                className="flex flex-col items-center p-2 bg-gray-100 rounded-md"
              >
                {item.icon}
                <div className="text-sm font-medium text-gray-800">
                  {item.time} min
                </div>
                <div className="text-xs text-gray-600">
                  {item.distance}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Map and Street View Options */}
        <div className="flex gap-3 justify-center items-center mt-4">
          <a 
            href={`https://www.google.com/maps/dir/?api=1&origin=${coordinates}&destination=${encodeURIComponent(selectedUniversity)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-fit items-center justify-center px-6 py-2 bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
          >
            <MapPin size={16} className="text-white" />
            <span className="ml-2 text-sm font-medium text-white">Map</span>
          </a>
          {coordinates && (
            <a 
              href={`https://www.google.com/maps/@${coordinates},3a,75y,90h,90t/data=!3m6!1e1!3m4!1s!2e0!7i16384!8i8192`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-fit items-center justify-center px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
            >
              <PersonStanding size={16} className="text-white" />
              <span className="ml-2 text-sm font-medium text-white">
                Street
              </span>
            </a>
          )}
        </div>
      </div>

      {/* Street View Modal */}
      {showStreetView && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-full h-full max-w-4xl max-h-[90vh] bg-white rounded-lg overflow-hidden">
            <button
              onClick={() => setShowStreetView(false)}
              className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100"
            >
              <X size={24} />
            </button>
            <iframe
              src={`https://www.google.com/maps/embed/v1/streetview?key=${process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY}&location=${propertyLocation}&heading=210&pitch=10&fov=90`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      )}

      {/* University Selection Drawer */}
      <BottomDrawer
        isOpen={openDrawer}
        onClose={() => setOpenDrawer(false)}
        title="Select University"
      >
        <div className="space-y-4">
          {universities.map((university, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg cursor-pointer transition-colors ${
                selectedUniversity === university
                  ? "bg-blue-50 border border-blue-200"
                  : "hover:bg-gray-50"
              }`}
              onClick={() => handleUniversitySelect(university)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <MapPin size={20} className="text-blue-600" />
                  <span className="font-medium">{university}</span>
                </div>
                {selectedUniversity === university && (
                  <div className="h-5 w-5 rounded-full bg-blue-600 flex items-center justify-center">
                    <ChevronRight size={16} className="text-white" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </BottomDrawer>
    </>
  );
};

export default UniversityDistanceInfo;