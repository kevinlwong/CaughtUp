"use client"
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { ReactNode, useEffect, useState, createContext, useContext } from "react";
import { useRouter } from "next/navigation";
import { app, auth } from "../lib/firebase";

export const AuthContext = createContext<{ user: any; loading: boolean }>({
  user: null,
  loading: true,
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      if (!user) router.push("/login");
    });

    return () => unsubscribe();
  }, [router]);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}