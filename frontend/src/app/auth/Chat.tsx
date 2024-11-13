"use client";
import React, { useState } from "react";
import { FaEnvelope, FaLock, FaCheckCircle } from "react-icons/fa";
import axios from "axios";

const ForgetPassword: React.FC = () => {
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
      passwordConf: formData.get("passwordConf"),
    };
  
    try {
      const response = await axios.post("http://localhost:5000/forgetpass", data);
      setMessage(response.data.success || "Password reset successful.");
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
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-gray-800 text-center">Reset Password</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center border border-gray-300 rounded-lg p-3 bg-gray-100">
          <FaEnvelope className="text-gray-500 mr-3" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full bg-transparent focus:outline-none"
            required
          />
        </div>
        <div className="flex items-center border border-gray-300 rounded-lg p-3 bg-gray-100">
          <FaLock className="text-gray-500 mr-3" />
          <input
            type="password"
            name="password"
            placeholder="New Password"
            className="w-full bg-transparent focus:outline-none"
            required
          />
        </div>
        <div className="flex items-center border border-gray-300 rounded-lg p-3 bg-gray-100">
          <FaCheckCircle className="text-gray-500 mr-3" />
          <input
            type="password"
            name="passwordConf"
            placeholder="Confirm Password"
            className="w-full bg-transparent focus:outline-none"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gray-800 text-white py-2 rounded-lg transition hover:bg-gray-700"
        >
          Reset Password
        </button>
      </form>
      {message && <p className="text-red-500 mt-2 text-center">{message}</p>}
    </div>
  );
};

export default ForgetPassword;
