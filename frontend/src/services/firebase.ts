// Firebase service — gracefully handles missing config so the app
// works in local dev without Firebase credentials configured.
import { initializeApp, getApps } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'demo-project',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || ''
};

let auth: Auth | null = null;
let db: Firestore | null = null;

try {
  // Only truly initialize if we have real config values
  const hasConfig = Boolean(import.meta.env.VITE_FIREBASE_API_KEY);
  if (hasConfig) {
    const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    auth = getAuth(app);
    db = getFirestore(app);
  } else {
    console.info('[Firebase] No credentials found — running in demo mode.');
  }
} catch (e) {
  console.warn('[Firebase] Initialization skipped:', e);
}

export { auth, db };

export const signInWithGoogle = async (): Promise<import('firebase/auth').User | null> => {
  if (!auth) {
    console.warn('[Firebase] Not configured — demo login.');
    return null;
  }
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error('[Firebase] Auth Error:', error);
    throw error;
  }
};

export default null;
