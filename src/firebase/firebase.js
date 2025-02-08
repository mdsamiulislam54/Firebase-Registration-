// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth/cordova";

const firebaseConfig = {
  apiKey: "AIzaSyCYCL9jUftXZyw-2fOMOkJW2zSh-XTeWPA",
  authDomain: "project-2-cf23b.firebaseapp.com",
  projectId: "project-2-cf23b",
  storageBucket: "project-2-cf23b.firebasestorage.app",
  messagingSenderId: "419301767436",
  appId: "1:419301767436:web:16fc5adc3f035165273129",
  measurementId: "G-821BZL40CX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
 

