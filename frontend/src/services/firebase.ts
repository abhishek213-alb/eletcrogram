// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPd-F768asHKy_mOztYIIxSD2b6_0_G50",
  authDomain: "elctogram.firebaseapp.com",
  projectId: "elctogram",
  storageBucket: "elctogram.firebasestorage.app",
  messagingSenderId: "813017487356",
  appId: "1:813017487356:web:3190d622b330baa2cc0479",
  measurementId: "G-49PJMLGXMC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

// Initialize Firebase Auth and Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
