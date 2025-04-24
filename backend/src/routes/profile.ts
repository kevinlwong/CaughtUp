// backend/src/routes/profile.ts
import express from "express";
import { verifyFirebaseToken } from "../middleware/auth";
import { getFirestore } from "firebase-admin/firestore";

const router = express.Router();
import { db } from "../firebase/firebase-admin"; // ✅ Import db

router.get("/", verifyFirebaseToken, async (req: any, res) => {
  const uid = req.user.uid;
  const doc = await db.collection("profiles").doc(uid).get();
  if (!doc.exists) {
    res.status(404).json({ message: "Profile not found" });
    return;
  }
  res.json(doc.data());
});


// router.get("/", verifyFirebaseToken, async (req, res) => {
//   const user = (req as any).user;
//   res.json({ user });
// });

router.post("/", verifyFirebaseToken, async (req, res) => {
  const uid = (req as any).user.uid;
  const profileData = req.body;

  try {
    await db.collection("users").doc(uid).set(profileData, { merge: true });
    res.json({ success: true });
  } catch (err) {
    console.error("Failed to save profile", err);
    res.status(500).json({ error: "Failed to save profile" });
  }
});



// router.post("/", verifyFirebaseToken, async (req: any, res) => {
//   const uid = req.user.uid;
//   const profile = req.body;

//   await db.collection("profiles").doc(uid).set(profile, { merge: true });
//   res.json({ success: true });
// });

export default router;
