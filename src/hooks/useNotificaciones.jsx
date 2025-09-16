import { useState, useEffect } from "react";
import { getFirestore, collection, onSnapshot, query, orderBy } from "firebase/firestore";

export default function useNotificaciones(collectionName = "notificaciones") {
const [notificaciones, setNotificaciones] = useState([]);
const [cargando, setCargando] = useState(true);
const [error, setError] = useState(null);


useEffect(() => {
const db = getFirestore();
const q = query(collection(db, collectionName), orderBy("createdAt", "desc"));


const unsub = onSnapshot(
q,
(snapshot) => {
const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
setNotificaciones(data);
setCargando(false);
},
(err) => {
console.error("Error escuchando notificaciones:", err);
setError(err);
setCargando(false);
}
);


return () => unsub();
}, [collectionName]);


return { notificaciones, cargando, error };
}