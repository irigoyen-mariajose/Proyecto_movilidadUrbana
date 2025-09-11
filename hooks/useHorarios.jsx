import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
const col = collection(db, "Horarios");
const snap = await getDocs(col);
const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
console.log(data); 
