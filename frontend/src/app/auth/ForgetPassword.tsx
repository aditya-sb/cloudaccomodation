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
      <h2 className="text-2xl font-semibold text-center" style={{ color: "var(--gray-foreground)" }}>Reset Password</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center border rounded-lg p-3" style={{ backgroundColor: "var(--input-bg)", borderColor: "var(--input-border)" }}>
          <FaEnvelope className="mr-3" style={{ color: "var(--gray-text)" }} />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full bg-transparent focus:outline-none"
            style={{ color: "var(--gray-foreground)" }}
            required
          />
        </div>
        <div className="flex items-center border rounded-lg p-3" style={{ backgroundColor: "var(--input-bg)", borderColor: "var(--input-border)" }}>
          <FaLock className="mr-3" style={{ color: "var(--gray-text)" }} />
          <input
            type="password"
            name="password"
            placeholder="New Password"
            className="w-full bg-transparent focus:outline-none"
            style={{ color: "var(--gray-foreground)" }}
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
            style={{ color: "var(--gray-foreground)" }}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 rounded-lg transition"
          style={{
            backgroundColor: "var(--cta)",
            color: "var(--cta-text)",
          }}
        >
          Reset Password
        </button>
      </form>
      {message && <p className="text-center mt-2" style={{ color: "var(--error-text)" }}>{message}</p>}
    </div>
  );
};

export default ForgetPassword;
