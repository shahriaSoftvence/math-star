'use client';

import React, { Suspense } from 'react'; // Import Suspense
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

const questionCounts = [10, 20, 30, 40, 50];

const practiceTips = [
  'Start with tables you know well.',
  'Try to memorize the answers.',
  'Use the help chart if you get stuck.',
  'Practice a little bit every day!',
];

const QuestionCountCard = ({ count, table }: { count: number, table: string | null }) => (
  <Link href={`/multiplication/practice?count=${count}&table=${table || 'all'}`}>
    <div className="w-38 self-stretch p-8 bg-gradient-to-br from-green-100 to-green-200 rounded-xl shadow-md inline-flex flex-col justify-center items-center gap-2 cursor-pointer hover:from-green-200 hover:to-green-300 transition-all transform hover:scale-105">
      <div className="text-center text-gray-800 text-4xl font-bold">{count}</div>
      <div className="text-center text-gray-600 text-sm">Questions</div>
    </div>
  </Link>
);

// Create a new component that uses the hook
function SelectQuestionsContent() {
  const searchParams = useSearchParams();
  const table = searchParams?.get('range');

  return (
    <div className="max-w-4xl mx-auto">
       <div className="w-full flex justify-start">
          <Link href="/multiplication" className="text-gray-800 text-[20px] font-bold flex justify-center items-center mb-4">
            <ArrowLeft /> Go Back
          </Link>
        </div>
      <div className="w-full p-8 bg-white rounded-lg shadow-md inline-flex flex-col justify-start items-center gap-8">
        <h2 className="text-gray-800 text-2xl font-bold">Select Number of Questions for x{table} Table</h2>
        <div className="flex flex-wrap justify-center items-start gap-4">
          {questionCounts.map((count) => (
            <QuestionCountCard key={count} count={count} table={table ?? null} />
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

export default function SelectQuestionsPage() {
  return (
    // Wrap the component in a Suspense boundary
    <Suspense fallback={<div>Loading...</div>}>
      <SelectQuestionsContent />
    </Suspense>
  );
}