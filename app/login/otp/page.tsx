"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Button from "@/component/ui/button"
import { Input } from "@/component/ui/input"
import { Mail } from "lucide-react"

export default function OTPPage() {
  const [verificationCode, setVerificationCode] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle OTP verification
    console.log("Verification code:", verificationCode)
  }

  const handleResendCode = () => {
    // Handle resend OTP
    console.log("Resending verification code...")
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Green Background with Branding */}
      <div className="flex-1 bg-green-700 relative flex flex-col justify-between p-8 text-white">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-white rounded flex items-center justify-center">
            <div className="text-green-700 font-bold text-sm">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z" />
              </svg>
            </div>
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
            <Image src="/images/otp-house-3d.png" alt="Modern house 3D render" fill className="object-contain" />
          </div>
        </div>
      </div>

      {/* Right Side - OTP Verification */}
      <div className="flex-1 bg-white flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Thank For Your Registration</h2>
            <p className="text-sm text-gray-600 mb-6">Please Check Your Inbox Or Spam Box</p>

            <p className="text-gray-700 mb-2">Enter the verification code we send to</p>
            <p className="text-lg font-semibold text-gray-900 mb-6">nesthub@gmail.com</p>
          </div>

          {/* Email Icon */}
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
              <Mail className="w-10 h-10 text-gray-600" />
            </div>
          </div>

          {/* OTP Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="verification-code" className="block text-sm font-medium text-gray-700 mb-2">
                Verification Code
              </label>
              <Input
                id="verification-code"
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="Enter verification code"
                className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-center text-lg tracking-widest"
                maxLength={6}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-green-700 hover:bg-green-800 text-white font-semibold rounded-lg transition-colors"
            >
              Verify
            </Button>
          </form>

          {/* Resend Code */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Didn't receive the code?{" "}
              <button onClick={handleResendCode} className="text-green-700 hover:text-green-800 font-medium underline">
                Resend Code
              </button>
            </p>
          </div>

          {/* Back to Login */}
          <div className="mt-4 text-center">
            <a href="/login" className="text-sm text-gray-500 hover:text-gray-700">
              Back to Login
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
