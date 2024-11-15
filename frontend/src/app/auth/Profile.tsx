"use client";
import React, { useEffect, useState } from 'react';
import { FaSignOutAlt } from "react-icons/fa";
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
    <div className="px-6 py-8 space-y-6 rounded-lg shadow-lg" style={{ backgroundColor: "var(--card)", color: "var(--copy-primary)" }}>
      <div className="flex flex-col items-center space-y-4">
        <div className="rounded-full w-24 h-24 flex items-center justify-center shadow-md" style={{ backgroundColor: "var(--grape)" }}>
          <span className="text-4xl text-white">👤</span>
        </div>
        <h3 className="text-3xl font-semibold">{name}</h3>
        <p style={{ color: "var(--copy-secondary)" }}>{email}</p>
      </div>
      <div className="border-t mt-6" style={{ borderColor: "var(--border)" }}></div>
      <div className="text-center space-y-2 mt-4">
        <p className="text-sm font-medium" style={{ color: "var(--gray-text)" }}>Subscription Details</p>
        <p className="font-semibold text-lg text-yellow-500">Premium Member</p>
        <p className="font-semibold text-sm">25<sup>th</sup> July - 24<sup>th</sup> August 2024</p>
        <button className="mt-4 py-2 px-6 rounded-full font-medium shadow-md transition hover:opacity-90" style={{ backgroundColor: "var(--cta)", color: "var(--cta-text)" }}>
          Update Subscription
        </button>
      </div>
      <div className="text-center text-sm italic mt-4" style={{ color: "var(--error-text)" }}>{message}</div>
      <button
        onClick={handleLogout}
        className="w-full flex items-center justify-center py-2 rounded-lg font-semibold transition hover:opacity-75 mt-6"
        style={{ backgroundColor: "var(--cta-active)", color: "var(--cta-text)" }}
      >
        <FaSignOutAlt className="mr-2" /> Log Out
      </button>
    </div>
  );
};

export default Profile;
