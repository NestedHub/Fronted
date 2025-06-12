"use client";

import type { ReactNode } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AccountLayout({ children }: { children: ReactNode }) {
  const { status } = useSession();
  const router = useRouter();

  // Protect route: redirect unauthenticated users to sign-in
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login/signin");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">{children}</div>
    </div>
  );
}