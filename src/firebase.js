import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyBZvI34ywt0l0-ksJbXU7AdwOKCAQ1mG1Y",
  authDomain: "napat-chat.firebaseapp.com",
  projectId: "napat-chat",
  storageBucket: "napat-chat.appspot.com",
  messagingSenderId: "995831900063",
  appId: "1:995831900063:web:40bff3486dffb737747faa",
  measurementId: "G-F9SCP0P9F5",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
