"use client";
import { useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/routes";
import { updateUserProfile } from "@/lib/firestore";

export default function NamePage() {
  const [name, setName] = useState("");
  const router = useRouter();

  const handleNext = async () => {
    const user = getAuth().currentUser;

    if (user && name.trim()) {
      await updateUserProfile(user.uid, { name }); // Update Firestore
      router.push(ROUTES.onboarding.generation);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-100 px-4">
      <h1 className="text-3xl font-semibold text-neutral-800 mb-6 text-center">
        What's your name?
      </h1>

      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full max-w-sm px-4 py-3 mb-6 rounded-md border border-neutral-300 bg-white text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-800"
      />

      <button
        onClick={handleNext}
        disabled={!name.trim()}
        className={`w-full max-w-sm px-6 py-2 rounded-md text-sm font-semibold transition ${
          name.trim()
            ? "bg-black text-white hover:bg-neutral-900"
            : "bg-neutral-300 text-white cursor-not-allowed"
        }`}
      >
        Next
      </button>
    </div>
  );
}
