import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAFJxyI7yj03r_ubE4w2s3JHuVHYLQIUOw",
  authDomain: "neondatabase.firebaseapp.com",
  projectId: "neondatabase",
  storageBucket: "neondatabase.firebasestorage.app",
  messagingSenderId: "616094913330",
  appId: "1:616094913330:web:cbf13a9c93f7032113bd2b",
  measurementId: "G-235EC9S0EY"
};


// const firebaseConfig = {
//   apiKey: "AIzaSyBpmTCPVy4HQTGEe4pbYFYrQgPRN5TPeSs",
//   authDomain: "bharathyundai-b3418.firebaseapp.com",
//   projectId: "bharathyundai-b3418",
//   storageBucket: "bharathyundai-b3418.firebasestorage.app",
//   messagingSenderId: "863478673766",
//   appId: "1:863478673766:web:e9973c728cf54e08f058a7",
//   measurementId: "G-PQG51554GY"
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Authentication
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
