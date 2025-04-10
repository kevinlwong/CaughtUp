"use client";
import { useAuth } from "../../components/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { ROUTES } from "@/lib/routes";

export default function HomePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) router.push(ROUTES.login);
  }, [user, loading, router]);

  const handleLogout = async () => {
    await signOut(getAuth());
    router.push(ROUTES.login);
  };

  if (loading || !user) return <p className="text-center mt-20">Loading...</p>;

  // ✨ Grab name and onboarding status from profile
  const name = user.profile?.name || "there";
  const isFirstTime = !user.profile?.finishedOnboarding;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="absolute top-4 right-4">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="px-3 py-2 bg-gray-200 rounded"
        >
          ⚙️ Settings
        </button>
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 bg-white border rounded shadow-md z-10 w-48">
            <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">Edit Profile</button>
            <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">Account Settings</button>
            <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">Preferences</button>
            <button
              className="block w-full text-left px-4 py-2 hover:bg-red-100 text-red-600"
              onClick={handleLogout}
            >
              Log Out
            </button>
          </div>
        )}
      </div>

      {/* 👋 Personalized greeting */}
      <h1 className="text-3xl font-bold mb-4">
        Hello {name}, {isFirstTime ? "welcome to CaughtUp!" : "welcome back 👋"}
      </h1>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => router.push(ROUTES.quiz)}
      >
        Start Daily Quiz
      </button>
    </div>
  );
}
