"use client";

import { useAuth } from "../../components/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { ROUTES } from "@/lib/routes";
import SettingsMenu from "../../components/SettingsMenu";

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

  if (loading || !user)
    return <p className="text-center mt-20 text-gray-500">Loading...</p>;

  const greeting = user?.profile?.name && user?.profile?.finishedOnboarding
    ? `Hello, ${user.profile.name}! Welcome back`
    : `Hello, ${user?.profile?.name || "friend"}! Welcome to CaughtUp`;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-100 relative px-4">
      {/*  Settings Dropdown */}
      <SettingsMenu></SettingsMenu>

      {/*  Welcome Message */}
      <h1 className="text-2xl sm:text-3xl font-semibold text-neutral-800 mb-4 text-center">
        {greeting} 👋
      </h1>

      {/*  CTA Button */}
      <button
        onClick={() => router.push(ROUTES.quiz)}
        className="px-5 py-2 rounded-md bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-800 transition"
      >
        Start Daily Quiz
      </button>
    </div>
  );
}
