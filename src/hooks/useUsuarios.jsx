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

function Usuarios() {
  useEffect(() => {
    const cargarUsuarios = async () => {
      try {
        const useref = collection(db, "Usuarios");

   
        await addDoc(useref, { nombre: "poriro123", correo: "poriro@ejemplo.com" });

        await addDoc(useref, { nombre: "skibidi20", correo: "skibidi@ejemplo.com" });

        await addDoc(useref, { nombre: "Hachis Perez", correo: "hachis@ejemplo.com" });

        console.log("INSERT → 3 usuarios agregados");

        const snapshot = await getDocs(useref);
        console.log("SELECT → Todos los usuarios:");
        snapshot.forEach((docu) => console.log(docu.id, "=>", docu.data()));

        const idUpdate = snapshot.docs[0].id;
        const refUpdate = doc(db, "Usuarios", idUpdate);
        await updateDoc(refUpdate, { nombre: "Poriro Modificado" });
        console.log(`UPDATE → Documento ${idUpdate} actualizado`);

        const idDelete = snapshot.docs[1].id;
        const refDelete = doc(db, "Usuarios", idDelete);
        await deleteDoc(refDelete);
        console.log(`DELETE → Documento ${idDelete} eliminado`);

        const q = query(useref, orderBy("nombre", "asc"));
        const ordenados = await getDocs(q);
        console.log("ORDER BY → Usuarios ordenados:");
        ordenados.forEach((d) => console.log(d.id, "=>", d.data()));

        console.log("Usuarios cargados");
      } catch (error) {
        console.error("Error, no se pudieron cargar los usuarios", error);
      }

      
    };

    cargarUsuarios();
  }, []);

  return (
    <div>
      <h1>Colección Usuarios</h1>
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

export default Usuarios;
