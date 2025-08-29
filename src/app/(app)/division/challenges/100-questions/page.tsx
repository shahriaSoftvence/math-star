"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { BsGrid3X3 } from "react-icons/bs";
import CongratulationsScreen from "@/components/CongratulationsScreen";
import { useAddDivision100QuestionsMutation } from "@/Redux/features/division/divisionApi";

// --- Type Definitions ---
type Question = { num1: number; num2: number; answer: number };
type GameState = "ready" | "playing" | "gameOver";
type ProgressStatus = "pending" | "current" | "correct" | "incorrect";

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
        <BsGrid3X3 className="w-10 h-10 text-purple-600" />
      </div>
      <div>
        <h2 className="text-gray-800 text-2xl font-bold font-Nunito leading-loose">
          Ready to Start?
        </h2>
        <p className="text-gray-600 mt-2 text-base font-normal font-Nunito leading-normal">
          Solve all 100 division problems!
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
  const playSound = (sound: string) => {
    try {
      const audio = new Audio(sound);
      audio.play().catch(() => {
        // Silently handle audio play failures
      });
    } catch (error) {
      // Silently handle audio creation failures
    }
  };

  const handleClick = (
    e: React.MouseEvent,
    action: () => void,
    sound?: string
  ) => {
    e.preventDefault();
    action();
    if (sound) {
      playSound(sound);
    }
  };

  return (
    <div className="grid grid-cols-3 gap-2 w-full max-w-xs">
      {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((num) => (
        <button
          key={num}
          onClick={(e) =>
            handleClick(
              e,
              () => onNumberClick(num),
              "/Sounds/Number-Click-sound.wav"
            )
          }
          className="h-14 bg-purple-100 rounded flex items-center justify-center text-purple-800 text-lg font-bold font-Nunito hover:bg-purple-200 transition-colors"
        >
          {num}
        </button>
      ))}
      <button
        onClick={(e) =>
          handleClick(e, onBackspace, "/Sounds/delete-click-sound.wav")
        }
        className="h-14 bg-red-100 rounded flex items-center justify-center text-red-800 text-lg font-bold font-Nunito hover:bg-red-200 transition-colors"
      >
        ⌫
      </button>
      <button
        onClick={(e) =>
          handleClick(
            e,
            () => onNumberClick("0"),
            "/Sounds/Number-Click-sound.wav"
          )
        }
        className="h-14 bg-purple-100 rounded flex items-center justify-center text-purple-800 text-lg font-bold font-Nunito hover:bg-purple-200 transition-colors"
      >
        0
      </button>
      <button
        onClick={(e) =>
          handleClick(e, onSubmit, "/Sounds/Check-Click-sound.wav")
        }
        className="h-14 bg-green-100 rounded flex items-center justify-center text-green-800 text-lg font-bold font-Nunito hover:bg-green-200 transition-colors"
      >
        ✓
      </button>
    </div>
  );
};

const QuestionsGrid = ({
  questions,
  questionStatuses,
}: {
  questions: Question[];
  questionStatuses: ProgressStatus[];
}) => {
  const getStatusColor = (status: ProgressStatus) => {
    switch (status) {
      case "current":
        return "bg-yellow-300";
      case "correct":
        return "bg-green-400";
      case "incorrect":
        return "bg-red-400";
      default:
        return "bg-gray-200";
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-center text-gray-800 text-xl font-bold font-Nunito leading-7 mb-2">
        Solve all 100 problems
      </h3>
      <div className="flex justify-center items-center gap-4 mb-4">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-yellow-300 rounded mr-2"></div>
          <span className="text-sm font-Nunito text-[#000]">Current</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-green-400 rounded mr-2"></div>
          <span className="text-sm font-Nunito text-[#000]">Correct</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-red-400 rounded mr-2"></div>
          <span className="text-sm font-Nunito text-[#000]">Wrong</span>
        </div>
      </div>
      <div className="grid grid-cols-10 gap-2">
        {questions.map((q, index) => (
          <div
            key={index}
            className={`h-12 rounded flex justify-center items-center ${getStatusColor(
              questionStatuses[index]
            )}`}
          >
            <span className="text-gray-800 text-xs font-bold font-Nunito leading-none">{`${q.num1} ÷ ${q.num2}`}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Main Challenge Page Component ---
export default function HundredQuestionsPage() {
  const router = useRouter();
  const [gameState, setGameState] = useState<GameState>("ready");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [questionStatuses, setQuestionStatuses] = useState<ProgressStatus[]>(
    []
  );
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [timeLeft, setTimeLeft] = useState(300); 
  const [isComplete, setIsComplete] = useState(false);
  const [score, setScore] = useState(0);
  const [totalClicks, setTotalClicks] = useState(0);

  const [addDivision100Questions, {data}] = useAddDivision100QuestionsMutation();
  console.log(data, "from live")

  const currentQuestion = useMemo(
    () => questions[currentQuestionIndex],
    [questions, currentQuestionIndex]
  );

  const generateQuestions = useCallback(() => {
    const newQuestions: Question[] = Array.from({ length: 100 }, () => {
      const num2 = Math.floor(Math.random() * 9) + 2;
      const answer = Math.floor(Math.random() * 9) + 2;
      const num1 = num2 * answer;
      return { num1, num2, answer };
    });
    setQuestions(newQuestions);
    const initialStatuses: ProgressStatus[] = Array(100).fill("pending");
    initialStatuses[0] = "current";
    setQuestionStatuses(initialStatuses);
  }, []);

  useEffect(() => {
    generateQuestions();
  }, [generateQuestions]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameState === "playing" && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setGameState("gameOver");
    }
    return () => clearInterval(timer);
  }, [gameState, timeLeft]);

  const handleStart = () => {
    setCurrentQuestionIndex(0);
    generateQuestions();
    setTimeLeft(300);
    setScore(0);
    setIsComplete(false);
    setUserAnswer("");
    setGameState("playing");
  };

  const handleSubmit = useCallback(() => {
    if (!userAnswer) return;
    setTotalClicks((prev) => prev + 1);
    const isCorrect = parseInt(userAnswer, 10) === currentQuestion?.answer;
    const newStatuses = [...questionStatuses];
    newStatuses[currentQuestionIndex] = isCorrect ? "correct" : "incorrect";

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    if (currentQuestionIndex < questions.length - 1) {
      newStatuses[currentQuestionIndex + 1] = "current";
      setQuestionStatuses(newStatuses);
      setCurrentQuestionIndex((prev) => prev + 1);
      setUserAnswer("");
    } else {
      setQuestionStatuses(newStatuses);
      setGameState("gameOver");
      setIsComplete(true);
    }
  }, [
    userAnswer,
    currentQuestion,
    questionStatuses,
    currentQuestionIndex,
    questions.length,
  ]);

  const handleContinue = async () => {
    try {
      await addDivision100Questions({
        questions_answered: totalClicks,
        final_score: score,
      }).unwrap();

      router.push("/division");
    } catch (error) {
      console.error("Failed to save 100 Questions results:", error);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (gameState !== "playing") return;

      if (event.key >= "0" && event.key <= "9") {
        setUserAnswer((prev) => (prev.length < 3 ? prev + event.key : prev));
      } else if (event.key === "Backspace") {
        setUserAnswer((prev) => prev.slice(0, -1));
      } else if (event.key === "Enter") {
        handleSubmit();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [gameState, setUserAnswer, handleSubmit]);

  if (gameState === "gameOver" && !isComplete) {
    return (
      <CongratulationsScreen
        onContinue={handleContinue}
        rewardName={`You scored ${score}!`}
      />
    );
  }

  if (isComplete) {
    return (
      <CongratulationsScreen
        onContinue={handleContinue}
        rewardName="Challenge Crusher"
      />
    );
  }

  if (gameState === "ready") {
    return (
      <ChallengeStartScreen
        onStart={handleStart}
        onCancel={() => router.back()}
      />
    );
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-purple-50 to-indigo-50 p-4 md:p-6">
      <div className="flex items-center mb-6">
        <button
          onClick={() => router.back()}
          className="p-2 transition-colors rounded-full hover:bg-gray-200"
        >
          <ArrowLeft className="text-gray-600" />
        </button>
        <h1 className="ml-4 text-3xl font-bold font-Nunito text-gray-800">
          100 Questions Challenge
        </h1>
      </div>

      <div className="flex flex-col lg:flex-row justify-center items-center gap-6">
        {/* Left Side: Timer */}
        <div className="w-72 h-72 bg-gradient-to-br from-purple-400 to-purple-500 rounded-full flex flex-col justify-center items-center flex-shrink-0">
          <div className="text-center text-white text-6xl font-bold font-Nunito leading-loose">
            {formatTime(timeLeft)}
          </div>
          <div className="text-center text-white text-4xl font-normal font-Nunito leading-tight">
            Remaining
          </div>
        </div>

        {/* Middle: Questions Grid */}
        <div className="flex-grow max-w-4xl">
          {questions.length > 0 && (
            <QuestionsGrid
              questions={questions}
              questionStatuses={questionStatuses}
            />
          )}
        </div>

        {/* Right Side: Numpad & Current Question */}
        <div className="w-96 p-6 bg-white rounded-lg shadow-md flex flex-col justify-start items-start gap-6 flex-shrink-0">
          <div className="self-stretch p-6 bg-green-100 rounded-lg outline-2 outline-offset-[-2px] outline-green-300 flex flex-col justify-start items-start gap-2">
            {currentQuestion && (
              <div className="self-stretch text-center justify-center text-gray-800 text-2xl font-bold font-Nunito leading-loose">
                {currentQuestion.num1} ÷ {currentQuestion.num2} =
              </div>
            )}
            <div className="self-stretch p-3 bg-white rounded flex flex-col justify-start items-center">
              <div className="self-stretch text-center justify-center text-gray-600 text-2xl font-bold font-Nunito leading-loose">
                {userAnswer || "?"}
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
