"use client";
import React, { useState } from "react";
import { Mail, Lock, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLoginMutation, useVerifyOtpMutation, useResendVerificationMutation } from "../redux/slices/apiSlice";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { handleLogin, notifyAuthStateChange } from "../../utils/auth-util";
import VerifyEmail from "./VerifyEmail";
import toast from 'react-hot-toast';

interface LoginProps {
  openForgetPassword: () => void;
}

interface FormValues {
  email: string;
  password: string;
}

interface FormValues {
  email: string;
  password: string;
}

const Login: React.FC<LoginProps> = ({ openForgetPassword }) => {
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [verificationEmail, setVerificationEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [loginCredentials, setLoginCredentials] = useState<FormValues>({ email: '', password: '' });
  const [login, { isLoading }] = useLoginMutation();
  const [verifyOtp] = useVerifyOtpMutation();
  const [resendVerification] = useResendVerificationMutation();
  const router = useRouter();

  const handleVerificationComplete = async (otp: string) => {
    console.log("Verification complete with OTP:", otp);
    try {
        // After successful verification, log the user in with stored credentials
        const loginResponse = await login({
          email: loginCredentials.email,
          password: loginCredentials.password
        }).unwrap();
        
        if (loginResponse.token) {
          await handleLogin(loginResponse.token);
          notifyAuthStateChange();
          router.push("/");
          window.location.reload();
        }
    } catch (error: any) {
      setMessage({
        type: "error",
        text: error.data?.message || "Verification failed. Please try again."
      });
    }
  };

  const handleResendVerification = async (email: string) => {
    try {
      await resendVerification({ email: email }).unwrap();
      setMessage({ 
        type: "success", 
        text: "Verification email resent successfully!" 
      });
      return Promise.resolve();
    } catch (error: any) {
      const errorMsg = error.data?.message || "Failed to resend verification email";
      setMessage({
        type: "error",
        text: errorMsg
      });
      return Promise.reject(new Error(errorMsg));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    const form = event.currentTarget;
    const email = form.email.value.trim();
    const password = form.password.value;
    setLoginCredentials({ email, password });

    console.log("Form submission started:", { email, password: "***" });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log("Email validation failed:", email);
      setMessage({ type: "error", text: "Please enter a valid email address" });
      setLoading(false);
      return;
    }

    console.log("Email validation passed, attempting login...");

    login({
      email: email,
      password: password,
    })
      .unwrap()
      .then(async (response) => {
        console.log("Login response received:", response);
        
        // Check if login was successful
        if (response.success) {
          console.log("Login successful, processing token...");
          setMessage({ type: "success", text: response.message });

          const loginSuccess = await handleLogin(response.token);
          console.log("Handle login result:", loginSuccess);

          if (loginSuccess) {
            console.log("Login validation successful, redirecting...");
            notifyAuthStateChange();
            setTimeout(() => {
              router.push("/");
              window.location.reload();
            }, 1000);
          } else {
            console.log("Login validation failed");
            setMessage({ type: "error", text: "Failed to validate login" });
          }
        } else {
          console.log("Login unsuccessful, checking verification status...");
          console.log("Response details:", { 
            success: response.success, 
            verified: response.verified, 
            message: response.message 
          });
          
          // Handle case where success is false
          if (response.verified === false) {
            console.log("Email verification required, sending verification code...");
            console.log("Setting verification email to:", email);
            console.log("Setting userId to:", response.userId);
            
            try {
              // First, send the verification code
              await resendVerification({ email }).unwrap();
              
              // Then show the verification UI
              setVerificationEmail(email);
              setUserId(response.userId || "");
              setShowVerification(true);
              setMessage({
                type: "info",
                text: response.message || "Please verify your email to continue. A verification code has been sent to your email.",
              });
              
              console.log("Verification code sent and flow setup complete");
            } catch (error: any) {
              console.error("Failed to send verification code:", error);
              setMessage({
                type: "error",
                text: error.data?.message || "Failed to send verification code. Please try again."
              });
            }
          } else {
            console.log("Other failure case:", response.message);
            // Other failure cases
            setMessage({
              type: "error",
              text: response.message || "Login failed",
            });
          }
        }

        console.log("Setting loading to false");
        setLoading(false);
      })
      .catch(async (error: any) => {
        console.log("Login error caught:", error);
        console.log("Error details:", {
          status: error.status,
          data: error.data,
          message: error.data?.message
        });
        
        setLoading(false);
        if (error.status === 403 && error.data?.message?.includes("not verified")) {
          console.log("403 error with verification needed (from catch block)");
          const userEmail = form.email.value.trim();
          
          try {
            // First, send the verification code
            await resendVerification({ email: userEmail }).unwrap();
            
            // Then show the verification UI
            setVerificationEmail(userEmail);
            setUserId(error.data?.userId || "");
            setShowVerification(true);
            setMessage({
              type: "info",
              text: "Please verify your email to continue. A verification code has been sent to your email.",
            });
          } catch (resendError: any) {
            console.error("Failed to send verification code:", resendError);
            setMessage({
              type: "error",
              text: resendError.data?.message || "Failed to send verification code. Please try again."
            });
          }
        } else {
          console.log("Other error case:", error.data?.message);
          
         
          setMessage({
            type: "error",
            text: error.data?.message || "Login failed",
          });
          if(error.data?.success === false && error.data?.verified === false){
            setShowVerification(true);
            setVerificationEmail(form.email.value.trim());
            await resendVerification({ email: form.email.value.trim() }).unwrap();
          }
        }
      });
  };
  const handleGoogleSignIn = async () => {
    try {
      setGoogleLoading(true);
      const result = await signIn("google", { redirect: false });

      if (result?.error) {
        setMessage({ type: "error", text: "Google sign-in failed" });
      } else if (result?.ok) {
        const token = localStorage.getItem("auth_Token");

        if (token) {
          const loginSuccess = await handleLogin(token);

          if (loginSuccess) {
            notifyAuthStateChange();
            router.push("/");
            window.location.reload();
          } else {
            setMessage({ type: "error", text: "Failed to validate login after Google sign-in" });
          }
        } else {
          setMessage({ type: "error", text: "No authentication token received from Google sign-in" });
        }
      }
    } catch (error) {
      setMessage({ type: "error", text: "An error occurred during Google sign-in" });
    } finally {
      setGoogleLoading(false);
      // Show verification component if email needs verification
      if (showVerification && verificationEmail) {
        return (
          <div className="w-full max-w-md p-6 mx-auto">
            <VerifyEmail 
              email={verificationEmail}
              userId={userId}
              onVerificationComplete={handleVerificationComplete}
              onResendVerification={handleResendVerification}
            />
          </div>
        );
      }
    }
  };

  if (showVerification && verificationEmail) {
    return (
      <div className="w-full max-w-md p-6 mx-auto">
        <VerifyEmail 
          email={verificationEmail}
          userId={userId}
          onVerificationComplete={handleVerificationComplete}
          onResendVerification={handleResendVerification}
        />
      </div>
    );
  }

  return (
    <div className="w-full space-y-6 p-8 rounded-xl bg-card/50">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight">Welcome Back</h1>
        <p className="text-sm text-muted-foreground">
          Please sign in to continue
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <input
              id="email"
              type="email"
              name="email"
              autoComplete="email"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-10 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="name@example.com"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="password"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              autoComplete="current-password"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-10 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Enter your password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-sm text-muted-foreground hover:text-foreground"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="inline-flex w-full items-center justify-center rounded-md text-white px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          style={{ backgroundColor: loading ? "var(--cta/90)" : "var(--cta)" }}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Signing in...
            </>
          ) : (
            "Sign in"
          )}
        </button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t"></span>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={handleGoogleSignIn}
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
        Sign in with Google
      </button>

      {message.text && (
        <div className={`text-sm p-2 rounded ${message.type === "error" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
          {message.text}
        </div>
      )}
    </div>
  );
};

export default Login;
