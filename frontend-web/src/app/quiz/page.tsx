"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../components/AuthProvider";
import { ROUTES } from "@/lib/routes";
import HomeButton from "@/components/HomeButton";
import { Check, X } from "lucide-react";

const sampleQuestions = [
  {
    id: 1,
    question: "What's the capital of France?",
    options: ["Paris", "London", "Berlin"],
    answer: "Paris",
  },
  {
    id: 2,
    question: "What year is it?",
    options: ["2023", "2024", "2025"],
    answer: "2025",
  },
];

export default function QuizPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [showReview, setShowReview] = useState(false);

  useEffect(() => {
    if (!loading && !user) router.push(ROUTES.login);
  }, [user, loading, router]);

  const q = sampleQuestions[currentIndex];

  const handleNext = () => {
    if (selectedAnswer === null) return;

    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentIndex] = selectedAnswer;
    setUserAnswers(updatedAnswers);

    if (currentIndex < sampleQuestions.length - 1) {
      setCurrentIndex((i) => i + 1);
      setSelectedAnswer(null);
    } else {
      setShowReview(true);
    }
  };

  const getAnswerState = (option: string, i: number) => {
    const correct = sampleQuestions[i].answer;
    const selected = userAnswers[i];
    if (option === correct) return "correct";
    if (option === selected && option !== correct) return "incorrect";
    return "default";
  };

  if (loading || !user)
    return <p className="text-center mt-20 text-neutral-500">Loading...</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-100 px-6 py-12">
      <HomeButton />

      {/* Progress bar */}
      <div className="w-full max-w-2xl mb-4">
        <div className="w-full h-2 bg-neutral-300 rounded-full overflow-hidden">
          <div
            className="h-full bg-neutral-800 transition-all duration-300"
            style={{
              width: `${
                ((currentIndex + (showReview ? 1 : 0)) /
                  sampleQuestions.length) *
                100
              }%`,
            }}
          ></div>
        </div>
      </div>

      <div className="bg-white w-full max-w-2xl rounded-xl shadow-md p-8 text-center">
        {!showReview ? (
          <>
            <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-neutral-800">
              {q.question}
            </h1>

            <div className="space-y-4">
              {q.options.map((opt) => {
                const isSelected = selectedAnswer === opt;
                return (
                  <button
                    key={opt}
                    onClick={() => setSelectedAnswer(opt)}
                    className={`w-full py-3 px-4 rounded-md font-medium transition-all duration-200 border text-sm sm:text-base
                      ${
                        isSelected
                          ? "bg-neutral-800 text-white border-neutral-800"
                          : "bg-neutral-200 text-neutral-800 hover:bg-neutral-300 border-transparent"
                      }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            <button
              onClick={handleNext}
              disabled={!selectedAnswer}
              className={`mt-8 px-6 py-3 rounded-md text-sm sm:text-base font-semibold transition-all
                ${
                  selectedAnswer
                    ? "bg-neutral-800 text-white hover:bg-neutral-700"
                    : "bg-neutral-300 text-neutral-500 cursor-not-allowed"
                }`}
            >
              {currentIndex === sampleQuestions.length - 1 ? "Finish" : "Next"}
            </button>
          </>
        ) : (
          <>
            <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-neutral-800">
              Review Your Answers
            </h1>

            <div className="space-y-8 text-left">
              {sampleQuestions.map((question, i) => (
                <div key={i}>
                  <p className="font-medium mb-2 text-neutral-700">
                    {i + 1}. {question.question}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {question.options.map((opt) => {
                      const state = getAnswerState(opt, i);
                      return (
                        <div
                          key={opt}
                          className={`px-4 py-2 rounded-md border text-sm flex items-center gap-2
                            ${
                              state === "correct"
                                ? "bg-green-100 text-green-800 border-green-400"
                                : state === "incorrect"
                                ? "bg-red-100 text-red-700 border-red-400"
                                : "bg-neutral-100 text-neutral-700 border-neutral-300"
                            }`}
                        >
                          {state === "correct" && <Check size={16} />}
                          {state === "incorrect" && <X size={16} />}
                          {opt}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => router.push(ROUTES.results)}
              className="mt-10 px-6 py-3 bg-neutral-800 hover:bg-neutral-700 text-white rounded-md text-sm font-medium transition"
            >
              Next
            </button>
          </>
        )}
      </div>
    </div>
  );
}
