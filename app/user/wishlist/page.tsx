import Image from "next/image"
import Button from "@/component/ui/button"
import { Bed, Bath } from "lucide-react"

interface PropertyCardProps {
  id: number
  title: string
  bedrooms: number
  bathrooms: number
  price: string
  image: string
}

const PropertyCard = ({ title, bedrooms, bathrooms, price, image }: PropertyCardProps) => {
  return (
    <div className="border border-gray-300 rounded-lg p-4 bg-white">
      <div className="flex gap-4">
        <div className="flex-shrink-0">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            width={120}
            height={90}
            className="rounded-lg object-cover"
          />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
          <div className="flex items-center gap-4 mb-2">
            <div className="flex items-center gap-1">
              <Bed className="w-4 h-4 text-gray-600" />
              <span className="text-sm text-gray-600">{bedrooms} Bedroom</span>
            </div>
            <div className="flex items-center gap-1">
              <Bath className="w-4 h-4 text-gray-600" />
              <span className="text-sm text-gray-600">{bathrooms} Bathroom</span>
            </div>
          </div>
          <div className="text-xl font-bold text-gray-900">{price}</div>
        </div>
      </div>
    </div>
  )
}

export default function Wishlist() {
  const properties: PropertyCardProps[] = [
    {
      id: 1,
      title: "Property Title",
      bedrooms: 2,
      bathrooms: 2,
      price: "1300$",
      image: "/images/property-house.png",
    },
    {
      id: 2,
      title: "Property Title",
      bedrooms: 2,
      bathrooms: 2,
      price: "1300$",
      image: "/images/property-house.png",
    },
    {
      id: 3,
      title: "Property Title",
      bedrooms: 2,
      bathrooms: 2,
      price: "1300$",
      image: "/images/property-house.png",
    },
    {
      id: 4,
      title: "Property Title",
      bedrooms: 2,
      bathrooms: 2,
      price: "1300$",
      image: "/images/property-house.png",
    },
    {
      id: 5,
      title: "Property Title",
      bedrooms: 2,
      bathrooms: 2,
      price: "1300$",
      image: "/images/property-house.png",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
          <Button variant="outline" className="rounded-full px-6">
            Add Property Wish
          </Button>
        </div>

        {/* Compare Property Button */}
        <div className="flex justify-end mb-6">
          <Button variant="outline" className="rounded-full px-6">
            Compare Property
          </Button>
        </div>

        {/* Property Cards */}
        <div className="space-y-4">
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              id={property.id}
              title={property.title}
              bedrooms={property.bedrooms}
              bathrooms={property.bathrooms}
              price={property.price}
              image={property.image}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
