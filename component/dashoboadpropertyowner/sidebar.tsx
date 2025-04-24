"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { LayoutDashboard, Home, Settings, LogOut, ChevronDown, ChevronRight, Menu, X } from "lucide-react"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function Sidebar({ children }: DashboardLayoutProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isPropertyMenuOpen, setIsPropertyMenuOpen] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [user, setUser] = useState<{ email: string } | null>(null)

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("user") || sessionStorage.getItem("user")

    if (storedUser) {
      setUser(JSON.parse(storedUser))
    } else {
      // Redirect to login if not logged in
      router.push("/login")
    }
  }, [router])

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const togglePropertyMenu = () => {
    setIsPropertyMenuOpen(!isPropertyMenuOpen)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const NavItem = ({
    href,
    icon,
    label,
    isActive,
    hasChildren = false,
    onClick,
  }: {
    href: string
    icon: React.ReactNode
    label: string
    isActive: boolean
    hasChildren?: boolean
    onClick?: () => void
  }) => (
    <Link
      href={href}
      onClick={onClick}
      className={`flex items-center px-4 py-3 rounded-md transition-colors ${
        isActive ? "bg-green-700 text-white" : "text-white hover:bg-green-700"
      }`}
    >
      <span className="mr-3">{icon}</span>
      {(isSidebarOpen || isMobileMenuOpen) && <span className="flex-1">{label}</span>}
      {hasChildren && (isSidebarOpen || isMobileMenuOpen) && (
        <button
          onClick={(e) => {
            e.preventDefault()
            onClick && onClick()
          }}
        >
          {isPropertyMenuOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </button>
      )}
    </Link>
  )

  // If user is not loaded yet, show loading
  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-800 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile menu button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-green-800 text-white p-2 rounded-md"
        onClick={toggleMobileMenu}
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`
          bg-green-800 text-white 
          ${isSidebarOpen ? "w-64" : "w-20"} 
          transition-all duration-300 ease-in-out
          fixed md:static inset-y-0 left-0 z-40
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <div className="p-4 flex items-center justify-center">
          <Image src="/logo.svg" alt="NestedHub Logo" width={isSidebarOpen ? 120 : 40} height={40} className="invert" />
        </div>

        <nav className="mt-8 px-2 space-y-1">
          <NavItem
            href="/dashboard"
            icon={<LayoutDashboard size={20} />}
            label="Dashboard"
            isActive={pathname === "/dashboard"}
          />

          <div className="space-y-1">
            <NavItem
              href="#"
              icon={<Home size={20} />}
              label="Property Listing"
              isActive={pathname.startsWith("/property")}
              hasChildren={true}
              onClick={togglePropertyMenu}
            />

            {isPropertyMenuOpen && (isSidebarOpen || isMobileMenuOpen) && (
              <div className="ml-8 space-y-1">
                <Link
                  href="/property/rents"
                  className={`block px-4 py-2 rounded-md transition-colors ${
                    pathname === "/property/rents" ? "bg-green-700 text-white" : "text-white hover:bg-green-700"
                  }`}
                >
                  Rents
                </Link>
              </div>
            )}
          </div>

          <NavItem href="/settings" icon={<Settings size={20} />} label="Setting" isActive={pathname === "/settings"} />

          <NavItem href="/logout" icon={<LogOut size={20} />} label="Log out" isActive={false} />
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm z-10">
          <div className="px-4 py-4 flex justify-between items-center">
            <button onClick={toggleSidebar} className="hidden md:block text-gray-500 hover:text-gray-700">
              <Menu size={24} />
            </button>

            <div className="flex items-center space-x-4">
              <button className="text-gray-500 hover:text-gray-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </button>

              <div className="flex items-center">
                <div className="mr-3 text-right hidden sm:block">
                  <div className="text-sm font-medium text-gray-700">Song Lyne</div>
                  <div className="text-xs text-gray-500">{user.email}</div>
                </div>
                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                  <Image src="/avatar-placeholder.png" alt="User Avatar" width={40} height={40} />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-auto bg-gray-50">{children}</main>
      </div>
    </div>
  )
}
