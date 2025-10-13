"use client"

import React from 'react';
import { FiTarget, FiHelpCircle } from 'react-icons/fi';
import { PiTimerBold } from "react-icons/pi";
import { BsGrid3X3 } from "react-icons/bs";
import Link from 'next/link';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import DivisionCard from './divisionCard/page';
import { useAddDivisionExerciseMutation, useGetTopScoreDivisionQuery } from '@/Redux/features/division/divisionApi';
import ChallengeCard from '@/components/challengeCard';
import { useDictionary } from '@/hook/useDictionary';

const divisionExercises = [
  { range: '2' },
  { range: '3' },
  { range: '4' },
  { range: '5' },
  { range: '6' },
  { range: '7' },
  { range: '8' },
  { range: '9' },
  { range: '10' },
  { range: 'All' },
];



export default function DivisionPage() {
  const [selectedRanges, setSelectedRanges] = React.useState<string[]>([]);
  const [addDivisionExercise] = useAddDivisionExerciseMutation();
  const {data} = useGetTopScoreDivisionQuery();

  const { dictionary, loading } = useDictionary();
    const divisionOperation = dictionary?.operations?.division;
    const sharedSection = dictionary?.shared;
    const challenges = sharedSection?.challenge_section?.challenges
  
    if (!divisionOperation || !challenges || loading) {
      return null;
    }

  const noMistakeTopScore = data?.data?.find(item => item.challenge_type === "NO_MISTAKE")?.display_top_score;
  const speedModeTopScore = data?.data?.find(item => item.challenge_type === "SPEED_MODE")?.display_top_score;
  const hundredQuestionTopScore = data?.data?.find(item => item.challenge_type === "100_QUESTIONS")?.display_top_score;
  const whatsMissingTopScore = data?.data?.find(item => item.challenge_type === "WHATS_MISSING")?.display_top_score;

  const divisionChallenges = [
  { icon: <FiTarget />, title: challenges?.no_mistake?.title, description: challenges?.no_mistake?.description, bgColor: 'bg-gradient-to-b from-red-300 to-red-400', link: '/dashboard/division/challenges/no-mistake', display_top_score: noMistakeTopScore },
  { icon: <PiTimerBold />, title: challenges?.speed_mode?.title, description: challenges?.speed_mode?.description, bgColor: 'bg-gradient-to-b from-blue-300 to-blue-400', link: '/dashboard/division/challenges/speed-mode', display_top_score: speedModeTopScore },
  { icon: <BsGrid3X3 />, title: challenges?.hundred_questions?.title, description: challenges?.hundred_questions?.description, bgColor: 'bg-gradient-to-b from-orange-300 to-orange-400', link: '/dashboard/division/challenges/100-questions', display_top_score: hundredQuestionTopScore },
  { icon: <FiHelpCircle />, title: challenges?.whats_missing?.title, description: challenges?.whats_missing?.description, bgColor: 'bg-gradient-to-b from-indigo-300 to-indigo-400', link: "/dashboard/division/challenges/whats-missing", display_top_score: whatsMissingTopScore },
];

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
    let range_value: number[] = [];

    if (selectedRanges.includes("All")) {
      range_value = [100];
    } else {
      range_value = selectedRanges.map((r) => {
        return parseInt(r)
      });
    }
    addDivisionExercise(range_value)
  }

  return (
    <div className="max-w-[1152px] mx-auto space-y-8 p-4">
      <div className="mb-4">
        
        <Link href="/dashboard" className="text-gray-800 text-[20px] font-bold inline-flex justify-center items-center gap-2">
          <ArrowLeft /> {sharedSection?.navigation?.go_back}
        </Link>
      </div>

      {/* Division Exercise Section */}
      <div className="rounded-lg">
        <div className="p-4 bg-gradient-to-br from-purple-400 to-purple-500 rounded-t-lg">
          <h2 className="text-xl font-bold text-white">{divisionOperation?.name} {sharedSection?.exercise_section?.title}</h2>
        </div>
        <div className="px-0 md:px-6 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {divisionExercises.map((ex, index) => (
              <DivisionCard
                key={index}
                range={[ex.range]}
                isSelected={ex.range === "All"
                  ? selectedRanges.includes("All")
                  : ex.range.replace('÷', '').split(',').some(r => selectedRanges.includes(r))}
                onToggle={toggleRange}
              />
            ))}
            {selectedRanges.length > 0 && (
              <Link href={`/dashboard/division/select-questions?ranges=${selectedRanges.join(",")}`} >
                <div onClick={handleAddRange} className="p-6 text-center border-2 rounded-lg cursor-pointer transition-all border-purple-400 bg-white">
                  <h5 className='text-xs text-gray-600'>{sharedSection?.exercise_section?.continue_with}</h5>
                  <div className='flex justify-center items-center gap-1.5 my-1'>
                    <h3 className='text-lg font-bold text-gray-800'>{sharedSection?.exercise_section?.go}</h3>
                    <ChevronRight className='' />
                  </div>
                  <p className='text-xs text-gray-800 font-medium overflow-hidden'>[ {selectedRanges.join(", ")} ]</p>
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Division Challenges Section */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 bg-gradient-to-br from-purple-400 to-purple-500 rounded-t-lg">
          <h2 className="text-xl font-bold text-white">{divisionOperation?.name} {sharedSection?.challenge_section?.title}</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
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
