import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../firebaseConfig"; 

const colTrenes = collection(db, "Trenes");

export function suscribirTrenes(callback) {
  const q = query(colTrenes, orderBy("updatedAt", "desc"));
  return onSnapshot(q, (snap) => {
    const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    callback(data);
  });
}
