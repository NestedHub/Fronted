import Sidebar from "@/component/dashoboadpropertyowner/sidebar"

export default function RentsPage() {
  return (
    <Sidebar>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Property Rents</h1>
          <p className="text-sm text-gray-500">Manage your rental properties</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-500">No rental properties found. Add your first property to get started.</p>
        </div>
      </div>
    </Sidebar>
  )
}
