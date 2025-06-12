"use client"

import Link from "next/link"
import Image from "next/image"
import { ChevronDown, Heart, Menu, User, LogOut } from "lucide-react"
import { useState, useEffect } from "react"
import { useSession, signOut } from "next-auth/react"
import { useWishlist } from "@/lib/hooks/usewishlist"
import { useRouter } from "next/navigation"

interface HeaderProps {
  userType?: string
}

export default function HeaderUser({ userType = "user" }: HeaderProps) {
  const [isLanguageOpen, setIsLanguageOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState<"en" | "km">("en")
  const { data: session, status } = useSession()
  const { wishlist } = useWishlist()
  const router = useRouter()

  // Local storage user state
  const [localUser, setLocalUser] = useState<{ email: string; name?: string } | null>(null)

  // Check for local storage user
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user") || sessionStorage.getItem("user")
      if (storedUser) {
        try {
          setLocalUser(JSON.parse(storedUser))
        } catch (error) {
          console.error("Error parsing stored user:", error)
        }
      }
    }
  }, [])

  // Language options and translations
  const languages = [
    { code: "en", name: "English", flag: "/english.png" },
    { code: "km", name: "ខ្មែរ", flag: "/khmer.png" },
  ]

  const translations = {
    en: {
      home: "Home",
      rent: "Rent",
      about: "About us",
      faq: "FAQ",
      signIn: "Sign In",
      profile: "Profile",
      account: "Account",
      logOut: "Log Out",
    },
    km: {
      home: "ទំព័រដើម",
      rent: "ជួល",
      about: "អំពីយើង",
      faq: "សំណួរចម្លើយ",
      signIn: "ចូល",
      profile: "ប្រវត្តិរូប",
      account: "គណនី",
      logOut: "ចាកចេញ",
    },
  }

  const currentLang = languages.find((lang) => lang.code === currentLanguage) || languages[0]

  // Handle language selection
  const handleLanguageSelect = (languageCode: string) => {
    setCurrentLanguage(languageCode as "en" | "km")
    setIsLanguageOpen(false)
  }

  // Enhanced logout function
  const handleLogout = async () => {
    try {
      // Clear local storage
      localStorage.removeItem("user")
      sessionStorage.removeItem("user")

      // Sign out from NextAuth if authenticated
      if (status === "authenticated") {
        await signOut({ redirect: false })
      }

      // Update local state
      setLocalUser(null)

      // Redirect to home page
      router.push("/")

      // Force page refresh to ensure clean state
      setTimeout(() => {
        window.location.href = "/"
      }, 100)
    } catch (error) {
      console.error("Logout error:", error)
      // Fallback: force redirect
      window.location.href = "/"
    }
  }

  // Handle restricted actions for guests
  const handleRestrictedAction = (path: string) => {
    const isAuthenticated = status === "authenticated" || localUser
    if (isAuthenticated) {
      router.push(path)
    } else {
      router.push("/login/signin")
    }
  }

  // Get current user info
  const currentUser = session?.user || localUser
  const userDisplayName = currentUser?.name || currentUser?.email || "User"

  return (
    <header className="bg-green-800 text-white shadow-sm fixed top-0 left-0 right-0 z-20">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center mr-4" aria-label="NestHub Home">
            <Image
              src="/logowhite.png"
              alt="NestHub Logo"
              width={80}
              height={40}
              onError={(e) => {
                e.currentTarget.src = "/fallback-logo.png"
              }}
              priority
              className="object-fill"
            />
          </Link>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex flex-1 justify-center items-center space-x-6">
            <Link
              href="/user"
              className="text-white hover:text-gray-200 text-base transition-colors"
              aria-label={translations[currentLanguage].home}
            >
              {translations[currentLanguage].home}
            </Link>
            <Link
              href="/user/rental_page"
              className="text-white hover:text-gray-200 text-base transition-colors"
              aria-label={translations[currentLanguage].rent}
            >
              {translations[currentLanguage].rent}
            </Link>
            <Link
              href="/user/about_us"
              className="text-white hover:text-gray-200 text-base transition-colors"
              aria-label={translations[currentLanguage].about}
            >
              {translations[currentLanguage].about}
            </Link>
            <Link
              href="/user/faq"
              className="text-white hover:text-gray-200 text-base transition-colors"
              aria-label={translations[currentLanguage].faq}
            >
              {translations[currentLanguage].faq}
            </Link>
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-4 ml-auto">
            {/* Language Selector */}
            <div className="relative">
              <button
                className="flex items-center space-x-1 text-sm hover:text-gray-200 transition-colors"
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                aria-expanded={isLanguageOpen}
                aria-label="Select Language"
              >
                <Image
                  src={currentLang.flag || "/placeholder.svg"}
                  alt={currentLang.name}
                  width={20}
                  height={15}
                  className="h-4 w-6 object-cover rounded-sm"
                  onError={(e) => {
                    e.currentTarget.src = "/fallback-flag.png"
                  }}
                />
                <span className="hidden sm:inline font-medium">{currentLang.name}</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              {isLanguageOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-white rounded-md shadow-lg z-30">
                  <div className="py-1">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left transition-colors"
                        onClick={() => handleLanguageSelect(lang.code)}
                        aria-label={`Select ${lang.name}`}
                      >
                        <Image
                          src={lang.flag || "/placeholder.svg"}
                          alt={lang.name}
                          width={20}
                          height={15}
                          className="h-4 w-6 object-cover mr-2 rounded-sm"
                          onError={(e) => {
                            e.currentTarget.src = "/fallback-flag.png"
                          }}
                        />
                        {lang.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Wishlist */}
            <button
              onClick={() => handleRestrictedAction("/user/wishlist")}
              className="text-white hover:text-gray-200 relative transition-colors"
              aria-label={`Wishlist with ${wishlist.length} items`}
            >
              <Heart className="h-5 w-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* User Profile */}
            <div className="relative">
              <button
                className="flex items-center space-x-1 hover:text-gray-200 transition-colors"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                aria-label={`User menu for ${userDisplayName}`}
              >
                <div className="bg-white rounded-full p-0.5">
                  {session?.user?.image ? (
                    <Image
                      src={session.user.image || "/placeholder.svg"}
                      alt={session.user.name || "User profile"}
                      width={20}
                      height={20}
                      className="h-5 w-5 rounded-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "/fallback-user.png"
                      }}
                    />
                  ) : (
                    <User className="h-5 w-5 text-green-800" />
                  )}
                </div>
                <span className="hidden sm:inline text-sm font-medium max-w-32 truncate">{userDisplayName}</span>
                <ChevronDown className="h-4 w-4" />
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-30">
                  <div className="py-1">
                    <Link
                      href="/user/account"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      onClick={() => setIsUserMenuOpen(false)}
                      aria-label={translations[currentLanguage].account}
                    >
                      <User className="h-4 w-4 mr-2 inline" />
                      {translations[currentLanguage].account}
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left transition-colors"
                      aria-label={translations[currentLanguage].logOut}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      {translations[currentLanguage].logOut}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white hover:text-gray-200 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Mobile Menu"
              aria-expanded={isMobileMenuOpen}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-3 flex flex-col space-y-2 pb-3 border-t border-green-700 pt-3">
            <Link
              href="/user"
              className="text-white hover:text-gray-200 text-base transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label={translations[currentLanguage].home}
            >
              {translations[currentLanguage].home}
            </Link>
            <Link
              href="/user/rental_page"
              className="text-white hover:text-gray-200 text-base transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label={translations[currentLanguage].rent}
            >
              {translations[currentLanguage].rent}
            </Link>
            <Link
              href="/user/about_us"
              className="text-white hover:text-gray-200 text-base transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label={translations[currentLanguage].about}
            >
              {translations[currentLanguage].about}
            </Link>
            <Link
              href="/user/faq"
              className="text-white hover:text-gray-200 text-base transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label={translations[currentLanguage].faq}
            >
              {translations[currentLanguage].faq}
            </Link>
            <Link
              href="/user/account"
              className="text-white hover:text-gray-200 text-base transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label={translations[currentLanguage].account}
            >
              {translations[currentLanguage].account}
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
