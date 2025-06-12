import type { ReactNode } from "react";

export const metadata = {
  title: "NestHub | FAQ - Find Answers to Your Property Questions",
  description: "Get answers to frequently asked questions about renting, buying, and selling properties with NestHub.",
  keywords: "FAQ, property questions, real estate help, NestHub support, rental questions",
  openGraph: {
    title: "NestHub FAQ - Property Questions Answered",
    description: "Get answers to frequently asked questions about renting, buying, and selling properties with NestHub.",
    type: "website",
  },
};

export default function FAQLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-gray-100 py-6 px-4 sm:px-px sm6 lgpx:-px-lg lg8">
      {children}
    </div>
  );
};