import React, { useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../../firebase";

/**
 * @vaiable Notificaciones
 * @returns  <div>
      <h1>Colección Notificaciones</h1>
      <p>Se realizaron las siguientes operaciones en Firestore:</p>
      <ul>
        <li><b>INSERT</b> → addDoc (crear documento)</li>
        <li><b>SELECT</b> → getDocs (leer documentos)</li>
        <li><b>UPDATE</b> → updateDoc (actualizar uno)</li>
        <li><b>DELETE</b> → deleteDoc (eliminar uno)</li>
        <li><b>ORDER BY</b> → query + orderBy (ordenar resultados)</li>
      </ul>
    </div>
 */
function Notificaciones() {
  /**
   * useEffect () => cargarNotificaciones
   */
  useEffect(() => {
    /**
     * @variable cargarNotificaciones
     */
    const cargarNotificaciones = async () => {
      try {
        const notisRef = collection(db, "Notificaciones");
        await addDoc(notisRef, { Notificacion: "Viaje suspendido" });
        await addDoc(notisRef, { Notificacion: "Demora de 15 minutos" });
        await addDoc(notisRef, { Notificacion: "Servicio restablecido" });
        console.log("INSERT → 3 notificaciones agregadas");

        const snapshot = await getDocs(notisRef);
        console.log("SELECT → Todas las notificaciones:");
        snapshot.forEach((docu) =>
          console.log(docu.id, "=>", docu.data())
        );
        const idUpdate = snapshot.docs[0].id;
        const refUpdate = doc(db, "Notificaciones", idUpdate);
        await updateDoc(refUpdate, { Notificacion: "Viaje cancelado" });
        console.log(`UPDATE → Documento ${idUpdate} actualizado`);

        const idDelete = snapshot.docs[1].id;
        const refDelete = doc(db, "Notificaciones", idDelete);
        await deleteDoc(refDelete);
        console.log(`DELETE → Documento ${idDelete} eliminado`);

        const q = query(notisRef, orderBy("Notificacion", "asc"));
        const ordenados = await getDocs(q);
        console.log("ORDER BY → Notificaciones ordenadas:");
        ordenados.forEach((d) => console.log(d.id, "=>", d.data()));

        console.log("✔ Notificaciones cargadas correctamente");
      } catch (error) {
        console.error(" Error, no se pudieron cargar las notificaciones", error);
      }
    };

    cargarNotificaciones();
  }, []);

  return (
    <div>
      <h1>Colección Notificaciones</h1>
      <p>Se realizaron las siguientes operaciones en Firestore:</p>
      <ul>
        <li><b>INSERT</b> → addDoc (crear documento)</li>
        <li><b>SELECT</b> → getDocs (leer documentos)</li>
        <li><b>UPDATE</b> → updateDoc (actualizar uno)</li>
        <li><b>DELETE</b> → deleteDoc (eliminar uno)</li>
        <li><b>ORDER BY</b> → query + orderBy (ordenar resultados)</li>
      </ul>
    </div>
  );
}

export default Notificaciones;
