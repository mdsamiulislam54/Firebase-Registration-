// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
 const db = getFirestore(app);
export  {app,db};
