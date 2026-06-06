import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAF62MOh13DDihMJVhHjwRRhw290s8bHNE",
  authDomain: "burgascares.firebaseapp.com",
  projectId: "burgascares",
  storageBucket: "burgascares.firebasestorage.app",
  messagingSenderId: "161707280311",
  appId: "1:161707280311:web:3f4276198d8b6f30524a32",
  measurementId: "G-JTRCVELNXX"

};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
