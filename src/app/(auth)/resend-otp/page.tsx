'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Mail } from 'lucide-react';
import SignUpImage from '../../../../public/assets/signup.png';
import { useResendOtpMutation } from '../../../../src/Redux/features/auth/authApi';
import { toast } from 'sonner';
import { useSearchParams } from 'next/navigation';

export default function ResendOtpPage() {
  const [email, setEmail] = useState('');
  const [resendOtp, { isLoading: isResending }] = useResendOtpMutation();
  
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect') || '/dashboard';

  const handleResendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast.error('Please enter your email address');
      return;
    }

    try {
      const result = await resendOtp({ email: email.trim() }).unwrap();
      
      if (result.success) {
        toast.success('OTP resent successfully! Please check your email.');
        // Redirect to signup page with OTP verification step and email
        window.location.href = `/signup?step=2&email=${encodeURIComponent(email.trim())}&redirect=${encodeURIComponent(redirectTo)}`;
      }
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to resend OTP');
    }
  };

  return (
    <div className="w-full min-h-screen bg-white flex justify-center items-center p-4">
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Side: Form */}
        <div className="flex flex-col justify-center items-center lg:items-start">
          <div className="w-full max-w-md flex flex-col gap-6">
            <div className="text-center lg:text-left">
              <h1 className="text-zinc-900 text-4xl font-bold font-Quicksand">Resend OTP</h1>
              <p className="text-zinc-600 mt-2">Enter your email to receive a new verification code</p>
            </div>

            <form onSubmit={handleResendOtp} className="w-full flex flex-col gap-4">
              <div className="self-stretch h-12 px-5 py-3.5 bg-zinc-100 rounded-xl flex items-center gap-2">
                <Mail size={20} className="text-zinc-600" />
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-transparent outline-none text-zinc-900 text-sm font-Quicksand"
                />
              </div>

              <button
                type="submit"
                disabled={isResending || !email.trim()}
                className="self-stretch h-12 px-4 py-3 bg-blue-500 rounded-xl text-white text-sm font-bold font-Quicksand hover:bg-blue-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isResending ? 'Sending...' : 'Resend OTP'}
              </button>
            </form>

            <div className="flex flex-col gap-3 text-center">
              <Link 
                href={`/signin?redirect=${encodeURIComponent(redirectTo)}`}
                className="text-blue-500 text-sm font-bold font-Quicksand hover:underline"
              >
                Already have an account? Sign In
              </Link>
              
              <Link 
                href={`/signup?redirect=${encodeURIComponent(redirectTo)}`}
                className="text-blue-500 text-sm font-bold font-Quicksand hover:underline"
              >
                Don't have an account? Sign Up
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
