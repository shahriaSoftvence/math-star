// src/app/(app)/layout.tsx
'use client';

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useState } from 'react';
import { usePathname } from 'next/navigation';

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname() || '';
  const isPracticePage = pathname.includes('/addition') || pathname.includes('/subtraction') || pathname.includes('/multiplication') || pathname.includes('/division') || pathname.includes('/practice');

  return (
    <ProtectedRoute>
      <div className="flex">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="flex-1 md:ml-64">
          <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
          <main className="mt-6">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  );
}