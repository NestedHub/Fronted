import Image from "next/image";
import { Globe, Monitor, FileText, Shield } from "lucide-react";
import luxuryHouse from '@/public/images/luxury_house.jpg'; // Adjust path if needed
export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 mt-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center sm:text-left">
            About NestHub
          </h1>
          <hr className="border-gray-300 mb-8" />

          {/* Introduction Text */}
          <div className="space-y-6 text-gray-700 leading-relaxed text-base sm:text-lg">
            <p>
              Welcome to NestHub, your trusted partner in connecting people to their ideal homes, no matter where they
              are in the world. Nestled in the vibrant heart of Phnom Penh, Cambodia, and proudly operated by a
              dedicated team based at The Royal University of Phnom Penh, NestHub stands as a beacon for seamless real
              estate transactions. Our platform was created with a singular goal: to make buying, selling, and renting
              homes easier, more secure, and more accessible for everyone.
            </p>
            <p>
              At NestHub, we believe that finding the right home shouldn&apos;t be stressful—it should be an exciting
              venture, full of possibilities. Whether you&apos;re searching for a cozy apartment, a spacious villa, or a
              commercial property, our diverse listings cater to a variety of needs and budgets. We&apos;ve designed our
              platform to empower users with intuitive tools, ensuring a smooth experience from browsing to finalizing a
              deal.
            </p>
          </div>
        </div>

        {/* Our Mission Section */}
        <div className="mb-16">
          <div className="grid md:grid-cols-2 gap-14 items-center">
            <div className="order-2 md:order-1">
              <Image
                  src={luxuryHouse}
                  alt="Luxury house with pool at night"
                  width={400}
                  height={300}
                  className="rounded-lg shadow-lg w-full h-auto object-cover"
                />

            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
                Our mission is to bridge the gap between homeowners, buyers, and renters through technology-driven
                solutions that simplify the real estate process. We strive to be more than just a marketplace; we aim to
                be a trusted advisor that supports informed decisions, fosters connections, and facilitates success in
                property transactions.
              </p>
            </div>
          </div>
        </div>
        <hr className="border-gray-300 mb-8" />

        {/* Why Choose NestHub Section */}
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-16">Why Choose NESTHUB ?</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-14 max-w-7xl mx-auto">
            {/* Global Reach, Local Expertise */}
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <Globe className="w-16 h-16 text-gray-700" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Global Reach, Local Expertise</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                While we cater to an international audience, our roots and understanding of the Cambodian market set us
                apart. We offer expert insights and a localized approach that benefits both domestic and international
                clients.
              </p>
            </div>

            {/* User-Centric Design */}
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <Monitor className="w-16 h-16 text-gray-700" strokeWidth={1.5} />
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">User-Centric Design</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                Our platform prioritizes ease of use, allowing users to filter searches, schedule property viewings, and
                access detailed property information with just a few clicks.
              </p>
            </div>

            {/* Security and Trust */}
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="w-16 h-16 flex items-center justify-center">
                    {/* Handshake base */}
                    <svg className="w-12 h-12 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                      />
                    </svg>
                  </div>
                  {/* Shield overlay */}
                  <div className="absolute -top-1 -right-1">
                    <Shield className="w-6 h-6 text-green-600 fill-green-100" strokeWidth={2} />
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Security and Trust</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                We vet and verify our property listings to ensure a safe and reliable experience, promoting trust between
                buyers, sellers, and renters.
              </p>
            </div>

            {/* Comprehensive Listings */}
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <FileText className="w-16 h-16 text-gray-700" strokeWidth={1.5} />
                  <div className="absolute bottom-0 right-0 transform translate-x-1 translate-y-1">
                    <div className="w-6 h-6 bg-gray-200 rounded flex items-center justify-center">
                      <div className="w-3 h-3 border-2 border-gray-600 rounded-sm bg-white"></div>
                    </div>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Comprehensive Listings</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                From luxury homes to budget-friendly rentals, we provide a vast range of properties tailored to diverse
                preferences.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}