'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Check, X, Delete, ArrowLeft } from 'lucide-react';
import { PiTimerBold } from "react-icons/pi";
import CongratulationsScreen from '@/components/CongratulationsScreen';

// --- Type Definitions ---
type Question = { num1: number; num2: number; answer: number; };
type GameState = 'ready' | 'playing' | 'gameOver';

// --- Reusable UI Components ---

const ChallengeStartScreen = ({ onStart, onCancel }: { onStart: () => void, onCancel: () => void }) => (
    <div className="w-full min-h-screen relative bg-gradient-to-b from-pink-50 to-purple-50 flex flex-col justify-center items-center p-4">
        <div className="w-full max-w-[450px] min-[516px]:max-w-[600px] p-7 bg-white rounded-3xl shadow-lg flex flex-col items-center text-center gap-6">
            <div className="w-20 h-20 bg-pink-100 rounded-full flex justify-center items-center">
                <PiTimerBold className="w-10 h-10 text-pink-600" />
            </div>
            <div>
                <h2 className="text-gray-800 text-2xl font-bold font-Poppin leading-loose">Ready to Start?</h2>
                <p className="text-gray-600 mt-2 text-base font-normal font-Poppin leading-relaxed max-w-[608px] mx-auto">
                    Answer as many questions as you can in 5 minutes!
                </p>
            </div>
            <div className="flex items-center gap-4 mt-4">
                <button onClick={onCancel} className="px-8 py-2 bg-orange-600 text-white rounded-full font-semibold hover:bg-orange-700 text-lg capitalize leading-7 min-w-[206px]">Cancel</button>
                <button onClick={onStart} className="px-8 py-2 bg-pink-500 text-white rounded-full font-semibold hover:bg-pink-600 text-lg capitalize leading-7 min-w-[206px]">Start Challenge</button>
            </div>
        </div>
    </div>
);

const GameResultScreen = ({ score, onRetry, onHome }: { score: number, onRetry: () => void, onHome: () => void }) => (
    <div className="w-full min-h-screen relative bg-gradient-to-b from-pink-50 to-purple-50 flex flex-col justify-center items-center p-4">
        <div className="w-full max-w-md p-8 bg-white rounded-3xl shadow-lg flex flex-col items-center text-center gap-4 min-w-[672px] max-[704]:min-w-[400px] mx-auto">
            <div className="w-20 h-20 bg-green-100 rounded-full flex justify-center items-center">
                <Check className="w-10 h-10 text-green-500" />
            </div>
            <h1 className="text-gray-800 text-3xl font-bold font-Nunito leading-9">Time is Up!</h1>
            <div>
                <p className="text-xl text-gray-600 leading-7">Final Score: <span className="font-bold text-pink-600">{score}</span></p>
                <p className="text-base text-gray-600 leading-normal">You answered {score} questions correctly!</p>
            </div>
            <div className="w-full mt-4 flex justify-center items-center gap-4">
                <button onClick={onRetry} className="flex-1 py-2.5 bg-pink-500 text-slate-50 rounded-md font-medium text-sm leading-tight hover:bg-pink-600 transition-colors">Play Again</button>
                <button onClick={onHome} className="flex-1 py-2.5 bg-slate-50 rounded-md border border-slate-200 text-slate-950 font-medium text-sm leading-tight hover:bg-slate-100 transition-colors">Home</button>
            </div>
        </div>
    </div>
);

const Numpad = ({ onNumberClick, onBackspace, onSubmit }: { onNumberClick: (num: string) => void; onBackspace: () => void; onSubmit: () => void; }) => {
    const buttons = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
    return (
      <div className="grid grid-cols-3 gap-4 w-96">
        {buttons.map((btn) => (
          <button key={btn} onClick={() => onNumberClick(btn)} className="h-24 text-3xl font-bold text-pink-800 bg-pink-100 rounded-2xl transition-colors hover:bg-pink-200">
            {btn}
          </button>
        ))}
        <button onClick={onBackspace} className="flex items-center justify-center h-24 text-2xl font-bold text-red-800 bg-red-100 rounded-2xl transition-colors hover:bg-red-200"><Delete size={32} /></button>
        <button onClick={() => onNumberClick('0')} className="h-24 text-3xl font-bold text-pink-800 bg-pink-100 rounded-2xl transition-colors hover:bg-pink-200">0</button>
        <button onClick={onSubmit} className="flex items-center justify-center h-24 text-3xl font-bold text-green-800 bg-green-100 rounded-2xl transition-colors hover:bg-green-200"><Check size={32} /></button>
      </div>
    );
};

// --- Main Challenge Page Component ---
export default function SpeedModePage() {
    const router = useRouter();
    const [gameState, setGameState] = useState<GameState>('ready');
    const [question, setQuestion] = useState<Question>({ num1: 0, num2: 0, answer: 0 });
    const [userAnswer, setUserAnswer] = useState('');
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds

    const generateQuestion = useCallback(() => {
        const num1 = Math.floor(Math.random() * 20) + 1;
        const num2 = Math.floor(Math.random() * num1) + 1;
        setQuestion({ num1, num2, answer: num1 - num2 });
        setUserAnswer('');
    }, []);

    useEffect(() => {
        if (gameState === 'playing' && timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
            return () => clearInterval(timer);
        } else if (timeLeft === 0) {
            setGameState('gameOver');
        }
    }, [gameState, timeLeft]);

    const handleStart = () => {
        setScore(0);
        setTimeLeft(300);
        generateQuestion();
        setGameState('playing');
    };

    const handleSubmit = () => {
        if (!userAnswer) return;
        const isCorrect = parseInt(userAnswer, 10) === question.answer;
        if (isCorrect) {
            setScore(prev => prev + 1);
        }
        generateQuestion();
    };
    
    if (gameState === 'ready') {
        return <ChallengeStartScreen 
            onStart={handleStart}
            onCancel={() => router.back()}
        />;
    }

    if (gameState === 'gameOver') {
        return <CongratulationsScreen onContinue={() => router.push('/subtraction')} rewardName={`You scored ${score}!`} />;
    }

   const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
   }

   return (
    <div className="w-full min-h-screen bg-gradient-to-b from-pink-50 to-purple-50 p-4 md:p-6">
        <div className="flex items-start gap-4 md:gap-6 mb-12 md:mb-16">
            <div className="w-24 h-24 bg-pink-100 rounded-full flex justify-center items-center">
                <PiTimerBold className="w-14 h-14 text-pink-600" />
            </div>
            <div className="flex flex-col gap-2 md:gap-3">
                <h1 className="text-black text-6xl font-bold font-Nunito leading-10">Speedrun</h1>
                <p className="text-black text-2xl font-bold font-Nunito leading-10">
                    Solve as many problems as possible in 5 minutes
                </p>
            </div>
        </div>

        <div className="flex flex-col lg:flex-row justify-start items-center lg:items-end gap-8 md:gap-16 lg:gap-24">
            <div className="relative w-72 h-72">
                 <div className="w-72 h-72 bg-gradient-to-br from-pink-400 to-pink-500 rounded-full flex flex-col justify-center items-center">
                    <div className="text-center text-white text-6xl font-bold font-Nunito leading-loose">{formatTime(timeLeft)}</div>
                    <div className="text-center text-white text-4xl font-normal font-Nunito leading-tight">Remaining</div>
                </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 lg:gap-24">
                <div className="w-full md:w-[400px] lg:w-[569px] flex flex-col gap-4 md:gap-5">
                    <div className="self-stretch flex justify-between items-center">
                        <div className="h-20 flex flex-col">
                            <span className="text-gray-600 text-4xl font-normal font-Nunito leading-tight">Question</span>
                            <span className="text-pink-600 text-4xl font-bold font-Nunito leading-loose">{score + 1}</span>
                        </div>
                        <div className="h-20 flex flex-col">
                            <span className="text-gray-600 text-4xl font-normal font-Nunito leading-tight">Score</span>
                            <span className="text-green-600 text-4xl font-bold font-Nunito leading-loose">{score}</span>
                        </div>
                    </div>
                    <div className="self-stretch p-12 rounded-[51px] border border-black flex justify-center items-center gap-5">
                        <span className="text-center text-gray-800 text-6xl font-bold font-Nunito leading-[80px]">
                            {question.num1} - {question.num2} =
                        </span>
                        <div className="w-36 h-20 px-0.5 py-3 rounded-xl border-2 border-black flex justify-center items-center overflow-hidden">
                            <span className="text-center text-black text-5xl font-normal font-Nunito">{userAnswer || '?'}</span>
                        </div>
                    </div>
                </div>
                <Numpad 
                    onNumberClick={(num) => setUserAnswer(prev => prev.length < 3 ? prev + num : prev)}
                    onBackspace={() => setUserAnswer(prev => prev.slice(0, -1))}
                    onSubmit={handleSubmit}
                />
            </div>
        </div>
    </div>
);
}