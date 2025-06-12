"use client"

import Image from "next/image"
import { useState } from "react"
import { Bed, Bath, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Property {
  id: number
  title: string
  bedrooms: number
  bathrooms: number
  price: number
  image: string
  selected: boolean
}

export default function Wishlist() {
  const [properties, setProperties] = useState<Property[]>([
    {
      id: 1,
      title: "Property Title",
      bedrooms: 2,
      bathrooms: 2,
      price: 1300,
      image: "/images/property-house.png",
      selected: true,
    },
    {
      id: 2,
      title: "Property Title",
      bedrooms: 2,
      bathrooms: 2,
      price: 1300,
      image: "/images/property-house.png",
      selected: true,
    },
    {
      id: 3,
      title: "Property Title",
      bedrooms: 2,
      bathrooms: 2,
      price: 1300,
      image: "/images/property-house.png",
      selected: false,
    },
    {
      id: 4,
      title: "Property Title",
      bedrooms: 2,
      bathrooms: 2,
      price: 1300,
      image: "/images/property-house.png",
      selected: false,
    },
    {
      id: 5,
      title: "Property Title",
      bedrooms: 2,
      bathrooms: 2,
      price: 1300,
      image: "/images/property-house.png",
      selected: false,
    },
  ])

  const togglePropertySelection = (id: number) => {
    setProperties(
      properties.map((property) => (property.id === id ? { ...property, selected: !property.selected } : property)),
    )
  }

  const selectedCount = properties.filter((property) => property.selected).length

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
          <Button variant="outline" className="border-gray-300 text-gray-700">
            Add Property Wish
          </Button>
        </div>

        {/* Action buttons */}
        <div className="flex justify-between items-center mb-6">
          <Button variant="outline" className="border-gray-300 text-gray-700">
            Cancel
          </Button>
          <Button variant="outline" className="border-gray-300 text-gray-700">
            Compare Property
          </Button>
        </div>

        {/* Property List */}
        <div className="space-y-4">
          {properties.map((property) => (
            <div key={property.id} className="border border-gray-200 rounded-lg p-4 bg-white flex items-center">
              <div className="flex-shrink-0 mr-4">
                <Image
                  src={property.image || "/placeholder.svg"}
                  alt={property.title}
                  width={120}
                  height={80}
                  className="rounded-md"
                />
              </div>
              <div className="flex-grow">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{property.title}</h3>
                <div className="flex items-center text-gray-600 mb-2">
                  <div className="flex items-center mr-4">
                    <Bed className="h-4 w-4 mr-1" />
                    <span>{property.bedrooms} Bedroom</span>
                  </div>
                  <div className="flex items-center">
                    <Bath className="h-4 w-4 mr-1" />
                    <span>{property.bathrooms} Bathroom</span>
                  </div>
                </div>
                <p className="text-lg font-semibold">{property.price}$</p>
              </div>
              <div className="flex-shrink-0 cursor-pointer" onClick={() => togglePropertySelection(property.id)}>
                {property.selected ? (
                  <div className="h-6 w-6 bg-green-600 rounded flex items-center justify-center">
                    <Check className="h-5 w-5 text-white" />
                  </div>
                ) : (
                  <div className="h-6 w-6 border border-gray-300 rounded bg-gray-100"></div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Compare button */}
        <div className="flex justify-end mt-6">
          <Button variant="outline" className="border-gray-300 text-gray-700" disabled={selectedCount < 2}>
            Compare
          </Button>
        </div>
      </div>
    </div>
  )
}
