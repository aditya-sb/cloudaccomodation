declare global {
  interface Window {
    google: typeof google;
    initNearbyPlacesMap: () => void;
  }
}

declare namespace google.maps.places {
  class PlacesService {
    constructor(attrContainer: HTMLDivElement | google.maps.Map);
    nearbySearch(request: PlacesRequest, callback: (results: PlaceResult[] | null, status: PlacesServiceStatus) => void): void;
    getDetails(request: PlaceDetailsRequest, callback: (result: PlaceResult | null, status: PlacesServiceStatus) => void): void;
  }

  interface PlaceDetailsRequest {
    placeId: string;
    fields?: string[];
  }

  interface PlacesRequest {
    location: google.maps.LatLng | google.maps.LatLngLiteral;
    radius?: number;
    type?: string;
    keyword?: string;
    rankBy?: RankBy;
  }

  enum RankBy {
    PROMINENCE = 0,
    DISTANCE = 1
  }

  enum PlacesServiceStatus {
    OK = "OK",
    ZERO_RESULTS = "ZERO_RESULTS",
    OVER_QUERY_LIMIT = "OVER_QUERY_LIMIT",
    REQUEST_DENIED = "REQUEST_DENIED",
    INVALID_REQUEST = "INVALID_REQUEST",
    UNKNOWN_ERROR = "UNKNOWN_ERROR",
    NOT_FOUND = "NOT_FOUND"
  }

  interface PlaceResult {
    place_id?: string;
    name?: string;
    vicinity?: string;
    rating?: number;
    user_ratings_total?: number;
    types?: string[];
    geometry?: {
      location?: google.maps.LatLng;
      viewport?: google.maps.LatLngBounds;
    };
    photos?: PlacePhoto[];
    formatted_address?: string;
    icon?: string;
    opening_hours?: {
      open_now?: boolean;
      periods?: {
        open?: {
          day?: number;
          time?: string;
        };
        close?: {
          day?: number;
          time?: string;
        };
      }[];
      weekday_text?: string[];
    };
  }

  interface PlacePhoto {
    getUrl(options: { maxWidth?: number; maxHeight?: number }): string;
    height: number;
    width: number;
    html_attributions: string[];
  }
}

declare namespace google.maps.geometry {
  namespace spherical {
    function computeDistanceBetween(
      from: google.maps.LatLng | google.maps.LatLngLiteral,
      to: google.maps.LatLng | google.maps.LatLngLiteral
    ): number;
    
    function computeHeading(
      from: google.maps.LatLng | google.maps.LatLngLiteral,
      to: google.maps.LatLng | google.maps.LatLngLiteral
    ): number;
    
    function computeOffset(
      from: google.maps.LatLng,
      distance: number,
      heading: number
    ): google.maps.LatLng;
  }
}

export {}; 