import React from 'react';
import { FiTarget, FiHelpCircle } from 'react-icons/fi';
import ChallengeCard from '@/components/ChallengeCard';
import ExerciseCard from '@/components/ExerciseCard';
import { PiTimerBold } from "react-icons/pi";
import { BsGrid3X3 } from "react-icons/bs";
import Link from 'next/link';

const divisionExercises = [
  { range: '÷2', percentage: 90, stars: 18 },
  { range: '÷3', percentage: 85, stars: 17 },
  { range: '÷4', percentage: 82, stars: 16 },
  { range: '÷5', percentage: 95, stars: 19 },
  { range: '÷6', percentage: 78, stars: 15 },
  { range: '÷7', percentage: 75, stars: 14 },
  { range: '÷8', percentage: 70, stars: 13 },
  { range: '÷9', percentage: 68, stars: 12 },
  { range: '÷10', percentage: 98, stars: 20 },
  { range: '÷11', percentage: 65, stars: 11 },
  { range: '÷12', percentage: 62, stars: 10 },
];

const divisionChallenges = [
    { icon: <FiTarget />, title: 'No Mistake', description: 'One mistake ends the session', bgColor: 'bg-gradient-to-b from-red-300 to-red-400', link: '/division/challenges/no-mistake' },
    { icon: <PiTimerBold />, title: 'Speed Mode', description: 'Race against time!', bgColor: 'bg-gradient-to-b from-blue-300 to-blue-400', link: '/division/challenges/speed-mode' },
    { icon: <BsGrid3X3 />, title: '100 Questions', description: 'Complete all 100 questions', bgColor: 'bg-gradient-to-b from-orange-300 to-orange-400', link: '/division/challenges/100-questions' },
    { icon: <FiHelpCircle />, title: "What's Missing?", description: 'Fill in the missing numbers', bgColor: 'bg-gradient-to-b from-indigo-300 to-indigo-400', link: "/division/challenges/whats-missing" },
];

export default function DivisionPage() {
  return (
    <div className="max-w-[1152px] mx-auto space-y-8">
      {/* Division Exercise Section */}
      <div className="rounded-lg">
        <div className="p-4 bg-gradient-to-br from-purple-400 to-purple-500 rounded-t-lg">
          <h2 className="text-xl font-bold text-white">Division exercise.</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {divisionExercises.map((ex, index) => (
              <ExerciseCard
                key={index}
                operation="division"
                range={ex.range.replace('÷', '')}
                percentage={ex.percentage}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Division Challenges Section */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 bg-gradient-to-br from-purple-400 to-purple-500 rounded-t-lg">
          <h2 className="text-xl font-bold text-white">Division challenges.</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {divisionChallenges.map((challenge, index) => (
              <Link href={challenge.link} key={index} passHref legacyBehavior>
  <a className="cursor-pointer">
    <ChallengeCard iconColor="text-white" {...challenge} />
  </a>
</Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}