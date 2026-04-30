import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

const getEnv = (key: string) => {
  try {
    return eval('import.meta.env')[key];
  } catch (e) {
    return process?.env?.[key];
  }
};

const firebaseConfig = {
  apiKey: getEnv('VITE_FIREBASE_API_KEY') || "AIzaSyDummyKeyForDemo-placeholder",
  authDomain: getEnv('VITE_FIREBASE_AUTH_DOMAIN') || "election-assistant-demo.firebaseapp.com",
  projectId: getEnv('VITE_FIREBASE_PROJECT_ID') || "election-assistant-demo",
  storageBucket: getEnv('VITE_FIREBASE_STORAGE_BUCKET') || "election-assistant-demo.appspot.com",
  messagingSenderId: getEnv('VITE_FIREBASE_MESSAGING_SENDER_ID') || "123456789",
  appId: getEnv('VITE_FIREBASE_APP_ID') || "1:123456789:web:abcdef"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error("Firebase Auth Error", error);
    throw error;
  }
};

export const logout = () => signOut(auth);
