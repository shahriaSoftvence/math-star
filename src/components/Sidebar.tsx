// src/components/Sidebar.tsx
'use client'; // <-- Required for using hooks

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // <-- Import the hook
import { LayoutDashboard, User, Settings, LogOut, CreditCard } from 'lucide-react';
import Logo from '../../public/assets/Logo.png';
import Image from 'next/image';

export default function Sidebar() {
  const pathname = usePathname(); // <-- Get the current path

  const menuItems = [
    { name: "Dashboard", href: "/", icon: <LayoutDashboard size={24} /> },
    { name: "Profile", href: "/profile", icon: <User size={24} /> },
    { name: "Setting", href: "/settings", icon: <Settings size={24} /> },
    { name: "Subscription", href: "/subscription", icon: <CreditCard size={24} /> },
  ];

  return (
    <aside className="w-64 min-h-screen bg-white rounded-r-[30px] border-r flex flex-col justify-between p-6">
      <div>
        <div className="mb-16">
          <Link href="/">
            <Image src={Logo} alt='Logo' />
          </Link>
        </div>
        <nav>
          <ul>
            {menuItems.map((item) => {
              const isActive = pathname === item.href; // <-- Check if the link is active
              return (
                <li key={item.name} className="mb-2">
                  <Link 
                    href={item.href} 
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors duration-200 ${
                      isActive 
                        ? 'bg-[#4A80F0] text-white' 
                        : 'text-gray-500 hover:bg-gray-100'
                    }`}
                  >
                    {React.cloneElement(item.icon, { color: isActive ? 'white' : 'currentColor' })}
                    <span className="text-lg font-medium">{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
      <div>
        <a href="#" className="flex items-center gap-3 px-4 py-3 text-zinc-600 hover:bg-gray-100 rounded-xl">
          <LogOut size={24} />
          <span className="text-base font-medium">Logout</span>
        </a>
      </div>
    </aside>
  );
}