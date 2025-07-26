'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ArrowLeft, Check, X, Delete } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CongratulationsScreen from '@/components/CongratulationsScreen'; // 1. Import the new component

// --- Type Definitions ---
type Question = {
  num1: number;
  num2: number;
  answer: number;
};

type ProgressStatus = 'correct' | 'incorrect' | 'pending';

// --- Reusable UI Components ---

const Numpad = ({ onNumberClick, onBackspace, onSubmit }: { onNumberClick: (num: string) => void; onBackspace: () => void; onSubmit: () => void; }) => {
  const buttons = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="grid grid-cols-3 gap-4">
        {buttons.map((btn) => (
          <button key={btn} onClick={() => onNumberClick(btn)} className="h-16 text-xl font-bold text-green-800 bg-green-100 rounded-lg transition-colors hover:bg-green-200">
            {btn}
          </button>
        ))}
        <button onClick={onBackspace} className="flex items-center justify-center h-16 text-lg font-bold text-red-800 bg-red-100 rounded-lg transition-colors hover:bg-red-200">
          <Delete size={24} />
        </button>
        <button onClick={() => onNumberClick('0')} className="h-16 text-xl font-bold text-green-800 bg-green-100 rounded-lg transition-colors hover:bg-green-200">
          0
        </button>
        <button onClick={onSubmit} className="flex items-center justify-center h-16 text-xl font-bold text-green-800 bg-green-100 rounded-lg transition-colors hover:bg-green-200">
          <Check size={24} />
        </button>
      </div>
    </div>
  );
};

const HelpChart = ({ table }: { table: number; }) => (
    <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        className="w-full p-6 bg-white rounded-lg shadow-md"
    >
        <h3 className="mb-4 text-lg font-semibold text-gray-800 text-center">Help chart (x{table} Table)</h3>
        <div className="space-y-1">
            {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                 <div key={num} className="flex justify-start text-sm mx-auto max-w-[80px]">
                    <span className="text-gray-600">{num} x {table} =</span>
                    <span className="font-bold text-gray-800">{num * table}</span>
                </div>
            ))}
        </div>
    </motion.div>
);


// --- Main Practice Page Component ---
export default function PracticePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // State management
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [progress, setProgress] = useState<ProgressStatus[]>([]);
  const [feedback, setFeedback] = useState<{ type: 'correct' | 'incorrect' | null; message: string }>({ type: null, message: '' });
  const [showHelp, setShowHelp] = useState(false);
  const [isComplete, setIsComplete] = useState(false); // 2. Add completion state


  const [tableNumber, setTableNumber] = useState<number | null>(null);
  const questionCount = useMemo(() => parseInt(searchParams?.get('count') || '10', 10), [searchParams]);

  // Generate questions
  useEffect(() => {
    const tableParam = searchParams?.get('table');
    const table = tableParam ? parseInt(tableParam, 10) : null;
    setTableNumber(table);

    if (!table) return;

    const newQuestions: Question[] = Array.from({ length: questionCount }, () => {
      const num1 = Math.floor(Math.random() * 10) + 1; // Random number from 1 to 10
      const num2 = table;
      // Randomly swap num1 and num2 for variety
      const shouldSwap = Math.random() > 0.5;
      return { 
        num1: shouldSwap ? num2 : num1,
        num2: shouldSwap ? num1 : num2,
        answer: num1 * num2
      };
    });
    setQuestions(newQuestions);
    setProgress(Array(questionCount).fill('pending'));
  }, [searchParams, questionCount]);

  const currentQuestion = useMemo(() => questions[currentQuestionIndex], [questions, currentQuestionIndex]);

  // --- Event Handlers ---
  const handleInput = (num: string) => {
    if (userAnswer.length < 5) setUserAnswer(prev => prev + num);
  };

  const handleBackspace = () => setUserAnswer(prev => prev.slice(0, -1));
  
   const handleSubmit = () => {
    if (!userAnswer) return;

    const isCorrect = parseInt(userAnswer, 10) === currentQuestion.answer;
    const newProgress = [...progress];
    newProgress[currentQuestionIndex] = isCorrect ? 'correct' : 'incorrect';
    setProgress(newProgress);

    if (isCorrect) {
      setFeedback({ type: 'correct', message: 'Your answer is absolutely correct!' });
      setShowHelp(false);
      
      setTimeout(() => {
        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex(prev => prev + 1);
          setUserAnswer('');
          setFeedback({ type: null, message: '' });
        } else {
          // 3. Instead of alert, set completion state to true
          setIsComplete(true);
        }
      }, 1500);
    } else {
      setFeedback({ type: 'incorrect', message: 'Now enter the correct answer to continue' });
      setShowHelp(true);
    }
  };

  // 4. Conditionally render the congratulations screen
  if (isComplete) {
    return <CongratulationsScreen onContinue={() => router.push('/addition')} />;
  }

  if (!currentQuestion) {
    return <div className="flex items-center justify-center h-screen">Loading Practice...</div>;
  }

  
  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      {/* Header */}
      <div className="flex items-center mb-6">
        <button onClick={() => router.back()} className="p-2 transition-colors rounded-full hover:bg-gray-200">
          <ArrowLeft className="text-gray-600" />
        </button>
        <h1 className="ml-4 text-3xl font-bold text-gray-800">Practice Multiplication</h1>
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
            return <div key={index} className={`h-full transition-colors duration-500 rounded-[10px] ${color}`} style={{ width: `${100 / questionCount}%` }} />;
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid items-start grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4">
            <AnimatePresence>
                {showHelp && tableNumber && <HelpChart table={tableNumber} />}
            </AnimatePresence>
        </div>
        
        <div className="grid grid-cols-1 col-span-1 gap-6 md:grid-cols-2 lg:col-span-8">
            <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-md">
                <div className="mb-4 text-4xl font-bold text-gray-800">
                    {currentQuestion.num1} × {currentQuestion.num2} =
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
            // FIX: Made the toast responsive
            className={`fixed bottom-10 left-1/2 -translate-x-1/2 p-4 w-full max-w-sm rounded-xl shadow-lg border ${feedback.type === 'correct' ? 'border-emerald-500' : 'border-red-500'}`}
        >
              <div className="flex items-start">
                <div className={`p-1 mr-3 text-xl rounded-full ${feedback.type === 'correct' ? 'bg-emerald-100 text-emerald-500' : 'bg-red-100 text-red-500'}`}>
                  {feedback.type === 'correct' ? <Check size={20} /> : <X size={20} />}
                </div>
                <div>
                  <p className={`font-semibold ${feedback.type === 'correct' ? 'text-emerald-600' : 'text-red-600'}`}>
                    {feedback.type === 'correct' ? 'Correct Answer!' : 'Incorrect Answer'}
                  </p>
                  <p className={`text-sm ${feedback.type === 'correct' ? 'text-emerald-500' : 'text-red-500'}`}>
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