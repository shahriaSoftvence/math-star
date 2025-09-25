"use client"

import React from 'react';
import { FiTarget, FiHelpCircle } from 'react-icons/fi';
import ChallengeCard from '@/components/ChallengeCard';
import { PiTimerBold } from "react-icons/pi";
import { BsGrid3X3 } from "react-icons/bs";
import Link from 'next/link';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import MultiplicationCard from './multiplicationCard/page';
import { useAddMultiplicationExerciseMutation } from '@/Redux/features/multiplication/multiplicationApi';

const multiplicationExercises = [
  { range: ['X1'], percentage: 98, stars: 0 },
  { range: ['X2'], percentage: 95, stars: 19 },
  { range: ['X3'], percentage: 92, stars: 18 },
  { range: ['X4'], percentage: 89, stars: 17 },
  { range: ['X5'], percentage: 94, stars: 19 },
  { range: ['X6'], percentage: 87, stars: 16 },
  { range: ['X7'], percentage: 85, stars: 15 },
  { range: ['X8'], percentage: 80, stars: 14 },
  { range: ['X9'], percentage: 75, stars: 13 },
  { range: ['X10'], percentage: 99, stars: 20 },
  { range: ['All'], percentage: 70, stars: 12 },
];

const multiplicationChallenges = [
  { icon: <FiTarget />, title: 'No Mistake', description: 'One mistake ends the session', bgColor: 'bg-gradient-to-b from-red-300 to-red-400', link: '/dashboard/multiplication/challenges/no-mistake' },
  { icon: <PiTimerBold />, title: 'Speed Mode', description: 'Race against time!', bgColor: 'bg-gradient-to-b from-blue-300 to-blue-400', link: '/dashboard/multiplication/challenges/speed-mode' },
  { icon: <BsGrid3X3 />, title: '100 Questions', description: 'Complete all 100 questions', bgColor: 'bg-gradient-to-b from-orange-300 to-orange-400', link: '/dashboard/multiplication/challenges/100-questions' },
  { icon: <FiHelpCircle />, title: "What's Missing?", description: 'Fill in the missing numbers', bgColor: 'bg-gradient-to-b from-indigo-300 to-indigo-400', link: "/dashboard/multiplication/challenges/whats-missing" },
];

export default function MultiplicationPage() {
  const [selectedRanges, setSelectedRanges] = React.useState<string[]>([]);

  const [addMultiplicationExercise] = useAddMultiplicationExerciseMutation();

  const toggleRange = (ranges: string[]) => {
    ranges.forEach(r => {
      if (r === "All") {
        setSelectedRanges(["All"]);
      } else {
        setSelectedRanges(prev => {
          const newSelection = prev.includes(r)
            ? prev.filter(x => x !== r)
            : [...prev.filter(x => x !== "All"), r];
          return newSelection;
        });
      }
    });
  };

  const handleAddRange = () => {
    let range_values: number[] = [];

    if (selectedRanges.includes("All")) {
      range_values = [100];
    } else {
      range_values = selectedRanges.map((r) => {
        const match = r.match(/X(\d+)/);
        return match ? parseInt(match[1], 10) : 1;
      });
    }

    addMultiplicationExercise(range_values)
  }


  return (
    <div className="max-w-[1152px] mx-auto space-y-8 py-4">
      <div className="mb-4">
        <Link href="/dashboard" className="text-gray-800 text-[20px] font-bold inline-flex justify-center items-center">
          <ArrowLeft /> Go Back
        </Link>
      </div>

      {/* Multiplication Exercise Section */}
      <div className="rounded-lg">
        <div className="p-4 bg-gradient-to-br from-green-400 to-green-500 rounded-t-lg">
          <h2 className="text-xl font-bold text-white">Multiplication exercise.</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {multiplicationExercises.map((ex, index) => (
              <MultiplicationCard
                key={index}
                range={ex.range}
                percentage={ex.percentage}
                isSelected={ex.range.some(r => selectedRanges.includes(r))}
                onToggle={toggleRange}
              />
            ))}
            {selectedRanges.length > 0 && (
            <Link
              href={`/dashboard/multiplication/select-questions?ranges=${selectedRanges.join(",")}`}
            >
              <div onClick={handleAddRange} className="p-6 text-center border-2 rounded-lg cursor-pointer transition-all border-green-400 bg-white">
                <h5 className='text-sm text-gray-600'>Continue with</h5>
                <div className='flex justify-center items-center gap-1.5 my-2'>
                  <h3 className='text-lg font-bold text-gray-800'>Go</h3>
                   <ChevronRight className='text-lg' />
                </div>
                <p className='text-xs font-medium text-gray-800'>[ {selectedRanges.join(", ")} ]</p>
               
              </div>
            </Link>
          )}
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
