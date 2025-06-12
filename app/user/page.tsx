"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "@/component/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/component/ui/card";
import { LogOut, Home } from "lucide-react";
import { signOut } from "next-auth/react";

export default function UserPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

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

  if (!session) {
    return null;
  }

  const user = session.user;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-900">Welcome, {user.name || "User"}!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center space-x-4">
              {user.image ? (
                <Image
                  src={user.image}
                  alt="Profile picture"
                  width={80}
                  height={80}
                  className="rounded-full"
                  onError={(e) => {
                    e.currentTarget.src = "/images/fallback-profile.png";
                  }}
                />
              ) : (
                <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-gray-500 text-xl">{user.name?.[0] || "U"}</span>
                </div>
              )}
              <div>
                <p className="text-lg font-medium text-gray-900">{user.name}</p>
                <p className="text-sm text-gray-600">{user.email}</p>
                {user.provider && (
                  <p className="text-sm text-gray-500">Signed in via {user.provider}</p>
                )}
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Your Profile</h3>
              <p className="text-sm text-gray-600">Phone: {user.phoneNumber || "Not set"}</p>
              <p className="text-sm text-gray-600">Location: {user.location || "Not set"}</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Saved Properties</h3>
              <p className="text-sm text-gray-600">You haven't saved any properties yet.</p>
              <Link
                href="/properties"
                className="inline-block text-sm text-green-700 hover:text-green-800 font-medium"
              >
                Browse Properties
              </Link>
            </div>
            <div className="flex space-x-4">
              <Button
                onClick={() => router.push("/")}
                variant="outline"
                className="flex-1"
              >
                <Home className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
              <Button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}