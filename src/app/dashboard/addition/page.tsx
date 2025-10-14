"use client";

import React from 'react';
import { FiTarget, FiHelpCircle } from 'react-icons/fi';
import { PiTimerBold } from "react-icons/pi";
import { BsGrid3X3 } from "react-icons/bs";
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import AdditionCard from './additionCard/page';
import { useGetTopScoreAdditionQuery } from '@/Redux/features/addition/additionApi';
import ChallengeCard from '@/components/challengeCard';
import { useDictionary } from '@/hook/useDictionary';

const additionExercises = {
  noCarry: [
    { range: '0 to 10', star: 1 },
    { range: '0 to 20', star: 2 },
    { range: '0 to 50', star: 3 },
    { range: '0 to 100', star: 4 },
  ],
  carry: [
    { range: '0 to 20', star: 1 },
    { range: '0 to 50', star: 2 },
    { range: '0 to 100', star: 3 },
  ],
};



export default function AdditionPage() {

  const { data } = useGetTopScoreAdditionQuery();

  const { dictionary, loading } = useDictionary();
  const additionOperation = dictionary?.operations?.addition;
  const sharedSection = dictionary?.shared;
  const challenges = sharedSection?.challenge_section?.challenges

  if (!additionOperation || !challenges || loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-green-50 to-purple-50">
        <p className="text-lg font-semibold text-gray-600">{dictionary?.shared?.loading?.loading}</p>
      </div>
    );
  }

  const noMistakeTopScore = data?.data?.find(item => item.challenge_type === "NO_MISTAKE")?.display_top_score;
  const speedModeTopScore = data?.data?.find(item => item.challenge_type === "SPEED_MODE")?.display_top_score;
  const hundredQuestionTopScore = data?.data?.find(item => item.challenge_type === "100_QUESTIONS")?.display_top_score;
  const whatsMissingTopScore = data?.data?.find(item => item.challenge_type === "WHATS_MISSING")?.display_top_score;



  const additionChallenges = [
    { icon: <FiTarget />, title: challenges?.no_mistake?.title, description: challenges?.no_mistake?.description, bgColor: 'bg-gradient-to-b from-red-300 to-red-400', link: '/dashboard/addition/challenges/no-mistake', display_top_score: noMistakeTopScore },
    { icon: <PiTimerBold />, title: challenges?.speed_mode?.title, description: challenges?.speed_mode?.description, bgColor: 'bg-gradient-to-b from-blue-300 to-blue-400', link: '/dashboard/addition/challenges/speed-mode', display_top_score: speedModeTopScore },

    { icon: <BsGrid3X3 />, title: challenges?.hundred_questions?.title, description: challenges?.hundred_questions?.description, bgColor: 'bg-gradient-to-b from-orange-300 to-orange-400', link: '/dashboard/addition/challenges/100-questions', display_top_score: hundredQuestionTopScore },

    { icon: <FiHelpCircle />, title: challenges?.whats_missing?.title, description: challenges?.whats_missing?.description, bgColor: 'bg-gradient-to-b from-indigo-300 to-indigo-400', link: "/dashboard/addition/challenges/whats-missing", display_top_score: whatsMissingTopScore },
  ];

  return (
    <div className="max-w-[1152px] mx-auto space-y-8 p-4">
      <div className="mb-4">
        <Link href="/dashboard" className="text-gray-800 text-[20px] font-bold inline-flex justify-center items-center gap-2">
          <ArrowLeft /> {sharedSection?.navigation?.go_back}
        </Link>
      </div>
      {/* Addition Exercise Section */}
      <div className="rounded-lg ">
        <div className="p-4 bg-gradient-to-br from-blue-400 to-blue-500 rounded-t-lg">
          <h2 className="text-xl font-bold text-white">{additionOperation?.name} {sharedSection?.exercise_section?.title}</h2>
        </div>
        <div className="px-0 md:px-6 py-6">
          <div className="grid grid-cols-2 gap-3 md:gap-6">
            <div>
              <div className="p-3 mb-4 text-center text-sm md:text-base text-black bg-blue-200 rounded">
                <h3 className="font-semibold">{additionOperation?.terms?.no_carry}</h3>
              </div>
              <div className="grid grid-cols-1  sm:grid-cols-2 gap-4">
                {additionExercises.noCarry.map((ex, index) => (
                  <AdditionCard key={index} operation="noCarry" {...ex} />
                ))}
              </div>
            </div>
            <div>
              <div className="p-3 mb-4 text-center text-sm md:text-base text-black bg-blue-200 rounded">
                <h3 className="font-semibold">{additionOperation?.terms?.carry}</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {additionExercises.carry.map((ex, index) => (
                  <AdditionCard key={index} operation="carry" {...ex} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Addition Challenges Section */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 bg-gradient-to-br from-blue-400 to-blue-500 rounded-t-lg">
          <h2 className="text-xl font-bold text-white">{additionOperation?.name} {sharedSection?.challenge_section?.title}</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
            {additionChallenges.map((challenge, index) => (
              <Link
                href={challenge.link}
                key={index}
                className="cursor-pointer"
              >
                <ChallengeCard iconColor="text-white" {...challenge} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}