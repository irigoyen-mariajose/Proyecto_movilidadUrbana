import React, { useEffect } from "react";
import { collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy } from "firebase/firestore";
import { db } from "../../firebase";

function Paradas() {
  useEffect(() => {
    const cargarParadas = async () => {
      try {
        const paradaref = collection(db, "Paradas");

   
        await addDoc(paradaref, { parada: "2611" });
        await addDoc(paradaref, { parada: "2601" });
        await addDoc(paradaref, { parada: "2609" });
        console.log("INSERT → 3 paradas agregadas");

        const snapshot = await getDocs(paradaref);
        console.log("SELECT → Todas las paradas:");
        snapshot.forEach((docu) => console.log(docu.id, "=>", docu.data()));

        const idUpdate = snapshot.docs[0].id;
        const refUpdate = doc(db, "Paradas", idUpdate);
        await updateDoc(refUpdate, { parada: "2615" });
        console.log(`UPDATE → Documento ${idUpdate} actualizado`);

        const idDelete = snapshot.docs[1].id;
        const refDelete = doc(db, "Paradas", idDelete);
        await deleteDoc(refDelete);
        console.log(`DELETE → Documento ${idDelete} eliminado`);

        const q = query(paradaref, orderBy("parada", "asc"));
        const ordenados = await getDocs(q);
        console.log("ORDER BY → Paradas ordenadas:");
        ordenados.forEach((d) => console.log(d.id, "=>", d.data()));
        
        console.log("Paradas cargadas correctamente");
      } catch (error) {
        console.error("Error, no se pudieron cargar las paradas", error);
      }
    };

    cargarParadas();
  }, []);

  return (
    <div>
      <h1>Colección Paradas</h1>
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

export default Paradas;
