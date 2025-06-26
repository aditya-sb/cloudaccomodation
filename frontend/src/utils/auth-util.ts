"use client";

import { useState, useEffect } from 'react';

let cachedAuthToken: string | null = null;

// Hook to handle client-side only code
export const useClientSide = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
};

// Function to set auth token
export const setAuthToken = (token: string | null): void => {
  cachedAuthToken = token;
  
  // Check if window is defined (client-side) before accessing localStorage
  if (typeof window !== 'undefined') {
    if (token) {
      localStorage.setItem('auth_Token', token);
    } else {
      localStorage.removeItem('auth_Token');
    }
  }
};

// Add this new function
export const notifyAuthStateChange = (): void => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('auth-state-changed'));
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
      notifyAuthStateChange();
      setAuthToken(token);

      return true;
    } else {
      console.error('Failed to validate user token');
      setAuthToken(null);
      notifyAuthStateChange();
      return false;
    }
  } catch (error) {
    console.error('Error during login validation:', error);
    setAuthToken(null);
    notifyAuthStateChange();
    return false;
  }
};

const isAuthenticated = (): boolean => {
  // On server-side, return false by default to match initial client render
  if (typeof window === 'undefined') {
    return false;
  }

  // Retrieve token from cache or localStorage
  if (cachedAuthToken === null) {
    cachedAuthToken = localStorage.getItem('auth_Token');
  }

  // If no token exists, user is not authenticated
  if (!cachedAuthToken) {
    return false;
  }

  try {
    // Decode the token payload
    const base64Payload = cachedAuthToken.split('.')[1]; // Get the payload part of the token
    if (!base64Payload) {
      return false;
    }

    try {
      // Add padding if necessary for base64 decoding
      const decodedPayload = atob(base64Payload.replace(/-/g, '+').replace(/_/g, '/'));
      const payload = JSON.parse(decodedPayload);

      // Validate token expiration
      const expirationTime = payload.exp * 1000; // Convert expiration time to milliseconds
      return expirationTime > Date.now();
    } catch (error) {
      return false;
    }
  } catch (error) {
    return false;
  }
};

export default isAuthenticated;
