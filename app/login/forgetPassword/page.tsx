"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Button from "@/component/ui/button"
import { Input } from "@/component/ui/input"

export default function ForgetPasswordPage() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage("")

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setMessage("Password reset link has been sent to your email.")
    } catch (error) {
      setMessage("An error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
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
            <Image
              src="/images/forget-password-house.png"
              alt="Modern house 3D render"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>

      {/* Right Side - Forget Password Form */}
      <div className="flex-1 bg-white flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Forget Your Password ?</h2>
            <p className="text-sm text-gray-600">Input Email to Forget Your Password</p>
          </div>

          {/* Forget Password Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 px-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 bg-green-700 hover:bg-green-800 text-white font-semibold rounded-xl transition-colors"
            >
              {isSubmitting ? "Sending..." : "Forget Password"}
            </Button>
          </form>

          {/* Success/Error Message */}
          {message && (
            <div className="mt-4 text-center">
              <p className="text-sm text-green-600">{message}</p>
            </div>
          )}

          {/* Back to Login */}
          <div className="mt-6 text-center">
            <a href="/login/signin" className="text-sm text-gray-600 hover:text-gray-800">
              Back to Login
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
