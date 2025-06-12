"use client";

import { useSession } from "next-auth/react";
import { Card, CardHeader, CardTitle, CardContent } from "@/component/ui/card";
import Button from "@/component/ui/button";
import { Home } from "lucide-react";
import Link from "next/link";

export default function AccountPage() {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-3xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-900">Account Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Account Information</h3>
            <p className="text-sm text-gray-600">Name: {user?.name || "Not set"}</p>
            <p className="text-sm text-gray-600">Email: {user?.email || "Not set"}</p>
          </div>
          <div>
            <Link
              href="/user"
              className="inline-block text-sm text-green-700 hover:text-green-800 font-medium"
            >
              Back to Dashboard
            </Link>
          </div>
          <Button
            onClick={() => (window.location.href = "/")}
            variant="outline"
            className="w-full"
          >
            <Home className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}