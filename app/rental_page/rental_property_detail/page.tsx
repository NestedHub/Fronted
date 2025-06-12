import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Share2, Bed, Bath, Square, Star, MapPin } from "lucide-react"

export default function PropertyDetail() {
  const facilities = ["Swimming Pool", "Parking", "Garden", "Security", "Gym", "Playground"]

  const forRentTags = ["Furnished", "Pet Friendly", "Near MRT", "Shopping mall"]

  const reviews = [
    {
      id: 1,
      name: "John Doe",
      rating: 5,
      date: "2 days ago",
      comment:
        "Great place with amazing amenities. The location is perfect and the property is well-maintained. Highly recommend for families looking for a comfortable living space.",
    },
    {
      id: 2,
      name: "Jane Smith",
      rating: 4,
      date: "1 week ago",
      comment:
        "Nice property with good facilities. The swimming pool and gym are great additions. Only minor issue is parking can be tight during peak hours.",
    },
    {
      id: 3,
      name: "Mike Johnson",
      rating: 5,
      date: "2 weeks ago",
      comment:
        "Excellent location and beautiful property. The management is very responsive and helpful. Would definitely recommend to anyone looking in this area.",
    },
  ]

  const relatedProperties = [
    {
      id: 1,
      title: "Luxury Apartment in Downtown",
      price: "$250",
      location: "Location: toul kork, Phnom Penh",
      image: "/images/property-main.png",
    },
    {
      id: 2,
      title: "Luxury Apartment in Downtown",
      price: "$280",
      location: "Location: toul kork, Phnom Penh",
      image: "/images/property-main.png",
    },
    {
      id: 3,
      title: "Luxury Apartment in Downtown",
      price: "$320",
      location: "Location: toul kork, Phnom Penh",
      image: "/images/property-main.png",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto p-4">
        {/* Property Images */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="relative">
            <Image
              src="/images/property-main.png"
              alt="Property main view"
              width={400}
              height={300}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
          <div className="relative">
            <Image
              src="/images/property-main.png"
              alt="Property side view"
              width={400}
              height={300}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
        </div>

        {/* Property Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Luxury Apartment in Downtown</h1>
            <p className="text-xl font-semibold text-green-600 mb-1">Price: $300/Month</p>
            <p className="text-gray-600 flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              Location: toul kork, Phnom Penh, Cambodia
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <Heart className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Property Features */}
        <div className="flex gap-6 mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2">
            <Bed className="w-5 h-5 text-gray-600" />
            <span className="text-gray-700">3 Bedrooms</span>
          </div>
          <div className="flex items-center gap-2">
            <Bath className="w-5 h-5 text-gray-600" />
            <span className="text-gray-700">2 Bathrooms</span>
          </div>
          <div className="flex items-center gap-2">
            <Square className="w-5 h-5 text-gray-600" />
            <span className="text-gray-700">Floor Area: 120 m²</span>
          </div>
        </div>

        {/* Description */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Description</h2>
          <p className="text-gray-700 leading-relaxed">
            Discover your new home in this stunning 3-bedroom modern condo for rent. This rental is a negotiable, making
            it a fantastic opportunity for those seeking luxury living. The property is fully furnished, ensuring a
            convenient lifestyle.
          </p>
          <p className="text-gray-700 leading-relaxed mt-3">
            Featuring 3 bedrooms and 2 bathrooms, it's perfect for a small family or professionals looking for extra
            space. The open-plan living area is ideal for entertaining, while the modern kitchen is fully equipped with
            all appliances and modern amenities.
          </p>
        </div>

        {/* Property Overview */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Property Overview</h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600">Property Type:</span>
              <span className="font-medium">House</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600">Property ID:</span>
              <span className="font-medium">12345</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600">Land Area:</span>
              <span className="font-medium">200 m²</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600">Updated:</span>
              <span className="font-medium">January 2024</span>
            </div>
          </div>
        </div>

        {/* Facilities */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Facilities</h2>
          <div className="flex flex-wrap gap-2">
            {facilities.map((facility, index) => (
              <Badge key={index} variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-200">
                {facility}
              </Badge>
            ))}
          </div>
        </div>

        {/* For Rent */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">For Rent</h2>
          <div className="flex flex-wrap gap-2">
            {forRentTags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Nearby Places */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Nearby Places</h2>
          <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Map showing Phnom Penh location</p>
              <p className="text-sm text-gray-400">Interactive map would be displayed here</p>
            </div>
          </div>
        </div>

        {/* Rating and Reviews */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Rating and Review</h2>
          <div className="space-y-4">
            {reviews.map((review) => (
              <Card key={review.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">{review.name}</h4>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                        <span className="text-sm text-gray-500 ml-1">{review.date}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm">{review.comment}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Related Houses */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Related House</h2>
            <Button variant="link" className="text-blue-600">
              View all
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {relatedProperties.map((property) => (
              <Card key={property.id} className="overflow-hidden">
                <div className="relative">
                  <Image
                    src={property.image || "/placeholder.svg"}
                    alt={property.title}
                    width={300}
                    height={200}
                    className="w-full h-40 object-cover"
                  />
                  <Badge className="absolute top-2 left-2 bg-green-600">{property.price}</Badge>
                </div>
                <CardContent className="p-3">
                  <h3 className="font-medium text-sm mb-1">{property.title}</h3>
                  <p className="text-xs text-gray-600">{property.location}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
