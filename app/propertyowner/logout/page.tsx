"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function LogoutPage() {
  const router = useRouter()

  useEffect(() => {
    // Clear user data from storage
    localStorage.removeItem("user")
    sessionStorage.removeItem("user")

    // Redirect to login page
    router.push("/login")
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4">Logging out...</h1>
        <p className="text-gray-500">You are being redirected to the login page.</p>
      </div>
    </div>
  )
}
