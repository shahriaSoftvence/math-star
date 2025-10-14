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
    pathname.includes("/dashboard/addition") ||
    pathname.includes("/dashboard/subtraction") ||
    pathname.includes("/dashboard/multiplication") ||
    pathname.includes("/dashboard/division") ||
    pathname.includes("/practice");

  return (
    <ProtectedRoute>
      <div className="flex bg-gradient-to-b from-[#F8F7FA] to-blue-50 min-h-screen">
        {!isPracticePage && (
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        )}
        <div className={`flex-1 ${!isPracticePage ? "xl:ml-64" : ""}`}>
          {!isPracticePage && (
            <Navbar 
              toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
            />
          )}
          <main className={`${isPracticePage ? "w-full h-screen" : ""}`}>
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}