// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA62vywO5_Fc9SP-oHwYEsVGr1_XHJOpic",
  authDomain: "caughtup-2b852.firebaseapp.com",
  projectId: "caughtup-2b852",
  storageBucket: "caughtup-2b852.firebasestorage.app",
  messagingSenderId: "578117997464",
  appId: "1:578117997464:web:7b7f52eef1a6d7650711ed",
  measurementId: "G-R114JDHTW0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);