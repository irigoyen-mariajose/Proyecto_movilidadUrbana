import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyCSAuFSPGyc568haHarvpHoLLp42HaXbPI",
    authDomain: "movilidadurbana-a5c99.firebaseapp.com",
    projectId: "movilidadurbana-a5c99",
    storageBucket: "movilidadurbana-a5c99.firebasestorage.app",
    messagingSenderId: "865522988280",
    appId: "1:865522988280:web:83c74681f7ef0f46f4370d",
    measurementId: "G-YW8QETDX3E"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };