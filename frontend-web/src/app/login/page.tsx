"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { ROUTES } from "@/lib/routes";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const router = useRouter();

  const handleAuth = async () => {
    setError("");
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
        router.push(ROUTES.onboarding.welcome);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        router.push(ROUTES.home);
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">{isSignUp ? "Sign Up" : "Login"}</h1>
      <input
        className="bg-white p-3 border rounded-md w-64 mb-2"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="bg-white p-3 border rounded-md w-64 mb-2"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <button
        onClick={handleAuth}
        className="bg-blue-500 text-white px-4 py-2 rounded-md mb-2 hover:text-blue-300 hover:bg-blue-900 transition-colors"
      >
        {isSignUp ? "Create Account" : "Login"}
      </button>
      <button
        className="text-sm underline text-blue-700 hover:text-blue-900 transition-colors"
        onClick={() => setIsSignUp(!isSignUp)}
      >
        {isSignUp ? "Already have an account? Log in" : "Don't have an account? Sign up"}
      </button>
    </div>
  );
}
