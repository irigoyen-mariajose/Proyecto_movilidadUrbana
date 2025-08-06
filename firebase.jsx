// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA_i7dCZfPIxal9r1aWIteary9p_pN__DY",
  authDomain: "movilidad-urbana-57613.firebaseapp.com",
  projectId: "movilidad-urbana-57613",
  storageBucket: "movilidad-urbana-57613.firebasestorage.app",
  messagingSenderId: "358102677215",
  appId: "1:358102677215:web:5951f38e9b629313cf9b6a",
  measurementId: "G-3BXRKDEWCN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);