"use client";

let cachedAuthToken: string | null = null;

// Function to set auth token
export const setAuthToken = (token: string | null): void => {
  cachedAuthToken = token;
  
  if (token) {
    localStorage.setItem('auth_Token', token);
  } else {
    localStorage.removeItem('auth_Token');
  }
};

// Function to handle login - can be called after both normal and social login
export const handleLogin = async (token: string): Promise<boolean> => {
  try {
    setAuthToken(token);
    
    // Call the getUserDetails API to verify the token is valid
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/getUserDetails`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (response.ok) {
      const userData = await response.json();
      // Here you could store user data in a state management solution if needed
      return true;
    } else {
      console.error('Failed to validate user token');
      setAuthToken(null);
      return false;
    }
  } catch (error) {
    console.error('Error during login validation:', error);
    setAuthToken(null);
    return false;
  }
};

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
