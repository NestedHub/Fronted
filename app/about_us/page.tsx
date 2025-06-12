import Image from "next/image";
import { Globe, Monitor, Handshake, Building2 } from "lucide-react";

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
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <Image
                src="/images/luxury-house.png"
                alt="Luxury house with pool at night"
                width={400}
                height={300}
                className="rounded-lg shadow-lg w-full h-auto object-cover"
                placeholder="blur"
                blurDataURL="/images/luxury-house-placeholder.png"
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

        {/* Why Choose NestHub Section */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-12">
            Why Choose NestHub?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Global Reach, Local Expertise */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
              <div className="flex justify-center mb-4">
                <Globe className="w-12 h-12 text-gray-600" aria-hidden="true" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
                Global Reach, Local Expertise
              </h3>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                While we cater to an international audience, our roots and understanding of the Cambodian market set us
                apart. We offer expertise that bridges global standards with local insights, benefiting both domestic and
                international clients.
              </p>
            </div>

            {/* User-Centric Design */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
              <div className="flex justify-center mb-4">
                <Monitor className="w-12 h-12 text-gray-600" aria-hidden="true" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">User-Centric Design</h3>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                Our platform prioritizes ease of use, allowing users to filter searches, schedule property viewings, and
                access detailed property information with just a few clicks.
              </p>
            </div>

            {/* Security and Trust */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
              <div className="flex justify-center mb-4">
                <Handshake className="w-12 h-12 text-gray-600" aria-hidden="true" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Security and Trust</h3>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                We vet and verify our property listings to ensure a safe and reliable experience, promoting trust
                between buyers, sellers, and renters.
              </p>
            </div>

            {/* Comprehensive Listings */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
              <div className="flex justify-center mb-4">
                <Building2 className="w-12 h-12 text-gray-600" aria-hidden="true" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Comprehensive Listings</h3>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
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