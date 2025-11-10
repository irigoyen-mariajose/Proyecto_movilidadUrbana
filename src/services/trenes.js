import {
  collection,
  onSnapshot,
  addDoc,
  serverTimestamp,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
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
      onError?.(err);
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


export async function actualizarTren(id, patch) {
  const ref = doc(db, "Trenes", id);
  await updateDoc(ref, { ...patch, updatedAt: serverTimestamp() });
}


export async function borrarTren(id) {
  const ref = doc(db, "Trenes", id);
  await deleteDoc(ref);
}
