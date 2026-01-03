import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDVh4vX9mVRKratqZp1C_9qXZqg-1AeuTU",
  authDomain: "food-delivery-app-c9c75.firebaseapp.com",
  projectId: "food-delivery-app-c9c75",
  storageBucket: "food-delivery-app-c9c75.firebasestorage.app",
  messagingSenderId: "223930474204",
  appId: "1:223930474204:web:8b92aae13433507f155e19",
  measurementId: "G-N1JSXGL13Z"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
