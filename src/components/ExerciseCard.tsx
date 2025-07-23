import React from 'react';
import Link from 'next/link'; 
import { TiStarFullOutline } from "react-icons/ti";
import pointStar from '../../public/point-star.png'
import Image from 'next/image';

type ExerciseCardProps = {
    range: string;
    percentage: number;
    operation: 'addition' | 'subtraction' | 'multiplication' | 'division';
};

export default function ExerciseCard({ range, percentage, operation }: ExerciseCardProps) {
    let rangeParam = range;
    if (operation === 'addition' || operation === 'subtraction') {
        rangeParam = range.split(' to ')[1];
    } else if (operation === 'multiplication') {
        rangeParam = range.replace('x', '');
    }
    // For division, range is already the number string, so no change needed.

    return (
        <Link href={`/${operation}/select-questions?range=${rangeParam}`}>
            <div className="p-4 text-center bg-white border-2 border-gray-200 rounded-lg cursor-pointer transition-all hover:border-blue-400">
                <p className="text-xs text-gray-600">number range</p>
                <p className="text-base font-semibold text-gray-800">{range}</p>
                <p className="text-xs text-gray-600">{percentage}%</p>
                <p className='text-[#EAB308] flex justify-center items-center gap-2 mt-1'><Image src={pointStar} alt='point star'/>20</p>
            </div>
        </Link>
    );
}