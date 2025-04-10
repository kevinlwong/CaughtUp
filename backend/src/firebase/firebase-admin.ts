import admin from "firebase-admin";
import serviceAccount from "../../firebase/serviceAccountKey.json"; // adjust the path if needed

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  });
}

export const db = admin.firestore();
