"use client";

import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/routes";
import { motion } from "framer-motion";
import { getAuth } from "firebase/auth";
import { updateUserProfile } from "@/lib/firestore";
import { useAuth } from "@/components/AuthProvider"; 

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
  const { refreshUser } = useAuth();
  const handleChoice = async (type: "free" | "premium") => {
    const isPremium = type === "premium";
    const user = getAuth().currentUser;

    if (!user) {
      console.error("User not found");
      return;
    }

    try {
      await updateUserProfile(user.uid, {
        isPremium,
        finishedOnboarding: true,
      });
      await refreshUser();
      router.push(ROUTES.home);
    } catch (err) {
      console.error("Failed to update premium choice:", err);
      // Optional: show UI feedback
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-neutral-100">
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
            className="bg-white rounded-xl p-6 border border-neutral-300 shadow-sm hover:shadow-md hover:scale-[1.03] transition-transform"
          >
            <h2 className="text-2xl font-semibold mb-1 shimmer-x">{plan.title}</h2>
            <p className="text-lg mb-2 text-neutral-700">{plan.price}</p>
            <p className="text-sm text-neutral-500 mb-4">{plan.description}</p>

            <ul className="mb-6 text-sm space-y-1 text-neutral-700">
              {plan.features.map((f) => (
                <li key={f}>• {f}</li>
              ))}
            </ul>

            <button
              onClick={() => handleChoice(plan.onClick as any)}
              className={`w-full py-2 rounded-md font-semibold transition ${
                plan.title === "Free"
                  ? "bg-neutral-200 hover:bg-neutral-300 text-neutral-700"
                  : "bg-black hover:bg-neutral-900 text-white"
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
