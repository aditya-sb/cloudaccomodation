"use client";
import React, { useState } from "react";
import {
  Mail,
  User,
  Lock,
  CheckCircle2,
  Loader2,
  Eye,
  EyeOff,
} from "lucide-react";
import { useRegisterMutation } from "../redux/slices/apiSlice";
import { useRouter } from "next/navigation";
const Register = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const [register, { isLoading }] = useRegisterMutation();
  const router = useRouter();
  const checkPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    setPasswordStrength(strength);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage({ type: "", text: "" });

    const form = event.currentTarget;
    const data = {
      email: form.email.value.trim(),
      username: form.username.value.trim(),
      password: form.password.value,
      passwordConf: form.passwordConf.value,
    };

    // Enhanced validations
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      setMessage({ type: "error", text: "Please enter a valid email address" });
      return;
    }

    if (data.username.length < 3) {
      setMessage({
        type: "error",
        text: "Username must be at least 3 characters",
      });
      return;
    }

    if (data.password !== data.passwordConf) {
      setMessage({ type: "error", text: "Passwords do not match" });
      return;
    }

    if (passwordStrength < 3) {
      setMessage({
        type: "error",
        text: "Password must be stronger (use uppercase, numbers, and special characters)",
      });
      return;
    }

    // Call the mutation
    register({
      email: data.email,
      username: data.username,
      password: data.password,
    })
      .unwrap()
      .then((response) => {
        if (response.message === "User already registered") {
          setMessage({ type: "error", text: response.message });
          form.reset();
        } else {
          setMessage({ type: "success", text: response.message });

          // Optional: Redirect to login page
          setTimeout(() => {router.push("/login");
          }, 1000); 
        }
      })
      .catch((error: any) => {
        setMessage({
          type: "error",
          text: error.response?.data?.message || "Registration failed",
        });
      });
  };

  return (
    <div className="w-full max-w-md space-y-6 p-8 rounded-xl">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight">Create an Account</h1>
        <p className="text-sm text-muted-foreground">
          Enter your details to register
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Username */}
        <div className="space-y-2">
          <label
            htmlFor="username"
            className="text-sm font-medium leading-none"
          >
            Username
          </label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              className="flex h-10 w-full rounded-md border px-3 py-2 pl-10 text-sm"
              placeholder="johndoe"
              required
              minLength={3}
            />
          </div>
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium leading-none">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              className="flex h-10 w-full rounded-md border px-3 py-2 pl-10 text-sm"
              placeholder="name@example.com"
              required
            />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-2">
          <label
            htmlFor="password"
            className="text-sm font-medium leading-none"
          >
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              className="flex h-10 w-full rounded-md border px-3 py-2 pl-10 text-sm"
              placeholder="Create a strong password"
              required
              minLength={8}
              onChange={(e) => checkPasswordStrength(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-muted-foreground"
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>
          <div className="flex gap-1 mt-1">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className={`h-1 w-full rounded-full ${
                  i < passwordStrength ? "bg-primary" : "bg-muted"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <label
            htmlFor="passwordConf"
            className="text-sm font-medium leading-none"
          >
            Confirm Password
          </label>
          <div className="relative">
            <CheckCircle2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <input
              id="passwordConf"
              name="passwordConf"
              type={showConfirmPassword ? "text" : "password"}
              autoComplete="new-password"
              className="flex h-10 w-full rounded-md border px-3 py-2 pl-10 text-sm"
              placeholder="Confirm your password"
              required
              minLength={8}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-3 text-muted-foreground"
            >
              {showConfirmPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex w-full justify-center px-4 py-2 text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating account...
            </>
          ) : (
            "Create account"
          )}
        </button>
      </form>

      {/* Error Message */}
      {message.text && (
        <div
          className={`text-sm mt-4 p-2 rounded ${
            message.type === "error"
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {message.text}
        </div>
      )}
    </div>
  );
};

export default Register;
