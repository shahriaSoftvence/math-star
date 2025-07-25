import React from 'react';
import { FiTarget, FiHelpCircle } from 'react-icons/fi';
import ChallengeCard from '@/components/ChallengeCard';
import ExerciseCard from '@/components/ExerciseCard';
import { PiTimerBold } from "react-icons/pi";
import { BsGrid3X3 } from "react-icons/bs";
import Link from 'next/link';

const additionExercises = {
  noCarry: [
    { range: '0 to 10', percentage: 78 },
    { range: '0 to 20', percentage: 78 },
    { range: '0 to 50', percentage: 78 },
    { range: '0 to 100', percentage: 78 },
  ],
  carry: [
    { range: '0 to 20', percentage: 78 },
    { range: '0 to 50', percentage: 78 },
    { range: '0 to 100', percentage: 78 },
  ],
};

const additionChallenges = [
    { icon: <FiTarget />, title: 'No Mistake', description: 'One mistake ends the session', bgColor: 'bg-gradient-to-b from-red-300 to-red-400', link: '/addition/challenges/no-mistake' },
    { icon: <PiTimerBold />, title: 'Speed Mode', description: 'Race against time!', bgColor: 'bg-gradient-to-b from-blue-300 to-blue-400', link: '/addition/challenges/speed-mode' },
    { icon: <BsGrid3X3 />, title: '100 Questions', description: 'Complete all 100 questions', bgColor: 'bg-gradient-to-b from-orange-300 to-orange-400', link: '/addition/challenges/100-questions' },
    { icon: <FiHelpCircle />, title: "What's Missing?", description: 'Fill in the missing numbers', bgColor: 'bg-gradient-to-b from-indigo-300 to-indigo-400', link: "/addition/challenges/whats-missing" },
];

export default function AdditionPage() {
  return (
    <div className="max-w-[1152px] mx-auto space-y-8">
      {/* Addition Exercise Section */}
      <div className="rounded-lg ">
        <div className="p-4 bg-gradient-to-br from-blue-400 to-blue-500 rounded-t-lg">
          <h2 className="text-xl font-bold text-white">Addition exercise.</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="p-3 mb-4 text-center text-black bg-blue-200 rounded">
                <h3 className="font-semibold">no carrying over</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {additionExercises.noCarry.map((ex, index) => (
                  <ExerciseCard key={index} operation="addition" {...ex} />
                ))}
              </div>
            </div>
            <div>
              <div className="p-3 mb-4 text-center text-black bg-blue-200 rounded">
                <h3 className="font-semibold">carrying over</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {additionExercises.carry.map((ex, index) => (
                  <ExerciseCard key={index} operation="addition" {...ex} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Addition Challenges Section */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 bg-gradient-to-br from-blue-400 to-blue-500 rounded-t-lg">
          <h2 className="text-xl font-bold text-white">Addition challenges.</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
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