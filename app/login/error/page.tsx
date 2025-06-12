"use client"

import { useRouter, useSearchParams } from "next/navigation"
import Button from "@/component/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/component/ui/card"
import { AlertCircle, Home, RefreshCw } from "lucide-react"

export default function ErrorPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const error = searchParams.get("error")

  const getErrorMessage = (errorType: string | null) => {
    switch (errorType) {
      case "AccessDenied":
        return "Access denied. You don't have permission to access this resource."
      case "Configuration":
        return "There is a problem with the server configuration."
      case "Verification":
        return "The verification token has expired or is invalid."
      case "NoEmail":
        return "No email address was provided by the authentication provider."
      case "UserCreationFailed":
        return "Failed to create a new user account. Please try again later."
      case "SignInFailed":
        return "An error occurred during sign-in. Please try again."
      default:
        return errorType ? `Authentication error: ${decodeURIComponent(errorType)}` : "An unknown error occurred."
    }
  }

  const getErrorTitle = (errorType: string | null) => {
    switch (errorType) {
      case "AccessDenied":
        return "Access Denied"
      case "Configuration":
        return "Configuration Error"
      case "Verification":
        return "Verification Failed"
      case "NoEmail":
        return "Missing Email"
      case "UserCreationFailed":
        return "User Creation Failed"
      case "SignInFailed":
        return "Sign-In Error"
      default:
        return "Authentication Error"
    }
  }

  const homeUrl = process.env.NODE_ENV === "development" ? "http://localhost:3000/" : "/"

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100">
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">{getErrorTitle(error)}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <p className="text-gray-600 text-sm leading-relaxed">{getErrorMessage(error)}</p>
            </div>
            <div className="space-y-3">
              <Button
                onClick={() => router.push("/login/signin")}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
              <Button
                variant="outline"
                onClick={() => router.push(homeUrl)}
                className="w-full"
              >
                <Home className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </div>
            <div className="border-t pt-4">
              <p className="text-center text-xs text-gray-500">
                If this problem persists, please{" "}
                <button
                  onClick={() => router.push("/contact")}
                  className="text-green-600 hover:text-green-700 underline"
                >
                  contact support
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
        {process.env.NODE_ENV === "development" && error && (
          <Card className="mt-4 border-yellow-200 bg-yellow-50">
            <CardContent className="p-4">
              <h3 className="text-sm font-medium leading-relaxed mb-2 text-yellow-800">Debug Information</h3>
              <p className="text-xs font-mono bg-yellow-100 p-2 rounded text-yellow-700">Error Code: {error}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}