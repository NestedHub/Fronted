"use client";

import type React from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Star } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface PropertyCardProps {
  property?: {
    id?: string;
    title?: string;
    type?: string;
    price?: string;
    location?: string;
    bedrooms?: number;
    bathrooms?: number;
    image?: string;
  };
}


export default function PropertyCard({ property }: PropertyCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const router = useRouter();
  if (!property || !property.id) {
  console.warn("Invalid or missing property data:", property);
  return null; // Or render a fallback UI
}


  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const handleClick = () => {
    const user = localStorage.getItem("user");
    if (user) {
      router.push(`/booking-page?id=${property.id}`); // Dynamic booking route
    } else {
      router.push("/propertyowner/signin");
    }
  };

  return (
    <Link href={`/user/property/${property.id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.03] hover:shadow-lg">
        <div className="relative">
          <Image
            src={property.image || "/property.png"}
            alt={property.title}
            width={500} // Increased width for larger size
            height={300} // Increased height for larger size
            className="w-full h-64 object-cover" // Adjusted height to 64 (was 48)
          />
          <button
            onClick={toggleWishlist}
            className="absolute top-3 right-3 p-3 bg-white/80 rounded-full shadow-md hover:bg-white transition-colors"
          >
            <Heart
              className={`h-6 w-6 ${isWishlisted ? "fill-red-500 text-red-500" : "text-gray-400"}`}
            />
          </button>
          <div className="absolute bottom-3 left-3 flex items-center bg-white/90 px-3 py-1.5 rounded-md shadow-sm">
            <Star className="h-5 w-5 text-yellow-400 fill-yellow-400 mr-1.5" />
            <span className="text-base font-medium">4.8</span>
          </div>
        </div>
        <div className="p-6"> {/* Increased padding from p-4 */}
          <h3 className="text-xl font-semibold text-gray-800 mb-2 truncate">{property.title}</h3>
          <p className="text-gray-500 text-base mb-2">{property.location}</p>
          <div className="flex justify-between items-center mb-4">
            <span className="text-green-600 text-lg font-bold">{property.price}</span>
            <span className="text-gray-500 text-base">{property.type}</span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex space-x-4 text-gray-500 text-base">
              <span>{property.bedrooms} Beds</span>
              <span>{property.bathrooms} Baths</span>
            </div>
            <button
              className="px-4 py-2 bg-green-600 text-white text-base rounded-md hover:bg-green-700 transition-colors"
              onClick={handleClick}
            >
              Book
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}