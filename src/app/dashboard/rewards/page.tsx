"use client"; 

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { IoStarSharp } from 'react-icons/io5';
import RewardCard from '@/components/RewardCard';
import { useGetRewardsQuery, useGetDailySummaryQuery } from '@/Redux/reward/rewardApi';
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

  const {data} = useGetProfileQuery();

  console.log(rewardsResponse?.data)
  const { data: summary, isLoading: summaryLoading, isError: summaryError } = useGetDailySummaryQuery({});
  
  // Handle the response structure - it might be wrapped in a data property
  const rewardsData = Array.isArray(rewardsResponse) ? rewardsResponse :
                      (rewardsResponse?.data && Array.isArray(rewardsResponse.data)) ? rewardsResponse.data :
                      (rewardsResponse?.rewards && Array.isArray(rewardsResponse.rewards)) ? rewardsResponse.rewards : [];
  
  const userStars = summary?.lifetime_stars || 0;

  // Handle loading and error states
  if (rewardsLoading || summaryLoading) {
    return <div>Loading rewards...</div>;
  }

  if (rewardsError || summaryError) {
    return <div>Could not load rewards. Please try again later.</div>;
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
            icon={reward?.icon || '⭐'} // Use a default icon if none provided
            title={reward?.name}
            description={reward?.description}
            star_range={reward?.star_range}
            isUnlocked={reward?.unlocked || false} // Logic to check if reward is unlocked
          />
        ))}
      </div>
    </div>
  );
}