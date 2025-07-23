import React from 'react';
import { FiTarget, FiHelpCircle } from 'react-icons/fi';
import ChallengeCard from '@/components/ChallengeCard';
import ExerciseCard from '@/components/ExerciseCard';
import { PiTimerBold } from "react-icons/pi";
import { BsGrid3X3 } from "react-icons/bs";

const multiplicationExercises = [
  { range: '1', percentage: 98, stars: 0 },
  { range: '2', percentage: 95, stars: 19 },
  { range: '3', percentage: 92, stars: 18 },
  { range: '4', percentage: 89, stars: 17 },
  { range: '5', percentage: 94, stars: 19 },
  { range: '6', percentage: 87, stars: 16 },
  { range: '7', percentage: 85, stars: 15 },
  { range: '8', percentage: 80, stars: 14 },
  { range: '9', percentage: 75, stars: 13 },
  { range: '10', percentage: 99, stars: 20 },
  { range: '11', percentage: 70, stars: 12 },
  { range: '12', percentage: 68, stars: 11 },
];

const multiplicationChallenges = [
    { icon: <FiTarget />, title: 'No Mistake', description: 'One mistake ends the session', bgColor: 'bg-gradient-to-b from-red-300 to-red-400' },
    { icon: <PiTimerBold />, title: 'Speed Mode', description: 'Race against time!', bgColor: 'bg-gradient-to-b from-blue-300 to-blue-400' },
    { icon: <BsGrid3X3 />, title: '100 Questions', description: 'Complete all 100 questions', bgColor: 'bg-gradient-to-b from-orange-300 to-orange-400' },
    { icon: <FiHelpCircle />, title: "What's Missing?", description: 'Fill in the missing numbers', bgColor: 'bg-gradient-to-b from-indigo-300 to-indigo-400' },
];

export default function MultiplicationPage() {
  return (
    <div className="max-w-[1152px] mx-auto space-y-8">
      {/* Multiplication Exercise Section */}
      <div className="rounded-lg">
        <div className="p-4 bg-gradient-to-br from-green-400 to-green-500 rounded-t-lg">
          <h2 className="text-xl font-bold text-white">Multiplication exercise.</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {multiplicationExercises.map((ex, index) => (
              <ExerciseCard 
                key={index} 
                operation="multiplication"
                range={`x${ex.range}`} 
                percentage={ex.percentage}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Multiplication Challenges Section */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 bg-gradient-to-br from-green-400 to-green-500 rounded-t-lg">
          <h2 className="text-xl font-bold text-white">Multiplication challenges.</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {multiplicationChallenges.map((challenge, index) => (
              <ChallengeCard key={index} iconColor="text-white" {...challenge} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}