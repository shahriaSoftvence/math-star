import React from 'react';
import { FiTarget, FiHelpCircle } from 'react-icons/fi';
import ChallengeCard from '@/components/ChallengeCard';
import { PiTimerBold } from "react-icons/pi";
import { BsGrid3X3 } from "react-icons/bs";
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import SubtractionCard from './subtractionCard/page';

const subtractionExercises = {
  noBorrowing: [
    { range: '0 to 10', percentage: 85 },
    { range: '0 to 20', percentage: 72 },
    { range: '0 to 50', percentage: 60 },
    { range: '0 to 100', percentage: 55 },
  ],
  borrowing: [
    { range: '0 to 20', percentage: 65 },
    { range: '0 to 50', percentage: 58 },
    { range: '0 to 100', percentage: 45 },
  ],
};

const subtractionChallenges = [
    { icon: <FiTarget />, title: 'No Mistake', description: 'One mistake ends the session', bgColor: 'bg-gradient-to-b from-red-300 to-red-400', link: '/subtraction/challenges/no-mistake' },
    { icon: <PiTimerBold />, title: 'Speed Mode', description: 'Race against time!', bgColor: 'bg-gradient-to-b from-blue-300 to-blue-400', link: '/subtraction/challenges/speed-mode' },
    { icon: <BsGrid3X3 />, title: '100 Questions', description: 'Complete all 100 questions', bgColor: 'bg-gradient-to-b from-orange-300 to-orange-400', link: '/subtraction/challenges/100-questions' },
    { icon: <FiHelpCircle />, title: "What's Missing?", description: 'Fill in the missing numbers', bgColor: 'bg-gradient-to-b from-indigo-300 to-indigo-400', link: "/subtraction/challenges/whats-missing" },
];


export default function SubtractionPage() {
  return (
    <div className="max-w-[1152px] mx-auto space-y-8">
       <div className="mb-4">
        <Link href="/dashboard" className="text-gray-800 text-[20px] font-bold inline-flex justify-center items-center">
            <ArrowLeft /> Go Back
          </Link>
      </div>
      {/* Subtraction Exercise Section */}
      <div className="rounded-lg">
        <div className="p-4 bg-gradient-to-br from-pink-400 to-pink-500 rounded-t-lg">
          <h2 className="text-xl font-bold text-white">Subtraction exercise.</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="p-3 mb-4 text-center text-black bg-pink-200 rounded">
                <h3 className="font-semibold">no borrowing</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {subtractionExercises.noBorrowing.map((ex, index) => (
                  <SubtractionCard key={index} operation="subtraction" {...ex} />
                ))}
              </div>
            </div>
            <div>
              <div className="p-3 mb-4 text-center text-black bg-pink-200 rounded">
                <h3 className="font-semibold">borrowing</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {subtractionExercises.borrowing.map((ex, index) => (
                  <SubtractionCard key={index} operation="subtraction" {...ex} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subtraction Challenges Section */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 bg-gradient-to-br from-pink-400 to-pink-500 rounded-t-lg">
          <h2 className="text-xl font-bold text-white">Subtraction challenges.</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
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