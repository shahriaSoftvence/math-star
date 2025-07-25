// src/app/(app)/layout.tsx
'use client';

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useState } from 'react';

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

  return (
    <div className="flex">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex-1 md:ml-64">
        <Navbar user={user} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="mt-6">{children}</main>
      </div>
    </div>
  );
}