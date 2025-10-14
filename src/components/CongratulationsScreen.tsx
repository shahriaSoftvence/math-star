'use client';

import React, { useEffect, useRef } from 'react';
import FallingStars from './FallingStars';
import { motion } from 'framer-motion';
import pointStar from '../../public/point-star.png';
import Image from 'next/image';
import { useDictionary } from '@/hook/useDictionary';

type Props = {
  onContinue: () => void;
  viewRewards?: () => void;
  rewardName?: string;
  practiceLoading?: boolean;
};

export default function CongratulationsScreen({
  onContinue,
  viewRewards,
  practiceLoading = false,
  rewardName = '0 Star',
}: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio('/Sounds/Congratulation-sound.wav');
    audio.play();
    audioRef.current = audio;

    return () => {
      // stop when component unmounts
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  const handleStopSound = (callback: () => void) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    callback();
  };

  const { dictionary, loading } = useDictionary();
  const congratulations_screen = dictionary?.congratulations_screen;

  if (!congratulations_screen || loading) {
    return null;
  }

  return (
    <div className="w-full h-screen px-4 bg-gradient-to-b from-purple-400 via-pink-400 to-yellow-400 flex justify-center items-center fixed top-0 left-0 z-99">
      <FallingStars />

      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, type: 'spring' }}
        className="w-full max-w-md p-8 bg-white/80 rounded-3xl shadow-2xl backdrop-blur-md flex flex-col items-center text-center gap-4 z-11"
      >
        {/* Medal Icon */}
        <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full shadow-lg flex justify-center items-center">
          <span className="text-6xl" role="img" aria-label="medal">
            🥇
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-gray-800 text-3xl font-bold">
          {congratulations_screen.title}
        </h1>

        {/* Unlocked Reward Text */}
        <div className="flex flex-col items-center gap-2">
          <p className="text-gray-700 text-xl">{congratulations_screen.earned_message}</p>
          <span className="flex items-center gap-2">
            <Image src={pointStar} alt="point star" width={30} height={30} />
            <p className="text-purple-600 text-3xl font-semibold mt-1">
              {rewardName}
            </p>
          </span>
        </div>

        {/* Encouragement Message */}
        <p className="text-gray-600 text-base">
          {congratulations_screen.encouragement}
        </p>

        {/* Action Buttons */}
        {
          practiceLoading ? (
            <div className="w-full mt-4 flex flex-col items-center gap-3">
              <button
                className="w-full py-3 text-lg font-bold text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg transition-transform transform"
              >
                {congratulations_screen.buttons.view_all_rewards}
              </button>
              <button
                className="w-full py-3 text-lg font-bold text-slate-950 bg-slate-50 rounded-full border-2 border-gray-300 transition-transform transform"
              >
                {congratulations_screen.buttons.continue_learning}
              </button>
            </div>
          ) : (
            <div className="w-full mt-4 flex flex-col items-center gap-3">
              <button
                onClick={() => handleStopSound(viewRewards!)}
                className="w-full py-3 text-lg font-bold text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg transition-transform transform hover:scale-105"
              >
                {congratulations_screen.buttons.view_all_rewards}
              </button>
              <button
                onClick={() => handleStopSound(onContinue)}
                className="w-full py-3 text-lg font-bold text-slate-950 bg-slate-50 rounded-full border-2 border-gray-300 transition-transform transform hover:scale-105"
              >
                {congratulations_screen.buttons.continue_learning}
              </button>
            </div>
          )
        }
      </motion.div>
    </div>
  );
}
