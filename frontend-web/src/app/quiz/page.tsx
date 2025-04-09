"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../components/AuthProvider";
import { ROUTES } from "@/lib/routes";
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
    const [confirmExit, setConfirmExit] = useState(false);
  
    useEffect(() => {
      if (!loading && !user) router.push(ROUTES.login);
    }, [user, loading, router]);
  
    const handleAnswer = () => {
      if (currentIndex < sampleQuestions.length - 1) {
        setCurrentIndex((i) => i + 1);
      } else {
        router.push(ROUTES.results);
      }
    };
  
    const handleExit = () => {
      if (confirmExit) {
        router.push(ROUTES.home);
      } else {
        setConfirmExit(true);
        setTimeout(() => setConfirmExit(false), 3000);
      }
    };
  
    if (loading || !user) return <p className="text-center mt-20">Loading...</p>;
  
    const q = sampleQuestions[currentIndex];
  
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-6">
        <div className="absolute top-4 left-4">
          <button
            onClick={handleExit}
            className="px-3 py-2 bg-gray-400 text-gray-700 rounded-lg"
          >
            Home
          </button>
          {confirmExit && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-6 shadow-lg w-[90%] max-w-sm text-center">
      <p className="text-gray-800 text-sm mb-4">
        Are you sure you want to leave? Your quiz progress will be lost.
      </p>
      <div className="flex justify-center gap-4">
        <button
          onClick={() => {
            setConfirmExit(false);
          }}
          className="px-4 py-2 bg-gray-300 rounded text-sm"
        >
          Cancel
        </button>
        <button
          onClick={() => router.push(ROUTES.home)}
          className="px-4 py-2 bg-red-500 text-white rounded text-sm"
        >
          Leave Quiz
        </button>
      </div>
    </div>
  </div>
)}
        </div>
  
        <h1 className="text-xl font-bold mb-4">{q.question}</h1>
        {q.options.map((opt) => (
          <button
            key={opt}
            onClick={handleAnswer}
            className="bg-blue-500 text-white px-4 py-2 rounded mb-2 w-64"
          >
            {opt}
          </button>
        ))}
        <p className="text-sm text-gray-500 mt-4">
          Question {currentIndex + 1} of {sampleQuestions.length}
        </p>
      </div>
    );
  }
  