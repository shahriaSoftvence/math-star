// ste_br/src/components/landing/Header.tsx
'use client'; // <-- Add this line

import React, { useState } from 'react'; // <-- Import useState
import Image from 'next/image';
import Link from 'next/link';
import Logo from '../../../public/assets/Logo.png';
import Flag from '../../../public/assets/Flag.png';
import { HamburgerMenu } from './HamburgerMenu'; // <-- Import HamburgerMenu

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // <-- Add state for menu

  return (
    <header className="w-full h-24 px-4 sm:px-10 md:px-28 fixed left-0 top-0 bg-white/60 border-b border-white/40 backdrop-blur-[10px] flex justify-between items-center z-20">
      <div className="max-w-[1250px] mx-auto flex justify-between items-center w-full">
        <Link href="/">
          <Image src={Logo} alt="Math Star Logo" className="w-32 md:w-40 h-auto" />
        </Link>
        <nav
          className={`
            md:flex md:items-center md:gap-8 lg:gap-16
            ${
              isMenuOpen
                ? 'flex flex-col absolute top-24 left-0 w-full bg-white/90 p-8 gap-4'
                : 'hidden'
            }
          `}
        >
          <Link
            href="#features"
            className="text-black text-lg font-medium font-Poppins leading-relaxed"
            onClick={() => setIsMenuOpen(false)}
          >
            What is Math Star?
          </Link>
          <Link
            href="#pricing"
            className="text-black/80 text-lg font-medium font-Poppins leading-relaxed"
            onClick={() => setIsMenuOpen(false)}
          >
            Pricing
          </Link>
          <Link
            href="#faq"
            className="text-black/80 text-lg font-medium font-Poppins leading-relaxed"
            onClick={() => setIsMenuOpen(false)}
          >
            FAQ
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Image src={Flag} alt="Language Flag" className="w-10 h-auto" />
          <Link href="/signin">
            <button className="h-12 px-6 bg-blue-500 rounded-[100px] text-white text-lg font-medium font-Poppins leading-relaxed hover:bg-blue-600 transition-colors">
              Sign In
            </button>
          </Link>
          <HamburgerMenu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
        </div>
      </div>
    </header>
  );
};

export default Header;