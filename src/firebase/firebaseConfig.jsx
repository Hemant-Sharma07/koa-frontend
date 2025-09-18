import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyDyFYejbA1dakvSMvRynrO8x8TtMACaH_s",
  authDomain: "koabackend.firebaseapp.com",
  projectId: "koabackend",
  storageBucket: "koabackend.firebasestorage.app",
  messagingSenderId: "780202382298",
  appId: "1:780202382298:web:b0d8e17ac33376837326e3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const functions = getFunctions(app);

export default app;