"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

interface ComparisonData {
  attribute: string
  propertyA: string
  propertyB: string
}

interface PropertyComparisonProps {
  isOpen: boolean
  onClose: () => void
}

export function PropertyComparison({ isOpen, onClose }: PropertyComparisonProps) {
  if (!isOpen) return null

  const comparisonData: ComparisonData[] = [
    {
      attribute: "Title",
      propertyA: "3-Bedroom Apartment",
      propertyB: "4-Bedroom Villa",
    },
    {
      attribute: "Price",
      propertyA: "$300,000",
      propertyB: "$350,000",
    },
    {
      attribute: "Location",
      propertyA: "Phnom Penh, Chamkar Mon",
      propertyB: "Phnom Penh, Mean Chey",
    },
    {
      attribute: "Bedrooms",
      propertyA: "3",
      propertyB: "4",
    },
    {
      attribute: "Bathrooms",
      propertyA: "2",
      propertyB: "3",
    },
    {
      attribute: "Land Area",
      propertyA: "500 sqm",
      propertyB: "600 sqm",
    },
    {
      attribute: "Floor Area",
      propertyA: "200 sqm",
      propertyB: "250 sqm",
    },
    {
      attribute: "Status",
      propertyA: "Available",
      propertyB: "Sold",
    },
    {
      attribute: "Features",
      propertyA: "Pool, Parking",
      propertyB: "Garden, Gym",
    },
    {
      attribute: "Availability",
      propertyA: "2023-11-01",
      propertyB: "2024-03-01",
    },
    {
      attribute: "Purpose",
      propertyA: "Rent",
      propertyB: "Rent",
    },
    {
      attribute: "Category",
      propertyA: "Apartment",
      propertyB: "Villa",
    },
  ]

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-auto">
      <div className="max-w-6xl mx-auto p-6">
        {/* Back Button */}
        <Button onClick={onClose} className="mb-8 bg-green-700 hover:bg-green-800 text-white rounded-full px-6 py-2">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        {/* Comparison Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-6 py-4 text-left font-semibold text-gray-700 w-1/3">Attribute</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700 w-1/3">Property A</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700 w-1/3">Property B</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="px-6 py-4 font-medium text-gray-700 border-b border-gray-200">{row.attribute}</td>
                    <td className="px-6 py-4 text-gray-600 border-b border-gray-200">{row.propertyA}</td>
                    <td className="px-6 py-4 text-gray-600 border-b border-gray-200">{row.propertyB}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
