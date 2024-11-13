"use client";
import React, { useEffect, useState } from 'react';
import { FaSignOutAlt, FaArrowRight } from "react-icons/fa";
import axios from 'axios';

const Profile: React.FC = () => {
  const [name, setName] = useState('Aditya');
  const [email, setEmail] = useState('test@gmail.com');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const userId = sessionStorage.getItem('userId');
    axios.get(`http://localhost:5000/profile`, {
      headers: { 'userId': userId }
    })
    .then(response => {
      setName(response.data.username);
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
      sessionStorage.removeItem('userId');
      setMessage("You have successfully logged out.");
      setTimeout(() => window.location.href = '/', 1000);
    } catch (error) {
      console.error("Logout failed", error);
      setMessage("Error logging out.");
    }
  };

  return (
    <div className="text-white px-6 py-8 space-y-6">


      {/* Profile Picture and Details */}
      <div className="flex flex-col items-center space-y-2">
        <div className="bg-gray-600 rounded-full w-20 h-20 flex items-center justify-center">
          {/* Placeholder for profile picture */}
          <span className="text-3xl">👤</span>
        </div>
        <h3 className="text-2xl font-semibold">{name}</h3>
        <p className="text-gray-400">{email}</p>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-600"></div>

      {/* Subscription Details Placeholder */}
      <div className="text-center space-y-2">
        <p className="text-gray-400 text-sm">Subscription Details</p>
        <p className="font-semibold">25<sup>th</sup> July - 24<sup>th</sup> August 2017</p>
        <button className="mt-2 bg-blue-600 text-white py-1 px-4 rounded-full text-sm shadow-md hover:bg-blue-700">
          Update Subscription
        </button>
      </div>

      {/* Additional Content Placeholder */}
      <div className="text-center text-gray-400 text-sm italic">
        Additional content can go here.
      </div>

      {/* Logout Button */}
      <div className="flex justify-center">
        <button
          onClick={handleLogout}
          className="mt-6 bg-red-600 text-white py-2 px-4 rounded-full transition hover:bg-red-700 flex items-center space-x-2"
        >
          <FaSignOutAlt />
          <span>Log Out</span>
        </button>
      </div>

      {/* Logout Message */}
      {message && <p className="text-red-500 mt-4 text-center">{message}</p>}
    </div>
  );
};

export default Profile;
