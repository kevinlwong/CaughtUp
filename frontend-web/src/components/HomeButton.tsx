"use client";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/routes";

export default function HomeButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(ROUTES.home)}
      className="absolute top-4 left-4 bg-gray-200 text-gray-700 px-3 py-1 rounded hover:bg-gray-300"
    >
      🏠 Home
    </button>
  );
}
