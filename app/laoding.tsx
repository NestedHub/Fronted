export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
      <div className="text-center">
        {/* Main Loading Spinner */}
        <div className="relative mb-8">
          <div className="w-20 h-20 border-4 border-gray-200 rounded-full animate-spin border-t-green-500 border-r-blue-500 border-b-purple-500 border-l-pink-500"></div>
          <div className="absolute inset-0 w-20 h-20 border-4 border-transparent rounded-full animate-ping border-t-green-300"></div>
        </div>

        {/* Loading Text */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Loading NestHub
          </h2>
          <p className="text-gray-600 animate-pulse">Finding your perfect property...</p>
        </div>

        {/* Animated Dots */}
        <div className="flex justify-center space-x-2 mb-8">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
          <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
          <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: "0.3s" }}></div>
        </div>

        {/* Progress Bar */}
        <div className="w-64 mx-auto">
          <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Property Icons Animation */}
        <div className="mt-8 flex justify-center space-x-4">
          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center animate-pulse">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
          </div>
          <div
            className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center animate-pulse"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="w-4 h-4 bg-blue-500 rounded"></div>
          </div>
          <div
            className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center animate-pulse"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="w-4 h-4 bg-purple-500 rounded"></div>
          </div>
          <div
            className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center animate-pulse"
            style={{ animationDelay: "0.6s" }}
          >
            <div className="w-4 h-4 bg-pink-500 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
