"use client";

import React from 'react';
import { FiTarget, FiHelpCircle } from 'react-icons/fi';
import { PiTimerBold } from "react-icons/pi";
import { BsGrid3X3 } from "react-icons/bs";
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import SubtractionCard from './subtractionCard/page';
import { useGetTopScoreSubtractionQuery } from '@/Redux/features/subtraction/subtractionApi';
import ChallengeCard from '@/components/challengeCard';
import { useDictionary } from '@/hook/useDictionary';

const subtractionExercises = {
  noBorrowing: [
    { range: '0 to 10', star : 1 },
    { range: '0 to 20', star : 2 },
    { range: '0 to 50', star : 3 },
    { range: '0 to 100', star : 4 },
  ],
  borrowing: [
    { range: '0 to 20', star : 1 },
    { range: '0 to 50', star : 2 },
    { range: '0 to 100', star : 3 },
  ],
};


export default function SubtractionPage() {
  const {data} = useGetTopScoreSubtractionQuery();

  const { dictionary, loading } = useDictionary();
  const subtractionOperation = dictionary?.operations?.subtraction;
  const sharedSection = dictionary?.shared;
  const challenges = sharedSection?.challenge_section?.challenges

  if (!subtractionOperation || !challenges || loading) {
    return null;
  }

  const noMistakeTopScore = data?.data?.find(item => item.challenge_type === "NO_MISTAKE")?.display_top_score;
  const speedModeTopScore = data?.data?.find(item => item.challenge_type === "SPEED_MODE")?.display_top_score;
  const hundredQuestionTopScore = data?.data?.find(item => item.challenge_type === "100_QUESTIONS")?.display_top_score;
  const whatsMissingTopScore = data?.data?.find(item => item.challenge_type === "WHATS_MISSING")?.display_top_score;

  const subtractionChallenges = [
    { icon: <FiTarget />, title: challenges?.no_mistake?.title, description: challenges?.no_mistake?.description, bgColor: 'bg-gradient-to-b from-red-300 to-red-400', link: '/dashboard/subtraction/challenges/no-mistake', display_top_score: noMistakeTopScore },
    { icon: <PiTimerBold />, title: challenges?.speed_mode?.title, description: challenges?.speed_mode?.description, bgColor: 'bg-gradient-to-b from-blue-300 to-blue-400', link: '/dashboard/subtraction/challenges/speed-mode', display_top_score: speedModeTopScore },
    { icon: <BsGrid3X3 />, title: challenges?.hundred_questions?.title, description: challenges?.hundred_questions?.description, bgColor: 'bg-gradient-to-b from-orange-300 to-orange-400', link: '/dashboard/subtraction/challenges/100-questions', display_top_score: hundredQuestionTopScore },
    { icon: <FiHelpCircle />, title: challenges?.whats_missing?.title, description: challenges?.whats_missing?.description, bgColor: 'bg-gradient-to-b from-indigo-300 to-indigo-400', link: "/dashboard/subtraction/challenges/whats-missing", display_top_score: whatsMissingTopScore },
];
  return (
    <div className="max-w-[1152px] mx-auto space-y-8 p-4">
       <div className="mb-4">
        <Link href="/dashboard" className="text-gray-800 text-[20px] font-bold inline-flex justify-center items-center gap-2">
            <ArrowLeft /> {sharedSection?.navigation?.go_back}
          </Link>
      </div>
      {/* Subtraction Exercise Section */}
      <div className="rounded-lg">
        <div className="p-4 bg-gradient-to-br from-pink-400 to-pink-500 rounded-t-lg">
          <h2 className="text-xl font-bold text-white">{subtractionOperation?.name} {sharedSection?.exercise_section?.title}</h2>
        </div>
        <div className="px-0 md:px-6 py-6">
          <div className="grid grid-cols-2 gap-3 md:gap-6">
            <div>
              <div className="p-3 mb-4 text-center text-black bg-pink-200 rounded">
                <h3 className="font-semibold">{subtractionOperation?.terms?.no_borrow}</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {subtractionExercises.noBorrowing.map((ex, index) => (
                  <SubtractionCard key={index} operation="noBorrowing" {...ex} />
                ))}
              </div>
            </div>
            <div>
              <div className="p-3 mb-4 text-center text-black bg-pink-200 rounded">
                <h3 className="font-semibold">{subtractionOperation?.terms?.borrow}</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {subtractionExercises.borrowing.map((ex, index) => (
                  <SubtractionCard key={index} operation="borrowing" {...ex} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subtraction Challenges Section */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 bg-gradient-to-br from-pink-400 to-pink-500 rounded-t-lg">
          <h2 className="text-xl font-bold text-white">{subtractionOperation?.name} {sharedSection?.challenge_section?.title}</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {subtractionChallenges.map((challenge, index) => (
              <Link href={challenge.link} key={index}>
                <ChallengeCard iconColor="text-white" {...challenge} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}