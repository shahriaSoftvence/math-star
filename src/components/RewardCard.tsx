import { useDictionary } from '@/hook/useDictionary';
import Image from 'next/image';
import React from 'react';
import { IoStarSharp } from 'react-icons/io5';

type RewardCardProps = {
  icon: string;
  title: string;
  // description: string;
  star_range: number;
  isUnlocked: boolean;
};

export default function RewardCard({ icon, title, star_range, isUnlocked }: RewardCardProps) {
  const cardBorder = isUnlocked ? 'border-green-300' : 'border-gray-200';
  const cardOpacity = isUnlocked ? '' : 'opacity-75';

  const { dictionary, loading } = useDictionary();
    const rewards = dictionary?.rewards;
  
    if (!rewards || loading) {
      return null;
    }

  return (
    <div
  className={`bg-white rounded-3xl shadow-lg p-6 flex flex-col items-center text-center transition-all border-2 
  ${isUnlocked && "hover:shadow-xl hover:scale-105"} ${cardBorder} ${cardOpacity}`}
  style={{ minHeight: "350px" }} // optional: ensures a consistent card height
>
  {/* Top content */}
  <div className="flex flex-col items-center flex-grow">
    <Image width={120} height={120} src={icon} alt="icon" />
    <h3 className="text-2xl font-bold my-8 text-gray-800">{title}</h3>
    {/* <p className="text-sm text-gray-600 my-2 h-20">{description}</p> */}
    
  </div>

  {/* Button always at bottom */}
  <div className="flex items-center gap-1.5 mb-5">
      <IoStarSharp className="text-yellow-500 text-3xl" />
      <span className="text-2xl font-bold text-gray-700">{star_range.toLocaleString()}</span>
    </div>
  {isUnlocked ? (
    <div className="w-full px-6 py-2 bg-green-100 text-green-800 rounded-full font-bold mt-auto">
      {rewards?.reward_card.unlocked}
    </div>
  ) : (
    <div className="w-full px-6 py-2 bg-blue-500 text-white rounded-full font-bold mt-auto">
      {rewards?.reward_card.locked}
    </div>
  )}
</div>

  );
}