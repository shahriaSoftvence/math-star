"use client";

import React, { Suspense } from "react"; // Import Suspense
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";

const questionCounts = [10, 20, 30, 40, 50];

const practiceTips = [
  "Start with fewer questions and gradually increase",
  "Focus on accuracy first, then speed",
  "Use the help chart on the left side if you need assistance",
  "Take breaks between practice sessions",
];

const QuestionCountCard = ({ count, range, operation }: { count: number; range: string | null; operation: string | null }) => {
  return (
    <Link href={`/addition/practice?count=${count}&range=${range || '10'}&operation=${operation}`}>
      <div
        className="w-38 self-stretch p-8 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl shadow-md inline-flex flex-col justify-center items-center gap-2 cursor-pointer hover:from-blue-200 hover:to-blue-300 transition-all transform hover:scale-105"
      >
        <div className="text-center text-gray-800 text-4xl font-bold">
          {count}
        </div>
        <div className="text-center text-gray-600 text-sm">Questions</div>
      </div>
    </Link>
  );
};

// Create a new component that uses the hook
function SelectQuestionsContent() {
const searchParams = useSearchParams();
  const range = searchParams?.get('range') ?? null;
  const operation = searchParams?.get('operation') ?? null;
  return (
    <div className="max-w-4xl mx-auto py-4">
      <div className="w-full flex justify-start">
        <Link
          href="/addition"
          className="text-gray-800 text-[20px] font-bold flex justify-center items-center mb-4"
        >
          <ArrowLeft /> Go Back
        </Link>
      </div>
      <div className="w-full p-8 bg-white rounded-lg shadow-md inline-flex flex-col justify-start items-center gap-8">
        <h2 className="text-gray-800 text-2xl font-bold">
          Select Number of Questions
        </h2>
        <div className="flex flex-wrap justify-center items-start gap-4">
          {questionCounts.map((count) => (
            <QuestionCountCard key={count} count={count} range={range} operation={operation}  />
          ))}
        </div>
        <div className="self-stretch px-6 py-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
          <h3 className="text-gray-800 text-lg font-semibold mb-4">
            Practice Tips:
          </h3>
          <ul className="space-y-2">
            {practiceTips.map((tip, index) => (
              <li
                key={index}
                className="text-gray-600 text-sm list-disc list-inside"
              >
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
