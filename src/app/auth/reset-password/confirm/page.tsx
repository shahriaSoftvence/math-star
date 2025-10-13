// src/app/(auth)/reset-password/confirm/page.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Lock, EyeOff } from 'lucide-react';
import ConfirmPasswordImage from '@/asset/images/resetpasswordconfirmpassword.png';
import { getDictionary } from '@/app/actions/dictionaries';

export default async function ConfirmPasswordPage() {
  const {forgot_password} = await getDictionary();
  return (
    <div className="w-full min-h-screen bg-white flex justify-center items-center p-4">
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Side: Form */}
        <div className="flex flex-col justify-center items-center lg:items-start">
          <div className="w-full max-w-md flex flex-col gap-6">
            <div className="text-center lg:text-left">
              <h1 className="text-black text-3xl font-bold font-Quicksand leading-10">{forgot_password.confirm_password.title}</h1>
            </div>
            <div className="w-full flex flex-col gap-4">
              <div className="self-stretch h-12 px-5 py-3.5 bg-zinc-100 rounded-xl flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Lock size={20} className="text-zinc-600" />
                  <input 
                    type="password" 
                    placeholder={forgot_password.confirm_password.password_placeholder} 
                    className="w-full bg-transparent outline-none text-zinc-900 text-sm font-Quicksand" 
                  />
                </div>
              </div>
              <div className="self-stretch h-12 px-5 py-3.5 bg-zinc-100 rounded-xl flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Lock size={20} className="text-zinc-600" />
                  <input 
                    type="password" 
                    placeholder={forgot_password.confirm_password.confirm_password_placeholder} 
                    className="w-full bg-transparent outline-none text-zinc-900 text-sm font-Quicksand" 
                  />
                </div>
                <EyeOff size={20} className="text-stone-300" />
              </div>
            </div>
             <Link href="/signin" className="w-full">
                <button className="w-full h-12 bg-blue-500 rounded-xl text-white text-sm font-bold font-Quicksand hover:bg-blue-600 transition-colors">
                  {forgot_password.confirm_password.reset_button}
                </button>
            </Link>
          </div>
        </div>

        {/* Right Side: Image */}
        <div className="hidden lg:flex justify-center items-center">
          <Image className="rounded-[40px]" src={ConfirmPasswordImage} alt="A child learning in a library" style={{ objectFit: 'cover' }} />
        </div>
      </div>
    </div>
  );
}