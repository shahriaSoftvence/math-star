"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Check, Delete, Target, ArrowLeft } from "lucide-react";
import { useAddAdditionNoMistakeMutation } from "@/Redux/features/addition/additionApi";
import { toast } from "sonner";
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
  title,
  description,
  onStart,
  onCancel,
}: {
  title: string;
  description: string;
  onStart: () => void;
  onCancel: () => void;
}) => (
  <div className="w-full min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 flex flex-col justify-center items-center p-4">
    <div className="w-full max-w-[90%] sm:max-w-md md:max-w-xl p-6 sm:p-8 md:p-10 bg-white rounded-3xl shadow-lg flex flex-col items-center text-center gap-4 sm:gap-6">

      {/* Icon */}
      <div className="bg-blue-100 rounded-full flex justify-center items-center p-2 sm:p-3">
        <Target className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600" />
      </div>

      {/* Title and Description */}
      <div>
        <h2 className="text-gray-800 text-2xl font-bold font-Poppins leading-snug sm:leading-loose">
          {title}
        </h2>
        <p className="text-gray-600 mt-1 text-sm md:text-base">
          {description}
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
          className="bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-600 w-full sm:w-auto flex-1"
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
          className="h-24 text-3xl font-bold text-blue-800 bg-blue-100 rounded-2xl transition-colors hover:bg-blue-200"
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
        className="h-24 text-3xl font-bold text-blue-800 bg-blue-100 rounded-2xl transition-colors hover:bg-blue-200"
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
export default function NoMistakePage() {
  const router = useRouter();
  const [gameState, setGameState] = useState<GameState>("ready");
  const [question, setQuestion] = useState<Question>({
    num1: 0,
    num2: 0,
    answer: 0,
  });
  const [userAnswer, setUserAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);

  const [addAdditionNoMistake] = useAddAdditionNoMistakeMutation();
  // console.log(data)
  const handleContinue = async () => {
    try {
      await addAdditionNoMistake({
        total_correct: score,
        questions_answered: score,
        time_taken_seconds: score * 7,
      }).unwrap();

      toast.success('Score saved successfully!');
      router.push("/dashboard/addition");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      }
      toast.error("Failed to save Score.");
      router.push("/dashboard/addition");
    }
  };

  const generateQuestion = useCallback(() => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    setQuestion({ num1, num2, answer: num1 + num2 });
    setUserAnswer("");
    setTimeLeft(10);
  }, []);

  const handleGameOver = useCallback(() => {
    setGameState("gameOver");
  }, []);

  useEffect(() => {
    if (gameState === "playing") {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
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
    setGameState("playing");
  };

  const handleSubmit = useCallback(() => {
    if (!userAnswer) return;
    const isCorrect = parseInt(userAnswer, 10) === question.answer;
    if (isCorrect) {
      setScore((prev) => prev + 1);
      generateQuestion();
    } else {
      handleGameOver();
    }
  }, [userAnswer, question.answer, generateQuestion, handleGameOver]);

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
        title="Ready to Start?"
        description="The challenge ends on your first mistake, You have 10 seconds for each problem."
        onStart={handleStart}
        onCancel={() => router.back()}
      />
    );
  }

  if (gameState === "gameOver") {
    return (
      <GameResultScreen
        score={score}
        questionsAnswered={`Questions Answered: ${score}`}
        onRetry={handleStart}
        onHome={handleContinue}
        onCancel={() => router.back()}
      />
    );
  }

  return (
    <div className="bg-gradient-to-b from-blue-50 to-purple-50 p-4">
      <div className="max-w-7xl mx-auto min-h-screen">
        <div className="flex flex-col justify-start items-start mb-12 gap-2 md:mb-16">
          <div>
            <Link
              href="/dashboard/addition"
              className="text-gray-800 text-lg font-semibold flex justify-center items-center mb-4 gap-2"
            >
              <ArrowLeft /> Go Back
            </Link>
          </div>
          <div className="flex gap-4 items-start md:gap-6">
            <div className="p-3 bg-blue-100 rounded-full flex justify-center items-center">
              <Target className="w-7 md:w-10 h-7 md:h-10 text-blue-600" />
            </div>
            <div className="flex flex-col gap-2 md:gap-3">
              <h1 className="text-black text-3xl md:text-6xl font-bold font-Nunito leading-10">
                No Mistakes
              </h1>
              <p className="text-black text-lg md:text-2xl font-medium font-Nunito leading-snug">
                The challenge ends on your first mistake, You have 5 seconds for
                each problem.
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col xl:flex-row justify-start items-center gap-10">

          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <div className="w-56 h-56 md:w-64 md:h-64 left-[20px] md:left-[30px] top-[20px] md:top-[30px] absolute">
                <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-500 rounded-full" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                  <div className="text-white text-4xl md:text-5xl font-bold font-Nunito leading-relaxed">{`0:${timeLeft.toString().padStart(2, "0")}`}
                  </div>
                  <div className="text-white text-2xl md:text-3xl font-normal font-Nunito leading-snug">
                    Remaining
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[300px] md:w-[400px] lg:w-[450px] flex flex-col gap-4 md:gap-5">
              <div className="self-stretch flex justify-between items-center">
                <div className="h-16 flex flex-col">
                  <span className="text-gray-600 text-2xl md:text-3xl font-normal font-Nunito leading-snug">
                    Question
                  </span>
                  <span className="text-blue-600 text-2xl md:text-3xl font-bold font-Nunito leading-relaxed">
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
                  {question.num1} + {question.num2} =
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