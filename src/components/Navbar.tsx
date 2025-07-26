'use client'
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Bell, Menu } from 'lucide-react';
import Profile from '../../public/assets/Profile.png';
import Flag from '../../public/assets/Flag.png';
import { TiStarFullOutline } from "react-icons/ti";
import { FaCrown } from "react-icons/fa";

type Notification = {
  id: number;
  message: string;
};

type User = {
  name: string;
  avatarUrl: string;
  stars: number;
  starStreak: string;
};

type NavbarProps = {
  user: User;
  toggleSidebar: () => void;
};

const notifications: Notification[] = [
  { id: 1, message: 'You have a new message from your teacher.' },
  { id: 2, message: 'You earned a new badge! Keep it up.' },
  { id: 3, message: 'Your weekly progress report is ready.' },
];

function useOnClickOutside(
  ref: React.RefObject<HTMLElement>,
  handler: (event: MouseEvent | TouchEvent) => void
) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}

export default function Navbar({ user, toggleSidebar }: NavbarProps) {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(notificationRef as React.RefObject<HTMLElement>, () => setIsNotificationsOpen(false));
  
  return (
    <nav className="max-w-[1478px] mx-auto px-6 py-4 bg-white rounded-2xl flex justify-between items-center">
      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar} className="md:hidden" aria-label="Toggle sidebar">
          <Menu className='text-[#000]' size={24} />
        </button>
        <div className="flex-col justify-center items-start gap-1.5 hidden md:flex">
          <h1 className="text-black text-2xl font-medium">Hi, {user.name}! Ready to become a Math Star today?</h1>
          <div className="inline-flex justify-start items-start gap-3">
            <div className="px-3 py-1 bg-yellow-100 rounded-full flex justify-start items-center gap-1.5">
              <TiStarFullOutline className="text-[#EAB308] text-[20px]" />
              <span className="text-[#A16207] text-base font-bold">{user.stars} Stars</span>
            </div>
            <div className="px-3 py-1 bg-yellow-100 rounded-full flex justify-start items-center gap-1.5">
              <FaCrown className="text-[#EAB308] text-[20px]" />
              <span className="text-yellow-700 text-base font-bold">{user.starStreak}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <Image src={Flag} alt='Country flag' width={32} height={32} />
        <div className="relative" ref={notificationRef}>
          <button
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className="relative"
            aria-label="Notifications"
          >
            <Bell size={36} strokeWidth={1.5} />
            <div className="w-3 h-3 absolute top-0 right-0 bg-red-500 rounded-full border-2 border-white" />
          </button>
          {isNotificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg overflow-hidden z-20 border">
              <div className="py-2">
                <div className="px-4 py-2 font-bold text-gray-800 border-b">Notifications</div>
                <ul>
                  {notifications.map((notification) => (
                    <li key={notification.id} className="border-b last:border-b-0">
                      <a href="#" className="block px-4 py-3 text-gray-600 hover:bg-gray-100 transition-colors duration-150">
                        {notification.message}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
        

        <Image src={Profile} width={58} height={58} alt="User Avatar" className="rounded-full" />
      </div>
    </nav>
  );
}