"use client";

import React from "react";
import Link from "next/link";
import pointStar from "@/asset/icons/point-star.png";
import Image from "next/image";
import {
  useAddBorrowExerciseMutation,
  useAddNoBorrowExerciseMutation,
} from "@/Redux/features/subtraction/subtractionApi";

type ExerciseCardProps = {
  range: string;
  star: number;
  operation: "borrowing" | "noBorrowing";
};

export default function SubtractionCard({
  range,
  operation,
  star,
}: ExerciseCardProps) {
  const [addBorrowExercise] = useAddBorrowExerciseMutation();
  const [addNoBorrowExercise] = useAddNoBorrowExerciseMutation();

  const rangeParam = range.split(" to ")[1];

  const handleAddExercise = (range_value: number) => {
    if (operation === "noBorrowing") {
      addNoBorrowExercise(range_value);
    } else if (operation === "borrowing") {
      addBorrowExercise(range_value);
    }
  };

  return (
    <Link
      href={`/dashboard/subtraction/select-questions?range=${rangeParam}&operation=${operation}`}
      onClick={() => handleAddExercise(parseInt(rangeParam))}
    >
      <div className="p-8 text-center bg-white border-2 border-gray-200 rounded-lg cursor-pointer transition-all hover:border-blue-400">
        {/* <p className="text-sm text-gray-600">number range</p> */}
        <p className="text-lg font-bold text-gray-800">{range}</p>
        <p className="text-[#EAB308] flex justify-center items-center gap-2 mt-2.5">
          {Array.from({ length: star }).map((_, index) => (
            <Image key={index} src={pointStar} alt="point star" width={20} height={20} />
          ))}
        </p>
      </div>
    </Link>
  );
}
