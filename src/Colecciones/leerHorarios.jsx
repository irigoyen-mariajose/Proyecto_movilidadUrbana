import { collection, getDocs } from "firebase/firestore";
/**
 * @variable collection 
 * @param {*} db
 * @param {*} "Horarios"
 */
const col = collection(db, "Horarios");
const snap = await getDocs(col);
const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
console.log(data); 
