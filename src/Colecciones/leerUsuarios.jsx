import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
/**
 * @variable collection 
 * @param {*} db
 * @param {*} "Usuarios"
 */
const col = collection(db, "Usuarios");
const snap = await getDocs(col);
const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
console.log(data); 