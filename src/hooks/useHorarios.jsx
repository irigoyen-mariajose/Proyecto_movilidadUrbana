import React, { useEffect } from "react";
import {
  collection,
  addDoc,     
  getDocs,    
  updateDoc,  
  deleteDoc,  
  doc,
  query,
  orderBy
} from "firebase/firestore";
import { db } from "../../firebase";

/**
 * @param {*} param0
 * @returns 
 *  <div>
      <h1>Colección Horarios</h1>
      <ul>
        <li><b>INSERT</b> → addDoc (agrega nuevos documentos)</li>
        <li><b>SELECT</b> → getDocs (trae todos los documentos)</li>
        <li><b>UPDATE</b> → updateDoc (modifica uno por ID)</li>
        <li><b>DELETE</b> → deleteDoc (borra uno por ID)</li>
        <li><b>ORDER BY</b> → query + orderBy (devuelve ordenados)</li>
      </ul>
    </div>
 */
function Horarios() {
  /**
   * useEffect () => cargarHorarios
   */
  useEffect(() => {
    /**
     * @variable cargarHorarios
     */
    const cargarHorarios = async () => {
      try {
        const horariosRef = collection(db, "Horarios");
        await addDoc(horariosRef, { tren: "N 1", horario: "12:20" });
        await addDoc(horariosRef, { tren: "N 1", horario: "13:20" });
        await addDoc(horariosRef, { tren: "N 1", horario: "14:20" });
        console.log("INSERT → 3 documentos agregados");

        /**
         * 
         * @variable getDocs
         */
        const snapshot = await getDocs(horariosRef);
        console.log("SELECT → Todos los horarios:");
        snapshot.forEach((doc) => console.log(doc.id, "=>", doc.data()));

        const idUpdate = snapshot.docs[0].id; 
        const refUpdate = doc(db, "Horarios", idUpdate);
        await updateDoc(refUpdate, { horario: "12:45" });
        console.log(`UPDATE → Documento ${idUpdate} actualizado`);

        const idDelete = snapshot.docs[1].id;
        const refDelete = doc(db, "Horarios", idDelete);
        await deleteDoc(refDelete);
        console.log(`DELETE → Documento ${idDelete} eliminado`);

        const q = query(horariosRef, orderBy("horario", "asc"));
        const ordenados = await getDocs(q);
        console.log("ORDER BY → Horarios ordenados:");
        ordenados.forEach((d) => console.log(d.id, "=>", d.data()));


        console.log("Horarios cargados correctamente ");

      } catch (error) {
        console.error("Error en consultas Firestore:", error);
      }
    };

    cargarHorarios();
  }, []);

  return (
    <div>
      <h1>Colección Horarios</h1>
      <ul>
        <li><b>INSERT</b> → addDoc (agrega nuevos documentos)</li>
        <li><b>SELECT</b> → getDocs (trae todos los documentos)</li>
        <li><b>UPDATE</b> → updateDoc (modifica uno por ID)</li>
        <li><b>DELETE</b> → deleteDoc (borra uno por ID)</li>
        <li><b>ORDER BY</b> → query + orderBy (devuelve ordenados)</li>
      </ul>
    </div>
  );
}

export default Horarios;
