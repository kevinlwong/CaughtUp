"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/routes";
import { updateUserProfile } from "@/lib/firestore";
import { getAuth } from "firebase/auth";

const generations = ["Gen Z", "Millennial", "Gen X", "Boomer"];

export default function GenerationPage() {
  const [gen, setGen] = useState("");
  const router = useRouter();

  const handleContinue = async () => {
    const user = getAuth().currentUser;

    if (user && gen) {
      await updateUserProfile(user.uid, { generation: gen });
      router.push(ROUTES.onboarding.interests);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-100 px-4">
      <h1 className="text-3xl font-semibold text-neutral-800 mb-8 text-center">
        What generation are you?
      </h1>

      <div className="w-full max-w-sm space-y-3 mb-10">
        {generations.map((g) => (
          <button
            key={g}
            onClick={() => setGen(g)}
            className={`w-full px-4 py-3 rounded-md border transition text-sm font-medium ${
              gen === g
                ? "bg-black text-white border-black shadow"
                : "bg-white text-neutral-800 border-neutral-300 hover:bg-neutral-50 hover:border-neutral-400"
            }`}
          >
            {g}
          </button>
        ))}
      </div>

      <button
        onClick={handleContinue}
        disabled={!gen}
        className={`px-6 py-2 rounded-md text-sm font-semibold transition ${
          gen
            ? "bg-black text-white hover:bg-neutral-900"
            : "bg-neutral-300 text-white cursor-not-allowed"
        }`}
      >
        Continue
      </button>
    </div>
  );
}
