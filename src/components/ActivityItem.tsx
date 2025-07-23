/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Star } from 'lucide-react';

type ActivityItemProps = {
  title: string;
  score: string;
  stars: number;
};

const ActivityItem = ({ title, score, stars }: ActivityItemProps) => (
  <div className="flex justify-between items-center text-sm text-gray-600 p-3 bg-[#F9FAFB] rounded-xl">
    <p>{title}</p>
    <div className="flex items-center">
      <span className="mr-4">{score}</span>
      <div className="flex text-yellow-500">
        {Array.from({ length: stars }).map((_, i) => (
          <Star key={i} size={16} className="fill-current" />
        ))}
      </div>
    </div>
  </div>
);

export default ActivityItem;