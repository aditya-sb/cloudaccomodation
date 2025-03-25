"use client";

let cachedAuthToken: string | null = null;

const isAuthenticated = (): boolean => {
  // Retrieve token from cache or localStorage
  if (cachedAuthToken === null) {
    cachedAuthToken = localStorage.getItem('auth_Token');
  }

  // If no token exists, user is not authenticated
  if (!cachedAuthToken) {
    console.log("No auth token found");
    return false;
  }

  try {
    console.log("Auth token:", cachedAuthToken);

    // Decode the token payload
    const base64Payload = cachedAuthToken.split('.')[1]; // Get the payload part of the token
    if (!base64Payload) {
      console.error("Invalid token format");
      return false;
    }

    // Add padding if necessary for base64 decoding
    const decodedPayload = atob(base64Payload.replace(/-/g, '+').replace(/_/g, '/'));
    const payload = JSON.parse(decodedPayload);
    console.log("Token payload:", payload);

    // Validate token expiration
    const expirationTime = payload.exp * 1000; // Convert expiration time to milliseconds
    const isValid = expirationTime > Date.now();
    console.log("Token is valid:", isValid);

    return isValid;
  } catch (error) {
    console.error("Error decoding or validating token:", error);
    return false;
  }
};

export default isAuthenticated;
