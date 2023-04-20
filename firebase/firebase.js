import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyA6uPoXrCGdjPBxo9GxRpz1odio7SXqpTk",
  authDomain: "expense-41b6e.firebaseapp.com",
  projectId: "expense-41b6e",
  storageBucket: "expense-41b6e.appspot.com",
  messagingSenderId: "546221410305",
  appId: "1:546221410305:web:e92742dc3672ffe2f69800",
  measurementId: "G-DH49VFYL2F",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore();
export const storage = getStorage();
