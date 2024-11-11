"use client";
import React, { useState } from 'react';
import { FaLock, FaCheckCircle } from "react-icons/fa";
import axios from 'axios';

const ForgetPassword: React.FC = () => {
  const [message, setMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = {
      email: formData.get('email'),
      password: formData.get('password'),
      passwordConf: formData.get('passwordConf')
    };

    try {
      const response = await axios.post('http://localhost:5000/forgetpass', data);
      setMessage(response.data.Success);
    } catch (error) {
      setMessage('Error changing password');
    }
  };

  return (
    <div className="col-md-4 col-md-offset-4 bg-white rounded-lg shadow-md p-6 space-y-4">
    </div>
  );
};

export default ForgetPassword;
