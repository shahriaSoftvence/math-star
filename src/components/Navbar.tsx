"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Menu, LogOut, User } from "lucide-react";
import Profile from "../../public/assets/Profile.png";
import Flag from "../../public/assets/Flag.png";
import { TiStarFullOutline } from "react-icons/ti";
import { FaCrown } from "react-icons/fa";
import { useAuth, useAuthActions } from "../Redux/hooks";
import { useGetProfileQuery } from "../Redux/features/auth/authApi";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback } from "./ui/avatar";


type NavbarProps = {
  toggleSidebar: () => void;
};


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
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}

export default function Navbar({ toggleSidebar }: NavbarProps) {
  // const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  // const [isClient, setIsClient] = useState(false);
  // const notificationRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  // Get current user from Redux
  const { user, isAuthenticated } = useAuth();

  // Get logout function from Redux actions
  const { logout } = useAuthActions();

  // Fetch user profile data
  const {
    data: profileData
  } = useGetProfileQuery(undefined, {
    skip: !isAuthenticated, 
    refetchOnMountOrArgChange: false, 
    refetchOnFocus: false, 
  });


  useOnClickOutside(profileRef as React.RefObject<HTMLElement>, () =>
    setIsProfileOpen(false)
  );

  // Handle logout
  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
  };

  // Handle profile navigation
  const handleProfileClick = () => {
    router.push("/dashboard/profile");
    setIsProfileOpen(false);
  };

  if (!user || !isAuthenticated) {
    return (
      <nav className="max-w-[1478px] mx-auto px-6 py-4 bg-white shadow-md rounded flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="md:hidden"
            aria-label="Toggle sidebar"
          >
            <Menu className="text-[#000]" size={24} />
          </button>
          <div className="flex-col justify-center items-start gap-1.5 hidden md:flex">
            <h1 className="text-black text-2xl font-medium">Loading...</h1>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <Image src={Flag} alt="Country flag" width={32} height={32} />
          <Image
            src={Profile}
            width={58}
            height={58}
            alt="User Avatar"
            className="rounded-full"
          />
        </div>
      </nav>
    );
  }

  return (
    <nav className="max-w-[1478px] mx-auto px-6 py-4 bg-white shadow-md rounded-2xl flex justify-between items-center">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="md:hidden"
          aria-label="Toggle sidebar"
        >
          <Menu className="text-[#000]" size={24} />
        </button>
        <div className="flex-col justify-center items-start gap-1.5 hidden md:flex">
          <h1 className="text-black text-2xl font-medium">
            Hi, {profileData?.data?.name || profileData?.data?.email}! Ready to
            become a Math Star today?
          </h1>
          <div className="inline-flex justify-start items-start gap-3">
            <div className="px-3 py-1 bg-yellow-100 rounded-full flex justify-start items-center gap-1.5">
              <TiStarFullOutline className="text-[#EAB308] text-[20px]" />
              <span className="text-[#A16207] text-base font-bold">
                {profileData?.data?.star} Stars
              </span>
            </div>
            <div className="px-3 py-1 bg-yellow-100 rounded-full flex justify-start items-center gap-1.5">
              <FaCrown className="text-[#EAB308] text-[20px]" />
              <span className="text-yellow-700 text-base font-bold">
                {profileData?.data?.reward?.name || "Beginner"}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-6">
        {/* <Image src={Flag} alt='Country flag' width={32} height={32} />
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
        </div> */}

        {/* Profile Dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity duration-150"
            aria-label="Profile menu"
          >
            <Avatar className="w-16 h-16">
              {profileData?.data?.profile_pic ? (
                <Image
                  src={`${process.env.NEXT_PUBLIC_BASE_URL}${profileData?.data?.profile_pic}`}
                  alt="User Avatar"
                  width={64}
                  height={64}
                  className="rounded-full object-cover"
                />
              ) : (
                <AvatarFallback className="bg-gradient-to-br from-blue-400 text-3xl font-semibold to-purple-500 text-white">
                  {profileData?.data?.name
                    ? profileData.data.name.charAt(0).toUpperCase()
                    : "U"}
                </AvatarFallback>
              )}
            </Avatar>
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden z-20 border">
              <div className="py-2">
                <button
                  onClick={handleProfileClick}
                  className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors duration-150 text-left"
                >
                  <User size={20} />
                  <span className="text-sm font-medium">Profile</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors duration-150 text-left"
                >
                  <LogOut size={20} />
                  <span className="text-sm font-medium">Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
