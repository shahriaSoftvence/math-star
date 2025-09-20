"use client";

import PracticeCard from '@/components/PracticeCard';
import ActivityItem from '@/components/ActivityItem';
import { Plus, Minus, X, Divide, Star, ShieldAlert } from 'lucide-react';
import { IoStarSharp } from "react-icons/io5";
import BadgeBronze from '../../../public/assets/Bronje.png';
import Image from 'next/image';
import Link from 'next/link';
import { useIsPremium } from '@/Redux/hooks';
import { useGetProgressQuery } from '@/Redux/reward/rewardApi';
import { useGetProfileQuery } from '@/Redux/features/auth/authApi';

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
  const { data } = useGetProfileQuery();

  if (isLoading) {
    return (
      <div className='flex justify-center my-12' role="status">
        <svg aria-hidden="true" className="inline w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  if (isError || !summary) {
    return <div className='text-red-500 flex justify-center my-12 text-lg font-medium'><ShieldAlert className='mr-2' />Could not load your process. Please try again later !</div>;
  }


  return (
    <div className="space-y-8 max-w-[1104px] mx-auto">
      {/* Choose Your Practice */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {practiceItems.map((item, index) => {
          // Only allow click if user has subscription or it's the Addition card
          const isActive = isPremium || item.link === "/dashboard/addition";

          return (
            <Link
              href={isActive ? item.link : "#"} // disable link if not active
              key={index}
              className={`relative block rounded-2xl overflow-hidden ${isActive ? "cursor-pointer hover:scale-105 transition-transform" : "cursor-not-allowed opacity-50"
                }`}
            >
              <PracticeCard {...item} />
              {!isActive && (
                <div className="absolute inset-0 bg-black/10 flex items-center justify-center text-foreground font-bold">
                  Subscription Required
                </div>
              )}
            </Link>
          );
        })}
      </div>


      {/* Progress and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl">
          <h3 className="font-semibold mb-6 text-gray-800">Your Progress Today</h3>
          <div className="space-y-5">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Practice Time:</span>
              <span className="font-medium text-[#2563EB]">{progress?.practice_time_minutes} Minutes</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Stars Earned:</span>
              <div className="font-medium text-yellow-500 flex items-center">
                <span className='text-[#2563EB]'>{progress?.stars_earned}</span>
                <Star size={16} className="ml-1 fill-[#EAB308] " />
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
          <div className="space-y-4">
            {/* {activityItems.length > 0 ? (
              activityItems.map((item: { category_name: any; mode: any; correct: any; total: any; stars_earned: number; }, index: Key | null | undefined) => (
                <ActivityItem key={index} title={`${item.category_name} - ${item.mode}`} score={`${item.correct}/${item.total} correct`} stars={item.stars_earned} />
              ))
            ) : (
              <p className="text-gray-500 text-sm">No recent activity to show.</p>
            )} */}
          </div>
        </div>
      </div>

      {/* Your Star Balance */}
      <Link href="/dashboard/rewards">
        <div className="relative bg-gradient-to-r from-yellow-400 to-orange-400 p-6 rounded-2xl text-white flex justify-between items-center shadow-lg">
          <div>
            <h3 className="font-semibold text-lg">Your Star Balance</h3>
            <p className="text-5xl font-bold my-1 flex gap-2"><IoStarSharp /> {data?.data?.star.toLocaleString() || 0}</p>
            <p className="text-sm opacity-90">Top up to win Rewards</p>
          </div>
          <div className="text-7xl absolute top-0 right-10">
            <Image src={`${process.env.NEXT_PUBLIC_BASE_URL}${data?.data?.reward?.icon}`} alt='Badge' width={100} height={100} />
          </div>
        </div>
      </Link>
    </div>
  );
}