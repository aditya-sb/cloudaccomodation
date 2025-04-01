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
import { signIn } from "next-auth/react";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
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
          text: error.data?.message || "Registration failed",
        });
      });
  };

  const handleGoogleSignUp = async () => {
    try {
      setGoogleLoading(true);
      const result = await signIn("google", { callbackUrl: "/" });
      if (result?.error) {
        setMessage({ type: "error", text: "Google sign-in failed" });
      }
    } catch (error) {
      setMessage({ type: "error", text: "An error occurred during Google sign-in" });
    } finally {
      setGoogleLoading(false);
    }
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
          className="inline-flex border w-full justify-center px-4 py-2 text-sm font-medium rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
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

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t"></span>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or sign up with
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={handleGoogleSignUp}
        disabled={googleLoading}
        className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        {googleLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="h-5 w-5">
            <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
            <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
            <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
            <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
          </svg>
        )}
        Sign up with Google
      </button>

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
