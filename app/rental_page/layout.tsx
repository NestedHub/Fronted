import { ReactNode } from "react";
import HeaderUser from "@/component/user/headerUser";
import Footer from "@/component/user/footer";
import SearchBar from "@/component/user/searchBar";

export const metadata = {
  title: "Find Your Perfect Property",
  description: "Explore properties with NestHub",
};

export default function UserLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <HeaderUser />
      <main className="flex-grow pt-16"> {/* Increased padding to clear fixed header */}
        <div className="container mx-auto px-4">
          <SearchBar />
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}