import { collection, onSnapshot, addDoc, serverTimestamp } from "firebase/firestore";

import { db } from "../firebaseConfig";

const colTrenes = collection(db, "Trenes");


export function suscribirTrenes(onData, onError) {


  return onSnapshot(
    colTrenes,                               
    (snap) => {
      const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      onData(list);
    },
    (err) => {
      console.error("onSnapshot Trenes ERROR:", err);
      if (onError) onError(err);
    }
  );
}
export async function crearTren(data) {
  if (!data.tren || !data.origen || !data.destino || !data.estado) {
    throw new Error("Faltan campos: tren, origen, destino y estado.");
  }
  await addDoc(colTrenes, {
    ...data,
    activo: data.activo ?? true,
    updatedAt: serverTimestamp(),
  });
}
