"use client";

import PracticeCard from '@/components/PracticeCard';
import { Plus, Minus, X, Divide, Star, ShieldAlert } from 'lucide-react';
import { IoStarSharp } from "react-icons/io5";
import Image from 'next/image';
import Link from 'next/link';
import { useIsPremium } from '@/Redux/hooks';
import { useGetProgressQuery } from '@/Redux/reward/rewardApi';
import { useGetProfileQuery } from '@/Redux/features/auth/authApi';
import rewardsBadge from '../../../public/rewards.png';
import LoadingFile from '@/asset/loader.svg'

const practiceItems = [
  { link: "/dashboard/addition", icon: <Plus />, title: "Practice Addition", description: "Improve your basic sums", bgColor: "bg-gradient-to-br from-yellow-300 to-yellow-400 ", textColor: "text-yellow-800", iconColor: "text-yellow-500" },
  { link: "/dashboard/subtraction", icon: <Minus />, title: "Practice Subtraction", description: "Sharpen your subtraction skills", bgColor: "bg-gradient-to-br from-pink-300 to-pink-400", textColor: "text-pink-800", iconColor: "text-pink-500" },
  { link: "/dashboard/multiplication", icon: <X />, title: "Practice Multiplication", description: "Master your times tables", bgColor: "bg-gradient-to-br from-green-300 to-green-400", textColor: "text-green-800", iconColor: "text-green-500" },
  { link: "/dashboard/division", icon: <Divide />, title: "Practice Division", description: "Divide and conquer", bgColor: "bg-gradient-to-br from-purple-300 to-purple-400", textColor: "text-purple-800", iconColor: "text-purple-500" },
];

export default function Home() {

  const isPremium = useIsPremium();
  const { data: summary, isLoading, isError } = useGetProgressQuery();
  const progress = summary?.data?.progress_today;
  const activities = summary?.data?.recent_activities;
  const { data } = useGetProfileQuery();

  // console.log(isPremium)

  if (isLoading) {
    return (
      <div className='flex justify-center my-12' role="status">
        <LoadingFile className="inline w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" />
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  if (isError || !summary) {
    return <div className='text-red-500 flex justify-center my-12 text-lg font-medium'><ShieldAlert className='mr-2' />Could not load your process. Please try again later !</div>;
  }


  return (
    <div className="space-y-8 mt-8 max-w-[1104px] mx-auto">
      {/* Choose Your Practice */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {practiceItems.map((item, index) => {
          // Only allow click if user has subscription or it's the Addition card
          const isActive = isPremium || item.link === "/dashboard/addition";

          return (
            <Link
              href={isActive ? item.link : ""}
              key={index}
              className={`relative block rounded-2xl overflow-hidden ${isActive ? "cursor-pointer hover:scale-105 transition-transform" : "opacity-25 cursor-not-allowed"
                }`}
            >
              <PracticeCard {...item} />
              
            </Link>
          );
        })}
      </div>


      {/* Progress and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl">
          <h3 className="font-semibold mb-6 text-gray-800">Your Progress Today</h3>
          <div className="space-y-7">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Practice Time:</span>
              <span className="font-medium text-[#2563EB]">{progress?.practice_time_minutes} Minutes</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Stars Earned:</span>
              <div className="font-medium text-yellow-500 flex items-center">
                <span className='text-[#2563EB]'>{progress?.stars_earned}</span>
                <Star size={16} className="ml-1 fill-[#EAB308]" />
              </div>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Best Challenge Score:</span>
              <span className="font-medium text-green-500">🏆 {progress?.best_challenge_score}</span>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-500">Daily Goal Progress:</span>
                <span className="font-medium text-gray-800">{progress?.daily_goal_progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-gradient-to-r from-blue-400 to-purple-500 h-2.5 rounded-full" style={{ width: `${progress?.daily_goal_progress}%` }}></div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl">
          <h3 className="font-semibold mb-6 text-gray-800">Recent Activity</h3>
          <div className="space-y-2">
            {summary?.data?.recent_activities_count > 0 ? (
              activities?.map((activity, idx) => (
                <div className='bg-[#f5f5f5] p-3 rounded-lg text-sm flex justify-between items-center' key={idx}>
                  <p className="text-sidebar-primary">{activity?.description}</p>
                  <span className='flex items-center gap-1'>
                    <Star size={20} className="fill-[#EAB308] stroke-0" />
                    <span className="text-[#eab308] font-semibold text-base">{String(activity?.stars).padStart(2, "0")}</span>
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No recent activity to show.</p>
            )}

          </div>
        </div>
      </div>

      {/* Your Star Balance */}
      <Link href="/dashboard/rewards">
        <div className="bg-gradient-to-r from-yellow-400 to-orange-400 px-6 py-4 rounded-2xl text-white flex justify-between items-center shadow-lg">
          <div>
            <h3 className="font-semibold text-xl">Your Star Balance</h3>
            <p className="text-5xl font-bold my-1 flex gap-2"><IoStarSharp /> {data?.data?.star.toLocaleString() || 0}</p>
            <p className="text-sm font-medium opacity-90">Top up to win Rewards</p>
          </div>
          <div className="">
            <Image src={data?.data?.reward?.icon ? `${process.env.NEXT_PUBLIC_BASE_URL}${data?.data?.reward?.icon}` : rewardsBadge} alt='Badge' width={120} height={120} />
          </div>
        </div>
      </Link>
    </div>
  );
}