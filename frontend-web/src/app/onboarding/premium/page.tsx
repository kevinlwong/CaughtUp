"use client";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/routes";
export default function PremiumPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Ready to go premium?</h1>
      <p className="mb-6">Get exclusive content and early access.</p>
      <div className="flex gap-4">
        <button
          className="bg-gray-300 px-4 py-2 rounded"
          onClick={() => router.push(ROUTES.home)}
        >
          Stay Free
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => router.push(ROUTES.home)}
        >
          Go Premium
        </button>
      </div>
    </div>
  );
}
