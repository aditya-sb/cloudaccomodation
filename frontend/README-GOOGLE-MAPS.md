# Google Maps and Places API Integration

This project uses Google Maps and Places APIs to display nearby locations around properties.

## Setup Instructions

1. Get a Google Maps API key from the [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or use an existing one
   - Enable the Maps JavaScript API, Places API, and **Geometry Library**
   - Create an API key with appropriate restrictions

2. Create a `.env.local` file in the root of the frontend directory with the following content:
   ```
   NEXT_PUBLIC_GOOGLE_PLACES_API_KEY=your_google_places_api_key_here
   ```

3. Replace `your_google_places_api_key_here` with your actual API key

## Features

The Google Maps and Places API integration provides the following features:

- Interactive map on property pages
- Nearby places search (restaurants, stores, schools, etc.)
- Distance calculations from the property to nearby points of interest
- Place details including ratings and reviews

## Component Usage

The `NearbyPlaces` component can be used as follows:

```jsx
<NearbyPlaces 
  latitude={property.latitude} 
  longitude={property.longitude} 
/>
```

## Google Maps Loader Utility

To prevent "You have included the Google Maps JavaScript API multiple times on this page." errors, we've implemented a centralized loader utility:

```typescript
// Import the utility
import { loadGoogleMapsAsync } from "../utils/googleMapsLoader";

// Use it in your component
useEffect(() => {
  const initMap = async () => {
    try {
      // This will load Google Maps only once across the application
      await loadGoogleMapsAsync(API_KEY);
      
      // Initialize your map here
      initializeMap();
    } catch (err) {
      console.error('Failed to load Google Maps:', err);
    }
  };
  
  initMap();
}, []);
```

The utility handles:
- Loading the script only once across the entire application
- Managing callbacks when multiple components need Google Maps
- Clean removal of global callbacks to prevent memory leaks
- SSR compatibility with Next.js

## API Services and Libraries Used

- Google Maps JavaScript API
- Google Places API (Nearby Search)
- Google Maps Geometry Library (for distance calculations)
- Fallback Haversine formula for distance calculations if the Geometry library fails

## Troubleshooting

If you encounter issues with distance calculations, make sure:

1. The Geometry library is enabled in your Google Cloud Console
2. The script tag includes 'geometry' in the libraries parameter:
   ```javascript
   script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places,geometry&callback=${callbackName}`;
   ```

### Common Errors

- **"You have included the Google Maps JavaScript API multiple times on this page"**:
  - Make sure all components use the `googleMapsLoader` utility instead of loading scripts directly
  - Check for any hardcoded Google Maps script tags in your HTML

- **"Google is not defined"** or **"google.maps is not defined"**:
  - Ensure you're waiting for the script to load before accessing the Google Maps objects
  - Use the `isGoogleMapsLoaded()` function to check if Maps is ready

## Important Notes

- Keep your API key secure and do not commit it to version control
- Set appropriate API quotas and restrictions in Google Cloud Console
- Consider adding billing alerts to avoid unexpected charges
- The component includes a fallback distance calculation using the Haversine formula if the Google Geometry library fails 