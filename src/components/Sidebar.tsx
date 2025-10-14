// src/components/Sidebar.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, User, Settings, CreditCard, PanelRightOpen, Activity } from 'lucide-react';
import Logo from '../../public/assets/Logo.png';
import Image from 'next/image';
import { useDictionary } from '@/hook/useDictionary';
import ordinal from "ordinal";
import { useGetProfileQuery } from '@/Redux/features/auth/authApi';
interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export default function Sidebar({ sidebarOpen, setSidebarOpen }: SidebarProps) {
  const pathname = usePathname();
  const { data: profileData } = useGetProfileQuery();
  const { dictionary, loading } = useDictionary();
  const sidebar = dictionary?.sidebar;

  if (!sidebar || loading) {
    return null;
  }

  const menuItems = [
    { name: sidebar.dashboard, href: "/dashboard", icon: <LayoutDashboard size={24} /> },
    { name: sidebar.profile, href: "/dashboard/profile", icon: <User size={24} /> },
    { name: sidebar.settings, href: "/dashboard/settings", icon: <Settings size={24} /> },
    { name: sidebar.subscription, href: "/dashboard/subscription", icon: <CreditCard size={24} /> },
  ];

  return (
    <aside
  className={`fixed inset-y-0 left-0 z-50 w-[256px] bg-white rounded-r-[30px] border-r flex flex-col justify-between p-6 transform 
    ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
    xl:translate-x-0 transition-transform duration-300 ease-in-out`}
>
  {/* Top part: Logo + Menu */}
  <div>
    <div className="mb-16 flex justify-between items-center">
      <Link href="/">
        <Image className='w-36 xl:w-40 h-auto' src={Logo} alt='Logo' />
      </Link>
      <button onClick={() => setSidebarOpen(false)} className="xl:hidden cursor-pointer">
        <PanelRightOpen className='text-gray-700 hover:text-gray-500' size={24} />
      </button>
    </div>

    <nav className='flex flex-col'>
      <ul className="flex-1 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <li onClick={() => setSidebarOpen(false)} key={item.name} className="mb-2">
              <Link
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors duration-200 ${isActive
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

  {/* Bottom: Activity */}
  <p className="font-semibold text-[#4A80F0] flex items-center gap-2 my-6">
    <Activity size={18} className="text-green-600" />
    <span className="text-gray-500">{ordinal(profileData?.data?.login_attempts || 1)}</span>{sidebar?.sign_in}
  </p>
</aside>

  );
}