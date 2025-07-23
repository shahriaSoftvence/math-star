import React from 'react';
import Link from 'next/link';

type ExerciseCardProps = {
  range: string;
  percentage: number;
  operation: 'addition' | 'subtraction' | 'multiplication' | 'division';
};

export default function ExerciseCard({ range, percentage, operation }: ExerciseCardProps) {
  // Extract the max number from the range string "0 to X"
  const maxRange = range.split(' to ')[1];

  return (
    <Link href={`/${operation}/select-questions?range=${maxRange}`}>
      <div className="p-4 text-center bg-white border-2 border-gray-200 rounded-lg cursor-pointer transition-all hover:border-blue-400">
        <p className="text-xs text-gray-600">number range</p>
        <p className="text-base font-semibold text-gray-800">{range}</p>
        <p className="text-xs text-gray-600">{percentage}%</p>
      </div>
    </Link>
  );
}