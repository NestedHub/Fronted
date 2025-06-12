"use client"

import Link from "next/link"
import Image from "next/image"
import { ChevronDown, Heart, Menu, User } from "lucide-react"
import { useState } from "react"
import { useWishlist } from "@/lib/hooks/usewishlist"
import { useRouter } from "next/navigation"

interface HeaderProps {
  userType?: string
}

export default function Header({ userType = "user" }: HeaderProps) {
  const [isLanguageOpen, setIsLanguageOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState<"en" | "km">("en")
  const { wishlist } = useWishlist()
  const router = useRouter()

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
    },
    km: {
      home: "ទំព័រដើម",
      rent: "ជួល",
      about: "អំពីយើង",
      faq: "សំណួរចម្លើយ",
      signIn: "ចូល",
    },
  }

  const currentLang = languages.find((lang) => lang.code === currentLanguage) || languages[0]

  // Handle language selection
  const handleLanguageSelect = (languageCode: string) => {
    setCurrentLanguage(languageCode as "en" | "km")
    setIsLanguageOpen(false)
  }

  // Handle restricted actions for guests
  const handleRestrictedAction = (path: string) => {
    router.push("/login/signin")
  }

  return (
    <header className="bg-green-800 text-white shadow-md fixed top-0 left-0 right-0 z-20">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
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
            />
          </Link>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className="text-white hover:text-gray-200 transition-colors"
              aria-label={translations[currentLanguage].home}
            >
              {translations[currentLanguage].home}
            </Link>
            <Link
              href="/rent"
              className="text-white hover:text-gray-200 transition-colors"
              aria-label={translations[currentLanguage].rent}
            >
              {translations[currentLanguage].rent}
            </Link>
            <Link
              href="/about"
              className="text-white hover:text-gray-200 transition-colors"
              aria-label={translations[currentLanguage].about}
            >
              {translations[currentLanguage].about}
            </Link>
            <Link
              href="/faq"
              className="text-white hover:text-gray-200 transition-colors"
              aria-label={translations[currentLanguage].faq}
            >
              {translations[currentLanguage].faq}
            </Link>
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
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
                <div className="absolute right-0 mt-2 w-36 bg-white rounded-md shadow-lg z-20">
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
              onClick={() => handleRestrictedAction("/wishlist")}
              className="text-white hover:text-gray-200 relative transition-colors"
              aria-label="Wishlist - Sign in required"
            >
              <Heart className="h-5 w-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Sign In Button */}
            <Link
              href="/login/signin"
              className="flex items-center space-x-1 hover:text-gray-200 transition-colors"
              aria-label={translations[currentLanguage].signIn}
            >
              <div className="bg-white rounded-full p-1">
                <User className="h-5 w-5 text-green-800" />
              </div>
              <span className="hidden sm:inline text-sm font-medium">{translations[currentLanguage].signIn}</span>
            </Link>

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
          <nav className="md:hidden mt-4 flex flex-col space-y-2 pb-4 border-t border-green-700 pt-3">
            <Link
              href="/"
              className="text-white hover:text-gray-200 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label={translations[currentLanguage].home}
            >
              {translations[currentLanguage].home}
            </Link>
            <Link
              href="/rent"
              className="text-white hover:text-gray-200 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label={translations[currentLanguage].rent}
            >
              {translations[currentLanguage].rent}
            </Link>
            <Link
              href="/about"
              className="text-white hover:text-gray-200 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label={translations[currentLanguage].about}
            >
              {translations[currentLanguage].about}
            </Link>
            <Link
              href="/faq"
              className="text-white hover:text-gray-200 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label={translations[currentLanguage].faq}
            >
              {translations[currentLanguage].faq}
            </Link>
            <Link
              href="/login/signin"
              className="text-white hover:text-gray-200 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label={translations[currentLanguage].signIn}
            >
              {translations[currentLanguage].signIn}
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
