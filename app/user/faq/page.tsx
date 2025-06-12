export default function FAQ() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto mt-4">
        {/* Main Header */}
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-8 text-center lg:text-left tracking-tight">
          FAQ - Frequently Asked Questions
        </h1>

        {/* Subheader */}
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-12 text-center lg:text-left">
          Everything you need to know about renting, buying, and selling with NestHub
        </h2>

        {/* FAQ Items */}
        <div className="space-y-10">
          {/* FAQ Item 1 */}
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
              Q: What is NestHub?
            </h3>
            <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
              <span className="font-semibold">A:</span> NestHub is a leading real estate platform based in Phnom Penh,
              Cambodia, designed to simplify property transactions worldwide. Whether you're looking to rent a cozy
              apartment, buy a dream home, or sell a property, our user-friendly platform connects you with verified
              listings and trusted partners to make the process seamless and secure.
            </p>
          </div>

          {/* FAQ Item 2 */}
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
              Q: How do I create an account on NestHub?
            </h3>
            <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
              <span className="font-semibold">A:</span> To create an account, click the "Sign Up" button in the top
              right corner of our homepage. Fill in your details, verify your email, and start browsing properties
              instantly. You can also sign up using Google or Facebook for a faster experience.
            </p>
          </div>

          {/* FAQ Item 3 */}
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
              Q: Is NestHub free to use?
            </h3>
            <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
              <span className="font-semibold">A:</span> Browsing properties and creating an account on NestHub is
              completely free. Listing a property may involve a small fee, and we offer premium features like featured
              listings or advanced analytics for sellers at affordable rates. Check our pricing page for details.
            </p>
          </div>

          {/* FAQ Item 4 */}
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
              Q: How does NestHub ensure the quality of rental listings?
            </h3>
            <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
              <span className="font-semibold">A:</span> We vet all listings to ensure they meet our quality standards.
              Our team verifies property details, photos, and ownership information. Additionally, user reviews and
              ratings help maintain transparency, so you can rent with confidence.
            </p>
          </div>

          {/* FAQ Item 5 */}
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
              Q: Can I schedule a property viewing through NestHub?
            </h3>
            <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
              <span className="font-semibold">A:</span> Yes! Our platform allows you to schedule virtual or in-person
              viewings directly with property owners or agents. Simply click the "Contact" button on a listing to
              arrange a viewing at a time that suits you.
            </p>
          </div>

          {/* FAQ Item 6 */}
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
              Q: What types of properties can I find on NestHub?
            </h3>
            <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
              <span className="font-semibold">A:</span> NestHub offers a wide range of properties, including apartments,
              villas, condos, commercial spaces, and land for sale or rent. Whether you're looking for a budget-friendly
              studio or a luxury penthouse, we have options to suit every need and budget.
            </p>
          </div>

          {/* FAQ Item 7 */}
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
              Q: How can I list my property for rent on NestHub?
            </h3>
            <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
              <span className="font-semibold">A:</span> To list your property, sign in to your NestHub account and
              click "List Your Property" from the dashboard. Upload photos, add details like price and location, and
              submit for review. Our team will verify your listing, and it will go live within 24-48 hours.
            </p>
          </div>

          {/* FAQ Item 8 */}
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
              Q: Does NestHub support international users?
            </h3>
            <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
              <span className="font-semibold">A:</span> Absolutely! While we’re based in Cambodia, NestHub serves users
              globally. Our platform supports multiple languages and currencies, and our listings span various
              countries, making it easy for international buyers and renters to find properties.
            </p>
          </div>
        </div>

        {/* Bottom separator line */}
        <hr className="border-gray-300 mt-12 max-w-3xl mx-auto" />

        {/* Contact Prompt */}
        <div className="mt-12 text-center">
          <p className="text-gray-700 text-base sm:text-lg">
            Still have questions?{" "}
            <a
              href="/contact"
              className="text-blue-600 hover:text-blue-800 font-semibold"
              aria-label="Contact NestHub support"
            >
              Contact our support team
            </a>{" "}
            for personalized assistance.
          </p>
        </div>
      </div>
    </div>
  );
}