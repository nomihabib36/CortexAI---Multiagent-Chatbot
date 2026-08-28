// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "cortexai-5eb82.firebaseapp.com",
  projectId: "cortexai-5eb82",
  storageBucket: "cortexai-5eb82.firebasestorage.app",
  messagingSenderId: "873476070773",
  appId: "1:873476070773:web:5d01a01a8dbd6e7122c73c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleprovider = new GoogleAuthProvider();
