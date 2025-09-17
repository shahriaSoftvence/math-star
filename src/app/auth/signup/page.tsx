// src/app/(auth)/signup/page.tsx
'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { User, Mail, Lock, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import SignUpImage from '../../../../public/assets/signup.png';
import { FcGoogle } from "react-icons/fc";
import { useRegisterMutation, useVerifyOtpMutation, useResendOtpMutation } from '../../../../src/Redux/features/auth/authApi';
import { toast } from 'sonner';
import { useSearchParams } from 'next/navigation';

export default function SignUpPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirm_password: ''
  });
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [register, { isLoading: isRegistering }] = useRegisterMutation();
  const [verifyOtp, { isLoading: isVerifying }] = useVerifyOtpMutation();
  const [resendOtp, { isLoading: isResending }] = useResendOtpMutation();
  
  const searchParams = useSearchParams();
  const redirectTo = searchParams?.get('redirect') || '/dashboard';
  


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirm_password) {
      toast.error('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    try {
      const result = await register({
        email: formData.email,
        password: formData.password,
        confirm_password: formData.confirm_password,
        name: formData.name
      }).unwrap();

      if (result.success) {
        setEmail(formData.email);
        setStep(2);
        toast.success('Registration successful! Please check your email for OTP.');
      }
    } catch (error: unknown) {
      const errorMessage = error && typeof error === 'object' && 'data' in error && 
        typeof error.data === 'object' && error.data && 'message' in error.data && 
        typeof error.data.message === 'string' ? error.data.message : 'Registration failed';
      toast.error(errorMessage);
    }
  };

  const handleOtpVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (otp.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP');
      return;
    }

    try {
      const result = await verifyOtp({ 
        otp,
        email: email // Include the email in the OTP verification request
      }).unwrap();
      
      if (result.success) {
        toast.success('OTP verified successfully! You can now sign in.');
        // Redirect to signin page with redirect parameter
        window.location.href = `/auth/signin?redirect=${encodeURIComponent(redirectTo)}`;
      }
    } catch (error: unknown) {
      const errorMessage = error && typeof error === 'object' && 'data' in error && 
        typeof error.data === 'object' && error.data && 'message' in error.data && 
        typeof error.data.message === 'string' ? error.data.message : 'OTP verification failed';
      toast.error(errorMessage);
    }
  };

  const goBackToStep1 = () => {
    setStep(1);
    setOtp('');
  };

  const handleResendOtp = async () => {
    try {
      const result = await resendOtp({ email }).unwrap();
      if (result.success) {
        toast.success('OTP resent successfully! Please check your email.');
      }
    } catch (error: unknown) {
      const errorMessage = error && typeof error === 'object' && 'data' in error &&
        typeof error.data === 'object' && error.data && 'message' in error.data &&
        typeof error.data.message === 'string' ? error.data.message : 'Failed to resend OTP';
      toast.error(errorMessage);
    }
  };

  if (step === 2) {
    return (
      <div className="w-full min-h-screen bg-white flex justify-center items-center p-4">
        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Side: OTP Form */}
          <div className="flex flex-col justify-center items-center lg:items-start">
            <div className="w-full max-w-md flex flex-col gap-6">
              <button
                onClick={goBackToStep1}
                className="flex items-center gap-2 text-blue-500 hover:text-blue-600 transition-colors self-start"
              >
                <ArrowLeft size={20} />
                Back to registration
              </button>

              <div className="text-center lg:text-left">
                <h1 className="text-zinc-900 text-4xl font-bold font-Quicksand">Verify OTP</h1>
                <p className="text-zinc-600 mt-2">We&apos;ve sent a 6-digit code to {email}</p>
              </div>

              <form onSubmit={handleOtpVerification} className="w-full flex flex-col gap-4">
                <div className="self-stretch h-12 px-5 py-3.5 bg-zinc-100 rounded-xl flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength={6}
                    className="w-full bg-transparent outline-none text-zinc-900 text-sm font-Quicksand text-center tracking-widest"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isVerifying || otp.length !== 6}
                  className="self-stretch h-12 px-4 py-3 bg-blue-500 rounded-xl text-white text-sm font-bold font-Quicksand hover:bg-blue-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isVerifying ? 'Verifying...' : 'Verify OTP'}
                </button>
              </form>

              <div className="text-center">
                <span className="text-zinc-600 text-sm">Didn&apos;t receive the code? </span>
                <button
                  onClick={handleResendOtp}
                  disabled={isResending}
                  className="text-blue-500 text-sm font-bold hover:underline disabled:opacity-50"
                >
                  {isResending ? 'Resending...' : 'Resend OTP'}
                </button>
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

  return (
    <div className="w-full min-h-screen bg-white flex justify-center items-center p-4">
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Side: Form */}
        <div className="flex flex-col justify-center items-center lg:items-start">
          <div className="w-full max-w-md flex flex-col gap-6">
            <div className="text-center lg:text-left">
              <h1 className="text-zinc-900 text-4xl font-bold font-Quicksand">Sign up</h1>
            </div>

            <form onSubmit={handleRegister} className="w-full flex flex-col gap-4">
              <div className="self-stretch h-12 px-5 py-3.5 bg-zinc-100 rounded-xl flex items-center gap-2">
                <User size={20} className="text-zinc-600" />
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-transparent outline-none text-zinc-900 text-sm font-Quicksand"
                />
              </div>
              <div className="self-stretch h-12 px-5 py-3.5 bg-zinc-100 rounded-xl flex items-center gap-2">
                <Mail size={20} className="text-zinc-600" />
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
                  minLength={6}
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
              <div className="self-stretch h-12 px-5 py-3.5 bg-zinc-100 rounded-xl flex items-center gap-2">
                <Lock size={20} className="text-zinc-600" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirm_password"
                  placeholder="Confirm Password"
                  value={formData.confirm_password}
                  onChange={handleInputChange}
                  required
                  minLength={6}
                  className="w-full bg-transparent outline-none text-zinc-900 text-sm font-Quicksand"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="text-zinc-600 hover:text-zinc-800 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <button
                type="submit"
                disabled={isRegistering}
                className="self-stretch h-12 px-4 py-3 bg-blue-500 rounded-xl text-white text-sm font-bold font-Quicksand hover:bg-blue-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isRegistering ? 'Creating Account...' : 'Next'}
              </button>
            </form>

            <div className="text-center mt-4">
              <span className="text-zinc-900 text-sm font-Quicksand">Already have an account? </span>
              <Link href={`/auth/signin?redirect=${encodeURIComponent(redirectTo)}`} className="text-blue-500 text-sm font-bold font-Quicksand hover:underline">
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