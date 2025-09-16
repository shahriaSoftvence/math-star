// ste_br/src/components/landing/Header.tsx
'use client'; // <-- Add this line

import React, { useState, useEffect, useRef } from 'react'; // <-- Import useState, useEffect, and useRef
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Logo from '../../../public/assets/Logo.png';
import Flag from '../../../public/assets/Flag.png';
import Profile from '../../../public/assets/Profile.png';
import { HamburgerMenu } from './HamburgerMenu'; // <-- Import HamburgerMenu
import { useAuth, useAuthActions } from '../../Redux/hooks';
import { LogOut, LayoutDashboard } from 'lucide-react';

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

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // <-- Add state for menu
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const { isAuthenticated, user } = useAuth();
  const { logout } = useAuthActions();
  const router = useRouter();

  // Prevent hydration mismatch by only rendering after client-side mount
  useEffect(() => {
    setIsClient(true);
  }, []);

  useOnClickOutside(profileRef as React.RefObject<HTMLElement>, () => setIsProfileOpen(false));

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
  };

  const handleDashboardClick = () => {
    router.push('/dashboard');
    setIsProfileOpen(false);
  };

  // Don't render until client-side to prevent hydration mismatch
  if (!isClient) {
    return (
      <header className="w-full h-24 px-4 sm:px-10 md:px-28 fixed left-0 top-0 bg-white/60 border-b border-white/40 backdrop-blur-[10px] flex justify-between items-center z-20">
        <div className="max-w-[1250px] mx-auto flex justify-between items-center w-full">
          <Link href="/">
            <Image src={Logo} alt="Math Star Logo" className="w-32 md:w-40 h-auto" />
          </Link>
          <nav className="hidden md:flex md:items-center md:gap-8 lg:gap-16">
            <Link href="/#features" className="text-black text-lg font-medium font-Poppins leading-relaxed">
              What is Math Star?
            </Link>
            <Link href="/#pricing" className="text-black/80 text-lg font-medium font-Poppins leading-relaxed">
              Pricing
            </Link>
            <Link href="/#faq" className="text-black/80 text-lg font-medium font-Poppins leading-relaxed">
              FAQ
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Image src={Flag} alt="Language Flag" className="w-10 h-auto" />
            <div className="h-12 w-24 bg-gray-200 rounded-[100px] animate-pulse"></div>
            <HamburgerMenu isOpen={false} setIsOpen={() => { }} />
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="w-full h-24 px-4 sm:px-10 md:px-28 fixed left-0 top-0 bg-white/60 border-b border-white/40 backdrop-blur-[10px] flex justify-between items-center z-20">
      <div className="max-w-[1250px] mx-auto flex justify-between items-center w-full">
        <Link href="/">
          <Image src={Logo} alt="Math Star Logo" className="w-32 md:w-40 h-auto" />
        </Link>
        <nav
          className={`
            md:flex md:items-center md:gap-8 lg:gap-16
            ${isMenuOpen
              ? 'flex flex-col absolute top-24 left-0 w-full bg-white/90 p-8 gap-4'
              : 'hidden'
            }
          `}
        >
          <Link
            href={{ pathname: "/", hash: "features" }}
            className="text-black text-lg font-medium font-Poppins leading-relaxed"
            onClick={() => setIsMenuOpen(false)}
          >
            What is Math Star?
          </Link>
          <Link
            href={{ pathname: "/", hash: "pricing" }}
            className="text-black/80 text-lg font-medium font-Poppins leading-relaxed"
            onClick={() => setIsMenuOpen(false)}
          >
            Pricing
          </Link>
          <Link
            href={{ pathname: "/", hash: "faq" }}
            className="text-black/80 text-lg font-medium font-Poppins leading-relaxed"
            onClick={() => setIsMenuOpen(false)}
          >
            FAQ
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Image src={Flag} alt="Language Flag" className="w-10 h-auto" />

          {/* Show different buttons based on authentication status */}
          {isAuthenticated && user ? (
            <div className="flex items-center gap-3">
              {/* Profile Dropdown */}
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 hover:opacity-80 transition-opacity duration-150"
                  aria-label="Profile menu"
                >
                  <Image
                    src={user.profile_pic || Profile}
                    width={48}
                    height={48}
                    alt="User Avatar"
                    className="rounded-full cursor-pointer border-2 border-white/20"
                    onError={(e) => {
                      // Fallback to default profile image if profile_pic fails to load
                      const target = e.target as HTMLImageElement;
                      target.src = Profile.src;
                    }}
                  />
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden z-20 border">
                    <div className="py-2">
                      <button
                        onClick={handleDashboardClick}
                        className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors duration-150 text-left"
                      >
                        <LayoutDashboard size={20} />
                        <span className="text-sm font-medium">Dashboard</span>
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
          ) : (
            <Link href="/auth/signin">
              <button className="h-12 px-6 bg-blue-500 rounded-[100px] text-white text-lg font-medium font-Poppins leading-relaxed hover:bg-blue-600 transition-colors">
                Sign In
              </button>
            </Link>
          )}

          <HamburgerMenu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
        </div>
      </div>
    </header>
  );
};

export default Header;