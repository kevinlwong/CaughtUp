"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getAuth, signOut } from "firebase/auth";

export default function SettingsMenu() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(getAuth());
    router.push("/login");
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={() => setOpen(!open)}
        className="font-semibold px-3 py-2 text-sm bg-white border border-gray-300 rounded shadow hover:bg-gray-100 transition"
      >
        ⚙️
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded shadow-md text-sm">
          <button className="block w-full px-4 py-2 hover:bg-gray-100 text-left">Edit Profile</button>
          <button className="block w-full px-4 py-2 hover:bg-gray-100 text-left">Account Settings</button>
          <button className="block w-full px-4 py-2 hover:bg-gray-100 text-left">Preferences</button>
          <button
            className="block w-full px-4 py-2 text-red-600 hover:bg-red-50 text-left"
            onClick={handleLogout}
          >
            Log Out
          </button>
        </div>
      )}
    </div>
  );
}
