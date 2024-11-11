"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { FaEnvelope, FaUser, FaLock, FaCheckCircle } from "react-icons/fa";


const Register: React.FC = () => {
  const [message, setMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = {
      email: formData.get('email'),
      username: formData.get('username'),
      password: formData.get('password'),
      passwordConf: formData.get('passwordConf')
    };

    try {
      const response = await axios.post('http://localhost:5000/register', data);
      setMessage(response.data.Success);
    } catch (error) {
      setMessage('Error registering');
    }
  };

  return (
    <div className="col-md-4 col-md-offset-4 bg-white rounded-lg shadow-md p-6 space-y-4">
      
    </div>
  );
};

export default Register;
