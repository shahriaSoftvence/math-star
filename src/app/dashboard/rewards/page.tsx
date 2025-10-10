"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ShieldAlert } from 'lucide-react';
import { IoStarSharp } from 'react-icons/io5';
import RewardCard from '@/components/RewardCard';
import { useGetProfileQuery } from '@/Redux/features/auth/authApi';
import LoadingFile from '@/asset/loader.svg'
import { useGetRewardsQuery } from '@/Redux/features/reward/rewardApi';
import { useDictionary } from '@/hook/useDictionary';

interface Reward {
  name: string;
  description: string;
  star_range: number;
  icon?: string;
  unlocked?: boolean | false;
}

export default function RewardsPage() {
  const { data: rewardsResponse, isLoading: rewardsLoading, isError: rewardsError } = useGetRewardsQuery({});
  const { data } = useGetProfileQuery();

  const { dictionary, loading } = useDictionary();
  const rewards = dictionary?.rewards;

  if (!rewards || loading) {
    return null;
  }

  if (rewardsLoading) {
    return <div className='flex justify-center mt-4 my-12' role="status">
      <LoadingFile className="inline w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-orange-400 dark:fill-gray-300" />
      <span className="sr-only">{rewards?.loading}</span>
    </div>
  }

  if (rewardsError) {
    return <div className='text-red-500 flex justify-center my-12 text-lg font-medium'><ShieldAlert className='mr-2' />{rewards?.error_message}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-4 p-4">
      <div className="mb-8 flex items-center gap-4">
        <Link href="/dashboard" className="p-2 rounded-full hover:bg-gray-200 transition-colors">
          <ArrowLeft className="text-gray-700" />
        </Link>
        <h1 className="text-3xl font-bold text-gray-800">{rewards?.page_title}</h1>
      </div>

      <div className="p-6 mb-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-3xl shadow-lg text-white text-center">
        <h2 className="text-2xl font-bold">{rewards?.star_balance}</h2>
        <div className="flex items-center justify-center gap-2 mt-2">
          <IoStarSharp className="text-4xl" />
          <span className="text-4xl font-bold">{data?.data?.star}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rewardsResponse?.data?.map((reward: Reward) => (
          <RewardCard
            key={reward?.name}
            icon={`${reward?.icon}` || '⭐'}
            title={reward?.name}
            // description={reward?.description}
            star_range={reward?.star_range}
            isUnlocked={reward?.unlocked || false}
          />
        ))}
      </div>
    </div>
  );
}