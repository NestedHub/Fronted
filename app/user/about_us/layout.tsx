import { ReactNode } from "react";

export const metadata = {
  title: "Find Your Perfect Property | NestHub",
  description: "Explore properties with NestHub, your trusted partner in real estate.",
};

export default function UserLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow pt-16">
        {/* Offset for header */}
        {children}
      </main>
    </div>
  );
}