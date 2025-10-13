'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { User, Mail, Lock, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import SignUpImage from '@/asset/images/signup.png';
import { toast } from 'sonner';
import { useSearchParams } from 'next/navigation';
import { useRegisterMutation, useResendOtpMutation, useVerifyOtpMutation } from '@/Redux/features/auth/authApi';
import { useDictionary } from '@/hook/useDictionary';

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
  const [accepted, setAccepted] = useState(false);
  const [age, setAges] = useState(false);

  const { dictionary, loading } = useDictionary();
  const signupText = dictionary?.signup;

  const searchParams = useSearchParams();
  const redirectTo = searchParams?.get('redirect') || '/dashboard';

  if (!signupText || loading) {
    return null;
  }
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
      toast.error(signupText.password_mismatch);
      return;
    }

    if (formData.password.length < 6) {
      toast.error(signupText.password_short);
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
        toast.success(signupText.registration_success);
      }
    } catch (error: unknown) {
      const errorMessage = error && typeof error === 'object' && 'data' in error &&
        typeof error.data === 'object' && error.data && 'message' in error.data &&
        typeof error.data.message === 'string' ? error.data.message : signupText.registration_failed;
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
        email: email
      }).unwrap();

      if (result.success) {
        toast.success(signupText.otp_success);
        window.location.href = `/auth/signin?redirect=${encodeURIComponent(redirectTo)}`;
      }
    } catch (error: unknown) {
      const errorMessage = error && typeof error === 'object' && 'data' in error &&
        typeof error.data === 'object' && error.data && 'message' in error.data &&
        typeof error.data.message === 'string' ? error.data.message : signupText.otp_failed;
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
        toast.success(signupText.resend_success);
      }
    } catch (error: unknown) {
      const errorMessage = error && typeof error === 'object' && 'data' in error &&
        typeof error.data === 'object' && error.data && 'message' in error.data &&
        typeof error.data.message === 'string' ? error.data.message : signupText.resend_failed;
      toast.error(errorMessage);
    }
  };

  if (step === 2) {
    return (
      <div className="w-full min-h-screen bg-white flex justify-center items-center p-4">
        <div className="w-full max-w-6xl mx-auto flex flex-col-reverse md:flex-row gap-8 md:gap-4 lg:gap-8 items-center">
          {/* Left Side: OTP Form */}
          <div className="flex flex-col justify-center items-center lg:items-start w-full lg:w-1/2">
            <div className="w-full max-w-md flex flex-col gap-6">
              <button
                onClick={goBackToStep1}
                className="flex items-center gap-2 text-blue-500 hover:text-blue-600 transition-colors self-start"
              >
                <ArrowLeft size={20} />
                {signupText.back_to_registration}
              </button>

              <div className="text-center md:text-left">
                <h1 className="text-zinc-900 text-4xl font-bold font-Quicksand">{signupText.otp_title}</h1>
                <p className="text-zinc-600 mt-2">{signupText.otp_sent} {email}</p>
              </div>

              <form onSubmit={handleOtpVerification} className="w-full flex flex-col gap-4">
                <div className="self-stretch h-12 px-5 py-3.5 bg-zinc-100 rounded-xl flex items-center gap-2">
                  <input
                    type="text"
                    placeholder={signupText.otp_placeholder}
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
                  {isVerifying ? signupText.verifying : signupText.verify_otp}
                </button>
              </form>

              <div className="text-center">
                <span className="text-zinc-600 text-sm">{signupText.resend_text} </span>
                <button
                  onClick={handleResendOtp}
                  disabled={isResending}
                  className="text-blue-500 text-sm font-bold hover:underline disabled:opacity-50"
                >
                  {isResending ? signupText.resending : signupText.resend}
                </button>
              </div>

            </div>
          </div>

          {/* Right Side: Image */}
          <div className="flex justify-center items-center w-full lg:w-1/2">
            <Image className="rounded-md lg:rounded-[40px]" src={SignUpImage} alt="A child learning on a computer" style={{ objectFit: 'cover' }} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-white flex justify-center items-center p-4 lg:p-6">
      <div className="w-full max-w-6xl mx-auto flex flex-col-reverse md:flex-row gap-8 md:gap-4 lg:gap-8 items-center">
        {/* Left Side: Form */}
        <div className="flex flex-col justify-center items-center lg:items-start w-full lg:w-1/2">
          <div className="w-full max-w-md flex flex-col gap-6">
            <div className="text-center md:text-left">
              <h1 className="text-zinc-900 text-4xl font-bold font-Quicksand">{signupText.title}</h1>
            </div>

            <form onSubmit={handleRegister} className="w-full flex flex-col gap-4">
              <div className="self-stretch h-12 px-5 py-3.5 bg-zinc-100 rounded-xl flex items-center gap-2">
                <User size={20} className="text-zinc-600" />
                <input
                  type="text"
                  name="name"
                  placeholder={signupText.full_name_placeholder}
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
                  placeholder={signupText.email_placeholder}
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
                  placeholder={signupText.password_placeholder}
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
              <div>
                <div className="self-stretch h-12 px-5 py-3.5 bg-zinc-100 rounded-xl flex items-center gap-2">
                  <Lock size={20} className="text-zinc-600" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirm_password"
                    placeholder={signupText.confirm_password_placeholder}
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
                <div className="ml-2 mt-2 flex items-center gap-2">
                  <input
                    className="w-4 h-4"
                    type="checkbox"
                    id="age"
                    checked={age}
                    onChange={(e) => setAges(e.target.checked)}
                  />
                  <label
                    htmlFor="age"
                    className="text-zinc-900 text-sm font-Quicksand italic cursor-pointer"
                  >
                    {signupText.age_checkbox}
                  </label>
                </div>

              </div>
              <div>
                <div className="ml-2 mt-2 flex items-center gap-2">
                  <input
                    className="w-4 h-4"
                    type="checkbox"
                    id="terms"
                    checked={accepted}
                    onChange={(e) => setAccepted(e.target.checked)}
                  />
                  <label
                    htmlFor="terms"
                    className="text-zinc-900 text-sm font-Quicksand italic cursor-pointer"
                  >
                    {signupText.terms_text}{" "}
                    <Link
                      className="text-blue-500 text-sm font-bold font-Quicksand hover:underline"
                      href="/terms"
                    >
                      {signupText.terms_link}
                    </Link>
                    .
                  </label>
                </div>
                <button
                  type="submit"
                  disabled={isRegistering || !accepted || !age}
                  className="self-stretch h-12 px-4 py-3 w-full mt-1.5 bg-blue-500 rounded-xl text-white text-sm font-bold font-Quicksand hover:bg-blue-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isRegistering ? signupText.creating_account : signupText.next}
                </button>
              </div>

            </form>

            <div className="text-center mt-4">
              <span className="text-zinc-900 text-sm font-Quicksand">{signupText.have_account} </span>
              <Link href={`/auth/signin?redirect=${encodeURIComponent(redirectTo)}`} className="text-blue-500 text-sm font-bold font-Quicksand hover:underline">
                {signupText.signin}
              </Link>
            </div>
          </div>
        </div>

        {/* Right Side: Image */}
        <div className="flex justify-center items-center w-full lg:w-1/2">
          <Image className="rounded-md lg:rounded-[40px]" src={SignUpImage} alt="A child learning on a computer" style={{ objectFit: 'cover' }} />
        </div>
      </div>
    </div>
  );
}