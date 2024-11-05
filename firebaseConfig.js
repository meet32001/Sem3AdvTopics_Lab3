// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCPierdy6hgaTynQA2cKJ6gxOBNxZDyrnA",
  authDomain: "sem3advtopicslab3.firebaseapp.com",
  projectId: "sem3advtopicslab3",
  storageBucket: "sem3advtopicslab3.firebasestorage.app",
  messagingSenderId: "931569171718",
  appId: "1:931569171718:web:3dc81777ed12e4ffca7287",
  measurementId: "G-1LPM6HLRHK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);