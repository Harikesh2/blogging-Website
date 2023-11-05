// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD7bY0BBzEeyms4R46yIBO6dgGGVC1zzb8",
  authDomain: "blogging-app-bb067.firebaseapp.com",
  projectId: "blogging-app-bb067",
  storageBucket: "blogging-app-bb067.appspot.com",
  messagingSenderId: "31834404623",
  appId: "1:31834404623:web:2d228d1c2b0f7b129cb07a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
