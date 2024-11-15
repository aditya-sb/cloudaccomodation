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
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-center" style={{ color: "var(--gray-text)" }}>Log In</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
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
            placeholder="Password"
            className="w-full bg-transparent focus:outline-none"
            style={{ color: "var(--gray-text)" }}
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
          Log In
        </button>
      </form>
      <p className="text-center cursor-pointer" onClick={openForgetPassword} style={{ color: "var(--link-color)" }}>
        Forgot Password?
      </p>
      {message && <p className="text-center mt-2" style={{ color: "var(--error-text)" }}>{message}</p>}
    </div>
  );
};

export default Login;
