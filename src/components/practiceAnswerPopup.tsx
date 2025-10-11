import React from 'react'
import { motion, AnimatePresence } from "framer-motion";
import { Check, X } from 'lucide-react';
import { useDictionary } from '@/hook/useDictionary';

type FeedbackType = {
  type: "correct" | "incorrect" | null;
  message: string;
};

export default function PracticeAnswerPopup({ feedback }: { feedback: FeedbackType }) {

  const { dictionary, loading } = useDictionary();
  const practice = dictionary?.shared?.practice;

  if (!practice || loading) {
    return null;
  }

  return (
    <AnimatePresence>
      {feedback?.type && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className={`fixed top-4 md:bottom-10 md:top-auto left-1/2 transform -translate-x-1/2 py-4 px-5 w-[calc(100%-2rem)] max-w-3xs rounded-xl bg-white md:bg-transparent shadow-lg border ${feedback.type === "correct" ? "border-emerald-500" : "border-red-500"
            }`}

        >
          <div className="flex items-center gap-1.5">
            <div
              className={`p-1.5 mr-3 text-xl  rounded-full ${feedback.type === "correct"
                ? "bg-emerald-100 text-emerald-500"
                : "bg-red-100 text-red-500"
                }`}
            >
              {feedback.type === "correct" ? (
                <Check size={24} />
              ) : (
                <X size={24} />
              )}
            </div>
            <div>
              <p
                className={`font-semibold text-lg ${feedback.type === "correct"
                  ? "text-emerald-600"
                  : "text-red-600"
                  }`}
              >
                {feedback.type === "correct"
                  ? practice?.feedback?.correct?.title
                  : practice?.feedback?.incorrect?.title
                }
              </p>
              <p
                className={`text-sm ${feedback.type === "correct"
                  ? "text-emerald-500"
                  : "text-red-500"
                  }`}
              >
                {/* {feedback.message} */}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
