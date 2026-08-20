// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCZRCmDQjW_FhfSkWuQ9_x2_f1AP_UwjNg",
  authDomain: "abboud-store-7815e.firebaseapp.com",
  databaseURL: "https://abboud-store-7815e-default-rtdb.firebaseio.com",
  projectId: "abboud-store-7815e",
  storageBucket: "abboud-store-7815e.firebasestorage.app",
  messagingSenderId: "319304816950",
  appId: "1:319304816950:web:8ac0f27b500053c5187b97",
  measurementId: "G-HSWY6RN452",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const analytics = getAnalytics(app);
