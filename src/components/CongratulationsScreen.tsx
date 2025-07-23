'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import FallingStars from './FallingStars';
import { motion } from 'framer-motion';

type Props = {
  onContinue: () => void;
  rewardName?: string;
};

export default function CongratulationsScreen({ onContinue, rewardName = "Bright Spark" }: Props) {
  const router = useRouter();

  return (
    <div className="w-full h-screen bg-gradient-to-b from-purple-400 via-pink-400 to-yellow-400 flex justify-center items-center overflow-hidden fixed top-0 left-0 z-10">
      <FallingStars />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, type: 'spring' }}
        className="w-full max-w-md p-8 bg-white/80 rounded-3xl shadow-2xl backdrop-blur-md flex flex-col items-center text-center gap-4 z-11"
      >
        {/* Medal Icon */}
        <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full shadow-lg flex justify-center items-center">
          <span className="text-6xl" role="img" aria-label="medal">🥇</span>
        </div>

        {/* Heading */}
        <h1 className="text-gray-800 text-4xl font-bold">
          🎉 Congratulations! 🎉
        </h1>
        
        {/* Unlocked Reward Text */}
        <div>
          <p className="text-gray-700 text-xl">You have unlocked:</p>
          <p className="text-gray-800 text-2xl font-bold mt-1">{rewardName}</p>
        </div>

        {/* Encouragement Message */}
        <p className="text-gray-600 text-base">
          Keep up the amazing work! Your dedication to learning math is paying off!
        </p>
        
        {/* Action Buttons */}
        <div className="w-full mt-4 flex flex-col items-center gap-3">
          <button
            onClick={() => {
              /* Add navigation to rewards page if it exists */
            }}
            className="w-full py-3 text-lg font-bold text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg transition-transform transform hover:scale-105"
          >
            View All Rewards
          </button>
          <button
            onClick={onContinue}
            className="w-full py-3 text-lg font-bold text-slate-950 bg-slate-50 rounded-full border-2 border-gray-300 transition-transform transform hover:scale-105"
          >
            Continue Learning
          </button>
        </div>
      </motion.div>
    </div>
  );
}