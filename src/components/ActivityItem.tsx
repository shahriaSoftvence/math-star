import React from 'react';

type ActivityItemProps = {
  title: string;
  score: string;
  stars: string;
};

const ActivityItem = ({ title, score, stars }: ActivityItemProps) => (
  <div className="flex justify-between items-center text-sm text-gray-600">
    <p>{title}</p>
    <div className="flex items-center">
      <span className="mr-4">{score}</span>
      <span className="text-yellow-500">{stars}</span>
    </div>
  </div>
);

export default ActivityItem;