// utils/getToken.ts (or just run this in browser console)

import { getAuth } from "firebase/auth";

const auth = getAuth();

auth.currentUser?.getIdToken(true).then((token) => {
  console.log("Your Firebase ID Token:", token);
});
