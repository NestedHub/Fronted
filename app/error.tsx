"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Button from "@/component/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/component/ui/card"
import { AlertCircle } from "lucide-react"

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter()

  useEffect(() => {
    console.error("Global error:", error)
    if (error.name === "ChunkLoadError") {
      console.log("ChunkLoadError detected, attempting to reload")
      window.location.reload()
    }
  }, [error])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-md w-full shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
            <AlertCircle className="h-8 w-8 text-red-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">Something Went Wrong</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-center">
          <p className="text-gray-600 text-sm leading-relaxed">
            {error.name === "ChunkLoadError"
              ? "Failed to load a required resource. Please try refreshing the page."
              : "An unexpected error occurred. Please try again."}
          </p>
          <div className="space-y-3">
            <Button
              onClick={() => reset()}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
            >
              Try Again
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push("/")}
              className="w-full"
            >
              Back to Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}