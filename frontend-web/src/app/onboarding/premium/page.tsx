"use client";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/routes";
import { motion } from "framer-motion";
import { authFetch } from '@/lib/api'

const plans = [
  {
    title: "Free",
    price: "$0",
    description: "Access daily news quizzes",
    features: [
      "5 Daily Questions",
      "Access to Current Events",
      "Basic Profile & Streaks",
    ],
    button: "Stay Free",
    onClick: "free",
  },
  {
    title: "Premium",
    price: "$4.99",
    description: "Unlock deeper insights and perks",
    features: [
      "Unlimited Daily Questions",
      "In-Depth Quiz Analysis",
      "Track Interests & Streaks",
      "Early Access to New Features",
    ],
    button: "Go Premium",
    onClick: "premium",
  },
];


export default function PremiumPage() {
  const router = useRouter();

  const handleChoice = (type: "free" | "premium") => {
    // Save choice later to backend if needed
    router.push(ROUTES.home);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-blue-300">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl font-bold text-center mb-4 bg-gradient-to-r from-blue-600 to-purple-500 bg-clip-text text-transparent"
      >
        Choose Your Experience!
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-center text-3xl mb-4 text-gray-700 bg-gradient-to-r from-blue-600 to-purple-500 bg-clip-text text-transparent"
      >
        Get exclusive features and stay even more informed.
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        {plans.map((plan) => (
          <div
            key={plan.title}
            className="bg-white rounded-lg p-6 shadow-sm transition-transform transform hover:bg-gray-50 hover:scale-[1.05] hover:shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-1 shimmer-x">{plan.title}</h2>

            <p className="text-lg mb-2">{plan.price}</p>
            <p className="text-sm text-gray-600 mb-4">{plan.description}</p>

            <ul className="mb-6 text-sm space-y-1 text-gray-700">
              {plan.features.map((f) => (
                <li key={f}>• {f}</li>
              ))}
            </ul>

            <button
              onClick={() => handleChoice(plan.onClick as any)}
              className={`w-full py-2 rounded font-semibold transition ${
                plan.title === "Free"
                  ? "bg-gray-200 hover:bg-gray-300 text-gray-600"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}
            >
              {plan.button}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
