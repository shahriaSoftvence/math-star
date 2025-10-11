'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { BsGrid3X3 } from "react-icons/bs";
import { useAddMultiplication100QuestionMutation } from '@/Redux/features/multiplication/multiplicationApi';
import { toast } from 'sonner';
import GameResultScreen from '@/components/GameResultScreen';
import ChallengeStartScreens from '@/components/challengeStartScreens';
import { useDictionary } from '@/hook/useDictionary';

// --- Type Definitions ---
type Question = { num1: number; num2: number; answer: number; };
type GameState = 'ready' | 'playing' | 'gameOver';
type ProgressStatus = 'pending' | 'current' | 'correct' | 'incorrect';

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


const Numpad = ({ onNumberClick, onBackspace, onSubmit }: {
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
        <div className="grid grid-cols-3 gap-2 w-full max-w-xs">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
                <button
                    key={num}
                    onClick={(e) => handleClick(e, () => onNumberClick(num), '/Sounds/Number-Click-sound.wav')}
                    className="h-14 bg-green-100 rounded flex items-center justify-center text-green-800 text-lg font-bold font-Nunito hover:bg-green-200 transition-colors"
                >
                    {num}
                </button>
            ))}
            <button
                onClick={(e) => handleClick(e, onBackspace, '/Sounds/delete-click-sound.wav')}
                className="h-14 bg-red-100 rounded flex items-center justify-center text-red-800 text-lg font-bold font-Nunito hover:bg-red-200 transition-colors"
            >
                ⌫
            </button>
            <button
                onClick={(e) => handleClick(e, () => onNumberClick('0'), '/Sounds/Number-Click-sound.wav')}
                className="h-14 bg-green-100 rounded flex items-center justify-center text-green-800 text-lg font-bold font-Nunito hover:bg-green-200 transition-colors"
            >
                0
            </button>
            <button
                onClick={(e) => handleClick(e, onSubmit, '/Sounds/Check-Click-sound.wav')}
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
    wrong, correct, current, des
}: {
    questions: Question[];
    questionStatuses: ProgressStatus[];
    wrong: string;
    correct: string;
    current: string;
    des: string;
}) => {
    const getStatusColor = (status: ProgressStatus) => {
        switch (status) {
            case 'current': return 'bg-yellow-300';
            case 'correct': return 'bg-green-400';
            case 'incorrect': return 'bg-red-400';
            default: return 'bg-gray-200';
        }
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-center text-gray-800 text-xl font-bold font-Nunito leading-7 mb-2">{des}</h3>
            <div className="flex justify-center items-center gap-4 mb-4">
                <div className="flex items-center"><div className="w-4 h-4 bg-yellow-300 rounded mr-2"></div><span className="text-sm font-Nunito text-[#000]">{current}</span></div>
                <div className="flex items-center"><div className="w-4 h-4 bg-green-400 rounded mr-2"></div><span className="text-sm font-Nunito text-[#000]">{correct}</span></div>
                <div className="flex items-center"><div className="w-4 h-4 bg-red-400 rounded mr-2"></div><span className="text-sm font-Nunito text-[#000]">{wrong}</span></div>
            </div>
            <div className="grid grid-cols-6 md:grid-cols-10 gap-2">
                {questions.map((q, index) => (
                    <div
                        key={index}
                        className={`h-12 w-12 rounded flex justify-center items-center ${getStatusColor(
                            questionStatuses[index]
                        )}`}
                    >
                        <span className="text-gray-800 text-xs font-bold font-Nunito leading-none">{`${q.num1} x ${q.num2}`}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

// --- Main Challenge Page Component ---
export default function HundredQuestionsPage() {
    const router = useRouter();

    const { dictionary, loading } = useDictionary();
    const challenge_screens = dictionary?.shared?.challenge_screens;
    const api_results = dictionary?.shared?.results

    const [gameState, setGameState] = useState<GameState>('ready');
    const [questions, setQuestions] = useState<Question[]>([]);
    const [questionStatuses, setQuestionStatuses] = useState<ProgressStatus[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [timeLeft, setTimeLeft] = useState(300);
    const [isComplete, setIsComplete] = useState(false);
    const [score, setScore] = useState(0);
    const [addMultiplication100Question] = useAddMultiplication100QuestionMutation();

    const [totalClicks, setTotalClicks] = useState(0);

    const currentQuestion = useMemo(() => questions[currentQuestionIndex], [questions, currentQuestionIndex]);

    const generateQuestions = useCallback(() => {
        const newQuestions: Question[] = Array.from({ length: 100 }, () => {
            const num1 = Math.floor(Math.random() * 10) + 1;
            const num2 = Math.floor(Math.random() * 10) + 1;
            return { num1, num2, answer: num1 * num2 };
        });
        setQuestions(newQuestions);
        const initialStatuses: ProgressStatus[] = Array(100).fill('pending');
        initialStatuses[0] = 'current';
        setQuestionStatuses(initialStatuses);
    }, []);

    useEffect(() => {
        generateQuestions();
    }, [generateQuestions]);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (gameState === 'playing' && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setGameState('gameOver');
        }
        return () => clearInterval(timer);
    }, [gameState, timeLeft]);

    const handleStart = () => {
        setCurrentQuestionIndex(0);
        generateQuestions();
        setTimeLeft(300);
        setScore(0);
        setIsComplete(false);
        setUserAnswer('');
        setGameState('playing');
        setTotalClicks(0);
    };

    const handleSubmit = useCallback(() => {
        if (!userAnswer) return;
        setTotalClicks((prev) => prev + 1);
        const isCorrect = parseInt(userAnswer, 10) === currentQuestion?.answer;
        const newStatuses = [...questionStatuses];
        newStatuses[currentQuestionIndex] = isCorrect ? 'correct' : 'incorrect';

        if (isCorrect) {
            setScore(prev => prev + 1);
        }

        if (currentQuestionIndex < questions.length - 1) {
            newStatuses[currentQuestionIndex + 1] = 'current';
            setQuestionStatuses(newStatuses);
            setCurrentQuestionIndex(prev => prev + 1);
            setUserAnswer('');
        } else {
            setQuestionStatuses(newStatuses);
            setGameState('gameOver');
            setIsComplete(true);
        }
    }, [userAnswer, currentQuestion, questionStatuses, currentQuestionIndex, questions.length]);

    const handleContinue = async () => {
        try {
            await addMultiplication100Question({
                current_question: totalClicks,
                total_correct: score,
                total_wrong: totalClicks - score,
                time_taken_seconds: 300 - timeLeft,
            }).unwrap();
            toast.success(api_results?.practice_saved);
            router.push("/dashboard/multiplication");
        } catch (error: unknown) {
            if (error instanceof Error) console.error(error.message);
            toast.error(api_results?.practice_failed);
            router.push("/dashboard/multiplication");
        }
    };

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    }

    // Keyboard support with sound
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (gameState !== 'playing') return;

            if (event.key >= '0' && event.key <= '9') {
                setUserAnswer((prev) => {
                    if (prev.length < 3) {
                        playSound("/Sounds/Number-Click-sound.wav");
                        return prev + event.key;
                    }
                    return prev;
                });
            } else if (event.key === 'Backspace') {
                setUserAnswer((prev) => {
                    if (prev.length > 0) {
                        playSound("/Sounds/delete-click-sound.wav");
                        return prev.slice(0, -1);
                    }
                    return prev;
                });
            } else if (event.key === 'Enter') {
                playSound("/Sounds/Check-Click-sound.wav");
                handleSubmit();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [gameState, handleSubmit]);

    if (gameState === "gameOver" || isComplete) {
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


    if (loading || !challenge_screens || !api_results) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-green-50 to-purple-50">
                <p className="text-lg font-semibold text-gray-600">{dictionary?.shared?.loading?.loading}</p>
            </div>
        );
    }

    if (gameState === 'ready') {
        return (
            <ChallengeStartScreens
                title={challenge_screens?.ready_screen?.title}
                btnTxt={challenge_screens?.ready_screen?.start_button}
                des={challenge_screens?.ready_screen?.descriptions?.hundred_questions}
                onStart={handleStart}
                onCancel={() => router.back()}
                bgColor="bg-gradient-to-b from-green-50 to-purple-50"
                icon={BsGrid3X3}
                iconColor="text-green-600"
                startBtnColor="bg-green-500 hover:bg-green-600"
            />
        )
    }

    return (
        <div className="bg-gradient-to-b from-green-50 to-purple-50">
            <div className="max-w-[1440px] mx-auto min-h-screen p-4 md:p-6">
                <div className="flex items-center mb-6">
                    <button onClick={() => router.back()} className="p-2 transition-colors rounded-full hover:bg-gray-200">
                        <ArrowLeft className="text-gray-600" />
                    </button>
                    <h1 className="ml-4 text-2xl md:text-3xl font-bold font-Nunito text-gray-800">{challenge_screens?.instructions?.title3}</h1>
                </div>

                <div className="flex flex-col xl:flex-row justify-center items-center gap-6">
                    {/* Left Side: Timer */}
                    <div className="w-72 h-72 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex flex-col justify-center items-center flex-shrink-0">
                        <div className="text-center text-white text-6xl font-bold font-Nunito leading-loose">{formatTime(timeLeft)}</div>
                        <div className="text-center text-white text-3xl font-normal font-Nunito leading-tight">
                            {challenge_screens?.game_elements?.timer?.remaining}
                        </div>
                    </div>

                    {/* Middle: Questions Grid */}
                    <div className="flex-grow max-w-4xl">
                        {questions.length > 0 && <QuestionsGrid questions={questions} questionStatuses={questionStatuses} des={challenge_screens?.instructions?.hundred_questions}
                            current={challenge_screens?.game_elements?.status_indicators?.current}
                            correct={challenge_screens?.game_elements?.status_indicators?.correct}
                            wrong={challenge_screens?.game_elements?.status_indicators?.wrong} />}
                    </div>

                    {/* Right Side: Numpad & Current Question */}
                    <div className="w-96 p-6 bg-white rounded-lg shadow-md flex flex-col justify-start items-start gap-6 flex-shrink-0">
                        <div className="self-stretch p-6 bg-green-100 rounded-lg outline-2 outline-offset-[-2px] outline-green-300 flex flex-col justify-start items-start gap-2">
                            {currentQuestion && (
                                <div className="self-stretch text-center justify-center text-gray-800 text-2xl font-bold font-Nunito leading-loose">
                                    {currentQuestion.num1} x {currentQuestion.num2} =
                                </div>
                            )}
                            <div className="self-stretch p-3 bg-white rounded flex flex-col justify-start items-center">
                                <div className="self-stretch text-center justify-center text-gray-600 text-2xl font-bold font-Nunito leading-loose">
                                    {userAnswer || '?'}
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
        </div>
    );
}