"use client";
import React, { useEffect, useState } from 'react';
import { FaSignOutAlt, FaUser, FaEnvelope } from "react-icons/fa";
import axios from 'axios';

const Profile: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Retrieve userId from sessionStorage
    const userId = sessionStorage.getItem('userId');
    
    // If userId is not found, redirect to login
    // if (!userId) {
    //   window.location.href = '/login';
    //   return;
    // }

    // Fetch the profile information using the unique userId
    axios.get(`http://localhost:5000/profile`, {
      headers: { 'userId': userId }
    })
      .then(response => {
        setName(response.data.username); // Assuming username is part of the response
        setEmail(response.data.email);
      })
      .catch(error => {
        console.error("There was an error fetching the profile!", error);
        setMessage("Error fetching profile.");
      });
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/logout');
      
      // Clear userId from sessionStorage and display logout message
      sessionStorage.removeItem('userId');
      setMessage("You have successfully logged out.");
      
      // Redirect user to the homepage after logout
      setTimeout(() => window.location.href = '/', 1000);
    } catch (error) {
      console.error("Logout failed", error);
      setMessage("Error logging out.");
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-gray-700">Profile</h2>
      <div className="flex items-center space-x-4">
        <FaUser className="text-gray-500" size={24} />
        <span className="text-gray-600 text-lg font-medium">{name}</span>
      </div>
      <div className="flex items-center space-x-4">
        <FaEnvelope className="text-gray-500" size={24} />
        <span className=" text-gray-600 text-lg font-medium">{email}</span>
      </div>
      <button
        onClick={handleLogout}
        className="flex items-center justify-center space-x-2 bg-red-600 text-white py-2 px-4 rounded-lg w-full transition hover:bg-red-500"
      >
        <FaSignOutAlt />
        <span>Log Out</span>
      </button>
      {message && <p className="text-red-500 mt-2">{message}</p>}
    </div>
  );
};

export default Profile;
