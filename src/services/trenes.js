import { collection, onSnapshot } from "firebase/firestore";
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
