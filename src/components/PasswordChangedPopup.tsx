// src/components/PasswordChangedPopup.tsx
import React from 'react';
import Link from 'next/link';
import { Check } from 'lucide-react';

export default function PasswordChangedPopup() {
  return (
    <div className="w-full max-w-lg p-8 bg-white rounded-2xl shadow-2xl flex flex-col justify-center items-center gap-8 border">
      <div className="w-20 h-20 rounded-full bg-blue-500 flex items-center justify-center">
        <Check size={48} className="text-white" />
      </div>
      <div className="text-center">
        <h1 className="text-black text-3xl font-bold font-Quicksand leading-10">Password Changed!</h1>
        <p className="text-black text-base font-normal font-Quicksand leading-relaxed mt-4">
          Now you can login to your account
        </p>
      </div>
      <Link href="/signin" className="w-full max-w-xs">
        <button className="w-full h-12 bg-blue-500 rounded-xl text-white text-sm font-bold font-Quicksand hover:bg-blue-600 transition-colors">
          Go To Login
        </button>
      </Link>
    </div>
  );
}