"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ROUTES } from "@/lib/routes";
import { Home } from "lucide-react";

export default function HomeButton() {
  const router = useRouter();
  const [confirmExit, setConfirmExit] = useState(false);

  const handleExit = () => {
    if (confirmExit) {
      router.push(ROUTES.home);
    } else {
      setConfirmExit(true);
      setTimeout(() => setConfirmExit(false), 3000);
    }
  };

  return (
    <>
      <div className="absolute top-4 left-4 z-10">
        <button
          onClick={handleExit}
          className="p-2 rounded-md bg-neutral-200 hover:bg-neutral-300 text-neutral-800 transition shadow-sm"
          aria-label="Go Home"
        >
          <Home className="w-5 h-5" />
        </button>
      </div>

      {confirmExit && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 shadow-xl w-[90%] max-w-md text-center">
            <p className="text-neutral-800 text-base mb-4 font-medium">
              Are you sure you want to leave? Your quiz progress will be lost.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setConfirmExit(false)}
                className="px-4 py-2 bg-neutral-300 hover:bg-neutral-400 text-sm rounded-md transition"
              >
                Cancel
              </button>
              <button
                onClick={() => router.push(ROUTES.home)}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm rounded-md transition"
              >
                Leave Quiz
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
