"use client"

import React from 'react';
import { FiTarget, FiHelpCircle } from 'react-icons/fi';
import { PiTimerBold } from "react-icons/pi";
import { BsGrid3X3 } from "react-icons/bs";
import Link from 'next/link';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import MultiplicationCard from './multiplicationCard/page';
import { useAddMultiplicationExerciseMutation, useGetTopScoreMultiplicationQuery } from '@/Redux/features/multiplication/multiplicationApi';
import ChallengeCard from '@/components/challengeCard';
import { useDictionary } from '@/hook/useDictionary';

const multiplicationExercises = [
  { range: ['X1']},
  { range: ['X2'] },
  { range: ['X3'] },
  { range: ['X4'] },
  { range: ['X5'] },
  { range: ['X6'] },
  { range: ['X7'] },
  { range: ['X8'] },
  { range: ['X9'] },
  { range: ['X10']},
  { range: ['All']},
];



export default function MultiplicationPage() {
  const [selectedRanges, setSelectedRanges] = React.useState<string[]>([]);

  const [addMultiplicationExercise] = useAddMultiplicationExerciseMutation();

  const { data } = useGetTopScoreMultiplicationQuery();

  const { dictionary, loading } = useDictionary();
  const multiplicationOperation = dictionary?.operations?.multiplication;
  const sharedSection = dictionary?.shared;
  const challenges = sharedSection?.challenge_section?.challenges

  if (!multiplicationOperation || !challenges || loading) {
    return null;
  }

  const noMistakeTopScore = data?.data?.find(item => item.challenge_type === "NO_MISTAKE")?.display_top_score;
  const speedModeTopScore = data?.data?.find(item => item.challenge_type === "SPEED_MODE")?.display_top_score;
  const hundredQuestionTopScore = data?.data?.find(item => item.challenge_type === "100_QUESTIONS")?.display_top_score;
  const whatsMissingTopScore = data?.data?.find(item => item.challenge_type === "WHATS_MISSING")?.display_top_score;


  const multiplicationChallenges = [
    { icon: <FiTarget />, title: challenges?.no_mistake?.title, description: challenges?.no_mistake?.description, bgColor: 'bg-gradient-to-b from-red-300 to-red-400', link: '/dashboard/multiplication/challenges/no-mistake', display_top_score: noMistakeTopScore },
    { icon: <PiTimerBold />, title: challenges?.speed_mode?.title, description: challenges?.speed_mode?.description, bgColor: 'bg-gradient-to-b from-blue-300 to-blue-400', link: '/dashboard/multiplication/challenges/speed-mode', display_top_score: speedModeTopScore },
    { icon: <BsGrid3X3 />, title: challenges?.hundred_questions?.title, description: challenges?.hundred_questions?.description, bgColor: 'bg-gradient-to-b from-orange-300 to-orange-400', link: '/dashboard/multiplication/challenges/100-questions', display_top_score: hundredQuestionTopScore },
    { icon: <FiHelpCircle />, title: challenges?.whats_missing?.title, description: challenges?.whats_missing?.description, bgColor: 'bg-gradient-to-b from-indigo-300 to-indigo-400', link: "/dashboard/multiplication/challenges/whats-missing", display_top_score: whatsMissingTopScore },
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
    <div className="max-w-[1152px] mx-auto space-y-8 p-4">
      <div className="mb-4">
        <Link href="/dashboard" className="text-gray-800 text-[20px] font-bold inline-flex justify-center items-center gap-2">
          <ArrowLeft /> {sharedSection?.navigation?.go_back}
        </Link>
      </div>

      {/* Multiplication Exercise Section */}
      <div className="rounded-lg">
        <div className="p-4 bg-gradient-to-br from-green-400 to-green-500 rounded-t-lg">
          <h2 className="text-xl font-bold text-white">{multiplicationOperation?.name} {sharedSection?.exercise_section?.title}</h2>
        </div>
        <div className="px-0 md:px-6 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {multiplicationExercises.map((ex, index) => (
              <MultiplicationCard
                key={index}
                range={ex.range}
                isSelected={ex.range.some(r => selectedRanges.includes(r))}
                onToggle={toggleRange}
              />
            ))}
            {selectedRanges.length > 0 && (
              <Link
                href={`/dashboard/multiplication/select-questions?ranges=${selectedRanges.join(",")}`}
              >
                <div onClick={handleAddRange} className="p-6 text-center border-2 rounded-lg cursor-pointer transition-all border-green-400 bg-white">
                  <h5 className='text-xs text-gray-600'>{sharedSection?.exercise_section?.continue_with}</h5>
                  <div className='flex justify-center items-center gap-1.5 my-1'>
                    <h3 className='text-lg font-bold text-gray-800'>{sharedSection?.exercise_section?.go}</h3>
                    <ChevronRight className='text-lg' />
                  </div>
                  <p className='text-xs font-medium text-gray-800'>[ {selectedRanges.map(r => r.replace("X", "")).join(", ")} ]</p>

                </div>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Multiplication Challenges Section */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 bg-gradient-to-br from-green-400 to-green-500 rounded-t-lg">
          <h2 className="text-xl font-bold text-white">{multiplicationOperation?.name} {sharedSection?.challenge_section?.title}</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
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
