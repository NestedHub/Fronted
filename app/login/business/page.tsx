"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import Button from "@/component/ui/button"
import { Input } from "@/component/ui/input"
import { Upload } from "lucide-react"

export default function JoinBusinessPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    telegramLink: "",
  })
  const [idCardImage, setIdCardImage] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIdCardImage(e.target.files[0])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
    console.log("ID Card Image:", idCardImage)
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
            <Image src="/images/join-business-house.png" alt="Modern house 3D render" fill className="object-contain" />
          </div>
        </div>
      </div>

      {/* Right Side - Join Business Form */}
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

          {/* Join Business Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
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
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <Input
                type="text"
                name="telegramLink"
                placeholder="Telegram Link"
                value={formData.telegramLink}
                onChange={handleInputChange}
                className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* ID Card Upload */}
            <div>
              <input
                type="file"
                id="idCardImage"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="w-full h-12 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2"
              >
                <Upload size={18} />
                <span>{idCardImage ? idCardImage.name : "Upload ID card image"}</span>
              </Button>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-green-700 hover:bg-green-800 text-white font-semibold rounded-lg transition-colors mt-4"
            >
              Summit
            </Button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <a href="/login/signin" className="text-green-700 hover:text-green-800 font-medium">
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
