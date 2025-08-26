'use client';

import React, { useState, useEffect, useMemo, Suspense, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ArrowLeft, Check, X, RefreshCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CongratulationsScreen from '@/components/CongratulationsScreen';
import Numpad from '@/components/Numpad';
 
// --- Type Definitions ---
type Question = {
  num1: number;
  num2: number;
  answer: number;
};

type ProgressStatus = 'correct' | 'incorrect' | 'pending';

// --- Reusable UI Components ---
const HelpChart = ({ num1 }: { num1: number }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ duration: 0.3 }}
    className="w-full p-6 bg-white rounded-lg shadow-md"
  >
    <h3 className="mb-4 text-lg font-semibold text-gray-800">Multiplication Table for {num1}</h3>
    <div className="grid grid-cols-2 gap-2">
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="text-sm text-gray-600">
          {num1} x {i + 1} = {num1 * (i + 1)}
        </div>
      ))}
    </div>
  </motion.div>
);

function PracticePageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // State management
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [progress, setProgress] = useState<ProgressStatus[]>([]);
  const [feedback, setFeedback] = useState<{ type: 'correct' | 'incorrect' | null; message: string }>({ type: null, message: '' });
  const [showHelp, setShowHelp] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  // Memoize parameters from URL to prevent re-renders
  const questionCount = useMemo(() => {
    const count = searchParams?.get('count');
    return count && !isNaN(parseInt(count)) ? parseInt(count) : 10;
  }, [searchParams]);

  const table = useMemo(() => {
    return searchParams?.get('table');
  }, [searchParams]);

  const fixedNum2 = useMemo(() => {
    const raw = searchParams?.get('table') || '';
    const m = raw.trim().match(/^x(\d+)$/i);
    return m ? parseInt(m[1], 10) : null;
  }, [searchParams]);

  const generateQuestions = useCallback(() => {
    const newQuestions: Question[] = Array.from({ length: questionCount }, (_) => {
      const num1 = table && table !== 'all' && !isNaN(parseInt(table)) ? parseInt(table) : Math.floor(Math.random() * questionCount) + 1;
      const num2 = fixedNum2 ?? (Math.floor(Math.random() * questionCount) + 1);
      return { num1, num2, answer: num1 * num2 };
    });
    setQuestions(newQuestions);
    setProgress(Array(questionCount).fill('pending'));
    setCurrentQuestionIndex(0);
    setUserAnswer('');
    setFeedback({ type: null, message: '' });
    setIsComplete(false);
  }, [questionCount, table, fixedNum2]);

  // Generate questions on component mount
  useEffect(() => {
    generateQuestions();
  }, [generateQuestions]);

  const currentQuestion = useMemo(() => questions[currentQuestionIndex], [questions, currentQuestionIndex]);

  // Sound effect player with error handling
  const playSound = useCallback((sound: string) => {
    try {
      const audio = new Audio(sound);
      audio.play().catch(() => {
        // Silently handle audio play failures
      });
    } catch (error) {
      // Silently handle audio creation failures
    }
  }, []);

  // --- Event Handlers ---
  const handleInput = useCallback((num: string) => {
    if (userAnswer.length < 5) {
      setUserAnswer(prev => prev + num);
      playSound('/Sounds/Number-Click-sound.wav');
    }
  }, [userAnswer.length, playSound]);

  const handleBackspace = useCallback(() => {
    setUserAnswer(prev => prev.slice(0, -1));
    playSound('/Sounds/delete-click-sound.wav');
  }, [playSound]);

  const handleSubmit = useCallback(() => {
    if (!userAnswer || !currentQuestion) return;

    const isCorrect = parseInt(userAnswer, 10) === currentQuestion.answer;
    const newProgress = [...progress];
    newProgress[currentQuestionIndex] = isCorrect ? 'correct' : 'incorrect';
    setProgress(newProgress);

    if (isCorrect) {
      setFeedback({ type: 'correct', message: 'Your answer is absolutely correct!' });
      setShowHelp(false);
      playSound('/Sounds/Check-Click-sound.wav');

      setTimeout(() => {
        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex(prev => prev + 1);
          setUserAnswer('');
          setFeedback({ type: null, message: '' });
        } else {
          setIsComplete(true);
        }
      }, 1500);
    } else {
      setFeedback({ type: 'incorrect', message: 'Now enter the correct answer to continue' });
      setShowHelp(true);
      playSound('/Sounds/Wrong-Answer-sound.wav');
      setUserAnswer('');
    }
  }, [userAnswer, currentQuestion, progress, currentQuestionIndex, questions.length, playSound]);

  // Keyboard support with proper dependencies
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key >= '0' && event.key <= '9') {
        handleInput(event.key);
      } else if (event.key === 'Backspace') {
        handleBackspace();
      } else if (event.key === 'Enter') {
        handleSubmit();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleInput, handleBackspace, handleSubmit]);

  const handleReset = useCallback(() => {
    generateQuestions();
  }, [generateQuestions]);

  if (isComplete) {
    return <CongratulationsScreen onContinue={() => router.push('/multiplication')} />;
  }

  if (!currentQuestion) {
    return <div className="flex items-center justify-center h-screen">Loading Practice...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <button onClick={() => router.back()} className="p-2 transition-colors rounded-full hover:bg-gray-200">
            <ArrowLeft className="text-gray-600" />
          </button>
          <h1 className="ml-4 text-3xl font-bold text-gray-800">Practice Multiplication</h1>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={handleReset} className="p-2 transition-colors rounded-full hover:bg-gray-200">
            <RefreshCcw className="text-gray-600" />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="p-4 mb-8 bg-white rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Progress</span>
          <span className="text-sm font-medium text-gray-700">{currentQuestionIndex + 1} of {questionCount}</span>
        </div>
        <div className="flex w-full h-2 overflow-hidden bg-gray-200 rounded-full">
          {progress.map((status, index) => {
            const color = status === 'correct' ? 'bg-green-500' : status === 'incorrect' ? 'bg-red-500' : 'bg-gray-200';
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
            {showHelp && <HelpChart num1={currentQuestion.num1} />}
          </AnimatePresence>
        </div>

        <div className="grid grid-cols-1 col-span-1 gap-6 md:grid-cols-2 lg:col-span-8">
          <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-md">
            <div className="mb-4 text-4xl font-bold text-gray-800">
              {currentQuestion.num1} x {currentQuestion.num2} =
            </div>
            <div className="w-full p-4 text-3xl font-bold text-center text-gray-800 bg-gray-50 border-2 border-gray-200 rounded-lg">
              {userAnswer || '?'}
            </div>
          </div>
          <Numpad onNumberClick={handleInput} onBackspace={handleBackspace} onSubmit={handleSubmit} />
        </div>
      </div>

      {/* Feedback Toast Animation */}
      <AnimatePresence>
        {feedback.type && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className={`fixed bottom-10 left-1/2 -translate-x-1/2 p-4 w-full max-w-sm rounded-xl shadow-lg border ${
              feedback.type === 'correct' ? 'border-emerald-500' : 'border-red-500'
            }`}
          >
            <div className="flex items-start">
              <div className={`p-1 mr-3 text-xl rounded-full ${
                feedback.type === 'correct' ? 'bg-emerald-100 text-emerald-500' : 'bg-red-100 text-red-500'
              }`}>
                {feedback.type === 'correct' ? <Check size={20} /> : <X size={20} />}
              </div>
              <div>
                <p className={`font-semibold ${
                  feedback.type === 'correct' ? 'text-emerald-600' : 'text-red-600'
                }`}>
                  {feedback.type === 'correct' ? 'Correct Answer!' : 'Incorrect Answer'}
                </p>
                <p className={`text-sm ${
                  feedback.type === 'correct' ? 'text-emerald-500' : 'text-red-500'
                }`}>
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

// Wrap the main component in a Suspense boundary
export default function PracticePage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
      <PracticePageContent />
    </Suspense>
  );
}