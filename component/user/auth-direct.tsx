"use client"

import { useSession } from "next-auth/react"
import { useRouter, usePathname } from "next/navigation"
import { useEffect } from "react"

export default function AuthRedirect() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (status === "loading") return // Still loading

    // If user is authenticated and on root or login pages, redirect to /user
    if (session && (pathname === "/" || pathname.startsWith("/login") || pathname.startsWith("/propertyowner"))) {
      router.replace("/user")
      return
    }

    // If user is not authenticated and trying to access user routes, redirect to login
    if (!session && pathname.startsWith("/user")) {
      router.replace("/login/signin")
      return
    }
  }, [session, status, pathname, router])

  return null // This component doesn't render anything
}
