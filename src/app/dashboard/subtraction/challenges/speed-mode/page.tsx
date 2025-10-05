"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Check, Delete } from "lucide-react";
import { PiTimerBold } from "react-icons/pi";
import { toast } from "sonner";
import { useAddSubtractionSpeedModeMutation } from "@/Redux/features/subtraction/subtractionApi";
import Link from "next/link";
import GameResultScreen from "@/components/GameResultScreen";
import { Button } from "@/components/ui/button";

// --- Type Definitions ---
type Question = { num1: number; num2: number; answer: number };
type GameState = "ready" | "playing" | "gameOver";

// --- Sound Utility Function ---
const playSound = (sound: string) => {
  try {
    const audio = new Audio(sound);
    audio.play().catch(() => {
      // Silently handle audio play failures
    });
  } catch {
    // Silently handle audio creation failures
  }
};

// --- Reusable UI Components ---

const ChallengeStartScreen = ({
  onStart,
  onCancel,
}: {
  onStart: () => void;
  onCancel: () => void;
}) => (
  <div className="w-full min-h-screen bg-gradient-to-b from-pink-50 to-purple-50 flex flex-col justify-center items-center p-4">
    <div className="w-full max-w-[90%] sm:max-w-md md:max-w-xl p-6 sm:p-8 md:p-10 bg-white rounded-3xl shadow-lg flex flex-col items-center text-center gap-4 sm:gap-6">

      {/* Icon */}
      <div className="bg-pink-100 rounded-full flex justify-center items-center p-2 sm:p-3">
        <PiTimerBold className="w-10 h-10 text-pink-600" />
      </div>

      {/* Title and Description */}
      <div>
        <h2 className="text-gray-800 text-2xl font-bold font-Poppins leading-snug sm:leading-loose">
          Ready to Start?
        </h2>
        <p className="text-gray-600 mt-1 text-sm md:text-base">
           Answer as many questions as you can in 5 minutes!
        </p>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4 w-full">
        <Button
          className="bg-orange-600 text-white rounded-full font-semibold hover:bg-orange-700 w-full sm:w-auto flex-1"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          className="bg-pink-500 text-white rounded-full font-semibold hover:bg-pink-600 w-full sm:w-auto flex-1"
          onClick={onStart}
        >
          Start Challenge
        </Button>
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
  const handleNumberClick = (num: string) => {
    onNumberClick(num);
    playSound("/Sounds/Number-Click-sound.wav");
  };

  const handleBackspace = () => {
    onBackspace();
    playSound("/Sounds/delete-click-sound.wav");
  };

  const handleSubmit = () => {
    onSubmit();
    playSound("/Sounds/Check-Click-sound.wav");
  };

  const buttons = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
  return (
    <div className="grid grid-cols-3 gap-4 w-80 md:w-96">
      {buttons.map((btn) => (
        <button
          key={btn}
          onClick={() => handleNumberClick(btn)}
          className="h-24 text-3xl font-bold text-pink-800 bg-pink-100 rounded-2xl transition-colors hover:bg-pink-200"
        >
          {btn}
        </button>
      ))}
      <button
        onClick={handleBackspace}
        className="flex items-center justify-center h-24 text-2xl font-bold text-red-800 bg-red-100 rounded-2xl transition-colors hover:bg-red-200"
      >
        <Delete size={32} />
      </button>
      <button
        onClick={() => handleNumberClick("0")}
        className="h-24 text-3xl font-bold text-pink-800 bg-pink-100 rounded-2xl transition-colors hover:bg-pink-200"
      >
        0
      </button>
      <button
        onClick={handleSubmit}
        className="flex items-center justify-center h-24 text-3xl font-bold text-green-800 bg-green-100 rounded-2xl transition-colors hover:bg-green-200"
      >
        <Check size={32} />
      </button>
    </div>
  );
};

// --- Main Challenge Page Component ---
export default function SpeedModePage() {
  const router = useRouter();
  const [gameState, setGameState] = useState<GameState>("ready");
  const [question, setQuestion] = useState<Question>({
    num1: 0,
    num2: 0,
    answer: 0,
  });
  const [userAnswer, setUserAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [addSubtractionSpeedMode] = useAddSubtractionSpeedModeMutation();
  const [totalClicks, setTotalClicks] = useState(0);

  const generateQuestion = useCallback(() => {
    const num1 = Math.floor(Math.random() * 20) + 1;
    const num2 = Math.floor(Math.random() * num1) + 1;
    setQuestion({ num1, num2, answer: num1 - num2 });
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
    setTotalClicks(0);
  };

  const handleSubmit = useCallback(() => {
    if (!userAnswer) return;
    setTotalClicks((prev) => prev + 1);
    const isCorrect = parseInt(userAnswer, 10) === question.answer;
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
    generateQuestion();
  }, [userAnswer, question.answer, generateQuestion]);

  const handleContinue = async () => {
    try {
      await addSubtractionSpeedMode({
        total_correct: score,
        total_wrong: totalClicks - score,
        time_taken_seconds: 300,
        speed_mode_time: 300
      }).unwrap();
      toast.success("Challenge Score Saved!");
      router.push("/dashboard/subtraction");
    } catch (error: unknown) {
      if (error instanceof Error) console.error(error.message);
      toast.error("Failed to save score.");
      router.push("/dashboard/subtraction");
    }
  };

  // Keyboard support with sound
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (gameState !== "playing") return;

      if (event.key >= "0" && event.key <= "9") {
        setUserAnswer((prev) => {
          if (prev.length < 3) {
            playSound("/Sounds/Number-Click-sound.wav");
            return prev + event.key;
          }
          return prev;
        });
      } else if (event.key === "Backspace") {
        setUserAnswer((prev) => {
          if (prev.length > 0) {
            playSound("/Sounds/delete-click-sound.wav");
            return prev.slice(0, -1);
          }
          return prev;
        });
      } else if (event.key === "Enter") {
        playSound("/Sounds/Check-Click-sound.wav");
        handleSubmit();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [gameState, handleSubmit]);

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
      <GameResultScreen
        score={score}
        questionsAnswered={`Questions Answered: ${totalClicks}`}
        onRetry={handleStart}
        onHome={handleContinue}
        onCancel={() => router.back()}
      />
    );
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <div className="bg-gradient-to-b from-pink-50 to-purple-50 p-4">
      <div className="max-w-7xl mx-auto min-h-screen">
        <div className="flex flex-col justify-start items-start mb-12 gap-2 md:mb-16">
          <div>
            <Link
              href="/dashboard/subtraction"
              className="text-gray-800 text-lg font-semibold flex justify-center items-center mb-4 gap-2"
            >
              <ArrowLeft /> Go Back
            </Link>
          </div>
          <div className="flex gap-4 items-start md:gap-6">
            <div className="p-3 bg-pink-100 rounded-full flex justify-center items-center">
              <PiTimerBold className="w-14 h-14 text-pink-600" />
            </div>
            <div className="flex flex-col gap-2 md:gap-3">
              <h1 className="text-black text-3xl md:text-6xl font-bold font-Nunito leading-10">
                Speedrun
              </h1>
              <p className="text-black text-lg md:text-2xl font-medium font-Nunito leading-snug">
                Solve as many problems as possible in 5 minutes
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col xl:flex-row justify-start items-center gap-10">


          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative w-72 h-72">
              <div className="w-72 h-72 bg-gradient-to-br from-pink-400 to-pink-500 rounded-full flex flex-col justify-center items-center">
                <div className="text-center text-white text-6xl font-bold font-Nunito leading-loose">
                  {formatTime(timeLeft)}
                </div>
                <div className="text-center text-white text-4xl font-normal font-Nunito leading-tight">
                  Remaining
                </div>
              </div>
            </div>

            <div className="w-[330px] md:w-[400px] lg:w-[450px] flex flex-col gap-4 md:gap-5">
              <div className="self-stretch flex justify-between items-center">
                <div className="h-16 flex flex-col">
                  <span className="text-gray-600 text-2xl md:text-3xl font-normal font-Nunito leading-snug">
                    Question
                  </span>
                  <span className="text-pink-600 text-2xl md:text-3xl font-bold font-Nunito leading-relaxed">
                    {score + 1}
                  </span>
                </div>
                <div className="h-16 flex flex-col">
                  <span className="text-gray-600 text-2xl md:text-3xl font-normal font-Nunito leading-snug">
                    Score
                  </span>
                  <span className="text-green-600 text-2xl md:text-3xl font-bold font-Nunito leading-relaxed">
                    {score}
                  </span>
                </div>
              </div>
              <div className="self-stretch p-6 md:p-8 rounded-3xl md:rounded-[40px] border border-black flex justify-center items-center gap-2">
                <span className="text-center text-gray-800 text-4xl md:text-5xl font-bold font-Nunito leading-[60px]">
                  {question.num1} - {question.num2} =
                </span>
                <div className="w-24 h-14 md:w-28 md:h-16 px-0.5 py-2 rounded-lg border-2 border-black flex justify-center items-center overflow-hidden">
                  <span className="text-center text-black text-3xl md:text-4xl font-normal font-Nunito">
                    {userAnswer || "?"}
                  </span>
                </div>
              </div>
            </div>

          </div>
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