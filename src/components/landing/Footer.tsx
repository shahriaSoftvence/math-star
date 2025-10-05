// src/components/landing/Footer.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
// import { Facebook, Twitter, Instagram, Youtube, Dot } from 'lucide-react';
import Logo from '../../../public/assets/Logo.png';
import { Dot } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 pt-16 pb-8 px-4 lg:px-28">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Image src={Logo} alt="Math Star Logo" className="w-40 h-auto mb-4" />
            <p className="text-base font-normal font-Open_Sans leading-normal max-w-sm px-2">
              Turning math into an exciting adventure for children aged 5–10 with playful, adaptive learning.
            </p>
            {/* <div className="flex gap-4 mt-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex justify-center items-center hover:bg-gray-700"><Facebook size={20} className="text-white" /></a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex justify-center items-center hover:bg-gray-700"><Twitter size={20} className="text-white" /></a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex justify-center items-center hover:bg-gray-700"><Instagram size={20} className="text-white" /></a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex justify-center items-center hover:bg-gray-700"><Youtube size={20} className="text-white" /></a>
            </div> */}
          </div>
          <div>
            <h3 className="text-white text-lg font-bold font-Quicksand leading-7">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/" className="hover:text-white">Home</Link></li>
              <li><Link href={{ pathname: "/", hash: "features" }} className="hover:text-white">How It Works</Link></li>
              {/* <li><Link href="#" className="hover:text-white">Curriculum</Link></li> */}
              <li><Link href={{ pathname: "/", hash: "pricing" }} className="hover:text-white">Pricing</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white text-lg font-bold font-Quicksand leading-7">Support</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white">Terms & Conditions</Link></li>
              <li><Link href={{ pathname: "/", hash: "faq" }} className="hover:text-white">FAQs</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact Us</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>@ {new Date().getFullYear()} Math Star. All rights reserved.</p>
          <div className="flex flex-col md:flex-row items-center gap-0.5 md:gap-3 mt-6 md:mt-0">
            <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Dot />
            <Link href="/terms" className="hover:text-white">Terms & Conditions</Link>
            <Dot />
            <Link href="/contact" className="hover:text-white">Contact Us</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;