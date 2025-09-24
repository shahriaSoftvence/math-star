"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useIsPremium } from "../Redux/hooks";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function PremiumService({ children }: ProtectedRouteProps) {
  const isPremium = useIsPremium();
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated
    if (!isPremium) {
      // Redirect to signin page if not authenticated
      router.push("/dashboard/subscription");
    }
  }, [isPremium, router]);

  // Show loading state while checking authentication
  if (!isPremium) {
    return (
      <div className="min-h-screen bg-[#F8F7FA] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Checking Subscription...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
