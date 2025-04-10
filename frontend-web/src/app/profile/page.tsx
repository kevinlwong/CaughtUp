// frontend-web/src/app/profile/page.tsx
"use client";
import { useEffect, useState } from "react";
import { authFetch } from "@/lib/api";

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    authFetch("/api/profile")
      .then(setProfile)
      .catch((err) => console.error("Failed to load profile", err));
  }, []);

  if (!profile) return <p className="text-center mt-10">Loading profile...</p>;

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">👤 Profile</h1>
      <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(profile, null, 2)}</pre>
    </div>
  );
}
