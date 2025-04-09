"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/routes";

const generations = ["Gen Z", "Millennial", "Gen X", "Boomer"];

export default function GenerationPage() {
  const [gen, setGen] = useState("");
  const router = useRouter();

  const handleContinue = () => {
    if (gen) {
      // You could also save the generation to localStorage, context, or backend here
      router.push(ROUTES.onboarding.interests);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6">
      <h1 className="text-2xl font-bold mb-6">What generation are you?</h1>

      <div className="flex flex-col gap-3 mb-6 w-full max-w-xs">
        {generations.map((g) => (
          <button
            key={g}
            onClick={() => setGen(g)}
            className={`px-4 py-2 rounded border ${
              gen === g
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-800 border-gray-300 hover:border-blue-400"
            }`}
          >
            {g}
          </button>
        ))}
      </div>

      <button
        onClick={handleContinue}
        disabled={!gen}
        className={`px-6 py-2 rounded text-white ${
          gen ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        Continue
      </button>
    </div>
  );
}
