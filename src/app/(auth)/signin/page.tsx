/* eslint-disable react/no-unescaped-entities */
// src/app/(auth)/signin/page.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Lock, User, Chrome } from 'lucide-react';
import SignInImage from '../../../../public/assets/signin.png';

export default function SignInPage() {
  return (
    <div className="w-full min-h-screen bg-white flex justify-center items-center p-4">
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Side: Form */}
        <div className="flex flex-col justify-center items-center lg:items-start">
          <div className="w-full max-w-md flex flex-col gap-6">
            <div className="text-center lg:text-left">
              <h1 className="text-zinc-900 text-6xl md:text-7xl font-bold font-Quicksand">Welcome</h1>
              <p className="text-zinc-900 text-sm font-normal font-Quicksand mt-2">We are glad to see you back with us</p>
            </div>

            <div className="w-full flex flex-col gap-4">
              <div className="self-stretch h-12 px-5 py-3.5 bg-zinc-100 rounded-xl flex items-center gap-2">
                <User size={20} className="text-zinc-600" />
                <input type="text" placeholder="Username" className="w-full bg-transparent outline-none text-zinc-900 text-sm font-Quicksand" />
              </div>
              <div className="self-stretch h-12 px-5 py-3.5 bg-zinc-100 rounded-xl flex items-center gap-2">
                <Lock size={20} className="text-zinc-600" />
                <input type="password" placeholder="Password" className="w-full bg-transparent outline-none text-zinc-900 text-sm font-Quicksand" />
              </div>
              <div className="self-stretch text-right">
                <Link href="/reset-password" className="text-zinc-900 text-xs font-normal font-Quicksand hover:underline">
                  Forgot Password?
                </Link>
              </div>
            </div>

            <button className="self-stretch h-12 px-4 py-3 bg-blue-500 rounded-xl text-white text-sm font-bold font-Quicksand hover:bg-blue-600 transition-colors">
              Sign In
            </button>

            <div className="text-center">
              <span className="text-zinc-900 text-base font-normal font-Quicksand">Sign in with Others</span>
            </div>

            <button className="self-stretch h-12 rounded-xl border border-zinc-900/20 flex justify-center items-center gap-2 hover:bg-gray-50 transition-colors">
              <Chrome size={24} />
              <span className="text-zinc-900 text-xs font-normal font-Quicksand">Login with </span>
              <span className="text-zinc-900 text-xs font-bold font-Quicksand">Google</span>
            </button>
             <div className="text-center mt-4">
              <span className="text-zinc-900 text-sm font-Quicksand">Don't have an account? </span>
              <Link href="/signup" className="text-blue-500 text-sm font-bold font-Quicksand hover:underline">
                Sign Up
              </Link>
            </div>
          </div>
        </div>

        {/* Right Side: Image */}
        <div className="hidden lg:flex justify-center items-center">
          <Image className="rounded-[40px]" src={SignInImage} alt="A child learning on a computer" style={{ objectFit: 'cover' }} />
        </div>
      </div>
    </div>
  );
}