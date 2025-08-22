// src/app/(auth)/signin/page.tsx
'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Lock, User, Eye, EyeOff } from 'lucide-react';
import SignInImage from '../../../../public/assets/signin.png';
import { FcGoogle } from "react-icons/fc";
import { useLoginMutation } from '../../../../src/Redux/features/auth/authApi';
import { useAuthActions } from '../../../../src/Redux/hooks';
import { toast } from 'sonner';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SignInPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  
  const { setUser, setAuthenticated } = useAuthActions();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [login, { isLoading: isLoggingIn }] = useLoginMutation();

  // Get redirect URL from search params (set by middleware)
  const redirectTo = searchParams.get('redirect') || '/dashboard';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      const result = await login({
        email: formData.email,
        password: formData.password
      }).unwrap();

      if (result.success) {
        // Set user data in Redux store
        setUser({
          user: result.data.user || {
            email: formData.email,
            name: result.data.user?.name || formData.email,
            // Add any other user data that might be returned
          },
          token: result.data.tokens.access
        });

        // Set authentication status
        setAuthenticated(true);

        // Store tokens in localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('accessToken', result.data.tokens.access);
          if (result.data.tokens.refresh) {
            localStorage.setItem('refreshToken', result.data.tokens.refresh);
          }
        }

        toast.success('Login successful!');
        
        // Redirect to the intended page or dashboard
        router.push(redirectTo);
      }
    } catch (error: unknown) {
      const errorMessage = error && typeof error === 'object' && 'data' in error && 
        typeof error.data === 'object' && error.data && 'message' in error.data && 
        typeof error.data.message === 'string' ? error.data.message : 'Login failed';
      toast.error(errorMessage);
    }
  };

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

            <form onSubmit={handleLogin} className="w-full flex flex-col gap-4">
              <div className="self-stretch h-12 px-5 py-3.5 bg-zinc-100 rounded-xl flex items-center gap-2">
                <User size={20} className="text-zinc-600" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-transparent outline-none text-zinc-900 text-sm font-Quicksand"
                />
              </div>
              <div className="self-stretch h-12 px-5 py-3.5 bg-zinc-100 rounded-xl flex items-center gap-2">
                <Lock size={20} className="text-zinc-600" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-transparent outline-none text-zinc-900 text-sm font-Quicksand"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-zinc-600 hover:text-zinc-800 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <div className="self-stretch text-right">
                <Link href="/reset-password" className="text-zinc-900 text-xs font-normal font-Quicksand hover:underline">
                  Forgot Password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={isLoggingIn}
                className="self-stretch h-12 px-4 py-3 bg-blue-500 rounded-xl text-white text-sm font-bold font-Quicksand hover:bg-blue-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isLoggingIn ? 'Signing In...' : 'Sign In'}
              </button>
            </form>

             <div className="text-center mt-4">
              <span className="text-zinc-900 text-sm font-Quicksand">Don&apos;t have an account? </span>
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