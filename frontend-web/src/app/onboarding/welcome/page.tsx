"use client";

import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/routes";
import { motion } from "framer-motion";

export default function WelcomePage() {
  const router = useRouter();

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen px-12 bg-neutral-100 text-neutral-800 overflow-hidden">
      {/* Ghost Background Icon */}
      <div className="absolute text-[30rem] sm:text-[36rem] opacity-5 select-none pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        📰
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="max-w-xl w-full text-center z-10"
      >
        <h1 className="text-neutral-600 text-4xl sm:text-5xl font-bold mb-4">
          Welcome to <span className="text-black">CaughtUp</span>
        </h1>

        <p className="text-lg sm:text-xl mb-6 leading-relaxed">
          In a world of constant news cycles, it’s easy to feel behind. <strong>CaughtUp</strong> makes it easy and enjoyable to stay informed — one quiz at a time.
        </p>

        <p className="text-sm text-neutral-600 mb-10">
          We tailor daily current events quizzes to your interests, so you don’t just scroll past the headlines — you actually understand them. Whether it’s tech, politics, health, or pop culture, you’ll stay sharp, thoughtful, and always caught up.
        </p>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => router.push(ROUTES.onboarding.name)}
          className="bg-black hover:bg-neutral-900 text-white font-medium px-6 py-3 rounded-md text-sm transition"
        >
          Let’s Get Started
        </motion.button>
      </motion.div>
    </div>
  );
}
