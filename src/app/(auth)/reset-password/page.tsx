// src/app/(auth)/reset-password/page.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Mail } from 'lucide-react';
import ResetPasswordImage from '../../../../public/assets/resetpassword.png';

export default function ResetPasswordPage() {
  return (
    <div className="w-full min-h-screen bg-white flex justify-center items-center p-4">
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Side: Form */}
        <div className="flex flex-col justify-center items-center lg:items-start">
          <div className="w-full max-w-md flex flex-col gap-6">
            <div className="text-center lg:text-left">
              <h1 className="text-black text-3xl font-bold font-Quicksand leading-10">Reset Password</h1>
            </div>
            <div className="self-stretch h-12 px-5 py-3.5 bg-zinc-100 rounded-xl flex items-center gap-2">
              <Mail size={20} className="text-zinc-600" />
              <input type="email" placeholder="Email" className="w-full bg-transparent outline-none text-zinc-900 text-sm font-Quicksand" />
            </div>
            <Link href="/reset-password/check-email" className="w-full">
              <button className="w-full h-12 bg-blue-500 rounded-xl text-white text-sm font-bold font-Quicksand hover:bg-blue-600 transition-colors">
                Send
              </button>
            </Link>
          </div>
        </div>

        {/* Right Side: Image */}
        <div className="hidden lg:flex justify-center items-center">
          <Image className="rounded-[40px]" src={ResetPasswordImage} alt="A child learning on a computer" style={{ objectFit: 'cover' }} />
        </div>
      </div>
    </div>
  );
}