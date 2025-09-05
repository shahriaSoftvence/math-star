"use client";

import React from "react";
import Link from "next/link";
import pointStar from "../../../../../public/point-star.png";
import Image from "next/image";
import { useAddCarryExerciseMutation, useAddNoCarryExerciseMutation } from "@/Redux/features/addition/additionApi";

type ExerciseCardProps = {
    range: string;
    percentage: number;
    operation: "noCarry" | "carry";
};

export default function AdditionCard({
    range,
    percentage,
    operation,
}: ExerciseCardProps) {
    const [addCarryExercise] = useAddCarryExerciseMutation();
    const [addNoCarryExercise] = useAddNoCarryExerciseMutation();

    const rangeParam = range.split(" to ")[1];

    const handleAddExercise = (range_value: number) => {
        if (operation === "noCarry") {
            addNoCarryExercise(range_value);
        } else if (operation === "carry") {
            addCarryExercise(range_value);
        }
    };

    return (
        <Link
            href={`/addition/select-questions?range=${rangeParam}&operation=${operation}`}
            onClick={() => handleAddExercise(parseInt(rangeParam))}
        >
            <div className="p-4 text-center bg-white border-2 border-gray-200 rounded-lg cursor-pointer transition-all hover:border-blue-400">
                <p className="text-xs text-gray-600">number range</p>
                <p className="text-base font-semibold text-gray-800">{range}</p>
                <p className="text-xs text-gray-600">{percentage}%</p>
                <p className="text-[#EAB308] flex justify-center items-center gap-2 mt-1">
                    <Image src={pointStar} alt="point star" />
                    20
                </p>
            </div>
        </Link>
    );
}
