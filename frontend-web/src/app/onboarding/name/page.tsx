"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/routes";
export default function NamePage() {
  const [name, setName] = useState("");
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">What's your name?</h1>
      <input
        className="bg-white p-3 border rounded w-64 mb-4"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        onClick={() => router.push(ROUTES.onboarding.generation)}
        disabled={!name.trim()}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Next
      </button>
    </div>
  );
}