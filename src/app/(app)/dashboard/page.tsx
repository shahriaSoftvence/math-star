/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"; // Required for using hooks like useGetDailySummaryQuery

import PracticeCard from '@/components/PracticeCard';
import ActivityItem from '@/components/ActivityItem';
import { Plus, Minus, X, Divide, Star } from 'lucide-react';
import { IoStarSharp } from "react-icons/io5";
import BadgeBronze from '../../../../public/assets/Bronje.png';
import Image from 'next/image';
import Link from 'next/link';
import { useGetDailySummaryQuery } from '@/Redux/reward/rewardApi'; // Import the new hook
import { Key } from 'react';

const practiceItems = [
  { link: "/addition", icon: <Plus />, title: "Practice Addition", description: "Improve your basic sums", bgColor: "bg-gradient-to-br from-yellow-300 to-yellow-400 ", textColor: "text-yellow-800", iconColor: "text-yellow-500" },
  { link: "/subtraction", icon: <Minus />, title: "Practice Subtraction", description: "Sharpen your subtraction skills", bgColor: "bg-gradient-to-br from-pink-300 to-pink-400", textColor: "text-pink-800", iconColor: "text-pink-500" },
  { link: "/multiplication", icon: <X />, title: "Practice Multiplication", description: "Master your times tables", bgColor: "bg-gradient-to-br from-green-300 to-green-400", textColor: "text-green-800", iconColor: "text-green-500" },
  { link: "/division", icon: <Divide />, title: "Practice Division", description: "Divide and conquer", bgColor: "bg-gradient-to-br from-purple-300 to-purple-400", textColor: "text-purple-800", iconColor: "text-purple-500" },
];

export default function Home() {
  // Fetch data from the backend
  const { data: summary, isLoading, isError } = useGetDailySummaryQuery({});

  // Handle loading and error states
  if (isLoading) {
    return <div>Loading your progress...</div>;
  }

  if (isError || !summary) {
    return <div>Could not load your progress. Please try again later.</div>;
  }
  
  const { 
    goal_progress: dailyGoalProgress = 0,
    practice_time: practiceTime = 0,
    stars_earned_today: starsEarnedToday = 0,
    recent_sessions: activityItems = [],
    lifetime_stars: starBalance = 0,
   } = summary;

  return (
    <div className="space-y-8 max-w-[1104px] mx-auto">
      {/* Choose Your Practice */}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">Choose Your Practice</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {practiceItems.map((item, index) => (
            <Link href={item.link} key={index}>
              <PracticeCard {...item} />
            </Link>
          ))}
        </div>
      </div>

      {/* Progress and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl">
          <h3 className="font-semibold mb-6 text-gray-800">Your Progress Today</h3>
          <div className="space-y-5">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Practice Time:</span>
              <span className="font-medium text-[#2563EB]">{practiceTime} Minutes</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Stars Earned:</span>
              <div className="font-medium text-yellow-500 flex items-center">
                <span>{starsEarnedToday}</span>
                <Star size={16} className="ml-1 fill-[#EAB308] " />
              </div>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Best Challenge Score:</span>
              <span className="font-medium text-gray-800">🏆 92/100</span>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-500">Daily Goal Progress:</span>
                <span className="font-medium text-gray-800">{dailyGoalProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-gradient-to-r from-blue-400 to-purple-500 h-2.5 rounded-full" style={{ width: `${dailyGoalProgress}%` }}></div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl">
          <h3 className="font-semibold mb-6 text-gray-800">Recent Activity</h3>
          <div className="space-y-4">
            {activityItems.length > 0 ? (
              activityItems.map((item: { category_name: any; mode: any; correct: any; total: any; stars_earned: number; }, index: Key | null | undefined) => (
                <ActivityItem key={index} title={`${item.category_name} - ${item.mode}`} score={`${item.correct}/${item.total} correct`} stars={item.stars_earned} />
              ))
            ) : (
              <p className="text-gray-500 text-sm">No recent activity to show.</p>
            )}
          </div>
        </div>
      </div>

      {/* Your Star Balance */}
      <Link href="/rewards">
        <div className="relative bg-gradient-to-r from-yellow-400 to-orange-400 p-6 rounded-2xl text-white flex justify-between items-center shadow-lg">
          <div>
            <h3 className="font-semibold text-lg">Your Star Balance</h3>
            <p className="text-5xl font-bold my-1 flex gap-2"><IoStarSharp /> {starBalance.toLocaleString()}</p>
            <p className="text-sm opacity-80">Top up to win rewards</p>
          </div>
          <div className="text-7xl absolute top-0 right-0">
            <Image src={BadgeBronze} alt='Badge' />
          </div>
        </div>
      </Link>
    </div>
  );
}