"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, HelpCircle } from "lucide-react";
import CongratulationsScreen from "@/components/CongratulationsScreen";
import { useAddDivisionWhatsMissingMutation } from "@/Redux/features/division/divisionApi";
import Link from "next/link";
import { toast } from "sonner";

// --- Type Definitions ---
type Question = {
  num1: number;
  num2: number;
  answer: number;
  missingIndex: number;
};
type GameState = "ready" | "playing" | "gameOver";

// --- Reusable UI Components ---
const ChallengeStartScreen = ({
  onStart,
  onCancel,
}: {
  onStart: () => void;
  onCancel: () => void;
}) => (
  <div className="w-full min-h-screen relative bg-gradient-to-b from-purple-50 to-indigo-50 flex flex-col justify-center items-center p-4">
    <div className="w-full max-w-[450px] min-[516px]:max-w-[600px] p-8 bg-white rounded-3xl shadow-lg flex flex-col items-center text-center gap-6">
      <div className="w-20 h-20 bg-purple-100 rounded-full flex justify-center items-center">
        <HelpCircle className="w-10 h-10 text-purple-600" />
      </div>
      <div>
        <h2 className="text-gray-800 text-2xl font-medium font-Poppins leading-loose">
          Ready to Start?
        </h2>
        <p className="text-gray-600 mt-2 text-base font-normal font-Poppins leading-relaxed">
          Fill in the missing numbers in 5 minutes!
        </p>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <button
          onClick={onCancel}
          className="px-8 py-2 bg-orange-600 text-white rounded-full font-semibold hover:bg-orange-700 text-lg capitalize leading-7 min-w-[206px]"
        >
          Cancel
        </button>
        <button
          onClick={onStart}
          className="px-8 py-2 bg-purple-500 text-white rounded-full font-semibold hover:bg-purple-600 text-lg capitalize leading-7 min-w-[206px]"
        >
          Start Challenge
        </button>
      </div>
    </div>
  </div>
);

const Numpad = ({
  onNumberClick,
  onBackspace,
  onSubmit,
}: {
  onNumberClick: (num: string) => void;
  onBackspace: () => void;
  onSubmit: () => void;
}) => {
  const handleClick = (e: React.MouseEvent, action: () => void) => {
    e.preventDefault();
    action();
  };

  return (
    <div className="grid grid-cols-3 gap-4 w-72">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
        <button
          key={num}
          onClick={(e) => handleClick(e, () => onNumberClick(num.toString()))}
          className="h-16 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-800 text-3xl font-bold hover:bg-purple-200 transition-colors"
        >
          {num}
        </button>
      ))}
      <button
        onClick={(e) => handleClick(e, onBackspace)}
        className="h-16 bg-red-100 rounded-2xl flex items-center justify-center text-red-800 text-2xl font-bold hover:bg-red-200 transition-colors"
      >
        ⌫
      </button>
      <button
        onClick={(e) => handleClick(e, () => onNumberClick("0"))}
        className="h-16 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-800 text-3xl font-bold hover:bg-purple-200 transition-colors"
      >
        0
      </button>
      <button
        onClick={(e) => handleClick(e, onSubmit)}
        className="h-16 bg-green-100 rounded-2xl flex items-center justify-center text-green-800 text-3xl font-bold hover:bg-green-200 transition-colors"
      >
        ✓
      </button>
    </div>
  );
};

// --- Main Challenge Page Component ---
export default function WhatsMissingPage() {
  const router = useRouter();
  const [gameState, setGameState] = useState<GameState>("ready");
  const [question, setQuestion] = useState<Question>({
    num1: 0,
    num2: 0,
    answer: 0,
    missingIndex: 0,
  });
  const [userAnswer, setUserAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [totalSubmissions, setTotalSubmissions] = useState(0);
  const [addDivisionWhatsMissing] = useAddDivisionWhatsMissingMutation();

  const generateQuestion = useCallback(() => {
    const num2 = Math.floor(Math.random() * 9) + 2;
    const answer = Math.floor(Math.random() * 9) + 2;
    const num1 = num2 * answer;
    const missingIndex = Math.floor(Math.random() * 3);
    setQuestion({ num1, num2, answer, missingIndex });
    setUserAnswer("");
  }, []);

  useEffect(() => {
    if (gameState === "playing" && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setGameState("gameOver");
    }
  }, [gameState, timeLeft]);

  const handleStart = () => {
    setScore(0);
    setTimeLeft(300);
    generateQuestion();
    setGameState("playing");
  };

  const handleContinue = async () => {
    try {
      await addDivisionWhatsMissing({
        questions_answered: totalSubmissions,
        final_score: score,
      }).unwrap();

      toast.success("Score saved successfully!");
      router.push("/dashboard/division");
    } catch (err) {
      toast.error("Failed to save your score. Please try again.");
      router.push("/dashboard/division");
    }
  };

  const handleSubmit = useCallback(() => {
    if (!userAnswer) return;
    setTotalSubmissions((prev) => prev + 1);
    let correctAnswer;
    if (question.missingIndex === 0) {
      correctAnswer = question.num1;
    } else if (question.missingIndex === 1) {
      correctAnswer = question.num2;
    } else {
      correctAnswer = question.answer;
    }

    if (parseInt(userAnswer, 10) === correctAnswer) {
      setScore((prev) => prev + 1);
    }
    generateQuestion();
  }, [userAnswer, question, generateQuestion]);

  const getQuestionString = () => {
    const { num1, num2, answer, missingIndex } = question;
    const missingPlaceholder = userAnswer || "__";

    if (missingIndex === 0)
      return `${missingPlaceholder} ÷ ${num2} = ${answer}`;
    if (missingIndex === 1)
      return `${num1} ÷ ${missingPlaceholder} = ${answer}`;
    return `${num1} ÷ ${num2} = ${missingPlaceholder}`;
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  if (gameState === "ready") {
    return (
      <ChallengeStartScreen
        onStart={handleStart}
        onCancel={() => router.back()}
      />
    );
  }

  if (gameState === "gameOver") {
    return (
      <CongratulationsScreen
        onContinue={handleContinue}
        rewardName={`You scored ${score}!`}
      />
    );
  }

  return (
    <div className="bg-gradient-to-b from-purple-50 to-indigo-50 py-4">
      <div className="max-w-7xl mx-auto min-h-screen p-6">
        <div className="flex flex-col justify-start items-start mb-12 gap-2 md:mb-16">
          <div>
            <Link
              href="/dashboard/division"
              className="text-gray-800 text-lg font-semibold flex justify-center items-center mb-4"
            >
              <ArrowLeft /> Go Back
            </Link>
          </div>
          <div className="flex items-start gap-4 md:gap-6">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex justify-center items-center">
              <HelpCircle className="w-14 h-14 text-purple-600" />
            </div>
            <div className="flex flex-col gap-2 md:gap-3">
              <h1 className="text-black text-6xl font-bold font-Nunito leading-10">
                What is missing?
              </h1>
              <p className="text-black text-2xl font-bold font-Nunito leading-10">
                You have 5 minutes to find as many missing numbers as possible.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col  justify-around items-center lg:flex-row lg:items-end gap-8">
          {/* Timer Circle */}
          <div className="w-72 h-72 bg-gradient-to-br from-purple-400 to-purple-500 rounded-full flex flex-col justify-center items-center">
            <div className="text-white text-6xl font-bold font-Nunito leading-tight">
              {formatTime(timeLeft)}
            </div>
            <div className="text-white text-4xl font-normal font-Nunito leading-tight">
              Remaining
            </div>
          </div>

          {/* Question and Score */}
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-gray-600 text-4xl font-normal font-Nunito leading-tight">
                  Question
                </span>
                <span className="text-purple-600 text-4xl font-bold font-Nunito leading-tight">
                  {score + 1}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-600 text-4xl font-normal font-Nunito leading-tight">
                  Score
                </span>
                <span className="text-green-600 text-4xl font-bold font-Nunito leading-tight">
                  {score}
                </span>
              </div>
            </div>

            {/* Question Display */}
            <div className="p-8 rounded-3xl border border-black w-full">
              <div className="text-center text-gray-800 text-4xl sm:text-6xl font-bold font-Nunito leading-tight">
                {getQuestionString()}
              </div>
            </div>
          </div>

          {/* Numpad */}
          <Numpad
            onNumberClick={(num) =>
              setUserAnswer((prev) => (prev.length < 3 ? prev + num : prev))
            }
            onBackspace={() => setUserAnswer((prev) => prev.slice(0, -1))}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}
