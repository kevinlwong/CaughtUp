"use client";

import { onAuthStateChanged, getAuth } from "firebase/auth";
import {
  ReactNode,
  useEffect,
  useState,
  createContext,
  useContext,
} from "react";
import { useRouter } from "next/navigation";
import { auth } from "../lib/firebase";

type UserProfile = {
  name?: string;
  generation?: string;
  interests?: string[];
  finishedOnboarding?: boolean;
  isPremium?: boolean;
};

type AuthContextType = {
  user: {
    uid: string;
    email: string | null;
    profile: UserProfile;
  } | null;
  loading: boolean;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthContextType["user"]>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const token = await firebaseUser.getIdToken(); // ✅ Get token
  
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/profile`, {
            headers: {
              Authorization: `Bearer ${token}`, // ✅ Proper auth header
            },
          });
  
          const profile = await res.json();
  
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            profile,
          });
        } catch (err) {
          console.error("❌ Failed to fetch profile:", err);
        }
      } else {
        setUser(null);
        router.push("/login");
      }
  
      setLoading(false);
    });
  
    return () => unsubscribe();
  }, [router]);
  

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
