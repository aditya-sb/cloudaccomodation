"use client";
import React, { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import axios from "axios";

const Login: React.FC<{ openForgetPassword: () => void }> = ({ openForgetPassword }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
  
    try {
      const response = await axios.post("http://localhost:5000/login", data);
      setMessage(response.data.success || "Login successful!");
      sessionStorage.setItem('userId', response.data.userId);
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
      <h2 className="text-2xl font-semibold text-gray-800 text-center">Log In</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center border border-gray-300 rounded-lg p-3 bg-gray-50">
          <FaEnvelope className="text-gray-500 mr-3" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full bg-transparent text-gray-500 focus:outline-none"
            required
          />
        </div>
        <div className="flex items-center border border-gray-300 rounded-lg p-3 bg-gray-50">
          <FaLock className="text-gray-500 mr-3" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full bg-transparent text-gray-500 focus:outline-none"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gray-800 text-white py-2 rounded-lg transition hover:bg-gray-700"
        >
          Log In
        </button>
      </form>
      <p className="text-center text-blue-600 cursor-pointer" onClick={openForgetPassword}>
        Forgot Password?
      </p>
      {message && <p className="text-red-500 mt-2 text-center">{message}</p>}
    </div>
  );
};

export default Login;
