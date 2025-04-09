"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../components/AuthProvider";

export default function IndexPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      router.push(user ? "/home" : "/login");
    }
  }, [user, loading, router]);

  return <p className="text-center mt-20">Redirecting...</p>;
}
