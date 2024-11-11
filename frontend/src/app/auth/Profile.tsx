"use client";
import React, { useEffect, useState } from 'react';
import { FaSignOutAlt, FaUser, FaEnvelope } from "react-icons/fa";
import axios from 'axios';

const Profile: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/profile')
      .then(response => {
        setName(response.data.name);
        setEmail(response.data.email);
      })
      .catch(error => {
        console.error("There was an error fetching the profile!", error);
      });
  }, []);

  return (
    <div className="col-md-4 col-md-offset-4 bg-white rounded-lg shadow-md p-6 space-y-4">

    </div>
  );

};

export default Profile;
