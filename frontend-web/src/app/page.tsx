"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const features = [
  {
    title: "Why CaughtUp?",
    points: [
      "Stay informed with daily news quizzes tailored to your interests.",
      "No more doomscrolling — just thoughtful engagement.",
      "Built for people who care about staying sharp, not overwhelmed.",
    ],
  },
  {
    title: "What You'll Get",
    points: [
      "5 new current event questions every day.",
      "Topic tracking and streaks.",
      "Premium mode with unlimited access and insights.",
    ],
  },
  {
    title: "Who It's For",
    points: [
      "Lifelong learners & curious minds.",
      "Students and professionals who want an edge.",
      "Anyone tired of chaotic news feeds.",
    ],
  },
];

export default function LandingPage() {
  const router = useRouter();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleStart = () => {
    router.push("/load"); // Route that checks auth and sends to /login or /home
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12 bg-neutral-100 text-neutral-800">
      <motion.img
        src="/caughtup-icon-light.svg"
        alt="CaughtUp Logo"
        className="w-40 h-40 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      />

      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="text-3xl font-bold mb-4"
      >
        Welcome to CaughtUp
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-center max-w-lg text-neutral-600 mb-10"
      >
        A modern way to stay informed — through engaging, personalized current events quizzes.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="w-full max-w-xl space-y-4"
      >
        {features.map((feature, index) => (
          <div key={index} className="bg-white rounded shadow p-4">
            <button
              className="w-full flex justify-between items-center text-left text-lg font-semibold"
              onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
            >
              {feature.title}
              <ChevronDown className={`transition-transform ${expandedIndex === index ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
              {expandedIndex === index && (
                <motion.ul
                  className="mt-2 list-disc list-inside space-y-1 text-sm text-neutral-700"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                >
                  {feature.points.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        ))}
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        onClick={handleStart}
        className="mt-10 px-6 py-3 bg-neutral-900 text-white rounded-md hover:bg-neutral-800 transition"
      >
        Want to Get Caught Up?
      </motion.button>
    </div>
  );
}
