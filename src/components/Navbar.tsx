import React from 'react';
import Image from 'next/image';
import { Bell } from 'lucide-react';
import Profile from '../../public/assets/Profile.png';
import Flag from '../../public/assets/Flag.png';
import { TiStarFullOutline } from "react-icons/ti";
import { FaCrown } from "react-icons/fa";


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
    <nav className="max-w-[1478px] mx-auto px-6 py-4 bg-white rounded-2xl flex justify-between items-center">
      <div className="flex flex-col justify-center items-start gap-1.5">
        <h1 className="text-black text-2xl font-medium">Hi, {user.name}! Ready to become a Math Star today?</h1>
        <div className="inline-flex justify-start items-start gap-3">
          <div className="px-3 py-1 bg-yellow-100 rounded-full flex justify-start items-center gap-1.5">
            <TiStarFullOutline  className="text-[#EAB308] text-[20px]" />
            <span className="text-[#A16207] text-base font-bold">{user.stars} Stars</span>
          </div>
          <div className="px-3 py-1 bg-yellow-100 rounded-full flex justify-start items-center gap-1.5">
            <FaCrown className="text-[#EAB308] text-[20px]" />
            <span className="text-yellow-700 text-base font-bold">{user.starStreak}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <Image src={Flag} alt='Country' />
        <div className="relative">
            <Bell size={36} strokeWidth={1.5} />
            <div className="w-3 h-3 absolute top-0 right-0 bg-red-500 rounded-full border-2 border-white" />
        </div>
        <Image src={Profile} width={58} height={58} alt="User Avatar" className="rounded-full" />
      </div>
    </nav>
  );
}