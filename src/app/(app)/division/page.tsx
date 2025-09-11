"use client"

import React from 'react';
import { FiTarget, FiHelpCircle } from 'react-icons/fi';
import ChallengeCard from '@/components/ChallengeCard';
import { PiTimerBold } from "react-icons/pi";
import { BsGrid3X3 } from "react-icons/bs";
import Link from 'next/link';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import DivisionCard from './divisionCard.tsx/page';

const divisionExercises = [
  { range: '2', percentage: 90, stars: 18 },
  { range: '3', percentage: 85, stars: 17 },
  { range: '4', percentage: 82, stars: 16 },
  { range: '5', percentage: 95, stars: 19 },
  { range: '6', percentage: 78, stars: 15 },
  { range: '7', percentage: 75, stars: 14 },
  { range: '8', percentage: 70, stars: 13 },
  { range: '9', percentage: 68, stars: 12 },
  { range: '10', percentage: 98, stars: 20 },
  { range: 'All', percentage: 65, stars: 11 },
];

const divisionChallenges = [
  { icon: <FiTarget />, title: 'No Mistake', description: 'One mistake ends the session', bgColor: 'bg-gradient-to-b from-red-300 to-red-400', link: '/division/challenges/no-mistake' },
  { icon: <PiTimerBold />, title: 'Speed Mode', description: 'Race against time!', bgColor: 'bg-gradient-to-b from-blue-300 to-blue-400', link: '/division/challenges/speed-mode' },
  { icon: <BsGrid3X3 />, title: '100 Questions', description: 'Complete all 100 questions', bgColor: 'bg-gradient-to-b from-orange-300 to-orange-400', link: '/division/challenges/100-questions' },
  { icon: <FiHelpCircle />, title: "What's Missing?", description: 'Fill in the missing numbers', bgColor: 'bg-gradient-to-b from-indigo-300 to-indigo-400', link: "/division/challenges/whats-missing" },
];

export default function DivisionPage() {
  const [selectedRanges, setSelectedRanges] = React.useState<string[]>([]);

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
        return parseInt(r)
      });
    }

    console.log(range_values)
  }

  return (
    <div className="max-w-[1152px] mx-auto space-y-8 py-4">
      <div className="mb-4">
        <Link href="/dashboard" className="text-gray-800 text-[20px] font-bold inline-flex justify-center items-center">
          <ArrowLeft /> Go Back
        </Link>
      </div>

      {/* Division Exercise Section */}
      <div className="rounded-lg">
        <div className="p-4 bg-gradient-to-br from-purple-400 to-purple-500 rounded-t-lg">
          <h2 className="text-xl font-bold text-white">Division exercise.</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {divisionExercises.map((ex, index) => (
              <DivisionCard
                key={index}
                range={[ex.range]}
                percentage={ex.percentage}
                isSelected={ex.range === "All"
                  ? selectedRanges.includes("All")
                  : ex.range.replace('÷', '').split(',').some(r => selectedRanges.includes(r))}
                onToggle={toggleRange}
              />
            ))}
            {selectedRanges.length > 0 && (
            <Link href={`/division/select-questions?ranges=${selectedRanges.join(",")}`} >
              <div onClick={handleAddRange} className="p-4 text-center border-2 rounded-lg cursor-pointer transition-all border-purple-400 bg-white">
                <h5 className='text-xs text-gray-600'>Continue with</h5>
                <div className='flex justify-center items-center gap-1.5 my-2'>
                  <h3 className='text-2xl font-semibold text-gray-800"'>Go</h3>
                   <ChevronRight className='text-xl' />
                </div>
                <p className='text-sm font-medium overflow-hidden'>[ {selectedRanges.join(", ")} ]</p>               
              </div>
            </Link>
          )}
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
