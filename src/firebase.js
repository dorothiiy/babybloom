import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB_WnALPcH3R_qzF44gsIvhjNslFXhuehM",
    authDomain: "wholesale-delever-backend.firebaseapp.com",
    projectId: "wholesale-delever-backend",
    storageBucket: "wholesale-delever-backend.firebasestorage.app",
    messagingSenderId: "239328179759",
    appId: "1:239328179759:web:0aaaa983e7d12c26cbb8da"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
