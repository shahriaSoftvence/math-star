// src/app/(auth)/reset-password/check-email/page.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import CheckEmailImage from '@/asset/images/resetpasswordcheckemail.png';
import { getDictionary } from '@/app/actions/dictionaries';

export default async function CheckEmailPage() {
   const {forgot_password} = await getDictionary();

  return (
    <div className="w-full min-h-screen bg-white flex justify-center items-center p-4">
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Side: Content */}
        <div className="flex flex-col justify-center items-center">
          <div className="w-full max-w-md flex flex-col justify-center items-center gap-6 text-center">
            <div>
              <h1 className="text-black text-3xl font-bold font-Quicksand leading-10">{forgot_password.check_email.title}</h1>
              <p className="text-black text-lg font-normal font-Quicksand mt-4">
                {forgot_password.check_email.description}
              </p>
            </div>
            <div className="w-full flex flex-col items-center gap-6">
              <Link href="/reset-password/confirm" className="w-full">
                <button className="w-full h-12 bg-blue-500 rounded-xl text-white text-sm font-bold font-Quicksand hover:bg-blue-600 transition-colors">
                  {forgot_password.check_email.open_email}
                </button>
              </Link>
            </div>
            <p className="text-black text-base font-normal font-Quicksand leading-relaxed">
              {forgot_password.check_email.resend_text} <Link href="#" className="font-bold hover:underline">{forgot_password.check_email.resend_link}</Link>
            </p>
          </div>
        </div>

        {/* Right Side: Image */}
        <div className="hidden lg:flex justify-center items-center">
          <Image className="rounded-[40px]" src={CheckEmailImage} alt="A child learning on a computer with headphones" style={{ objectFit: 'cover' }} />
        </div>
      </div>
    </div>
  );
}