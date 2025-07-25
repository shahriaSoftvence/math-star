// src/components/landing/Header.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Logo from '../../../public/assets/Logo.png';
import Flag from '../../../public/assets/Flag.png';

const Header = () => {
  return (
    <header className="w-full h-24 px-4 sm:px-10 md:px-28 left-0 top-0 absolute bg-white/60 border-b border-white/40 backdrop-blur-[10px] flex justify-between items-center z-10">
      <Link href="/">
        <Image src={Logo} alt="Math Star Logo" className="w-32 md:w-40 h-auto" />
      </Link>
      <nav className="hidden md:flex justify-center items-center gap-8 lg:gap-16">
        <Link href="#features" className="text-black text-lg font-medium font-Poppins leading-relaxed">What is Math Star?</Link>
        <Link href="#pricing" className="text-black/80 text-lg font-medium font-Poppins leading-relaxed">Pricing</Link>
        <Link href="#faq" className="text-black/80 text-lg font-medium font-Poppins leading-relaxed">FAQ</Link>
      </nav>
      <div className="flex items-center gap-4">
        <Image src={Flag} alt="Language Flag" className="w-10 h-auto" />
        <Link href="/signin">
          <button className="h-12 px-6 bg-blue-500 rounded-[100px] text-white text-lg font-medium font-Poppins leading-relaxed hover:bg-blue-600 transition-colors">
            Sign In
          </button>
        </Link>
      </div>
    </header>
  );
};

export default Header;