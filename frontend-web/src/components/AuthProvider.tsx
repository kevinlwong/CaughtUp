"use client";

import {
  onAuthStateChanged,
  getAuth,
  User as FirebaseUser,
} from "firebase/auth";
import {
  ReactNode,
  useEffect,
  useState,
  createContext,
  useContext,
} from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "../lib/firebase"; // db = getFirestore(app)
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

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
  refreshUser: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  refreshUser: function (): Promise<void> {
    throw new Error("Function not implemented.");
  }
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthContextType["user"]>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const refreshUser = async () => {
    const firebaseUser = auth.currentUser;
    if (!firebaseUser) return;

    try {
      const userRef = doc(db, "users", firebaseUser.uid);
      const snap = await getDoc(userRef);

      const profile = snap.exists() ? (snap.data() as UserProfile) : {};

      setUser({
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        profile,
      });
    } catch (err) {
      console.error("Failed to refresh user", err);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      const currentPath = window.location.pathname;
  
      if (firebaseUser) {
        await refreshUser();
      } else {
        setUser(null);
  
        // Only redirect if on protected route
        const protectedRoutes = ["/home", "/quiz", "/results"];
        const isProtected = protectedRoutes.some((route) =>
          currentPath.startsWith(route)
        );
  
        if (isProtected) {
          router.push("/login");
        }
      }
  
      setLoading(false);
    });
  
    return () => unsubscribe();
  }, [router]);
  return (
    <AuthContext.Provider value={{ user, loading, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}
