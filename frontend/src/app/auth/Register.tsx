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
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-center" style={{ color: "var(--gray-text)" }}>Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center border rounded-lg p-3" style={{ backgroundColor: "var(--input-bg)", borderColor: "var(--input-border)" }}>
          <FaUser className="mr-3" style={{ color: "var(--gray-text)" }} />
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="w-full bg-transparent focus:outline-none"
            style={{ color: "var(--gray-text)" }}
            required
          />
        </div>
        <div className="flex items-center border rounded-lg p-3" style={{ backgroundColor: "var(--input-bg)", borderColor: "var(--input-border)" }}>
          <FaEnvelope className="mr-3" style={{ color: "var(--gray-text)" }} />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full bg-transparent focus:outline-none"
            style={{ color: "var(--gray-text)" }}
            required
          />
        </div>
        <div className="flex items-center border rounded-lg p-3" style={{ backgroundColor: "var(--input-bg)", borderColor: "var(--input-border)" }}>
          <FaLock className="mr-3" style={{ color: "var(--gray-text)" }} />
          <input
            type="password"
            name="password"
            placeholder="Password (8+ characters)"
            className="w-full bg-transparent focus:outline-none"
            style={{ color: "var(--gray-text)" }}
            minLength={8}
            required
          />
        </div>
        <div className="flex items-center border rounded-lg p-3" style={{ backgroundColor: "var(--input-bg)", borderColor: "var(--input-border)" }}>
          <FaCheckCircle className="mr-3" style={{ color: "var(--gray-text)" }} />
          <input
            type="password"
            name="passwordConf"
            placeholder="Confirm Password"
            className="w-full bg-transparent focus:outline-none"
            style={{ color: "var(--gray-text)" }}
            minLength={8}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 rounded-lg transition hover:opacity-75"
          style={{
            backgroundColor: "var(--cta)",
            color: "var(--cta-text)",
          }}
        >
          Register
        </button>
      </form>
      {message && <p className="mt-2 text-center" style={{ color: "var(--success-text)" }}>{message}</p>}
    </div>
  );
};

export default Register;
