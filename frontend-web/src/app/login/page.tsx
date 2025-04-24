"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
import { Eye, EyeOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { auth } from "../../lib/firebase";
import { ROUTES } from "@/lib/routes";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const toggleFormType = () => {
    setError("");
    setIsSignUp((prev) => !prev);
  };

  const handleAuth = async () => {
    setError("");
    setLoading(true);
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
        router.push(ROUTES.onboarding.welcome);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        router.push(ROUTES.home);
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!email) {
      setError("Enter your email to reset your password.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setError("📩 Password reset link sent to your email.");
    } catch (err: any) {
      setError(err.message || "Error sending reset email.");
    }
  };

  const handleOAuth = async (provider: "google" | "github") => {
    setError("");
    try {
      const selectedProvider =
        provider === "google"
          ? new GoogleAuthProvider()
          : new GithubAuthProvider();

      await signInWithPopup(auth, selectedProvider);
      router.push(ROUTES.home);
    } catch (err: any) {
      setError(err.message || "OAuth sign-in failed.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-100 px-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={isSignUp ? "signup" : "login"}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="bg-white w-full max-w-md p-8 rounded-lg shadow-md"
        >
          <h1 className="text-2xl font-semibold text-center mb-6 text-neutral-800">
            {isSignUp ? "Create Your Account" : "Welcome Back"}
          </h1>

          <div className="space-y-4">
            <input
              className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-500"
              placeholder="Email address"
              value={email}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="relative">
              <input
                className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-500 pr-10"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-3 flex items-center text-neutral-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {error && (
              <p className="text-sm text-red-600 bg-red-100 rounded px-3 py-2">
                {error}
              </p>
            )}

            <button
              onClick={handleAuth}
              disabled={loading || !email || !password}
              className={`w-full py-2 rounded-md text-white font-medium transition ${
                loading || !email || !password
                  ? "bg-neutral-400 cursor-not-allowed"
                  : "bg-neutral-800 hover:bg-neutral-700"
              }`}
            >
              {loading
                ? "Loading..."
                : isSignUp
                ? "Create Account"
                : "Login"}
            </button>

            {!isSignUp && (
              <button
                onClick={handlePasswordReset}
                className="w-full text-sm text-left text-blue-700 hover:underline"
              >
                Forgot password?
              </button>
            )}

            <button
              onClick={toggleFormType}
              className="w-full text-sm text-neutral-600 text-center mt-2 hover:underline"
            >
              {isSignUp
                ? "Already have an account? Log in"
                : "Don't have an account? Sign up"}
            </button>
          </div>

          <div className="mt-6 border-t pt-4 space-y-3">
            <button
              onClick={() => handleOAuth("google")}
              className="w-full flex items-center justify-center gap-2 py-2 px-4 border border-neutral-300 rounded-md hover:bg-neutral-100 transition"
            >
              <img src="/google-icon.svg" alt="Google" className="w-5 h-5" />
              Continue with Google
            </button>
            <button
              onClick={() => handleOAuth("github")}
              className="w-full flex items-center justify-center gap-2 py-2 px-4 border border-neutral-300 rounded-md hover:bg-neutral-100 transition"
            >
              <img src="/github-icon.svg" alt="GitHub" className="w-5 h-5" />
              Continue with GitHub
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
