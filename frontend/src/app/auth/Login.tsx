"use client";
import React, { useState } from 'react';
import { FaArrowLeft, FaEnvelope, FaLock } from "react-icons/fa";
import axios from 'axios';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
  const [message, setMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = {
      email: formData.get('email'),
      password: formData.get('password')
    };

    try {
      const response = await axios.post('http://localhost:5000/login', data);
      setMessage(response.data.Success);
      if (response.data.Success === "Success!") {
        window.location.href = '/profile';
      }
    } catch (error) {
      setMessage('Error logging in');
    }
  };

  return (
    <div className="col-md-4 col-md-offset-4 bg-white rounded-lg shadow-md p-6 space-y-4 relative">
    </div>
  );
};

export default Login;
