"use client";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/routes";

export default function ResultsPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6">
      <h1 className="text-2xl font-bold mb-4">🎉 You Finished the Quiz!</h1>
      <p className="text-lg mb-6">Great job! You&apos;re one step closer to staying caught up.</p>

      <div className="flex gap-4">
        <button
          onClick={() => router.push(ROUTES.home)}
          className="bg-gray-300 text-gray-800 px-5 py-2 rounded hover:bg-gray-400"
        >
          🏠 Home
        </button>
        <button
          onClick={() => router.push(ROUTES.quiz)}
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}