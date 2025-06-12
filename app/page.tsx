"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Image from "next/image"
import PropertySection from "@/component/property/propertySection"
import SearchBar from "@/component/user/searchBar"
import { getNewListings, getPropertiesByType } from "@/lib/mockData/properties"
import type { Property } from "@/lib/mockData/properties"
interface PropertyWithImage {
  id: string
  title: string
  type: string
  price: string
  location: string
  bedrooms: number
  bathrooms: number
  image: string
}

export default function HomePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [newListings, setNewListings] = useState<PropertyWithImage[]>([])
  const [apartments, setApartments] = useState<PropertyWithImage[]>([])
  const [condos, setCondos] = useState<PropertyWithImage[]>([])
  const [dorms, setDorms] = useState<PropertyWithImage[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [filters, setFilters] = useState({
    propertyTypes: [] as string[],
    locations: [] as string[],
    priceSort: "",
  })

  // Redirect authenticated users to /user
  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/user")
    }
  }, [status, router])

  // Helper function to convert Property to PropertyWithImage
  const mapPropertyToPropertyWithImage = (property: Property): PropertyWithImage => {
    let imageUrl = "/fallback-image.png"

    if (property.images && property.images.length > 0) {
      const primaryImage = property.images.find((img) => img.isPrimary)
      imageUrl = primaryImage?.url || property.images[0]?.url || imageUrl
    }

    if (!imageUrl || typeof imageUrl !== "string") {
      imageUrl = "/fallback-image.png"
    }

    return {
      id: property.id,
      title: property.title,
      type: property.type,
      price: property.price,
      location: property.location,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      image: imageUrl,
    }
  }

  useEffect(() => {
    // Only fetch data if user is not authenticated (to avoid unnecessary loading for guests)
    if (status === "unauthenticated") {
      const fetchProperties = async () => {
        setIsLoading(true)
        try {
          const newListingsData = await getNewListings(6)
          const apartmentsData = await getPropertiesByType("Apartment", 6)
          const condosData = await getPropertiesByType("Condo", 6)
          const dormsData = await getPropertiesByType("Dorm", 6)

          const filterProperties = (properties: Property[]) => {
            return properties
              .filter((p) => {
                // Filter by search query
                if (
                  searchQuery &&
                  !p.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
                  !p.location.toLowerCase().includes(searchQuery.toLowerCase())
                ) {
                  return false
                }

                // Filter by property types
                if (filters.propertyTypes.length > 0 && !filters.propertyTypes.includes(p.type.toLowerCase())) {
                  return false
                }

                // Filter by locations
                if (filters.locations.length > 0 && !filters.locations.includes(p.location)) {
                  return false
                }

                return true
              })
              .map(mapPropertyToPropertyWithImage)
              .sort((a, b) => {
                if (filters.priceSort === "low-to-high") {
                  return (
                    Number.parseFloat(a.price.replace(/[^0-9.-]+/g, "")) -
                    Number.parseFloat(b.price.replace(/[^0-9.-]+/g, ""))
                  )
                } else if (filters.priceSort === "high-to-low") {
                  return (
                    Number.parseFloat(b.price.replace(/[^0-9.-]+/g, "")) -
                    Number.parseFloat(a.price.replace(/[^0-9.-]+/g, ""))
                  )
                }
                return 0
              })
          }

          setNewListings(filterProperties(newListingsData))
          setApartments(filterProperties(apartmentsData))
          setCondos(filterProperties(condosData))
          setDorms(filterProperties(dormsData))
        } catch (error) {
          console.error("Error fetching properties:", error)
        } finally {
          setIsLoading(false)
        }
      }

      fetchProperties()
    }
  }, [searchQuery, filters, status])

  const handleFilterChange = (newFilters: {
    propertyTypes: string[]
    locations: string[]
    priceSort: string
  }) => {
    setFilters(newFilters)
  }

  // Show loading state while session is being checked
  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    )
  }

  // If user is authenticated, they will be redirected, so show loading
  if (status === "authenticated") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    )
  }

  // Guest homepage content
  return (
    <div className="w-full min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Search Bar Section */}
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} onFilterChange={handleFilterChange} />

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-6 md:mb-0 flex justify-self-center">
            <h1 className="text-4xl font-bold text-green-800 leading-tight">
              Let us help you
              <br />
              find the perfect
              <br />
              property today.
            </h1>
          </div>
          <div className="md:w-1/2">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Q9cJFIDOa8MQNzZkw3gti1nVkvmcon.png"
              alt="Modern Property"
              width={600}
              height={400}
              className="rounded-md"
              onError={(e) => {
                e.currentTarget.src = "/fallback-image.png"
              }}
            />
          </div>
        </div>
      </div>

      {/* Property Sections */}
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
      ) : (
        <div className="container mx-auto px-4 pb-8">
          {/* Show filtered results message if filters are active */}
          {(searchQuery || filters.propertyTypes.length > 0 || filters.locations.length > 0 || filters.priceSort) && (
            <div className="mb-6 p-4 bg-green-50 rounded-lg">
              <h2 className="text-lg font-semibold text-green-800 mb-2">Search Results</h2>
              <div className="text-sm text-green-700">
                {searchQuery && <span className="mr-2">Search: "{searchQuery}"</span>}
                {filters.propertyTypes.length > 0 && (
                  <span className="mr-2">Types: {filters.propertyTypes.join(", ")}</span>
                )}
                {filters.locations.length > 0 && (
                  <span className="mr-2">Locations: {filters.locations.join(", ")}</span>
                )}
                {filters.priceSort && (
                  <span>
                    Sorted by: {filters.priceSort === "low-to-high" ? "Price: Low to High" : "Price: High to Low"}
                  </span>
                )}
              </div>
            </div>
          )}

          <PropertySection title="New Listings" properties={newListings} viewAllLink="/login/signin" maxItems={3} />

          <PropertySection title="Apartments" properties={apartments} viewAllLink="/login/signin" maxItems={3} />

          <PropertySection title="Condos" properties={condos} viewAllLink="/login/signin" maxItems={3} />

          <PropertySection title="Dorms" properties={dorms} viewAllLink="/login/signin" maxItems={3} />
        </div>
      )}
    </div>
  )
}
