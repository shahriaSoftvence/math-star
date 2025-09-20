"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ShieldAlert } from 'lucide-react';
import { IoStarSharp } from 'react-icons/io5';
import RewardCard from '@/components/RewardCard';
import { useGetRewardsQuery } from '@/Redux/reward/rewardApi';
import { useGetProfileQuery } from '@/Redux/features/auth/authApi';

interface Reward {
  name: string;
  description: string;
  star_range: number;
  icon?: string;
  unlocked?: boolean | false;
}

export default function RewardsPage() {
  // Fetch rewards list and user's star balance
  const { data: rewardsResponse, isLoading: rewardsLoading, isError: rewardsError } = useGetRewardsQuery({});

  const { data } = useGetProfileQuery();

  // Handle loading and error states
  if (rewardsLoading) {
    return <div className='flex justify-center my-12' role="status">
      <svg aria-hidden="true" className="inline w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-orange-400 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  }

  if (rewardsError) {
    return <div className='text-red-500 flex justify-center my-12 text-lg font-medium'><ShieldAlert className='mr-2' />Could not load rewards. Please try again later !</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-8 flex items-center gap-4">
        <Link href="/dashboard" className="p-2 rounded-full hover:bg-gray-200 transition-colors">
          <ArrowLeft className="text-gray-700" />
        </Link>
        <h1 className="text-3xl font-bold text-gray-800">Star Rewards</h1>
      </div>

      <div className="p-6 mb-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-3xl shadow-lg text-white text-center">
        <h2 className="text-2xl font-bold">Your Star Balance</h2>
        <div className="flex items-center justify-center gap-2 mt-2">
          <IoStarSharp className="text-4xl" />
          <span className="text-4xl font-bold">{data?.data?.star}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {rewardsResponse?.data?.map((reward: Reward) => (
          <RewardCard
            key={reward?.name}
            icon={reward?.icon || '⭐'}
            title={reward?.name}
            description={reward?.description}
            star_range={reward?.star_range}
            isUnlocked={reward?.unlocked || false}
          />
        ))}
      </div>
    </div>
  );
}