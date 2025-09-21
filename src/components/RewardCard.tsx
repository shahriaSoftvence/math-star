import React from 'react';
import { IoStarSharp } from 'react-icons/io5';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import Image from 'next/image';

type RewardCardProps = {
  icon: string;
  title: string;
  description: string;
  star_range: number;
  isUnlocked: boolean;
};

export default function RewardCard({ icon, title, description, star_range, isUnlocked }: RewardCardProps) {
  const cardBorder = isUnlocked ? 'border-green-300' : 'border-gray-200';
  const cardOpacity = isUnlocked ? '' : 'opacity-75';

  return (
    <div className={`bg-white rounded-3xl shadow-lg p-6 flex flex-col items-center text-center transition-all hover:shadow-xl hover:scale-105 border-2 ${cardBorder} ${cardOpacity}`}>
       <Image 
    src={icon}
    alt="User avatar" 
    width={75} 
    height={75} 
    className="rounded-full" 
  />
      <h3 className="text-xl font-bold mt-3 text-gray-800">{title}</h3>
      <p className="text-sm text-gray-600 my-2 h-20">{description}</p>
      <div className="flex items-center gap-2 my-4">
        <IoStarSharp className="text-yellow-500 text-2xl" />
        <span className="text-lg font-bold text-gray-700">{star_range.toLocaleString()}</span>
      </div>
      
      {isUnlocked ? (
        <div className="w-full px-6 py-2 bg-green-100 text-green-800 rounded-full font-bold">
          Unlocked
        </div>
      ) : (
        <button className="w-full px-6 py-2 bg-blue-500 text-white rounded-full font-bold hover:bg-blue-600 transition-colors">
          Lock
        </button>
      )}
    </div>
  );
}