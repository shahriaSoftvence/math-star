'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Lock, User, Eye, EyeOff } from 'lucide-react';
import SignInImage from '@/asset/images/signin.png';
import { toast } from 'sonner';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthActions } from '@/Redux/hooks';
import { useLoginMutation } from '@/Redux/features/auth/authApi';
import { useDictionary } from '@/hook/useDictionary';

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

   const { dictionary, loading } = useDictionary();
    const signinText = dictionary?.signin;
  
    if (!signinText || loading ) {
      return null;
    }

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
      toast.error(signinText?.fill_all_fields);
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

        toast.success(signinText?.login_success);
        
        // Redirect to the intended page or dashboard
        router.push(redirectTo);
      }
    } catch (error: unknown) {
      const errorMessage = error && typeof error === 'object' && 'data' in error && 
        typeof error.data === 'object' && error.data && 'message' in error.data && 
        typeof error.data.message === 'string' ? error.data.message : signinText?.login_failed;
      toast.error(errorMessage);
    }
  };

  return (
    <div className="w-full min-h-screen bg-white flex justify-center items-center p-4 lg:p-6">
      <div className="w-full max-w-6xl mx-auto flex flex-col-reverse md:flex-row gap-8 md:gap-4 lg:gap-8 items-center">
        {/* Left Side: Form */}
        <div className="flex flex-col justify-center items-center lg:items-start w-full lg:w-1/2">
          <div className="w-full max-w-md flex flex-col gap-6">
            <div className="text-center md:text-left">
              <h1 className="text-zinc-900 text-4xl lg:text-6xl font-bold font-Quicksand">{signinText?.title}</h1>
              <p className="text-zinc-900 text-sm font-normal font-Quicksand mt-2">{signinText?.subtitle}</p>
            </div>

            <form onSubmit={handleLogin} className="w-full flex flex-col gap-4">
              <div className="self-stretch h-12 px-5 py-3.5 bg-zinc-100 rounded-xl flex items-center gap-2">
                <User size={20} className="text-zinc-600" />
                <input
                  type="email"
                  name="email"
                  placeholder={signinText?.email_placeholder}
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
                  placeholder={signinText?.password_placeholder}
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
                <Link href="/auth/reset-password" className="text-zinc-900 text-xs font-normal font-Quicksand hover:underline">
                  {signinText?.forgot_password}
                </Link>
              </div>

              <button
                type="submit"
                disabled={isLoggingIn}
                className="self-stretch h-12 px-4 py-3 bg-blue-500 rounded-xl text-white text-sm font-bold font-Quicksand hover:bg-blue-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isLoggingIn ? signinText?.signing_in : signinText?.sign_in}
              </button>
            </form>

             <div className="text-center mt-4">
              <span className="text-zinc-900 text-sm font-Quicksand">{signinText?.no_account} </span>
              <Link href="/auth/signup" className="text-blue-500 text-sm font-bold font-Quicksand hover:underline">
                {signinText?.signup}
              </Link>
            </div>
            

          </div>
        </div>

        {/* Right Side: Image */}
        <div className="flex justify-center items-center w-full lg:w-1/2">
          <Image className="rounded-md lg:rounded-[40px]" src={SignInImage} alt="A child learning on a computer" style={{ objectFit: 'cover' }} />
        </div>
      </div>
    </div>
  );
}