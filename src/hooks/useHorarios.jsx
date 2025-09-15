import { useState, useEffect } from "react";
import { getFirestore, collection, onSnapshot, query, orderBy } from "firebase/firestore";


export default function useHorariosTrenes(collectionName = "horarios") {
const [horarios, setHorarios] = useState([]);
const [cargando, setCargando] = useState(true);
const [error, setError] = useState(null);


useEffect(() => {
const db = getFirestore();
const q = query(collection(db, collectionName), orderBy("horaInicio"));


const unsub = onSnapshot(
q,
(snapshot) => {
const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
setHorarios(data);
setCargando(false);
},
(err) => {
console.error("Error escuchando horarios de trenes:", err);
setError(err);
setCargando(false);
}
);


return () => unsub(); 
}, [collectionName]);


return { horarios, cargando, error };
}