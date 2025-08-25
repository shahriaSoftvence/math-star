// src/app/(app)/layout.tsx
"use client";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname() || "";
  const isPracticePage =
  pathname.includes("/addition") ||
  pathname.includes("/subtraction") ||
  pathname.includes("/multiplication") ||
  pathname.includes("/division") ||
  pathname.includes("/practice");

return (
  <ProtectedRoute>
    <div className="flex">
      {/* Sidebar hidden on practice pages */}
      {!isPracticePage && (
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      )}

      <div className={`flex-1 ${!isPracticePage ? "md:ml-64" : ""}`}>
        {/* Navbar hidden on practice pages */}
        {!isPracticePage && (
          <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        )}

        {/* Main content */}
        <main
          className={`mt-6 ${isPracticePage ? "w-full h-screen" : ""}`}
        >
          {children}
        </main>
      </div>
    </div>
  </ProtectedRoute>
);

}
