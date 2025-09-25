"use client";

import React, {
  useState,
  useEffect,
  useMemo,
  Suspense,
  useCallback,
} from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ArrowLeft, Check, X, RefreshCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CongratulationsScreen from "@/components/CongratulationsScreen";
import Numpad from "@/components/Numpad";
import { useAddDivisionPracticeMutation } from "@/Redux/features/division/divisionApi";
import { toast } from "sonner";

type Question = {
  num1: number; // Dividend
  num2: number; // Divisor
  answer: number;
};

type ProgressStatus = "correct" | "incorrect" | "pending";

// --- Reusable UI Components ---
const HelpChart = ({ divisor }: { divisor: number }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ duration: 0.3 }}
    className="w-full p-6 bg-white rounded-lg shadow-md"
  >
    <h3 className="mb-4 text-lg font-semibold text-gray-800 text-center">
      Help chart (÷{divisor} Table)
    </h3>
    <div className="space-y-1">
      {Array.from({ length: 10 }, (_, i) => (i + 1) * divisor).map(
        (dividend) => (
          <div
            key={dividend}
            className="flex justify-between text-sm mx-auto max-w-[120px]"
          >
            <span className="text-gray-600">
              {dividend} ÷ {divisor} =
            </span>
            <span className="font-bold text-gray-800">
              {dividend / divisor}
            </span>
          </div>
        )
      )}
    </div>
  </motion.div>
);

function PracticePageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // State management
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
  const [addDivisionPractice] = useAddDivisionPracticeMutation();
  const [totalClicks, setTotalClicks] = useState(0);
  const [rewardName, setRewardName] = useState("");
  // Get question count from URL
  const questionCount = useMemo(() => {
    const count = searchParams?.get("count");
    return count ? parseInt(count, 10) : 10;
  }, [searchParams]);

  const divisor = useMemo(() => {
    const divParam = searchParams?.get("divisor");
    if (!divParam) return null;

    const parts = divParam.split(",").map(p => parseInt(p, 10)).filter(n => !isNaN(n));
    return parts.length === 0 ? null : parts; // returns number[] | null
  }, [searchParams]);


  // Generate questions
  const generateQuestions = useCallback(() => {
    const newQuestions: Question[] = Array.from({ length: questionCount }, () => {
      let num2: number;

      if (divisor === null) {
        // No divisor specified, random
        num2 = Math.floor(Math.random() * questionCount) + 1;
      } else if (divisor.length === 1) {
        // Only one divisor
        num2 = divisor[0];
      } else {
        // Multiple divisors, pick randomly
        const randomIndex = Math.floor(Math.random() * divisor.length);
        num2 = divisor[randomIndex];
      }

      const multiplier = Math.floor(Math.random() * questionCount) + 1;
      const num1 = num2 * multiplier;
      const answer = multiplier;

      return { num1, num2, answer };
    });

    setQuestions(newQuestions);
    setProgress(Array(questionCount).fill("pending"));
    setCurrentQuestionIndex(0);
    setUserAnswer("");
    setFeedback({ type: null, message: "" });
    setIsComplete(false);
  }, [questionCount, divisor]);

  useEffect(() => {
    generateQuestions();
  }, [generateQuestions]);

  const currentQuestion = useMemo(
    () => questions[currentQuestionIndex],
    [questions, currentQuestionIndex]
  );

  // Sound effect helper
  const playSound = useCallback((sound: string) => {
    try {
      const audio = new Audio(sound);
      audio.play().catch(() => { });
    } catch {
      // ignore
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
    if (!userAnswer || !currentQuestion) return;
    setTotalClicks((prev) => prev + 1);

    const isCorrect = parseInt(userAnswer, 10) === currentQuestion.answer;
    const newProgress = [...progress];
    newProgress[currentQuestionIndex] = isCorrect ? "correct" : "incorrect";
    setProgress(newProgress);

    if (isCorrect) {
      setFeedback({
        type: "correct",
        message: "Your answer is absolutely correct!",
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
        message: "Now enter the correct answer to continue",
      });
      setShowHelp(true);
      playSound("/Sounds/Wrong-Answer-sound.wav");
      setUserAnswer("");
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

  const handleReset = useCallback(() => {
    generateQuestions();
  }, [generateQuestions]);


  const handleContinue = async () => {
    try {
      const divisorParam = searchParams?.get("divisor");

      let range_value: number[];


      if (!divisorParam || divisorParam.includes("All")) {
        range_value = [100];
      } else {
        range_value = divisorParam.split(",").map((r) => parseInt(r, 10));
      }

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

      await addDivisionPractice(payload).unwrap();

      toast.success("Practice data saved successfully!");
      router.push("/dashboard/division");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to save practice";
      toast.error(message);
      router.push("/dashboard/division");
    }
  };

  const viewRewards = async () => {
    try {
      const divisorParam = searchParams?.get("divisor");

      let range_value: number[];


      if (!divisorParam || divisorParam.includes("All")) {
        range_value = [100];
      } else {
        range_value = divisorParam.split(",").map((r) => parseInt(r, 10));
      }

      console.log(range_value);

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

      await addDivisionPractice(payload).unwrap();

      toast.success("Practice data saved successfully!");
      router.push("/dashboard/rewards");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to save practice";
      toast.error(message);
      router.push("/dashboard/rewards");
    }
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
          <h1 className="ml-4 text-3xl font-bold text-gray-800">
            Practice Division
          </h1>
        </div>
        <div className="flex items-center gap-2">
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
            {showHelp && currentQuestion && (
              <HelpChart divisor={currentQuestion.num2} />
            )}
          </AnimatePresence>
        </div>

        <div className="grid grid-cols-1 col-span-1 gap-6 md:grid-cols-2 lg:col-span-8">
          <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-md">
            <div className="mb-4 text-4xl font-bold text-gray-800">
              {currentQuestion.num1} ÷ {currentQuestion.num2} =
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
      <AnimatePresence>
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
                    ? "Correct Answer!"
                    : "Incorrect Answer"}
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

// --- Main Practice Page Component ---
export default function PracticePage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          Loading...
        </div>
      }
    >
      <PracticePageContent />
    </Suspense>
  );
}
