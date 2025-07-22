import React from 'react';
import { LayoutDashboard, User, Settings, LogOut, Star } from 'lucide-react';

const MathStarLogo = () => (
  <div className="flex items-center gap-3">
    <Star size={40} className="text-[#4A80F0]" fill="#4A80F0" />
    <span className="text-2xl font-bold text-[#171717]">MATH STAR</span>
  </div>
);

export default function Sidebar() {
  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={24} />, active: true },
    { name: "Profile", icon: <User size={24} />, active: false },
    { name: "Setting", icon: <Settings size={24} />, active: false },
  ];

  return (
    <aside className="w-64 min-h-screen bg-white rounded-r-[30px] border-r flex flex-col justify-between p-6">
      <div>
        <div className="mb-16">
          <MathStarLogo />
        </div>
        <nav>
          <ul>
            {menuItems.map((item) => (
              <li key={item.name} className="mb-2">
                <a href="#" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors duration-200 ${item.active ? 'bg-[#4A80F0] text-white' : 'text-gray-500 hover:bg-gray-100'}`}>
                  {React.cloneElement(item.icon, { color: item.active ? 'white' : 'currentColor' })}
                  <span className="text-lg font-medium">{item.name}</span>
                </a>
              </li>
            ))}
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