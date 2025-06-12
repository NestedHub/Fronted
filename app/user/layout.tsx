import type { ReactNode } from "react"
import type { Metadata } from "next"


export const metadata: Metadata = {
  title: {
    default: "User Dashboard | NestHub",
    template: "%s | User Dashboard | NestHub",
  },
  description: "Find and manage your perfect property with NestHub",
}

export default function UserLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* User-specific layout wrapper */}
      <div className="container-xl">{children}</div>
    </div>
  )
}
