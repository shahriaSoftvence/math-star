// src/app/(app)/layout.tsx
'use client';

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useState } from 'react';
import { usePathname } from 'next/navigation';

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = {
    name: "Emma",
    avatarUrl: "https://i.pravatar.cc/58?u=emma",
    stars: 1250,
    starStreak: "1 month Star",
  };

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname() || '';
  const isPracticePage = pathname.includes('/addition') || pathname.includes('/subtraction') || pathname.includes('/multiplication') || pathname.includes('/division') || pathname.includes('/practice');

  return (
    <div className="flex">
      {!isPracticePage && <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />}
      <div className={`flex-1 ${!isPracticePage ? 'md:ml-64' : ''}`}>
        {!isPracticePage && <Navbar user={user} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />}
        <main className="mt-6">{children}</main>
      </div>
    </div>
  );
}