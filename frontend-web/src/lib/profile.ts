// frontend-web/lib/profile.ts
import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

export async function saveUserProfile(uid: string, profileData: any) {
  const userRef = doc(db, "users", uid);
  await setDoc(userRef, profileData, { merge: true });
}


