"use client"

import { useSession } from "next-auth/react"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import Header from "./header"
import HeaderUser from "./headerUser"

interface DynamicHeaderProps {
  userType?: string
}

export default function DynamicHeader({ userType = "user" }: DynamicHeaderProps) {
  const { data: session, status } = useSession()
  const pathname = usePathname()
  const [isLocalUser, setIsLocalUser] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Check for local storage authentication
  useEffect(() => {
    const checkLocalAuth = () => {
      if (typeof window !== "undefined") {
        const storedUser = localStorage.getItem("user") || sessionStorage.getItem("user")
        setIsLocalUser(!!storedUser)
      }
      setIsLoading(false)
    }

    // Only check local auth if NextAuth is not loading and no session
    if (status !== "loading") {
      checkLocalAuth()
    }
  }, [status])

  // Listen for storage changes (for logout events)
  useEffect(() => {
    const handleStorageChange = () => {
      const storedUser = localStorage.getItem("user") || sessionStorage.getItem("user")
      setIsLocalUser(!!storedUser)
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  // Show minimal loading state
  if (status === "loading" || isLoading) {
    return (
      <header className="bg-green-800 text-white shadow-md fixed top-0 left-0 right-0 z-20">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="w-20 h-10 bg-green-700 rounded animate-pulse"></div>
            <div className="flex space-x-4">
              <div className="w-16 h-6 bg-green-700 rounded animate-pulse"></div>
              <div className="w-8 h-8 bg-green-700 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </header>
    )
  }

  // Determine if user is authenticated (either NextAuth or local storage)
  const isAuthenticated = status === "authenticated" || isLocalUser
  const isUserRoute = pathname.startsWith("/user")

  // Show user header for authenticated users
  if (isAuthenticated || isUserRoute) {
    return <HeaderUser userType={userType} />
  }

  // Show guest header for unauthenticated users
  return <Header userType={userType} />
}
