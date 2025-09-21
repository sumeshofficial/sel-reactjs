import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "***REMOVED***",
  authDomain: "sel-resell-application.firebaseapp.com",
  projectId: "sel-resell-application",
  storageBucket: "sel-resell-application.firebasestorage.app",
  messagingSenderId: "945637230600",
  appId: "1:945637230600:web:45d98e28115abbe2c669bd"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db};
