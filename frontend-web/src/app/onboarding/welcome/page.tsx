"use client";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/routes";

export default function WelcomePage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6">
      <h1 className="text-3xl font-bold mb-4">👋 Welcome to CaughtUp!</h1>
      <p className="mb-8 text-center max-w-md">
        Stay sharp and informed with daily current events quizzes tailored to your interests.
      </p>
      <button
        onClick={() => router.push(ROUTES.onboarding.name)}
        className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
      >
        Let&apos;s Get Started
      </button>
    </div>
  );
}