// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: "pet-adoption-6b6f4.firebaseapp.com",
  projectId: "pet-adoption-6b6f4",
  storageBucket: "pet-adoption-6b6f4.firebasestorage.app",
  messagingSenderId: "1066938033502",
  appId: "1:1066938033502:web:c4676dfa4397a721085bcf",
  measurementId: "G-NY4JK9FV24",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
//const analytics = getAnalytics(app);
