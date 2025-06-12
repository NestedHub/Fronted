import { ReactNode } from "react";

export const metadata = {
  title: "NestHub | FAQ - Find Answers to Your Property Questions",
  description: "Get answers to frequently asked questions about renting, buying, and selling properties with NestHub.",
};

export default function UserLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow pt-20">{children}</main>
    </div>
  );
}