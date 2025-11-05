import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyARQKcFihBTEvFnIZNpf5tlg4jyNiMqvNY",
  authDomain: "andesur-db250.firebaseapp.com",
  projectId: "andesur-db250",
  storageBucket: "andesur-db250.firebasestorage.app",
  messagingSenderId: "820374944627",
  appId: "1:820374944627:web:cc4fc380cce03accfda306",
  measurementId: "G-4BBBLNBRVH"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);


export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
