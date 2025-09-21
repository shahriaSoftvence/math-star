import { X } from "lucide-react";

const GameResultScreen = ({
    score,
    questionsAnswered,
    onRetry,
    onHome,
    onCancel
}: {
    score: number;
    questionsAnswered: string;
    onRetry: () => void;
    onHome: () => void;
    onCancel: () => void;
}) => {
    return (
        <div className="w-full min-h-screen relative bg-gradient-to-b from-blue-50 to-purple-50 flex flex-col justify-center items-center p-4">
            <div className="w-full max-w-md p-8 bg-white rounded-3xl shadow-lg flex flex-col items-center text-center gap-4 min-w-[672px] max-[704]:min-w-[400px] mx-auto">
                <div onClick={onCancel} className="w-20 h-20 cursor-pointer bg-red-100 rounded-full flex justify-center items-center">
                    <X className="w-10 h-10 text-red-500" />
                </div>
                <h1 className="text-gray-800 text-3xl font-bold font-Nunito leading-9">
                    Game Over!
                </h1>
                <div>
                    <p className="text-xl text-gray-600 leading-7">
                        Final Score: <span className="font-bold text-blue-600">{score}</span>
                    </p>
                    <p className="text-base text-gray-600 leading-normal">
                        <span className="font-bold">{questionsAnswered}</span>
                    </p>
                </div>
                <div className="w-full mt-4 flex justify-center items-center gap-4">
                    <button
                        onClick={onRetry}
                        className="flex-1 py-2.5 bg-blue-500 text-slate-50 rounded-md font-medium text-sm leading-tight hover:bg-blue-600 transition-colors"
                    >
                        Try Again
                    </button>
                    <button
                        onClick={onHome}
                        className="flex-1 py-2.5 bg-slate-50 rounded-md border border-slate-200 text-slate-950 font-medium text-sm leading-tight hover:bg-slate-100 transition-colors"
                    >
                        Continue
                    </button>
                </div>
            </div>
        </div>
    )
};

export default GameResultScreen;