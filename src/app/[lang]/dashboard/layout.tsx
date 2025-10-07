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
  
  // Extract language from pathname (e.g., /en/dashboard -> 'en', /de/dashboard -> 'de')
  const getLanguageFromPathname = () => {
    const segments = pathname.split('/').filter(segment => segment !== '');
    
    // Check if the first segment is a language code
    if (segments.length > 0 && (segments[0] === 'en' || segments[0] === 'de')) {
      return segments[0];
    }
    
    return 'de'; // Default to German if no language found
  };

  const language = getLanguageFromPathname();
  
  const isPracticePage =
    pathname.includes("/dashboard/addition") ||
    pathname.includes("/dashboard/subtraction") ||
    pathname.includes("/dashboard/multiplication") ||
    pathname.includes("/dashboard/division") ||
    pathname.includes("/practice");

  return (
    <ProtectedRoute>
      <div className="flex">
        {!isPracticePage && (
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        )}
        <div className={`flex-1 ${!isPracticePage ? "xl:ml-64" : ""}`}>
          {!isPracticePage && (
            <Navbar 
              toggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
              lang={language} 
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