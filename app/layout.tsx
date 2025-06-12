import React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { SessionProvider } from "@/component/auth/session-provider";
import AuthProvider from "@/component/auth/auth-provider";
import LayoutWrapper from "./layoutWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "NestHub - Find Your Perfect Property",
  description: "Discover your dream property with NestHub, Cambodia's premier real estate platform.",
};

export default async function RootLayout({ children }) {
  let session = null;
  try {
    session = await getServerSession(authOptions);
  } catch (error) {
    console.error("Error fetching session in RootLayout:", error);
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <AuthProvider>
            <LayoutWrapper>{children}</LayoutWrapper>
          </AuthProvider>
        </SessionProvider>
      </body>
    </html>
  );
}