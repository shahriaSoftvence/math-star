import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { IoStarSharp } from 'react-icons/io5';
import RewardCard from '@/components/RewardCard';

const rewardsData = [
  {
    icon: '🥇',
    title: 'Bright Spark',
    description: 'First reward! Shows kids their journey has started. Instant encouragement.',
    cost: 100,
    isUnlocked: true,
  },
  {
    icon: '🥷',
    title: 'Number Ninja',
    description: 'Adds excitement – they feel fast, smart, and skillful.',
    cost: 300,
    isUnlocked: true,
  },
  {
    icon: '🧩',
    title: 'Puzzle Champ',
    description: 'Recognizes consistency – they\'ve been solving regularly.',
    cost: 600,
    isUnlocked: false,
  },
  {
    icon: '⭐',
    title: 'Gold Star',
    description: 'Classic school symbol – kids recognize it and feel proud.',
    cost: 1000,
    isUnlocked: false,
  },
  {
    icon: '🏆',
    title: 'Math Explorer',
    description: 'Adds storytelling – they\'re exploring the world of numbers.',
    cost: 1500,
    isUnlocked: false,
  },
  {
    icon: '💎',
    title: 'Diamond Star',
    description: 'Premium look – a shiny milestone for kids to reach toward.',
    cost: 2500,
    isUnlocked: false,
  },
  {
    icon: '💪',
    title: 'Challenge Crusher',
    description: 'Tied to Challenge Mode – encourages trying harder problems.',
    cost: 4000,
    isUnlocked: false,
  },
  {
    icon: '👑',
    title: 'Math Crown',
    description: 'Royal feel – makes them feel special and advanced.',
    cost: 5000,
    isUnlocked: false,
  },
  {
    icon: '🦸',
    title: 'Star Hero',
    description: 'Creates identity – now they\'re not just learning, they\'re a math hero!',
    cost: 7000,
    isUnlocked: false,
  },
  {
    icon: '♾️',
    title: 'Infinity Genius',
    description: 'Ultimate title – only the most consistent and top performers reach this. High prestige.',
    cost: 10000,
    isUnlocked: false,
  },
];


export default function RewardsPage() {
  const userStars = 1250;

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
          <span className="text-4xl font-bold">{userStars.toLocaleString()}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {rewardsData.map((reward) => (
          reward.title === 'Infinity Genius' ? (
            <div key={reward.title} className="w-full max-w-[896px] md:col-span-3 p-6 opacity-75 bg-white rounded-3xl shadow-lg flex flex-col items-center gap-4 mx-auto  transition-all hover:shadow-xl hover:scale-105 border-2">
              <div className="text-6xl">{reward.icon}</div>
              <h3 className="text-gray-800 text-xl font-bold text-center">{reward.title}</h3>
              <p className="text-gray-600 text-sm text-center max-w-[185px] mx-auto">
                {reward.description.split('\n').map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </p>
              <div className="flex items-center justify-center gap-2 mt-4 ">
                <div className="w-5 h-5 flex items-center justify-center">
                  <IoStarSharp className="w-4 h-4 text-yellow-500 " />
                </div>
                <span className="text-gray-700 text-lg font-bold">{reward.cost.toLocaleString()}</span>
              </div>
              <button className={`px-6 py-2 ${reward.isUnlocked ? 'bg-green-500' : 'bg-blue-500'} text-white font-bold rounded-full mt-4 hover:bg-blue-600 transition-colors`}>
                {reward.isUnlocked ? 'Unlocked' : 'Unlock'}
              </button>
            </div>
          ) : (
            <RewardCard key={reward.title} {...reward} />
          )
        ))}
      </div>
    </div>
  );
}