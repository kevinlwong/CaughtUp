// lib/firestore.ts
import { doc, updateDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

export const updateUserProfile = async (uid: string, updates: Partial<{
  name: string;
  generation: string;
  interests: string[];
  finishedOnboarding: boolean;
  isPremium: boolean;
}>) => {
  const userRef = doc(db, "users", uid);
  await setDoc(userRef, updates, { merge: true }); // ✅ merge = update existing fields
};
