"use client";

import React from "react";
import Image from "next/image";
import pointStar from "../../../../../public/point-star.png";


type ExerciseCardProps = {
  range: string[];
  isSelected: boolean;
  onToggle: (range: string[]) => void;
};

export default function DivisionCard({
  range,
  isSelected,
  onToggle,
}: ExerciseCardProps) {
  const handleSetRange = () => {
    onToggle(range);
  };

  return (
    <div
      onClick={handleSetRange}
      className={`p-6 text-center border-2 rounded-lg cursor-pointer transition-all 
        ${isSelected ? "border-blue-500 bg-blue-50" : "border-gray-200 bg-white"} 
        hover:border-blue-400`}
    >
      <p className="text-sm text-gray-600">number range</p>
      <p className="text-lg font-bold my-2 text-gray-800">{range?.join(", ")}</p>
      {/* <p className="text-xs text-gray-600">{percentage}%</p> */}
      <p className="text-[#EAB308] flex justify-center items-center gap-2 mt-1">
        <Image src={pointStar} alt="point star" />
      </p>
    </div>
  );
}

