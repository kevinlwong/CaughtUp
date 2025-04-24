"use client";

import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/routes";
import { Trophy, Home as HomeIcon, RefreshCw } from "lucide-react";

export default function ResultsPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-100 px-6 py-12">
      <div className="bg-white max-w-xl w-full rounded-xl shadow-md p-8 text-center">
        <div className="flex flex-col items-center mb-6">
          <Trophy className="w-10 h-10 text-yellow-500 mb-2" />
          <h1 className="text-2xl sm:text-3xl font-bold text-neutral-800 mb-2">
            Quiz Complete!
          </h1>
          <p className="text-neutral-600 text-base sm:text-lg">
            Great job—you're staying sharp and informed.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
          <button
            onClick={() => router.push(ROUTES.home)}
            className="flex items-center justify-center gap-2 px-6 py-2 rounded-md bg-neutral-300 hover:bg-neutral-400 text-neutral-800 transition"
          >
            <HomeIcon className="w-5 h-5" />
            Home
          </button>

          <button
            onClick={() => router.push(ROUTES.quiz)}
            className="flex items-center justify-center gap-2 px-6 py-2 rounded-md bg-neutral-800 hover:bg-neutral-700 text-white transition"
          >
            <RefreshCw className="w-5 h-5" />
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}
