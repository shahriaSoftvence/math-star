"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";

const questionCounts = [10, 20, 30, 40, 50];

const practiceTips = [
  "Division is the reverse of multiplication.",
  'Think "how many times does the smaller number fit into the bigger one?".',
  "The help chart shows related multiplications.",
  "Don't worry about remainders for now!",
];

const QuestionCountCard = ({
  count,
  divisor,
}: {
  count: number;
  divisor: string[] | null;
}) => {

  return (
    <Link href={`/dashboard/division/practice?count=${count}&divisor=${divisor}`}>
      <div
        className="w-36 self-stretch p-8 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl shadow-md inline-flex flex-col justify-center items-center gap-2 cursor-pointer hover:from-purple-200 hover:to-purple-300 transition-all transform hover:scale-105"
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
  const rangesParam = searchParams?.get("ranges");
  const divisor = rangesParam ? rangesParam.split(",") : [];

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="w-full flex justify-start">
        <Link
          href="/dashboard/division"
          className="text-gray-800 text-[20px] font-bold flex justify-center items-center mb-4 gap-2"
        >
          <ArrowLeft /> Go Back
        </Link>
      </div>
      <div className="w-full p-8 bg-white rounded-lg shadow-md inline-flex flex-col justify-start items-center gap-8">
        <h2 className="text-gray-800 text-2xl font-bold">
          Select Number of Questions for dividing by [ {divisor.join(",")} ]
        </h2>
        <div className="flex flex-wrap justify-center items-start gap-4">
          {questionCounts.map((count) => (
            <QuestionCountCard key={count} count={count} divisor={divisor} />
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
    <Suspense fallback={<div>Loading...</div>}>
      <SelectQuestionsContent />
    </Suspense>
  );
}
