"use client"

import { useState } from "react"
import { Search, ChevronDown, SlidersHorizontal } from "lucide-react"
import Button from "@/component/ui/button"
import { Input } from "@/component/ui/input"
import { Checkbox } from "@/component/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/component/ui/select"
import { useRouter } from "next/navigation"

export default function SearchBar() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [showPropertyTypeFilter, setShowPropertyTypeFilter] = useState(false)
  const [showLocationFilter, setShowLocationFilter] = useState(false)
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState<string[]>([])
  const [selectedLocations, setSelectedLocations] = useState<string[]>([])
  const [priceSort, setPriceSort] = useState("default")

  const propertyTypes = [
    { id: "house", label: "House" },
    { id: "condo", label: "Condo" },
    { id: "apartment", label: "Apartment" },
    { id: "borey", label: "Borey" },
    { id: "dorm", label: "Dorm" },
  ]

  const locations = {
    "Phnom Penh": ["Boeng Keng Kang", "Chamkar Mon", "Doun Penh", "Mean Chey"],
    "Siem Reap": ["Siem Reap City"],
    Sihanoukville: ["Sihanoukville City"],
    Kandal: ["Kandal City"],
  }

  const districts = [
    "Boeng Keng Kang",
    "Chamkar Mon",
    "Doun Penh",
    "Mean Chey",
    "Stueng Mean chey 1",
    "Stueng Mean chey 2",
    "Chak Angrae Kraom",
  ]

  const togglePropertyType = (propertyType: string) => {
    setSelectedPropertyTypes((prev) =>
      prev.includes(propertyType) ? prev.filter((type) => type !== propertyType) : [...prev, propertyType],
    )
  }

  const toggleLocation = (location: string) => {
    setSelectedLocations((prev) =>
      prev.includes(location) ? prev.filter((loc) => loc !== location) : [...prev, location],
    )
  }

  const handleSearch = () => {
    // Build search params
    const params = new URLSearchParams()

    if (searchQuery.trim()) {
      params.set("search", searchQuery.trim())
    }

    if (selectedPropertyTypes.length > 0) {
      params.set("types", selectedPropertyTypes.join(","))
    }

    if (selectedLocations.length > 0) {
      params.set("locations", selectedLocations.join(","))
    }

    if (priceSort !== "default") {
      params.set("sort", priceSort)
    }

    // Navigate to search results
    const searchUrl = `/user/properties${params.toString() ? `?${params.toString()}` : ""}`
    router.push(searchUrl)
  }

  const handleApplyPropertyFilter = () => {
    setShowPropertyTypeFilter(false)
    handleSearch()
  }

  const handleApplyLocationFilter = () => {
    setShowLocationFilter(false)
    handleSearch()
  }

  const handleCancelPropertyFilter = () => {
    setShowPropertyTypeFilter(false)
  }

  const handleCancelLocationFilter = () => {
    setShowLocationFilter(false)
  }

  const clearAllFilters = () => {
    setSearchQuery("")
    setSelectedPropertyTypes([])
    setSelectedLocations([])
    setPriceSort("default")
    setShowPropertyTypeFilter(false)
    setShowLocationFilter(false)
  }

  return (
    <div className="w-full max-w-6xl mx-auto relative">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <Input
            className="pl-10 pr-4 py-3 w-full border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="Search properties..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>

        {/* Filter Options */}
        <div className="flex border rounded-lg overflow-hidden">
          <Button
            variant="ghost"
            className="border-r px-4 py-3 flex items-center justify-center hover:bg-gray-50"
            onClick={clearAllFilters}
            title="Clear all filters"
          >
            <SlidersHorizontal size={20} />
          </Button>

          <Button
            variant="ghost"
            className={`border-r px-4 py-3 hover:bg-gray-50 ${showPropertyTypeFilter ? "bg-gray-100" : ""}`}
            onClick={() => {
              setShowPropertyTypeFilter(!showPropertyTypeFilter)
              setShowLocationFilter(false)
            }}
          >
            Property Type
            {selectedPropertyTypes.length > 0 && (
              <span className="ml-2 bg-green-600 text-white text-xs rounded-full px-2 py-1">
                {selectedPropertyTypes.length}
              </span>
            )}
            <ChevronDown className="ml-2" size={16} />
          </Button>

          <Button
            variant="ghost"
            className={`px-4 py-3 flex items-center justify-center hover:bg-gray-50 ${showLocationFilter ? "bg-gray-100" : ""}`}
            onClick={() => {
              setShowLocationFilter(!showLocationFilter)
              setShowPropertyTypeFilter(false)
            }}
          >
            Location
            {selectedLocations.length > 0 && (
              <span className="ml-2 bg-green-600 text-white text-xs rounded-full px-2 py-1">
                {selectedLocations.length}
              </span>
            )}
            <ChevronDown className="ml-2" size={16} />
          </Button>
        </div>

        {/* Price Sort Dropdown */}
        <Select value={priceSort} onValueChange={setPriceSort}>
          <SelectTrigger className="w-[180px] py-3">
            <SelectValue placeholder="Sort by Price" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">No sorting</SelectItem>
            <SelectItem value="low-to-high">Price: Low to High</SelectItem>
            <SelectItem value="high-to-low">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>

        {/* Search Button */}
        <Button onClick={handleSearch} className="bg-green-600 hover:bg-green-700 text-white px-6 py-3">
          Search
        </Button>
      </div>

      {/* Property Type Filter Modal */}
      {showPropertyTypeFilter && (
        <div className="absolute top-full mt-2 left-0 bg-white p-6 rounded-lg shadow-lg border z-50 w-full max-w-md">
          <h3 className="font-semibold mb-4 text-lg">Filter by Property Type</h3>
          <div className="space-y-3 mb-6">
            {propertyTypes.map((type) => (
              <div key={type.id} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-md">
                <Checkbox
                  id={type.id}
                  checked={selectedPropertyTypes.includes(type.id)}
                  onCheckedChange={() => togglePropertyType(type.id)}
                />
                <label htmlFor={type.id} className="text-sm font-medium leading-none cursor-pointer flex-1">
                  {type.label}
                </label>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mb-4">*You can choose multiple types</p>
          <div className="flex gap-3">
            <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white" onClick={handleApplyPropertyFilter}>
              Apply Filter
            </Button>
            <Button
              variant="outline"
              className="flex-1 border-green-600 text-green-600 hover:bg-green-50"
              onClick={handleCancelPropertyFilter}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Location Filter Modal */}
      {showLocationFilter && (
        <div className="absolute top-full mt-2 left-0 bg-white p-6 rounded-lg shadow-lg border z-50 w-full max-w-2xl">
          <h3 className="font-semibold mb-4 text-lg">Filter by Location</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Cities/Provinces */}
            <div>
              <h4 className="font-medium mb-3 text-gray-700">Cities/Provinces</h4>
              <div className="space-y-2">
                {Object.keys(locations).map((location) => (
                  <div key={location} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-md">
                    <Checkbox
                      id={`city-${location}`}
                      checked={selectedLocations.includes(location)}
                      onCheckedChange={() => toggleLocation(location)}
                    />
                    <label
                      htmlFor={`city-${location}`}
                      className="text-sm font-medium leading-none cursor-pointer flex-1"
                    >
                      {location}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Districts */}
            <div>
              <h4 className="font-medium mb-3 text-gray-700">Districts</h4>
              <div className="space-y-2">
                {districts.map((district) => (
                  <div key={district} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-md">
                    <Checkbox
                      id={`district-${district}`}
                      checked={selectedLocations.includes(district)}
                      onCheckedChange={() => toggleLocation(district)}
                    />
                    <label
                      htmlFor={`district-${district}`}
                      className="text-sm font-medium leading-none cursor-pointer flex-1"
                    >
                      {district}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p className="text-xs text-gray-500 mb-4">*You can choose multiple locations</p>
          <div className="flex justify-center gap-3">
            <Button className="w-32 bg-green-600 hover:bg-green-700 text-white" onClick={handleApplyLocationFilter}>
              Apply Filter
            </Button>
            <Button
              variant="outline"
              className="w-32 border-green-600 text-green-600 hover:bg-green-50"
              onClick={handleCancelLocationFilter}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
