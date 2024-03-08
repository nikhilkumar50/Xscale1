import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyBbgyJTzeSpw5CH0NwEegPaL3IxurCZxRY",
  authDomain: "x-pricing.firebaseapp.com",
  projectId: "x-pricing",
  storageBucket: "x-pricing.appspot.com",
  messagingSenderId: "327391065055",
  appId: "1:327391065055:web:522efbe7567d2ac5604a6a"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;