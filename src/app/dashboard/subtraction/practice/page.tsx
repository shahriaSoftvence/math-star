"use client";

import React, {
  useState,
  useEffect,
  useMemo,
  Suspense,
  useCallback,
} from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Check,
  X,
  RefreshCcw,
  ArrowRight,
  ArrowLeftCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CongratulationsScreen from "@/components/CongratulationsScreen";
import Numpad from "@/components/Numpad";
import {
  useAddBorrowPracticeMutation,
  useAddNoBorrowPracticeMutation,
} from "@/Redux/features/subtraction/subtractionApi";
import { toast } from "sonner";

// --- Type Definitions ---
type Question = {
  num1: number;
  num2: number;
  answer: number;
};

type ProgressStatus = "correct" | "incorrect" | "pending";

// --- Reusable UI Components ---

const HelpChart = ({ num1, num2 }: { num1: number; num2: number }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ duration: 0.3 }}
    className="w-full p-6 bg-white rounded-lg shadow-md"
  >
    <h3 className="mb-4 text-lg font-semibold text-gray-800">Help chart</h3>
    <div className="grid grid-cols-10 gap-2 md:gap-3 lg:gap-2 mb-4">
      {Array.from({ length: num1 }).map((_, i) => (
        <div
          key={`n1-${i}`}
          className="relative w-5 md:w-6 h-5 md:h-6 bg-blue-400 border-2 border-blue-500 rounded-full"
        >
          {i >= num1 - num2 && (
            <X
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white"
              size={20}
            />
          )}
        </div>
      ))}
    </div>
    <p className="mt-4 text-sm text-gray-600">(all time visible)</p>
  </motion.div>
);

function PracticePageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [progress, setProgress] = useState<ProgressStatus[]>([]);
  const [feedback, setFeedback] = useState<{
    type: "correct" | "incorrect" | null;
    message: string;
  }>({ type: null, message: "" });
  const [showHelp, setShowHelp] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [totalClicks, setTotalClicks] = useState(0);

  const [addNoBorrowPractice] = useAddNoBorrowPracticeMutation();
  // console.log(data, "the no borrow practice data");
  const [addBorrowPractice] = useAddBorrowPracticeMutation();
  const [rewardName, setRewardName] = useState("");

  // Memoize parameters from URL
  const questionCount = useMemo(
    () => parseInt(searchParams?.get("count") || "10", 10),
    [searchParams]
  );
  const numberRange = useMemo(
    () => parseInt(searchParams?.get("range") || "10", 10),
    [searchParams]
  );
  const operation = useMemo(
    () => searchParams?.get("operation"),
    [searchParams]
  );

  const generateQuestions = useCallback(() => {
    const newQuestions: Question[] = [];
    const maxAttempts = Math.max(1000, questionCount * 50);
    let attempts = 0;

    while (newQuestions.length < questionCount && attempts < maxAttempts) {
      attempts++;

      let num1 = 0;
      let num2 = 0;
      let answer = 0;

      if (operation === "borrowing") {
        if (numberRange < 10) {
          num1 = Math.floor(Math.random() * (numberRange + 1));
          num2 = Math.floor(Math.random() * 10);
          answer = num1 - num2;
        } else {
          num1 = Math.floor(Math.random() * (numberRange - 10 + 1)) + 10; // 10..numberRange
          const unitsDigit = num1 % 10;
          if (unitsDigit === 9) {
            continue;
          }

          const minC = unitsDigit + 1; // must be greater than units digit to force borrow
          const maxC = 9;
          if (minC > maxC) {
            // Shouldn't happen due to check unitsDigit !== 9; but guard anyway
            continue;
          }
          num2 = Math.floor(Math.random() * (maxC - minC + 1)) + minC;
          answer = num1 - num2;
        }
      } else if (operation === "noBorrowing") {
        // choose num1 so that unitsDigit > 0 (otherwise impossible to avoid borrowing)
        num1 = Math.floor(Math.random() * (numberRange + 1));
        const unitsDigit = num1 % 10;
        if (unitsDigit === 0) {
          // can't avoid borrowing if unitsDigit is 0 because num2 must be < 0 -> skip
          continue;
        }
        const minC = 0;
        const maxC = Math.min(unitsDigit - 1, 9);
        if (maxC < minC) {
          continue;
        }
        num2 = Math.floor(Math.random() * (maxC - minC + 1)) + minC;
        answer = num1 - num2;
      } else {
        // default: any subtraction with num2 0..9
        num1 = Math.floor(Math.random() * (numberRange + 1));
        num2 = Math.floor(Math.random() * 10);
        answer = num1 - num2;
      }

      // Safety: avoid negative answers
      if (answer < 0) continue;

      // Push the question
      newQuestions.push({ num1, num2, answer });
    }

    if (newQuestions.length < questionCount) {
      console.warn(
        `generateQuestions: requested ${questionCount} but generated ${newQuestions.length}. Consider increasing numberRange or relaxing operation constraints.`
      );
    }

    setQuestions(newQuestions);
    setProgress(Array(newQuestions.length).fill("pending"));
    setCurrentQuestionIndex(0);
    setUserAnswer("");
    setFeedback({ type: null, message: "" });
    setIsComplete(false);
  }, [questionCount, numberRange, operation]);


  // Generate questions
  useEffect(() => {
    generateQuestions();
  }, [questionCount, numberRange, generateQuestions]);

  const currentQuestion = useMemo(
    () => questions[currentQuestionIndex],
    [questions, currentQuestionIndex]
  );

  // Sound effect player with error handling
  const playSound = useCallback((sound: string) => {
    try {
      const audio = new Audio(sound);
      audio.play().catch(() => {
        // Silently handle audio play failures
      });
    } catch {
      // Silently handle audio creation failures
    }
  }, []);

  // --- Event Handlers ---
  const handleInput = useCallback(
    (num: string) => {
      if (userAnswer.length < 5) {
        setUserAnswer((prev) => prev + num);
        playSound("/Sounds/Number-Click-sound.wav");
      }
    },
    [userAnswer.length, playSound]
  );

  const handleBackspace = useCallback(() => {
    setUserAnswer((prev) => prev.slice(0, -1));
    playSound("/Sounds/delete-click-sound.wav");
  }, [playSound]);

  const handleSubmit = useCallback(() => {
    if (!userAnswer) return;

    setTotalClicks((prev) => prev + 1);

    const parsedAnswer = Number(userAnswer.trim());
    const isCorrect =
      !Number.isNaN(parsedAnswer) && parsedAnswer === currentQuestion.answer;

    console.log(
      `Q: ${currentQuestion.num1} - ${currentQuestion.num2} = ${currentQuestion.answer}, User: ${parsedAnswer}`
    );

    const newProgress = [...progress];
    newProgress[currentQuestionIndex] = isCorrect ? "correct" : "incorrect";
    setProgress(newProgress);

    if (isCorrect) {
      setFeedback({
        type: "correct",
        message: "Your answer is absolutely right!",
      });
      setShowHelp(false);
      playSound("/Sounds/Check-Click-sound.wav");

      setTimeout(() => {
        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex((prev) => prev + 1);
          setUserAnswer("");
          setFeedback({ type: null, message: "" });
        } else {
          setIsComplete(true);
        }
      }, 1500);
    } else {
      setFeedback({
        type: "incorrect",
        message: `Now enter the right answer to continue`,
      });
      setShowHelp(true);
      playSound("/Sounds/Wrong-Answer-sound.wav");
      setUserAnswer(""); // Clear input on wrong
    }
  }, [
    userAnswer,
    currentQuestion,
    progress,
    currentQuestionIndex,
    questions.length,
    playSound,
  ]);


  // Keyboard support with proper dependencies
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key >= "0" && event.key <= "9") {
        handleInput(event.key);
      } else if (event.key === "Backspace") {
        handleBackspace();
      } else if (event.key === "Enter") {
        handleSubmit();
      }
    };

    // window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleInput, handleBackspace, handleSubmit]);

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
      setUserAnswer("");
      setFeedback({ type: null, message: "" });
    }
  };

  const handleSkip = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setUserAnswer("");
      setFeedback({ type: null, message: "" });
    }
  };


  const handleContinue = async () => {
    try {
      const range_value = numberRange;
      const question_number = questionCount;

      // Derived with your formulas
      const total_wrong = totalClicks - question_number;
      const total_correct = question_number - total_wrong;

      const payload = {
        range_value,
        question_number,
        total_correct,
        total_wrong,
      };

      if (operation === "noBorrowing") {
        await addNoBorrowPractice(payload).unwrap();
      } else {
        await addBorrowPractice(payload).unwrap();
      }

      toast.success("Practice data saved successfully!");
      router.push("/dashboard/subtraction");
    } catch (error: unknown) {
      if (error instanceof Error) console.error(error.message);
      toast.error("Failed to save score.");
      router.push("/dashboard/subtraction");
    }



  };

  const viewRewards = async () => {
    try {
      const range_value = numberRange;
      const question_number = questionCount;

      // Derived with your formulas
      const total_wrong = totalClicks - question_number;
      const total_correct = question_number - total_wrong;

      const payload = {
        range_value,
        question_number,
        total_correct,
        total_wrong,
      };

      if (operation === "noBorrowing") {
        await addNoBorrowPractice(payload).unwrap();
      } else {
        await addBorrowPractice(payload).unwrap();
      }

      toast.success("Practice data saved successfully!");
      router.push("/dashboard/rewards");
    }
    catch (error: unknown) {
      if (error instanceof Error) console.error(error.message);
      toast.error("Failed to save score.");
      router.push("/dashboard/rewards");
    }

  };

  const handleReset = () => {
    generateQuestions();
  };

  useEffect(() => {
    if (isComplete) {
      const total_wrong = totalClicks - questionCount;
      const total_correct = questionCount - total_wrong;

      setRewardName(`${total_correct} Star${total_correct > 1 ? "s" : ""}`);
    }
  }, [isComplete, totalClicks, questionCount]);

  if (isComplete) {
    return <CongratulationsScreen viewRewards={viewRewards} rewardName={rewardName} onContinue={handleContinue} />;
  }

  if (!currentQuestion) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading Practice...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <button
            onClick={() => router.back()}
            className="p-2 transition-colors rounded-full hover:bg-gray-200"
          >
            <ArrowLeft className="text-gray-600" />
          </button>
          <h1 className="ml-4 text-xl md:text-3xl font-bold text-gray-800">
            Practice Subtraction
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevious}
            className="p-2 transition-colors rounded-full hover:bg-gray-200"
            disabled={currentQuestionIndex === 0}
          >
            <ArrowLeftCircle className="text-gray-600" />
          </button>
          <button
            onClick={handleSkip}
            className="p-2 transition-colors rounded-full hover:bg-gray-200"
            disabled={currentQuestionIndex === questions.length - 1}
          >
            <ArrowRight className="text-gray-600" />
          </button>
          <button
            onClick={handleReset}
            className="p-2 transition-colors rounded-full hover:bg-gray-200"
          >
            <RefreshCcw className="text-gray-600" />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="p-4 mb-8 bg-white rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Progress</span>
          <span className="text-sm font-medium text-gray-700">
            {currentQuestionIndex + 1} of {questionCount}
          </span>
        </div>
        <div className="flex w-full h-2 overflow-hidden bg-gray-200 rounded-full">
          {progress.map((status, index) => {
            const color =
              status === "correct"
                ? "bg-green-500"
                : status === "incorrect"
                  ? "bg-red-500"
                  : "bg-gray-200";
            return (
              <div
                key={index}
                className={`h-full transition-colors duration-500 rounded-[10px] ${color}`}
                style={{ width: `${100 / questionCount}%` }}
              />
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid items-start grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4">
          <AnimatePresence>
            {showHelp && (
              <HelpChart
                num1={currentQuestion.num1}
                num2={currentQuestion.num2}
              />
            )}
          </AnimatePresence>
        </div>

        <div className="grid grid-cols-1 col-span-1 gap-6 md:grid-cols-2 lg:col-span-8">
          <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-md">
            <div className="mb-4 text-4xl font-bold text-gray-800 flex items-center">
              {currentQuestion.num1} - {currentQuestion.num2} =
            </div>
            <div className="w-full p-4 text-3xl font-bold text-center text-gray-800 bg-gray-50 border-2 border-gray-200 rounded-lg">
              {userAnswer || "?"}
            </div>
          </div>
          <Numpad
            onNumberClick={handleInput}
            onBackspace={handleBackspace}
            onSubmit={handleSubmit}
          />
        </div>
      </div>

      {/* Feedback Toast Animation */}
      {/* <AnimatePresence>
        {feedback.type && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className={`fixed bottom-10 left-1/2 -translate-x-1/2 p-4 w-full max-w-sm rounded-xl shadow-lg border ${feedback.type === "correct"
              ? "border-emerald-500"
              : "border-red-500"
              }`}
          >
            <div className="flex items-start">
              <div
                className={`p-1 mr-3 text-xl rounded-full ${feedback.type === "correct"
                  ? "bg-emerald-100 text-emerald-500"
                  : "bg-red-100 text-red-500"
                  }`}
              >
                {feedback.type === "correct" ? (
                  <Check size={20} />
                ) : (
                  <X size={20} />
                )}
              </div>
              <div>
                <p
                  className={`font-semibold ${feedback.type === "correct"
                    ? "text-emerald-600"
                    : "text-red-600"
                    }`}
                >
                  {feedback.type === "correct"
                    ? "Right Answer!"
                    : "Wrong Answer"}
                </p>
                <p
                  className={`text-sm ${feedback.type === "correct"
                    ? "text-emerald-500"
                    : "text-red-500"
                    }`}
                >
                  {feedback.message}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence> */}
      <AnimatePresence>
              {feedback.type && (
                <motion.div
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.9 }}
                  className={`fixed top-4 md:bottom-10 md:top-auto left-1/2 transform -translate-x-1/2 p-4 w-[calc(100%-2rem)] max-w-sm rounded-xl bg-white md:bg-transparent shadow-lg border ${feedback.type === "correct" ? "border-emerald-500" : "border-red-500"
                    }`}
      
                >
                  <div className="flex items-start">
                    <div
                      className={`p-1 mr-3 text-xl rounded-full ${feedback.type === "correct"
                        ? "bg-emerald-100 text-emerald-500"
                        : "bg-red-100 text-red-500"
                        }`}
                    >
                      {feedback.type === "correct" ? (
                        <Check size={20} />
                      ) : (
                        <X size={20} />
                      )}
                    </div>
                    <div>
                      <p
                        className={`font-semibold ${feedback.type === "correct"
                          ? "text-emerald-600"
                          : "text-red-600"
                          }`}
                      >
                        {feedback.type === "correct"
                          ? "Right Answer!"
                          : "Wrong Answer"}
                      </p>
                      <p
                        className={`text-sm ${feedback.type === "correct"
                          ? "text-emerald-500"
                          : "text-red-500"
                          }`}
                      >
                        {feedback.message}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
    </div>
  );
}

export default function PracticePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PracticePageContent />
    </Suspense>
  );
}
