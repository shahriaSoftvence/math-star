'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Check, X, Delete, Target } from 'lucide-react';

// --- Type Definitions ---
type Question = { num1: number; num2: number; answer: number; };
type GameState = 'ready' | 'playing' | 'gameOver';

// --- Reusable UI Components (specific to this page for simplicity) ---

const ChallengeStartScreen = ({ title, description, onStart, onCancel }: { title: string, description: string, onStart: () => void, onCancel: () => void }) => (
  <div className="w-full min-h-screen relative bg-gradient-to-b from-purple-50 to-indigo-50 flex flex-col justify-center items-center p-4">
    <div className="w-full max-w-[450px] min-[516px]:max-w-[600px] max-h-[332px] p-7 bg-white rounded-3xl shadow-lg flex flex-col items-center text-center gap-6 max-[514px]:w-[100%]">
      <div className="w-20 h-20 bg-purple-100 rounded-full flex justify-center items-center">
        <Target className="w-10 h-10 text-purple-600" />
      </div>
      <div>
        <h2 className="text-gray-800 text-2xl font-bold font-Poppins leading-loose">{title}</h2>
        <p className="text-gray-600 mt-2 text-base font-normal font-Poppins leading-relaxed max-w-[608px] mx-auto max-[514px]:w-[100%]">{description}</p>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <button onClick={onCancel} className="px-8 py-2 bg-orange-600 text-white rounded-full font-semibold hover:bg-orange-700 text-lg capitalize leading-7 min-w-[206px]">Cancel</button>
        <button onClick={onStart} className="px-8 py-2 bg-purple-500 text-white rounded-full font-semibold hover:bg-purple-600 text-lg capitalize leading-7 min-w-[206px]">Start Challenge</button>
      </div>
    </div>
  </div>
);

const GameResultScreen = ({ score, questionsAnswered, onRetry, onHome }: { score: number, questionsAnswered: number, onRetry: () => void, onHome: () => void }) => (
    <div className="w-full min-h-screen relative bg-gradient-to-b from-purple-50 to-indigo-50 flex flex-col justify-center items-center p-4">
        <div className="w-full max-w-md p-8 bg-white rounded-3xl shadow-lg flex flex-col items-center text-center gap-4 min-w-[672px] max-[704]:min-w-[400px] mx-auto">
            <div className="w-20 h-20 bg-red-100 rounded-full flex justify-center items-center">
                <X className="w-10 h-10 text-red-500" />
            </div>
            <h1 className="text-gray-800 text-3xl font-bold font-Nunito leading-9">Game Over!</h1>
            <div>
                <p className="text-xl text-gray-600 leading-7">Final Score: <span className="font-bold text-purple-600">{score}</span></p>
                <p className="text-base text-gray-600 leading-normal">Questions Answered: <span className="font-bold">{questionsAnswered}</span></p>
            </div>
            <div className="w-full mt-4 flex justify-center items-center gap-4">
                <button onClick={onRetry} className="flex-1 py-2.5 bg-purple-500 text-slate-50 rounded-md font-medium text-sm leading-tight hover:bg-purple-600 transition-colors">Try Again</button>
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
          <button key={btn} onClick={() => onNumberClick(btn)} className="h-24 text-3xl font-bold text-purple-800 bg-purple-100 rounded-2xl transition-colors hover:bg-purple-200">
            {btn}
          </button>
        ))}
        <button onClick={onBackspace} className="flex items-center justify-center h-24 text-2xl font-bold text-red-800 bg-red-100 rounded-2xl transition-colors hover:bg-red-200"><Delete size={32} /></button>
        <button onClick={() => onNumberClick('0')} className="h-24 text-3xl font-bold text-purple-800 bg-purple-100 rounded-2xl transition-colors hover:bg-purple-200">0</button>
        <button onClick={onSubmit} className="flex items-center justify-center h-24 text-3xl font-bold text-green-800 bg-green-100 rounded-2xl transition-colors hover:bg-green-200"><Check size={32} /></button>
      </div>
    );
};

// --- Main Challenge Page Component ---
export default function NoMistakePage() {
    const router = useRouter();
    const [gameState, setGameState] = useState<GameState>('ready');
    const [question, setQuestion] = useState<Question>({ num1: 0, num2: 0, answer: 0 });
    const [userAnswer, setUserAnswer] = useState('');
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(10); // Increased time for division

    const generateQuestion = useCallback(() => {
        const num2 = Math.floor(Math.random() * 9) + 2; // Divisor from 2 to 10
        const answer = Math.floor(Math.random() * 9) + 2; // Answer from 2 to 10
        const num1 = num2 * answer;
        setQuestion({ num1, num2, answer });
        setUserAnswer('');
        setTimeLeft(10);
    }, []);

    const handleGameOver = useCallback(() => {
        setGameState('gameOver');
    }, []);

    useEffect(() => {
        if (gameState === 'playing') {
            const timer = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        handleGameOver();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [gameState, question, handleGameOver]);

    const handleStart = () => {
        setScore(0);
        generateQuestion();
        setGameState('playing');
    };

    const handleSubmit = () => {
        if (!userAnswer) return;
        const isCorrect = parseInt(userAnswer, 10) === question.answer;
        if (isCorrect) {
            setScore(prev => prev + 1);
            generateQuestion();
        } else {
            handleGameOver();
        }
    };

    if (gameState === 'ready') {
        return <ChallengeStartScreen
            title="Ready to Start?"
            description="The challenge ends on your first mistake. You have 10 seconds for each problem."
            onStart={handleStart}
            onCancel={() => router.back()}
        />;
    }

    if (gameState === 'gameOver') {
        return <GameResultScreen
            score={score}
            questionsAnswered={score}
            onRetry={handleStart}
            onHome={() => router.push('/')}
        />
    }

   return (
    <div className="w-full min-h-screen bg-gradient-to-b from-purple-50 to-indigo-50 p-4 md:p-6">
        <div className="flex items-start gap-4 md:gap-6 mb-12 md:mb-16">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-purple-100 rounded-full flex justify-center items-center">
                <Target className="w-10 h-10 text-purple-600" />
            </div>
            <div className="flex flex-col gap-2 md:gap-3">
                <h1 className="text-black text-4xl md:text-5xl font-bold font-Nunito leading-tight">No Mistakes</h1>
                <p className="text-black text-xl md:text-2xl font-medium font-Nunito leading-snug">
                    The challenge ends on your first mistake. You have 10 seconds for each problem.
                </p>
            </div>
        </div>

        <div className="flex flex-col lg:flex-row justify-start items-center lg:items-end gap-8 md:gap-16 lg:gap-24">
            <div className="relative w-64 h-64 md:w-80 md:h-80">
                <div className="w-56 h-56 md:w-64 md:h-64 left-[20px] md:left-[30px] top-[20px] md:top-[30px] absolute">
                    <div className="w-full h-full bg-gradient-to-br from-purple-400 to-purple-500 rounded-full" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                        <div className="text-white text-4xl md:text-5xl font-bold font-Nunito leading-relaxed">{`0:${timeLeft < 10 ? '0' : ''}${timeLeft}`}</div>
                        <div className="text-white text-2xl md:text-3xl font-normal font-Nunito leading-snug">Remaining</div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 lg:gap-24">
                <div className="w-full md:w-[400px] lg:w-[450px] flex flex-col gap-4 md:gap-5">
                    <div className="self-stretch flex justify-between items-center">
                        <div className="h-16 flex flex-col">
                            <span className="text-gray-600 text-2xl md:text-3xl font-normal font-Nunito leading-snug">Question</span>
                            <span className="text-purple-600 text-2xl md:text-3xl font-bold font-Nunito leading-relaxed">{score + 1}</span>
                        </div>
                        <div className="h-16 flex flex-col">
                            <span className="text-gray-600 text-2xl md:text-3xl font-normal font-Nunito leading-snug">Score</span>
                            <span className="text-green-600 text-2xl md:text-3xl font-bold font-Nunito leading-relaxed">{score}</span>
                        </div>
                    </div>
                    <div className="self-stretch p-6 md:p-8 rounded-3xl md:rounded-[40px] border border-black flex justify-center items-center gap-2">
                        <span className="text-center text-gray-800 text-4xl md:text-5xl font-bold font-Nunito leading-[60px]">
                            {question.num1} ÷ {question.num2} =
                        </span>
                        <div className="w-24 h-14 md:w-28 md:h-16 px-0.5 py-2 rounded-lg border-2 border-black flex justify-center items-center overflow-hidden">
                            <span className="text-center text-black text-3xl md:text-4xl font-normal font-Nunito">{userAnswer || '?'}</span>
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