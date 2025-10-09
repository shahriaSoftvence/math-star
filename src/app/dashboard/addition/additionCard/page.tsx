"use client";

import React from "react";
import Link from "next/link";
import pointStar from "@/asset/icons/point-star.png";
import Image from "next/image";
import { useAddCarryExerciseMutation, useAddNoCarryExerciseMutation } from "@/Redux/features/addition/additionApi";

type ExerciseCardProps = {
    range: string;
    operation: "noCarry" | "carry";
    star: number
};

export default function AdditionCard({
    range,
    operation, star
}: ExerciseCardProps) {
    const [addCarryExercise] = useAddCarryExerciseMutation();
    const [addNoCarryExercise] = useAddNoCarryExerciseMutation();

    const rangeParam = range.split(" to ")[1];
    // console.log("range params",rangeParam)

    const handleAddExercise = (range_value: number) => {
        if (operation === "noCarry") {
            addNoCarryExercise(range_value);
        } else if (operation === "carry") {
            addCarryExercise(range_value);
        }
    };

    return (
        <Link
            href={`/dashboard/addition/select-questions?range=${rangeParam}&operation=${operation}`}
            onClick={() => handleAddExercise(parseInt(rangeParam))}
        >
            <div className="p-6 text-center bg-white border-2 border-gray-200 rounded-lg cursor-pointer transition-all hover:border-blue-400">
                <p className="text-gray-600 text-sm">number range</p>
                <p className="text-lg font-bold my-2 text-gray-800">{range}</p>
                {/* <p className="text-xs text-gray-600">{percentage}%</p> */}
                <p className="text-[#EAB308] flex justify-center items-center gap-2 mt-1">
                    {Array.from({ length: star }).map((_, index) => (
            <Image key={index} src={pointStar} alt="point star" width={20} height={20} />
          ))}
                </p>
            </div>
            
        </Link>
    );
}
