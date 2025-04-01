"use client";
import React, { useState } from 'react';
import { FaSignOutAlt, FaUser } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import { useGetUserDetailsQuery } from '../redux/slices/apiSlice';
import { setAuthToken } from '../../utils/auth-util';
import { signOut } from 'next-auth/react';
import { Loader2 } from 'lucide-react';

const Profile: React.FC = () => {
  const [message, setMessage] = useState('');
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();
  
  // Fetch user details from the API
  const { data, error, isLoading } = useGetUserDetailsQuery();

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      setMessage("Logging out...");
      
      // Sign out from NextAuth
      await signOut({ redirect: false });
      
      // Clear the token from localStorage and cached token
      setAuthToken(null);
      
      setMessage("You have successfully logged out.");
      
      // Wait for 2 seconds before redirecting
      await new Promise(resolve => setTimeout(resolve, 2000));
      window.location.href = '/';
    } catch (error) {
      console.error("Logout failed", error);
      setMessage("Error logging out.");
      setIsLoggingOut(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
        <p>Loading profile information...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8 space-y-4">
        <div className="text-red-500 font-semibold">
          Error loading profile information
        </div>
        <button
          onClick={() => router.push('/auth')}
          className="px-4 py-2 bg-primary text-white rounded-md"
        >
          Return to Login
        </button>
      </div>
    );
  }

  const user = data?.user || {};
  const displayName = user.firstname && user.lastname 
    ? `${user.firstname} ${user.lastname}` 
    : user.username || user.email || 'User';

  return (
    <div className="px-6 py-8 space-y-6 rounded-lg shadow-lg" style={{ backgroundColor: "var(--card)", color: "var(--copy-primary)" }}>
      <div className="flex flex-col items-center space-y-4">
        <div className="rounded-full w-24 h-24 flex items-center justify-center shadow-md" style={{ backgroundColor: "var(--grape)" }}>
          {user.profilePicture ? (
            <img src={user.profilePicture} alt="Profile" className="rounded-full w-full h-full object-cover" />
          ) : (
            <FaUser className="text-4xl text-white" />
          )}
        </div>
        <h3 className="text-3xl font-semibold">{displayName}</h3>
        <p style={{ color: "var(--copy-secondary)" }}>{user.email}</p>
        {user.phone_no && (
          <p style={{ color: "var(--copy-secondary)" }}>Phone: {user.phone_no}</p>
        )}
      </div>
      
      <div className="border-t mt-6" style={{ borderColor: "var(--border)" }}></div>
      
      <div className="text-center text-sm italic mt-4" style={{ color: "var(--error-text)" }}>{message}</div>
      
      <button
        onClick={handleLogout}
        disabled={isLoggingOut}
        className="w-full flex items-center justify-center py-2 rounded-lg font-semibold transition hover:opacity-75 mt-6"
        style={{ backgroundColor: "var(--cta-active)", color: "var(--cta-text)" }}
      >
        {isLoggingOut ? (
          <Loader2 className="h-5 w-5 animate-spin mr-2" />
        ) : (
          <FaSignOutAlt className="mr-2" />
        )}
        {isLoggingOut ? 'Logging out...' : 'Log Out'}
      </button>
    </div>
  );
};

export default Profile;
