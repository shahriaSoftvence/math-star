// src/app/(auth)/reset-password/page.tsx
'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Mail, Lock, Eye, EyeOff, CheckCircle, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import ResetPasswordImage from '@/asset/images/resetpassword.png';
import { useChangePasswordWithResetTokenMutation, useRequestPasswordResetMutation, useVerifyOtpForResetMutation } from '@/Redux/features/auth/authApi';
import { useDictionary } from '@/hook/useDictionary';

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

  const { dictionary, loading } = useDictionary();
  const forgot_password = dictionary?.forgot_password;

  if (!forgot_password || loading) {
    return null;
  }

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error(forgot_password.validation.email_required);
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      const result = await requestPasswordReset({ email }).unwrap();
      if (result.success) {
        toast.success(forgot_password.reset_code_sent, {
          description: forgot_password.reset_code_description.replace('{email}', email),
          duration: 4000,
        });
        setStep('otp');
      }
    } catch (err: unknown) {
      const errorMessage = err && typeof err === 'object' && 'data' in err && 
        typeof err.data === 'object' && err.data && 'message' in err.data && 
        typeof err.data.message === 'string' ? err.data.message : forgot_password.reset_failed;
      toast.error(forgot_password.reset_failed, {
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
      toast.error(forgot_password.validation.code_required);
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      const result = await verifyOtp({ email, otp }).unwrap();
      if (result.success) {
        toast.success(forgot_password.code_verified, {
          description: forgot_password.code_verified_description,
          duration: 4000,
        });
        setResetToken(result.data.reset_token);
        setStep('password');
      }
    } catch (err: unknown) {
      const errorMessage = err && typeof err === 'object' && 'data' in err && 
        typeof err.data === 'object' && err.data && 'message' in err.data && 
        typeof err.data.message === 'string' ? err.data.message : forgot_password.invalid_code;
      toast.error(forgot_password.verification_failed, {
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
      toast.error(forgot_password.validation.password_required);
      return;
    }
    
    if (newPassword !== confirmPassword) {
      toast.error(forgot_password.validation.password_mismatch, {
        description: forgot_password.validation.password_mismatch_description,
        duration: 4000,
      });
      return;
    }
    
    if (newPassword.length < 6) {
      toast.error(forgot_password.validation.password_short, {
        description: forgot_password.validation.password_short_description,
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
        toast.success(forgot_password.password_changed, {
          description: forgot_password.password_changed_description,
          duration: 5000,
        });
        setStep('success');
      }
    } catch (err: unknown) {
      const errorMessage = err && typeof err === 'object' && 'data' in err && 
        typeof err.data === 'object' && err.data && 'message' in err.data && 
        typeof err.data.message === 'string' ? err.data.message : forgot_password.password_change_failed;
      toast.error(forgot_password.password_change_failed, {
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
      toast.info(forgot_password.returned_to_email, {
        description: forgot_password.returned_to_email_description,
        duration: 3000,
      });
    } else if (step === 'password') {
      setStep('otp');
      setNewPassword('');
      setConfirmPassword('');
      toast.info(forgot_password.returned_to_code, {
        description: forgot_password.returned_to_code_description,
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
            <div className="text-center md:text-left">
              <h1 className="text-black text-3xl font-bold font-Quicksand leading-10">{forgot_password.title}</h1>
              <p className="text-gray-600 mt-2">{forgot_password.subtitle}</p>
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
                placeholder={forgot_password.email_placeholder}
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
              {isLoading ? forgot_password.sending : forgot_password.send_reset_code}
            </button>
          </form>
        );

      case 'otp':
        return (
          <form onSubmit={handleVerifyOtp} className="w-full max-w-md flex flex-col gap-6">
            <div className="text-center lg:text-left">
              <h1 className="text-black text-3xl font-bold font-Quicksand leading-10">{forgot_password.enter_code_title}</h1>
              <p className="text-gray-600 mt-2">{forgot_password.enter_code_subtitle.replace('{email}', email)}</p>
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
                placeholder={forgot_password.code_placeholder}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
                className="w-full bg-transparent outline-none text-zinc-900 text-sm font-Quicksand text-center tracking-widest" 
              />
            </div>
            
            <div className="flex gap-3">
              <button 
                type="button"
                onClick={goBack}
                className="flex-1 h-12 border border-gray-300 rounded-xl text-gray-700 text-sm font-bold font-Quicksand hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
              >
                <ArrowLeft size={16} />
                {forgot_password.back}
              </button>
              <button 
                type="submit"
                disabled={isLoading}
                className="flex-1 h-12 bg-blue-500 rounded-xl text-white text-sm font-bold font-Quicksand hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? forgot_password.verifying : forgot_password.verify_code}
              </button>
            </div>
          </form>
        );

      case 'password':
        return (
          <form onSubmit={handleChangePassword} className="w-full max-w-md flex flex-col gap-6">
            <div className="text-center lg:text-left">
              <h1 className="text-black text-3xl font-bold font-Quicksand leading-10">{forgot_password.set_password_title}</h1>
              <p className="text-gray-600 mt-2">{forgot_password.set_password_subtitle}</p>
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
                placeholder={forgot_password.new_password_placeholder}
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
                placeholder={forgot_password.confirm_password_placeholder}
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
                {forgot_password.back}
              </button>
              <button 
                type="submit"
                disabled={isLoading}
                className="flex-1 h-12 bg-blue-500 rounded-xl text-white text-sm font-bold font-Quicksand hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? forgot_password.changing : forgot_password.change_password}
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
              <h1 className="text-black text-3xl font-bold font-Quicksand leading-10">{forgot_password.success_title}</h1>
              <p className="text-gray-600 mt-2">{forgot_password.success_subtitle}</p>
            </div>
            
            <button 
              onClick={() => window.location.href = '/auth/signin'}
              className="w-full h-12 bg-blue-500 rounded-xl text-white text-sm font-bold font-Quicksand hover:bg-blue-600 transition-colors"
            >
              {forgot_password.sign_in}
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full min-h-screen bg-white flex justify-center items-center p-4 lg:p-6">
      <div className="w-full max-w-6xl mx-auto flex flex-col-reverse md:flex-row gap-8 md:gap-4 lg:gap-8 items-center">
        {/* Left Side: Form */}
        <div className="flex flex-col justify-center items-center lg:items-start w-full lg:w-1/2">
          {renderStep()}
        </div>

        {/* Right Side: Image */}
        <div className="flex justify-center items-center w-full lg:w-1/2">
          <Image 
            className="rounded-md lg:rounded-[40px]" 
            src={ResetPasswordImage} 
            alt="A child learning on a computer" 
            style={{ objectFit: 'cover' }} 
          />
        </div>
      </div>
    </div>
  );
}