// A global cache to track script loading state
interface ScriptLoadingState {
  loaded: boolean;
  loading: boolean;
  callbacks: Function[];
}

const scriptState: ScriptLoadingState = {
  loaded: false,
  loading: false,
  callbacks: []
};

/**
 * Loads the Google Maps script with the provided API key and libraries.
 * Ensures the script is only loaded once across the application.
 * 
 * @param apiKey - Your Google Maps API key
 * @param libraries - Array of Google Maps libraries to load
 * @param callback - Function to call when the script has loaded
 */
export const loadGoogleMapsScript = (
  apiKey: string,
  libraries: string[] = ['places', 'geometry'],
  callback: Function
): void => {
  // If already loaded, call the callback immediately
  if (typeof window !== 'undefined' && window.google && window.google.maps) {
    scriptState.loaded = true;
    callback();
    return;
  }

  // Add callback to the queue
  scriptState.callbacks.push(callback);

  // If already loading, wait for the current load
  if (scriptState.loading) {
    return;
  }

  // Check if script tag already exists
  if (typeof document !== 'undefined') {
    const existingScript = document.getElementById('google-maps-script');
    if (existingScript) {
      scriptState.loading = true;
      return;
    }
  }

  // Start loading
  scriptState.loading = true;

  // Safe check for SSR
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return;
  }

  // Create global callback
  const callbackName = 'googleMapsScriptCallback';
  
  // Set up the callback function in the global scope
  window[callbackName as keyof Window] = () => {
    scriptState.loaded = true;
    scriptState.loading = false;
    
    // Call all queued callbacks
    scriptState.callbacks.forEach(cb => cb());
    
    // Clear the queue
    scriptState.callbacks = [];
    
    // Clean up global callback
    delete window[callbackName as keyof Window];
  };

  // Create and append the script tag
  const script = document.createElement('script');
  script.id = 'google-maps-script';
  script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=${libraries.join(',')}&callback=${callbackName}`;
  script.async = true;
  script.defer = true;
  
  document.head.appendChild(script);
};

/**
 * Utility to check if Google Maps is already loaded
 */
export const isGoogleMapsLoaded = (): boolean => {
  if (typeof window === 'undefined') return false;
  return !!window.google && !!window.google.maps;
};

/**
 * Create a promise-based wrapper for loading Google Maps
 */
export const loadGoogleMapsAsync = (
  apiKey: string,
  libraries: string[] = ['places', 'geometry']
): Promise<void> => {
  return new Promise((resolve) => {
    loadGoogleMapsScript(apiKey, libraries, resolve);
  });
}; 