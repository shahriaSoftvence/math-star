'use client';

import React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const questionCounts = [10, 20, 30, 40, 50];

const practiceTips = [
  'Division is the reverse of multiplication.',
  'Think "how many times does the smaller number fit into the bigger one?".',
  'The help chart shows related multiplications.',
  'Don\'t worry about remainders for now!',
];

const QuestionCountCard = ({ count, divisor }: { count: number, divisor: string | null }) => (
  <Link href={`/division/practice?count=${count}&divisor=${divisor || '2'}`}>
    <div className="w-38 self-stretch p-8 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl shadow-md inline-flex flex-col justify-center items-center gap-2 cursor-pointer hover:from-purple-200 hover:to-purple-300 transition-all transform hover:scale-105">
      <div className="text-center text-gray-800 text-4xl font-bold">{count}</div>
      <div className="text-center text-gray-600 text-sm">Questions</div>
    </div>
  </Link>
);

export default function SelectQuestionsPage() {
  const searchParams = useSearchParams();
  const divisor = searchParams?.get('range') ?? null;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="w-full p-8 bg-white rounded-lg shadow-md inline-flex flex-col justify-start items-center gap-8">
        <h2 className="text-gray-800 text-2xl font-bold">Select Number of Questions for dividing by {divisor}</h2>
        <div className="flex flex-wrap justify-center items-start gap-4">
          {questionCounts.map((count) => (
            <QuestionCountCard key={count} count={count} divisor={divisor} />
          ))}
        </div>
        <div className="self-stretch px-6 py-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
          <h3 className="text-gray-800 text-lg font-semibold mb-4">Practice Tips:</h3>
          <ul className="space-y-2">
            {practiceTips.map((tip, index) => (
              <li key={index} className="text-gray-600 text-sm list-disc list-inside">
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}