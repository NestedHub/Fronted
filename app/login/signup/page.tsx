"use client";

import type React from "react";
import { useState } from "react";
import Image from "next/image";
import Button from "@/component/ui/button";
import { Input } from "@/component/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react"; // For Google signup

export default function SignUpPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "", // New field for OTP
  });
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) return;

    try {
      // Create user
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
          phoneNumber: formData.phoneNumber,
          provider: "credentials",
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Signup failed.");

      // Automatically log in the user after signup
      const signInResult = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (signInResult?.error) {
        throw new Error(signInResult.error);
      }

      // Redirect to user page
      router.push("/user");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Signup failed");
    }
  };

  const handleGoogleSignUp = async () => {
    // Directly sign in with Google
    await signIn("google", { callbackUrl: "/user" });
  };

  const validateForm = () => {
    if (!formData.fullName || !formData.email || !formData.password || !formData.phoneNumber) {
      setError("All fields are required.");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Invalid email format.");
      return false;
    }
    const phoneRegex = /^\+?[\d\s-]{10,}$/; // Basic phone number validation (e.g., +1234567890)
    if (!phoneRegex.test(formData.phoneNumber)) {
      setError("Invalid phone number format (e.g., +855123456789).");
      return false;
    }
    return true;
  };

  // const handleFormSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setError(null);

  //   if (!validateForm()) return;

  //   try {
  //     // Mock API call to save user data (replace with real endpoint)
  //     const response = await fetch("/api/signup", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         fullName: formData.fullName,
  //         email: formData.email,
  //         password: formData.password, // Hash this on the server
  //         phoneNumber: formData.phoneNumber,
  //         provider: "credentials",
  //       }),
  //     });

  //     const data = await response.json();
  //     if (!response.ok) throw new Error(data.message || "Signup failed.");

  //     // Redirect to sign-in page after successful signup
  //     router.push("/propertyowner/signin");
  //   } catch (err) {
  //     setError(err instanceof Error ? err.message : "An error occurred during signup.");
  //   }
  // };

  // const handleGoogleSignUp = async () => {
  //   try {
  //     const result = await signIn("google", {
  //       callbackUrl: "/propertyowner/signin", // Redirect after Google signup
  //     });

  //     if (!result?.error) {
  //       // On successful Google login, save user data to database
  //       const response = await fetch("/api/signup", {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({
  //           fullName: result.user?.name || "", // Google provides name
  //           email: result.user?.email || "",
  //           phoneNumber: "", // Google doesn't provide phone; prompt later if needed
  //           provider: "google",
  //         }),
  //       });

  //       const data = await response.json();
  //       if (!response.ok) throw new Error(data.message || "Failed to save Google user.");
  //     } else {
  //       setError("Google signup failed.");
  //     }
  //   } catch (err) {
  //     setError(err instanceof Error ? err.message : "An error occurred with Google signup.");
  //   }
  // };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Green Background with Branding */}
      <div className="flex-1 bg-green-700 relative flex flex-col justify-between p-8 text-white">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-white rounded flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z" />
            </svg>
          </div>
          <span className="font-bold text-lg">NESTHUB</span>
        </div>

        {/* Main Text */}
        <div className="flex-1 flex items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-8">
              Let us help you find the perfect property today.
            </h1>
          </div>
        </div>

        {/* House Image */}
        <div className="flex justify-center">
          <div className="relative w-80 h-60">
            <Image
              src="/images/modern-house-3d.png"
              alt="Modern house 3D render"
              fill
              className="object-contain"
              onError={(e) => (e.currentTarget.src = "/fallback-image.png")}
            />
          </div>
        </div>
      </div>

      {/* Right Side - Sign Up Form */}
      <div className="flex-1 bg-white flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Get Started With NESTHUB</h2>
            <p className="text-sm text-gray-600 mb-1">
              By continuing you indicate that you read and agreed to the Terms of Use
            </p>
            <p className="text-sm text-gray-500">Getting started is easy</p>
          </div>

          {/* Sign Up Form */}
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <Input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <Input
                type="email"
                name="email"
                placeholder="Enter Email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <Input
                type="tel"
                name="phoneNumber"
                placeholder="Phone Number (e.g., +855123456789)"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>

            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full h-12 px-4 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <div className="relative">
              <Input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full h-12 px-4 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <Button
              type="submit"
              className="w-full h-12 bg-green-700 hover:bg-green-800 text-white font-semibold rounded-lg transition-colors"
            >
              Create Account
            </Button>
          </form>

          {/* Divider */}
          <div className="my-6 text-center">
            <span className="text-sm text-gray-500">Or continue with</span>
          </div>

          {/* Google Sign Up */}
          <Button
            variant="outline"
            className="w-full h-12 border border-gray-300 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors"
            onClick={handleGoogleSignUp}
          >
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span className="text-gray-700">Google</span>
          </Button>

          {/* Footer Links */}
          <div className="mt-6 text-center space-y-3">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <a href="/login/signin" className="text-green-700 hover:text-green-800 font-medium">
                Login
              </a>
            </p>
            <Button
              variant="outline"
              className="w-full h-12 bg-green-100 border-green-200 text-green-700 hover:bg-green-200 rounded-lg transition-colors"
              onClick={() => router.push("/login/business")}
            >
              Join Business
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}