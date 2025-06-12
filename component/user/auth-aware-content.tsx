"use client"

import type React from "react"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

interface AuthAwareContentProps {
  children: React.ReactNode
  requireAuth?: boolean
  redirectTo?: string
}

export default function AuthAwareContent({
  children,
  requireAuth = false,
  redirectTo = "/login/signin",
}: AuthAwareContentProps) {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (requireAuth && status === "unauthenticated") {
      router.push(redirectTo)
    }
  }, [status, requireAuth, redirectTo, router])

  // Show loading state
  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    )
  }

  // If auth is required but user is not authenticated, show nothing (redirect will happen)
  if (requireAuth && status === "unauthenticated") {
    return null
  }

  return <>{children}</>
}
