// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCPierdy6hgaTynQA2cKJ6gxOBNxZDyrnA",
  authDomain: "sem3advtopicslab3.firebaseapp.com",
  databaseURL: "https://sem3advtopicslab3-default-rtdb.firebaseio.com",
  projectId: "sem3advtopicslab3",
  storageBucket: "sem3advtopicslab3.appspot.com",
  messagingSenderId: "931569171718",
  appId: "1:931569171718:web:3dc81777ed12e4ffca7287",
  measurementId: "G-1LPM6HLRHK"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
