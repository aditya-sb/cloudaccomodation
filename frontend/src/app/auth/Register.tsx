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

    // Front-end validations
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email as string)) {
      setMessage('Please enter a valid email address.');
      return;
    }

    if ((data.username as string).length < 3) {
      setMessage('Username must be at least 3 characters.');
      return;
    }

    if ((data.password as string).length < 8) {
      setMessage('Password must be at least 8 characters.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/register', data);
      setMessage(response.data.success || "Registration successful!");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setMessage(error.response.data.error);
      } else if (error instanceof Error) {
        setMessage(error.message);
      } else {
        setMessage("An unknown error occurred.");
      }
    }
  };

  return (
    <div className="space-y-4 ">
      <h2 className="text-2xl font-semibold text-gray-800 text-center">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center border border-gray-300 rounded-lg p-3 bg-gray-100">
          <FaUser className="text-gray-500 mr-3" />
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="w-full text-gray-500 bg-transparent focus:outline-none"
            required
          />
        </div>
        <div className="flex items-center border border-gray-300 rounded-lg p-3 bg-gray-100">
          <FaEnvelope className="text-gray-500 mr-3" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full bg-transparent text-gray-500 focus:outline-none"
            required
          />
        </div>
        <div className="flex items-center border border-gray-300 rounded-lg p-3 bg-gray-100">
          <FaLock className="text-gray-500 mr-3" />
          <input
            type="password"
            name="password"
            placeholder="Password (8+ characters)"
            className="w-full bg-transparent text-gray-500 focus:outline-none"
            minLength={8}
            required
          />
        </div>
        <div className="flex items-center border border-gray-300 rounded-lg p-3 bg-gray-100">
          <FaCheckCircle className="text-gray-500 mr-3" />
          <input
            type="password"
            name="passwordConf"
            placeholder="Confirm Password"
            className="w-full bg-transparent text-gray-500 focus:outline-none"
            minLength={8}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gray-800 text-white py-2 rounded-lg transition hover:bg-gray-700"
        >
          Register
        </button>
      </form>
      {message && <p className="text-green-500 mt-2 text-center">{message}</p>}
    </div>
  );
};

export default Register;
