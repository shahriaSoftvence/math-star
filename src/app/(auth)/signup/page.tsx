// src/app/(auth)/signup/page.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { User, Mail, Lock, Calendar } from 'lucide-react';
import SignUpImage from '../../../../public/assets/signup.png';
import { FcGoogle } from "react-icons/fc";

export default function SignUpPage() {
  return (
    <div className="w-full min-h-screen bg-white flex justify-center items-center p-4">
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Side: Form */}
        <div className="flex flex-col justify-center items-center lg:items-start">
          <div className="w-full max-w-md flex flex-col gap-6">
            <div className="text-center lg:text-left">
              <h1 className="text-zinc-900 text-4xl font-bold font-Quicksand">Sign up</h1>
            </div>

            <div className="w-full flex flex-col gap-4">
              <div className="self-stretch h-12 px-5 py-3.5 bg-zinc-100 rounded-xl flex items-center gap-2">
                <User size={20} className="text-zinc-600" />
                <input type="text" placeholder="Full Name" className="w-full bg-transparent outline-none text-zinc-900 text-sm font-Quicksand" />
              </div>
              <div className="self-stretch h-12 px-5 py-3.5 bg-zinc-100 rounded-xl flex items-center gap-2">
                <Mail size={20} className="text-zinc-600" />
                <input type="email" placeholder="Email" className="w-full bg-transparent outline-none text-zinc-900 text-sm font-Quicksand" />
              </div>
              <div className="self-stretch h-12 px-5 py-3.5 bg-zinc-100 rounded-xl flex items-center gap-2">
                <Calendar size={20} className="text-zinc-600" />
                <input type="text" placeholder="Age" className="w-full bg-transparent outline-none text-zinc-900 text-sm font-Quicksand" />
              </div>
              <div className="self-stretch h-12 px-5 py-3.5 bg-zinc-100 rounded-xl flex items-center gap-2">
                <Lock size={20} className="text-zinc-600" />
                <input type="password" placeholder="Confirm Password" className="w-full bg-transparent outline-none text-zinc-900 text-sm font-Quicksand" />
              </div>
            </div>

            <button className="self-stretch h-12 px-4 py-3 bg-blue-500 rounded-xl text-white text-sm font-bold font-Quicksand hover:bg-blue-600 transition-colors">
              Next
            </button>

            <button className="self-stretch h-12 rounded-xl border border-zinc-900/20 flex justify-center items-center gap-2 hover:bg-gray-50 transition-colors">
              <FcGoogle size={24} />
              <span className="text-zinc-900 text-xs font-normal font-Quicksand">Signup with </span>
              <span className="text-zinc-900 text-xs font-bold font-Quicksand">Google</span>
            </button>
            <div className="text-center mt-4">
              <span className="text-zinc-900 text-sm font-Quicksand">Already have an account? </span>
              <Link href="/signin" className="text-blue-500 text-sm font-bold font-Quicksand hover:underline">
                Sign In
              </Link>
            </div>
          </div>
        </div>

        {/* Right Side: Image */}
        <div className="hidden lg:flex justify-center items-center">
          <Image className="rounded-[40px]" src={SignUpImage} alt="A child learning on a computer" style={{ objectFit: 'cover' }} />
        </div>
      </div>
    </div>
  );
}