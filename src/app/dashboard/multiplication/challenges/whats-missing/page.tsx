"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, HelpCircle } from "lucide-react";
import { useAddMultiplicationWhatsMissingMutation } from "@/Redux/features/multiplication/multiplicationApi";
import Link from "next/link";
import GameResultScreen from "@/components/GameResultScreen";
import { toast } from "sonner";
import ChallengeStartScreens from "@/components/challengeStartScreens";
import { useDictionary } from "@/hook/useDictionary";

// --- Type Definitions ---
type Question = {
  num1: number;
  num2: number;
  answer: number;
  missingIndex: number;
};
type GameState = "ready" | "playing" | "gameOver";

// --- Sound Utility Function ---
const playSound = (sound: string) => {
  try {
    const audio = new Audio(sound);
    audio.play().catch(() => {
      // Silently handle audio play failures
    });
  } catch {
    // silently ignore any other errors
  }
};

const Numpad = ({
  onNumberClick,
  onBackspace,
  onSubmit,
}: {
  onNumberClick: (num: string) => void;
  onBackspace: () => void;
  onSubmit: () => void;
}) => {
  const handleClick = (e: React.MouseEvent, action: () => void, sound?: string) => {
    e.preventDefault();
    action();
    if (sound) {
      playSound(sound);
    }
  };

  return (
    <div className="grid grid-cols-3 gap-4 w-72">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
        <button
          key={num}
          onClick={(e) => handleClick(e, () => onNumberClick(num.toString()), "/Sounds/Number-Click-sound.wav")}
          className="h-16 bg-green-100 rounded-2xl flex items-center justify-center text-green-800 text-3xl font-bold hover:bg-green-200 transition-colors"
        >
          {num}
        </button>
      ))}
      <button
        onClick={(e) => handleClick(e, onBackspace, "/Sounds/delete-click-sound.wav")}
        className="h-16 bg-red-100 rounded-2xl flex items-center justify-center text-red-800 text-2xl font-bold hover:bg-red-200 transition-colors"
      >
        ⌫
      </button>
      <button
        onClick={(e) => handleClick(e, () => onNumberClick("0"), "/Sounds/Number-Click-sound.wav")}
        className="h-16 bg-green-100 rounded-2xl flex items-center justify-center text-green-800 text-3xl font-bold hover:bg-green-200 transition-colors"
      >
        0
      </button>
      <button
        onClick={(e) => handleClick(e, onSubmit, "/Sounds/Check-Click-sound.wav")}
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

  const { dictionary, loading } = useDictionary();
  const challenge_screens = dictionary?.shared?.challenge_screens
  const api_results = dictionary?.shared?.results

  const [gameState, setGameState] = useState<GameState>("ready");
  const [question, setQuestion] = useState<Question>({
    num1: 0,
    num2: 0,
    answer: 0,
    missingIndex: 0,
  });
  const [userAnswer, setUserAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300);
  const [totalSubmissions, setTotalSubmissions] = useState(0);
  const [addMultiplicationWhatsMissing, { isLoading: isSaving }] = useAddMultiplicationWhatsMissingMutation();

  const generateQuestion = useCallback(() => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const answer = num1 * num2;
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
    setTotalSubmissions(0);
  };

  const handleContinue = async () => {
    try {
      await addMultiplicationWhatsMissing({
        total_correct: score,
        total_wrong: totalSubmissions - score,
        time_taken_seconds: 300,
        whats_missing_pattern: "number_sequence"
      }).unwrap();
      toast.success(api_results?.practice_saved);
      router.push("/dashboard/multiplication");
    } catch (error: unknown) {
      if (error instanceof Error) console.error(error.message);
      toast.error(api_results?.practice_failed);
      router.push("/dashboard/multiplication");
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

  const getQuestionString = () => {
    const { num1, num2, answer, missingIndex } = question;
    const missingPlaceholder = userAnswer || "__";

    if (missingIndex === 0)
      return `${missingPlaceholder} x ${num2} = ${answer}`;
    if (missingIndex === 1)
      return `${num1} x ${missingPlaceholder} = ${answer}`;
    return `${num1} x ${num2} = ${missingPlaceholder}`;
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  if (gameState === "gameOver") {
    return (
      <GameResultScreen
        score={score}
        questionsAnswered={`Questions Answered: ${totalSubmissions}`}
        onRetry={handleStart}
        onHome={handleContinue}
        onCancel={() => router.back()}
        challengeLoading={isSaving}
      />
    );
  }

  if (loading || !challenge_screens || !api_results) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-green-50 to-purple-50">
        <p className="text-lg font-semibold text-gray-600">{dictionary?.shared?.loading?.loading}</p>
      </div>
    );
  }

  if (gameState === "ready") {

    return (
      <ChallengeStartScreens
        title={challenge_screens?.ready_screen?.title}
        btnTxt={challenge_screens?.ready_screen?.start_button}
        des={challenge_screens?.ready_screen?.descriptions?.whats_missing}
        bgColor="bg-gradient-to-b from-green-50 to-purple-50"
        iconColor="text-green-600"
        startBtnColor="bg-green-500 hover:bg-green-600"
        onStart={handleStart}
        onCancel={() => router.back()}
        icon={HelpCircle}
      />
    )
  }

  return (
    <div className="bg-gradient-to-b from-green-50 to-purple-50 p-4">
      <div className="max-w-7xl mx-auto min-h-screen">

        <div className="flex flex-col justify-start items-start mb-12 gap-2 md:mb-16">
          <div>
            <Link
              href="/dashboard/multiplication"
              className="text-gray-800 text-lg font-semibold flex justify-center items-center mb-4 gap-2"
            >
              <ArrowLeft /> {dictionary?.shared?.navigation?.go_back}
            </Link>
          </div>
          <div className="flex gap-4 items-start md:gap-6">
            <div className="p-3 bg-green-100 rounded-full flex justify-center items-center">
              <HelpCircle className="w-7 md:w-10 h-7 md:h-10 text-green-600" />
            </div>
            <div className="flex flex-col gap-2 md:gap-3">
              <h1 className="text-black text-3xl md:text-5xl font-bold font-Nunito leading-10">
                {challenge_screens?.instructions?.title4}
              </h1>
              <p className="text-black text-base md:text-xl font-medium font-Nunito leading-snug">
                {challenge_screens?.instructions?.whats_missing}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col xl:flex-row justify-start items-center gap-10">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <div className="w-56 h-56 md:w-64 md:h-64 left-[20px] md:left-[30px] top-[20px] md:top-[30px] absolute">
                <div className="w-full h-full bg-gradient-to-br from-green-400 to-green-500 rounded-full" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                  <div className="text-white text-4xl md:text-5xl font-bold font-Nunito leading-relaxed">{formatTime(timeLeft)}
                  </div>
                  <div className="text-white text-2xl md:text-3xl font-normal font-Nunito leading-snug">
                    {challenge_screens?.game_elements?.timer?.remaining}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[275px] md:w-[375px] lg:w-[450px] flex flex-col gap-4 md:gap-5">
              <div className="self-stretch flex justify-between items-center">
                <div className="h-16 flex flex-col">
                  <span className="text-gray-600 text-xl md:text-3xl font-normal font-Nunito leading-snug">
                    {challenge_screens?.game_elements?.question}
                  </span>
                  <span className="text-green-600 text-2xl md:text-3xl font-bold font-Nunito leading-relaxed">
                    {score + 1}
                  </span>
                </div>
                <div className="h-16 flex flex-col">
                  <span className="text-gray-600 text-xl md:text-3xl font-normal font-Nunito leading-snug">
                    {challenge_screens?.game_elements?.score}
                  </span>
                  <span className="text-green-600 text-2xl md:text-3xl font-bold font-Nunito leading-relaxed">
                    {score}
                  </span>
                </div>
              </div>
              <div className="self-stretch p-5 md:p-6 lg:p-8 rounded-3xl lg:rounded-[40px] border border-black flex justify-center items-center gap-2">
                <span className="text-center text-gray-800 text-[27px] md:text-4xl lg:text-5xl font-bold font-Nunito leading-[60px]">
                  {getQuestionString()}
                </span>
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