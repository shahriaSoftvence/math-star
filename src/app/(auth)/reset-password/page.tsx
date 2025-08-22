// src/app/(auth)/reset-password/page.tsx
'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Mail, Lock, Eye, EyeOff, CheckCircle, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import ResetPasswordImage from '../../../../public/assets/resetpassword.png';
import { useRequestPasswordResetMutation, useVerifyOtpForResetMutation, useChangePasswordWithResetTokenMutation } from '../../../Redux/features/auth/authApi';

export default function ResetPasswordPage() {
  const [step, setStep] = useState<'email' | 'otp' | 'password' | 'success'>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [resetToken, setResetToken] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [requestPasswordReset] = useRequestPasswordResetMutation();
  const [verifyOtp] = useVerifyOtpForResetMutation();
  const [changePassword] = useChangePasswordWithResetTokenMutation();

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      const result = await requestPasswordReset({ email }).unwrap();
      if (result.success) {
        toast.success('Reset code sent successfully!', {
          description: `We've sent a 6-digit code to ${email}`,
          duration: 4000,
        });
        setStep('otp');
      }
    } catch (err: unknown) {
      const errorMessage = err && typeof err === 'object' && 'data' in err && 
        typeof err.data === 'object' && err.data && 'message' in err.data && 
        typeof err.data.message === 'string' ? err.data.message : 'Failed to send reset email. Please try again.';
      toast.error('Reset code not sent', {
        description: errorMessage,
        duration: 5000,
      });
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) {
      toast.error('Please enter the reset code');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      const result = await verifyOtp({ email, otp }).unwrap();
      if (result.success) {
        toast.success('Code verified successfully!', {
          description: 'You can now set your new password',
          duration: 4000,
        });
        setResetToken(result.data.reset_token);
        setStep('password');
      }
    } catch (err: unknown) {
      const errorMessage = err && typeof err === 'object' && 'data' in err && 
        typeof err.data === 'object' && err.data && 'message' in err.data && 
        typeof err.data.message === 'string' ? err.data.message : 'Invalid reset code. Please try again.';
      toast.error('Verification failed', {
        description: errorMessage,
        duration: 5000,
      });
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || !confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match', {
        description: 'Please make sure both passwords are identical',
        duration: 4000,
      });
      return;
    }
    
    if (newPassword.length < 6) {
      toast.error('Password too short', {
        description: 'Password must be at least 6 characters long',
        duration: 4000,
      });
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      const result = await changePassword({
        reset_token: resetToken,
        email,
        new_password: newPassword,
        confirm_password: confirmPassword
      }).unwrap();
      
      if (result.success) {
        toast.success('Password changed successfully!', {
          description: 'You can now sign in with your new password',
          duration: 5000,
        });
        setStep('success');
      }
    } catch (err: unknown) {
      const errorMessage = err && typeof err === 'object' && 'data' in err && 
        typeof err.data === 'object' && err.data && 'message' in err.data && 
        typeof err.data.message === 'string' ? err.data.message : 'Failed to change password. Please try again.';
      toast.error('Password change failed', {
        description: errorMessage,
        duration: 5000,
      });
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const goBack = () => {
    if (step === 'otp') {
      setStep('email');
      setOtp('');
      toast.info('Returned to email step', {
        description: 'You can modify your email or resend the reset code',
        duration: 3000,
      });
    } else if (step === 'password') {
      setStep('otp');
      setNewPassword('');
      setConfirmPassword('');
      toast.info('Returned to code verification', {
        description: 'You can re-enter the reset code',
        duration: 3000,
      });
    }
    setError('');
  };

  const renderStep = () => {
    switch (step) {
      case 'email':
        return (
          <form onSubmit={handleRequestReset} className="w-full max-w-md flex flex-col gap-6">
            <div className="text-center lg:text-left">
              <h1 className="text-black text-3xl font-bold font-Quicksand leading-10">Forgot Password</h1>
              <p className="text-gray-600 mt-2">Enter your email to receive a reset code</p>
            </div>
            
            {error && (
              <div className="px-4 py-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                {error}
              </div>
            )}
            
            <div className="self-stretch h-12 px-5 py-3.5 bg-zinc-100 rounded-xl flex items-center gap-2">
              <Mail size={20} className="text-zinc-600" />
              <input 
                type="email" 
                placeholder="Email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent outline-none text-zinc-900 text-sm font-Quicksand" 
              />
            </div>
            
            <button 
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-blue-500 rounded-xl text-white text-sm font-bold font-Quicksand hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Sending...' : 'Send Reset Code'}
            </button>
          </form>
        );

      case 'otp':
        return (
          <form onSubmit={handleVerifyOtp} className="w-full max-w-md flex flex-col gap-6">
            <div className="text-center lg:text-left">
              <h1 className="text-black text-3xl font-bold font-Quicksand leading-10">Enter Reset Code</h1>
              <p className="text-gray-600 mt-2">We&apos;ve sent a 6-digit code to {email}</p>
            </div>
            
            {error && (
              <div className="px-4 py-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                {error}
              </div>
            )}
            
            <div className="self-stretch h-12 px-5 py-3.5 bg-zinc-100 rounded-xl flex items-center gap-2">
              <Lock size={20} className="text-zinc-600" />
              <input 
                type="text" 
                placeholder="Enter 6-digit code" 
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
                className="w-full bg-transparent outline-none text-zinc-900 text-sm font-Quicksand text-center text-lg tracking-widest" 
              />
            </div>
            
            <div className="flex gap-3">
              <button 
                type="button"
                onClick={goBack}
                className="flex-1 h-12 border border-gray-300 rounded-xl text-gray-700 text-sm font-bold font-Quicksand hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
              >
                <ArrowLeft size={16} />
                Back
              </button>
              <button 
                type="submit"
                disabled={isLoading}
                className="flex-1 h-12 bg-blue-500 rounded-xl text-white text-sm font-bold font-Quicksand hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Verifying...' : 'Verify Code'}
              </button>
            </div>
          </form>
        );

      case 'password':
        return (
          <form onSubmit={handleChangePassword} className="w-full max-w-md flex flex-col gap-6">
            <div className="text-center lg:text-left">
              <h1 className="text-black text-3xl font-bold font-Quicksand leading-10">Set New Password</h1>
              <p className="text-gray-600 mt-2">Create a strong password for your account</p>
            </div>
            
            {error && (
              <div className="px-4 py-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                {error}
              </div>
            )}
            
            <div className="self-stretch h-12 px-5 py-3.5 bg-zinc-100 rounded-xl flex items-center gap-2">
              <Lock size={20} className="text-zinc-600" />
              <input 
                type={showPassword ? "text" : "password"}
                placeholder="New Password" 
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full bg-transparent outline-none text-zinc-900 text-sm font-Quicksand" 
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-zinc-600 hover:text-zinc-800"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            
            <div className="self-stretch h-12 px-5 py-3.5 bg-zinc-100 rounded-xl flex items-center gap-2">
              <Lock size={20} className="text-zinc-600" />
              <input 
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm New Password" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-transparent outline-none text-zinc-900 text-sm font-Quicksand" 
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="text-zinc-600 hover:text-zinc-800"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            
            <div className="flex gap-3">
              <button 
                type="button"
                onClick={goBack}
                className="flex-1 h-12 border border-gray-300 rounded-xl text-gray-700 text-sm font-bold font-Quicksand hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
              >
                <ArrowLeft size={16} />
                Back
              </button>
              <button 
                type="submit"
                disabled={isLoading}
                className="flex-1 h-12 bg-blue-500 rounded-xl text-white text-sm font-bold font-Quicksand hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Changing...' : 'Change Password'}
              </button>
            </div>
          </form>
        );

      case 'success':
        return (
          <div className="w-full max-w-md flex flex-col gap-6 text-center">
            <div className="flex justify-center">
              <CheckCircle size={64} className="text-green-500" />
            </div>
            <div>
              <h1 className="text-black text-3xl font-bold font-Quicksand leading-10">Password Changed!</h1>
              <p className="text-gray-600 mt-2">Your password has been successfully reset</p>
            </div>
            
            <button 
              onClick={() => window.location.href = '/signin'}
              className="w-full h-12 bg-blue-500 rounded-xl text-white text-sm font-bold font-Quicksand hover:bg-blue-600 transition-colors"
            >
              Sign In
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full min-h-screen bg-white flex justify-center items-center p-4">
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Side: Form */}
        <div className="flex flex-col justify-center items-center lg:items-start">
          {renderStep()}
        </div>

        {/* Right Side: Image */}
        <div className="hidden lg:flex justify-center items-center">
          <Image 
            className="rounded-[40px]" 
            src={ResetPasswordImage} 
            alt="A child learning on a computer" 
            style={{ objectFit: 'cover' }} 
          />
        </div>
      </div>
    </div>
  );
}
