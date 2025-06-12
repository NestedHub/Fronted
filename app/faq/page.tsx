import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/component/ui/accordion"

const faqData = [
  {
    id: "what-is-nesthub",
    question: "What is NestHub?",
    answer:
      "NestHub is a leading real estate platform based in Phnom Penh, Cambodia, designed to simplify property transactions worldwide. Whether you're looking to rent a cozy apartment, buy a dream home, or sell a property, our user-friendly platform connects you with verified listings and trusted partners to make the process seamless and secure.",
  },
  {
    id: "create-account",
    question: "How do I create an account on NestHub?",
    answer:
      'To create an account, click the "Sign Up" button in the top right corner of our homepage. Fill in your details, verify your email, and start browsing properties instantly. You can also sign up using Google or Facebook for a faster experience.',
  },
  {
    id: "pricing",
    question: "Is NestHub free to use?",
    answer:
      "Browsing properties and creating an account on NestHub is completely free. Listing a property may involve a small fee, and we offer premium features like featured listings or advanced analytics for sellers at affordable rates. Check our pricing page for details.",
  },
  {
    id: "quality-assurance",
    question: "How does NestHub ensure the quality of rental listings?",
    answer:
      "We vet all listings to ensure they meet our quality standards. Our team verifies property details, photos, and ownership information. Additionally, user reviews and ratings help maintain transparency, so you can rent with confidence.",
  },
  {
    id: "property-viewing",
    question: "Can I schedule a property viewing through NestHub?",
    answer:
      'Yes! Click the "Contact" button on a listing to arrange a viewing directly with property owners or agents at a time that suits you.',
  },
  {
    id: "property-types",
    question: "What types of properties can I find on NestHub?",
    answer:
      "NestHub offers a wide range of properties, including apartments, villas, condos, and commercial spaces for sale or rent. Whether you're looking for a budget-friendly studio or a luxury penthouse, we have options to suit every need and budget.",
  },
  {
    id: "list-property",
    question: "How can I list my property for rent on NestHub?",
    answer:
      'To list your property, sign in to your NestHub account and click "List Your Property" from the dashboard. Upload photos, add details like price and location, and submit for review. Our team will verify your listing, and it will go live within 24-48 hours.',
  },
  {
    id: "international-support",
    question: "Does NestHub support international users?",
    answer:
      "While we're based in Cambodia, NestHub serves users globally. Our platform supports multiple languages and currencies, and our listings span various countries, making it easy for international buyers and renters to find properties.",
  },
]

export default function FAQPage() {
  return (
    <div className="py-2">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to know about renting, buying, and selling with NestHub
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <Accordion type="single" collapsible className="w-full">
            {faqData.map((faq, index) => (
              <AccordionItem key={faq.id} value={faq.id} className="border-b border-gray-200 last:border-b-0">
                <AccordionTrigger className="px-6 py-4 text-left hover:bg-gray-50 transition-colors">
                  <div className="text-lg font-semibold text-gray-900 pr-4">{faq.question}</div>
                </AccordionTrigger>
                <AccordionContent className="px-6 py-3">
                  <div className="text-gray-600 leading-relaxed text-base">{faq.answer}</div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Contact Section */}
        <div className="mt-12 text-center bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="text-2xl font-semibold text-gray-900 mb-4">Still have questions?</div>
          <div className="text-gray-600 mb-6 text-lg">
            Our support team is here to help you with any additional questions you might have.
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <p
              href="/contact"
              className="inline-flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700">
              aria-label="Contact NestHub support">
              Contact Support
            </p>
            <p
              href="/mailto"
              className="inline-flex items-center justify-center px-4 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Email Us
            </p>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
href="/user/properties" className="block p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md">
            <div className="font-semibold text-gray-900 mb-2">
              Browse Properties
            </div>
            <p className="text-gray-600 text-sm">Find your perfect home from our verified listings</p>
          </div>
            <div>
href="/user/list-property" className="block p-4 bg-blue-200 rounded-lg shadow-sm border-gray-200 hover:shadow-md">
            <div className="font-semibold text-gray-900 mb-2">List Your Property</div>
            <p className="text-gray-600 text-sm">Start earning by renting out your property</p>
          </div>
          <p
            href="/about_us/about"
            className="block p-4 bg-white rounded-lg shadow-sm border-gray-200 hover:shadow-md">
              About NestHub
            <div className="font-semibold text-gray-900 mb-2">
              Learn more about our mission and vision
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}