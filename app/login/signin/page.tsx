"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { signIn } from "next-auth/react"
import { Eye, EyeOff, Phone, Home } from "lucide-react"
import Button from "@/component/ui/button"
import { Input } from "@/component/ui/input"
import { Checkbox } from "@/component/ui/checkbox"

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/user/"

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)
    try {
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      })
      if (result?.error) {
        setError("Invalid email or password. Please try again.")
        setIsLoading(false)
        return
      }
      router.push(callbackUrl)
    } catch (err) {
      console.error("Credentials login error:", err)
      setError("An unexpected error occurred. Please try again.")
      setIsLoading(false)
    }
  }

  const handleOtpLogin = () => {
    router.push("/login/otp")
  }

  const handleGoogleLogin = async () => {
    setIsLoading(true)
    try {
      const result = await signIn("google", { callbackUrl, redirect: false })
      if (result?.error) {
        setError("Failed to sign in with Google. Please try again.")
        setIsLoading(false)
        return
      }
      router.push(callbackUrl)
    } catch (error) {
      console.error("Google login error:", error)
      setError("Failed to sign in with Google. Please try again.")
      setIsLoading(false)
    }
  }

  // Clear error when input changes
  useEffect(() => {
    setError(null)
  }, [formData.email, formData.password])

  return (
    <div className="min-h-screen flex">
      <div className="hidden md:flex md:flex-1 bg-green-700 relative flex-col justify-between p-8 text-white">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-white rounded flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-green-700">
              <path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z" />
            </svg>
          </div>
          <span className="font-bold text-lg">NESTHUB</span>
        </div>
        <div className="flex-1 flex items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-8">
              Let us help you find the perfect property today.
            </h1>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="relative w-80 h-60">
            <Image
              src="/images/signin-house-3d.png"
              alt="Modern house 3D render"
              fill
              className="object-contain"
              onError={(e) => {
                e.currentTarget.src = "/images/fallback-house.png"
              }}
            />
          </div>
        </div>
      </div>
      <div className="flex-1 bg-white flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-md">
          <div className="md:hidden flex justify-center mb-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-green-700 rounded flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-white">
                  <path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z" />
                </svg>
              </div>
              <span className="font-bold text-lg text-green-700">NESTHUB</span>
            </div>
          </div>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
            <p className="text-sm text-gray-600">Login to your account</p>
          </div>
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">{error}</div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
                disabled={isLoading}
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
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                disabled={isLoading}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="rememberMe"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, rememberMe: checked === true }))}
                  disabled={isLoading}
                />
                <label htmlFor="rememberMe" className="text-sm text-gray-600">
                  Remember me
                </label>
              </div>
              <Link href="/login/forgetPassword" className="text-sm text-red-500 hover:text-red-600">
                Recover Password
              </Link>
            </div>
            <Button
              type="submit"
              variant="outline"
              className="w-full h-12 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Log In"}
            </Button>
          </form>
          <div className="my-6 text-center">
            <span className="text-sm text-gray-500">Or continue with</span>
          </div>
          <Button
            variant="outline"
            className="w-full h-12 mt-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-3"
            onClick={handleOtpLogin}
            disabled={isLoading}
          >
            <Phone size={20} />
            <span>Login with Phone Number</span>
          </Button>
          <Button
            variant="outline"
            className="w-full h-12 mt-4 border border-gray-300 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors"
            onClick={handleGoogleLogin}
            disabled={isLoading}
          >
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.20-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
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
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.60 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span className="text-gray-700">Sign in with Google</span>
          </Button>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link href="/login/signup" className="text-green-700 hover:text-green-800 font-medium">
                Sign up!
              </Link>
            </p>
          </div>
          <div className="mt-4 text-center">
            <Link href="/" className="inline-flex items-center text-sm text-green-700 hover:text-green-800 font-medium">
              <Home size={16} className="mr-1" />
              Back to home page
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}