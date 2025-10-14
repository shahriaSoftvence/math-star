import { useDictionary } from "@/hook/useDictionary";
import { X } from "lucide-react";

const GameResultScreen = ({
    score,
    questionsAnswered,
    onRetry,
    onHome,
    onCancel,
    challengeLoading = false
}: {
    score: number;
    questionsAnswered: string;
    onRetry: () => void;
    onHome: () => void;
    onCancel: () => void;
    challengeLoading?: boolean
}) => {

    const { dictionary, loading } = useDictionary();
    const game_result_screen = dictionary?.game_result_screen;

    if (!game_result_screen || loading) {
        return null;
    }

    return (
        <div className="w-full min-h-screen relative bg-gradient-to-b from-blue-50 to-purple-50 flex flex-col justify-center items-center p-4">
            <div className="w-full max-w-[90%] sm:max-w-sm md:max-w-md p-6 sm:p-8 md:p-8 bg-white rounded-3xl shadow-lg flex flex-col items-center text-center gap-4 mx-auto">

                <div onClick={onCancel} className="w-16 sm:w-20 h-16 sm:h-20 cursor-pointer bg-red-100 rounded-full flex justify-center items-center">
                    <X className="w-8 sm:w-10 h-8 sm:h-10 text-red-500" />
                </div>

                <h1 className="text-gray-800 text-2xl sm:text-3xl md:text-3xl font-bold font-Nunito leading-8 sm:leading-9">
                    {game_result_screen.title}
                </h1>

                <div>
                    <p className="text-lg sm:text-xl text-gray-600 leading-6 sm:leading-7">
                        {game_result_screen.final_score} <span className="font-bold text-blue-600">{score}</span>
                    </p>
                    <p className="text-sm sm:text-base text-gray-600 leading-normal mt-1">
                        <span className="font-bold">{questionsAnswered}</span>
                    </p>
                </div>

                <div className="w-full mt-4 flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4">
                    <button
                        disabled={challengeLoading}
                        onClick={onRetry}
                        className="w-full sm:flex-1 py-2.5 bg-blue-500 text-slate-50 rounded-md font-medium text-sm leading-tight hover:bg-blue-600 transition-colors"
                    >
                        {game_result_screen?.buttons?.try_again}
                    </button>
                    <button
                        disabled={challengeLoading}
                        onClick={onHome}
                        className="w-full sm:flex-1 py-2.5 bg-slate-50 rounded-md border border-slate-200 text-slate-950 font-medium text-sm leading-tight hover:bg-slate-100 transition-colors"
                    >
                        {challengeLoading ? game_result_screen?.buttons?.continue + "..." : game_result_screen?.buttons?.continue}
                    </button>
                </div>

            </div>
        </div>

    )
};

export default GameResultScreen;