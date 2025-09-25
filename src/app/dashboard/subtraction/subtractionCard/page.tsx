"use client";

import React from "react";
import Link from "next/link";
import pointStar from "../../../../../public/point-star.png";
import Image from "next/image";
import {
  useAddBorrowExerciseMutation,
  useAddNoBorrowExerciseMutation,
} from "@/Redux/features/subtraction/subtractionApi";

type ExerciseCardProps = {
  range: string;
  percentage: number;
  operation: "borrowing" | "noBorrowing";
};

export default function SubtractionCard({
  range,
  operation,
}: ExerciseCardProps) {
  const [addBorrowExercise, { data }] = useAddBorrowExerciseMutation();
  const [addNoBorrowExercise, { data: no }] = useAddNoBorrowExerciseMutation();
  console.log(data, "the data");
  console.log(no, "the no data");

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
      <div className="p-6 text-center bg-white border-2 border-gray-200 rounded-lg cursor-pointer transition-all hover:border-blue-400">
        <p className="text-sm text-gray-600">number range</p>
        <p className="text-lg font-bold my-2 text-gray-800">{range}</p>
        {/* <p className="text-xs text-gray-600">{percentage}%</p> */}
        <p className="text-[#EAB308] flex justify-center items-center gap-2 mt-1">
          <Image src={pointStar} alt="point star" />
          <Image src={pointStar} alt="point star" />
        </p>
      </div>
    </Link>
  );
}
