import Image from "next/image";
import Button from "@/component/ui/button";
import { Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import PropertyCard from "@/component/property/propertyCard"; // Adjust path to match your structure

interface PropertyCardProps {
  id: number;
  title: string;
  price: string;
  location: string;
  image: string;
  rating?: string;
  isFavorite?: boolean;
}

async function getPropertiesByType(type: string, limit: number): Promise<PropertyCardProps[]> {
  return [
    {
      id: 1,
      title: "Cozy Downtown Apartment",
      price: "$1,200/mo",
      location: "123 Main St, Phnom Penh",
      image: "/apartment1.jpg",
      rating: "4.5",
      isFavorite: false,
    },
    {
      id: 2,
      title: "Modern Loft",
      price: "$1,500/mo",
      location: "456 Oak Ave, Siem Reap",
      image: "/apartment2.jpg",
      rating: "4.8",
      isFavorite: true,
    },
    {
      id: 3,
      title: "Spacious Studio",
      price: "$900/mo",
      location: "789 Pine Rd, Battambang",
      image: "/apartment3.jpg",
      rating: "4.2",
      isFavorite: false,
    },
    {
      id: 4,
      title: "Luxury Condo",
      price: "$2,000/mo",
      location: "321 Elm St, Sihanoukville",
      image: "/apartment4.jpg",
      rating: "4.9",
      isFavorite: false,
    },
    {
      id: 5,
      title: "Urban Apartment",
      price: "$1,100/mo",
      location: "654 Maple Dr, Kampot",
      image: "/apartment5.jpg",
      rating: "4.3",
      isFavorite: true,
    },
    {
      id: 6,
      title: "City View Suite",
      price: "$1,300/mo",
      location: "987 Cedar Ln, Kandal",
      image: "/apartment6.jpg",
      rating: "4.6",
      isFavorite: false,
    },
  ].filter((p) => p.location.includes(type) || type === "Apartment").slice(0, limit);
}

const PropertyRow = ({
  properties,
  rowIndex,
}: {
  properties: PropertyCardProps[];
  rowIndex: number;
}) => {
  return (
    <div className="relative mb-12">
      <button
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-10 p-3 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow disabled:opacity-50"
        aria-label="Previous properties"
        disabled={rowIndex === 0}
      >
        <ChevronLeft className="w-6 h-6 text-gray-600" />
      </button>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {properties.map((property) => (
          <PropertyCard
            key={property.id}
            id={property.id}
            title={property.title}
            price={property.price}
            location={property.location}
            image={property.image}
            rating={property.rating}
            isFavorite={property.isFavorite}
          />
        ))}
      </div>
      <button
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-10 p-3 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow disabled:opacity-50"
        aria-label="Next properties"
        disabled={rowIndex === properties.length - 1}
      >
        <ChevronRight className="w-6 h-6 text-gray-600" />
      </button>
    </div>
  );
};

export default async function RentalPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/propertyowner/signin?callbackUrl=/user/rent_page");
  }

  const rentals = await getPropertiesByType("Apartment", 8); // Increased limit to 8 for 4x2 layout

  const propertyRows: PropertyCardProps[][] = [];
  for (let i = 0; i < rentals.length; i += 4) {
    propertyRows.push(rentals.slice(i, i + 4));
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {propertyRows.length > 0 ? (
          propertyRows.map((properties, index) => (
            <PropertyRow key={index} properties={properties} rowIndex={index} />
          ))
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-600 text-lg">No properties found.</p>
          </div>
        )}
      </div>
    </div>
  );
}