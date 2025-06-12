"use client"

import type React from "react"

import { useEffect } from "react"
import { useSession } from "next-auth/react"
import Cookies from "js-cookie"

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession()

  useEffect(() => {
    // Check for localStorage/sessionStorage authentication
    const checkLocalAuth = () => {
      const storedUser = localStorage.getItem("user") || sessionStorage.getItem("user")

      if (storedUser) {
        // Set a cookie to indicate authentication for server components
        Cookies.set("nesthub_auth", "true", { expires: 7, sameSite: "strict" })
      } else {
        // Remove the cookie if no local storage auth
        Cookies.remove("nesthub_auth")
      }
    }

    // Check on mount and when session changes
    checkLocalAuth()

    // Listen for storage events (for logout across tabs)
    const handleStorageChange = () => {
      checkLocalAuth()
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [session])

  return <>{children}</>
}
