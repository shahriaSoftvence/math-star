// src/app/(auth)/reset-password/check-email/page.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import CheckEmailImage from '../../../../public/assets/resetpasswordcheckemail.png';

export default function CheckEmailPage() {
  return (
    <div className="w-full min-h-screen bg-white flex justify-center items-center p-4">
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Side: Content */}
        <div className="flex flex-col justify-center items-center">
          <div className="w-full max-w-md flex flex-col justify-center items-center gap-6 text-center">
            <div>
              <h1 className="text-black text-3xl font-bold font-Quicksand leading-10">Check Your Email Address</h1>
              <p className="text-black text-lg font-normal font-Quicksand mt-4">
                We have sent a password reset link to your email. <br /> Please check your inbox.
              </p>
            </div>
            <div className="w-full flex flex-col items-center gap-6">
               <Link href="/reset-password/confirm" className="w-full">
                <button className="w-full h-12 bg-blue-500 rounded-xl text-white text-sm font-bold font-Quicksand hover:bg-blue-600 transition-colors">
                    Open Email
                </button>
              </Link>
            </div>
            <p className="text-black text-base font-normal font-Quicksand leading-relaxed">
              Didn’t receive the email yet? <Link href="#" className="font-bold hover:underline">Resend</Link>
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