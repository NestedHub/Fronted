"use client"

import { usePathname } from "next/navigation"
import DynamicHeader from "@/component/user/dynamicHeader"
import Footer from "@/component/user/footer"

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const showLayout = !pathname.startsWith("/about_us")

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {showLayout && (
        <header className="sticky top-0 z-50 bg-white shadow-sm">
          <DynamicHeader />
        </header>
      )}
      <main className="flex-1 pt-4">{children}</main>
      {showLayout && <Footer />}
    </div>
  )
}