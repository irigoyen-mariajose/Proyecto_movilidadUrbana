import { useState, useEffect } from "react";
import { getFirestore, collection, onSnapshot, query, orderBy } from "firebase/firestore";


export default function useParadas(collectionName = "paradas") {
const [paradas, setParadas] = useState([]);
const [cargando, setCargando] = useState(true);
const [error, setError] = useState(null);


useEffect(() => {
const db = getFirestore();
const q = query(collection(db, collectionName), orderBy("nombre"));


const unsub = onSnapshot(
q,
(snapshot) => {
const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
setParadas(data);
setCargando(false);
},
(err) => {
console.error("Error escuchando paradas:", err);
setError(err);
setCargando(false);
}
);


return () => unsub();
}, [collectionName]);


return { paradas, cargando, error };
}