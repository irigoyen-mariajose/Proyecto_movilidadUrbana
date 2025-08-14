// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyARQKcFihBTEvFnIZNpf5tlg4jyNiMqvNY",
  authDomain: "andesur-db250.firebaseapp.com",
  projectId: "andesur-db250",
  storageBucket: "andesur-db250.firebasestorage.app",
  messagingSenderId: "820374944627",
  appId: "1:820374944627:web:cc4fc380cce03accfda306",
  measurementId: "G-4BBBLNBRVH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
