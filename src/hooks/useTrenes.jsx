import React, { useEffect } from "react";
import {collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy } from "firebase/firestore";
import { db } from "../../firebase";

function Trenes() {
  useEffect(() => {
    const cargarTrenes = async () => {
      try {
        const trenref = collection(db, "Trenes");

   
        await addDoc(trenref, { tren: "N 1" });
        await addDoc(trenref, { tren: "N 2" });
        await addDoc(trenref, { tren: "N 3" });
        console.log("INSERT → 3 trenes agregados");

        const snapshot = await getDocs(trenref);
        console.log("SELECT → Todos los trenes:");
        snapshot.forEach((docu) => console.log(docu.id, "=>", docu.data()));

        const idUpdate = snapshot.docs[0].id;
        const refUpdate = doc(db, "Trenes", idUpdate);
        await updateDoc(refUpdate, { tren: "N 1 - Actualizado" });
        console.log('UPDATE → Documento ${idUpdate} actualizado');

        const idDelete = snapshot.docs[1].id;
        const refDelete = doc(db, "Trenes", idDelete);
        await deleteDoc(refDelete);
        console.log('DELETE → Documento ${idDelete} eliminado');

        const q = query(trenref, orderBy("tren", "asc"));
        const ordenados = await getDocs(q);
        console.log("ORDER BY → Trenes ordenados:");
        ordenados.forEach((d) => console.log(d.id, "=>", d.data()));
      } catch (error) {
        console.error("Error en consultas Firestore:", error);
      }
    };

    cargarTrenes();
  }, []);

  return (
    <div>
      <h1>Colección Trenes</h1>
      <p>Se cargaron 3 documentos en Firestore.</p>
      <ul>
        <li><b>INSERT</b> → addDoc</li>
        <li><b>SELECT</b> → getDocs</li>
        <li><b>UPDATE</b> → updateDoc</li>
        <li><b>DELETE</b> → deleteDoc</li>
        <li><b>ORDER BY</b> → query + orderBy</li>
      </ul>
    </div>
  );
}

export default Trenes;
