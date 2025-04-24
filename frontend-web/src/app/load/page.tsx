"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { motion } from "framer-motion";

export default function LoadPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Wait until Firebase auth is fully loaded AND we know this was user-initiated (from landing page)
    if (!loading && ready) {
      const timeout = setTimeout(() => {
        router.push(user ? "/home" : "/login");
      }, 2000); // shorter transition once ready
      return () => clearTimeout(timeout);
    }
  }, [user, loading, ready, router]);

  // Only set ready to true once mounted (prevents redirects from SSR or hard refresh)
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 200); // slight delay to feel smooth
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-100 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col items-center text-center"
      >
        <img
          src="/caughtup_logo_light.svg"
          alt="CaughtUp Logo"
          className="w-40 h-40 mb-6"
        />

        <h1 className="text-xl sm:text-2xl font-semibold text-neutral-800 mb-2">
          Getting you CaughtUp...
        </h1>
        <p className="text-sm text-neutral-500 mb-6">
          Preparing your personalized experience.
        </p>

        <motion.div className="w-40 h-1 bg-neutral-300 overflow-hidden rounded">
          <motion.div
            className="h-full bg-neutral-800"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{
              duration: 1.2,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "loop",
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
