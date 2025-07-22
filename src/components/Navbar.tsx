import React from 'react';
import Image from 'next/image';
import { Star, Crown, Bell } from 'lucide-react';

const GermanFlagIcon = () => (
    <div className="w-14 h-14 relative overflow-hidden rounded-md shadow-sm">
        <div className="w-full h-1/3 bg-black" />
        <div className="w-full h-1/3 bg-[#DD0000]" />
        <div className="w-full h-1/3 bg-[#FFCE00]" />
    </div>
);

type NavbarProps = {
  user: {
    name: string;
    avatarUrl: string;
    stars: number;
    starStreak: string;
  };
};

export default function Navbar({ user }: NavbarProps) {
  return (
    <nav className="w-full px-6 py-4 bg-white rounded-2xl flex justify-between items-center">
      <div className="flex flex-col justify-center items-start gap-1.5">
        <h1 className="text-black text-2xl font-medium">Hi, {user.name}! Ready to become a Math Star today?</h1>
        <div className="inline-flex justify-start items-start gap-3">
          <div className="px-3 py-1 bg-yellow-100 rounded-full flex justify-start items-center gap-1.5">
            <Star size={16} className="text-yellow-700" />
            <span className="text-yellow-700 text-base font-medium">{user.stars} Stars</span>
          </div>
          <div className="px-3 py-1 bg-yellow-100 rounded-full flex justify-start items-center gap-1.5">
            <Crown size={16} className="text-yellow-700" />
            <span className="text-yellow-700 text-base font-medium">{user.starStreak}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <GermanFlagIcon />
        <div className="relative">
            <Bell size={36} strokeWidth={1.5} />
            <div className="w-3 h-3 absolute top-0 right-0 bg-red-500 rounded-full border-2 border-white" />
        </div>
        {/* <Image src={user.avatarUrl} width={58} height={58} alt="User Avatar" className="rounded-full" /> */}
      </div>
    </nav>
  );
}