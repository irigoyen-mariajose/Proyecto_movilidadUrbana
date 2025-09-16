import React, { useEffect } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";

function Horarios() {
  useEffect(() => {
    const cargarHorarios = async () => {
      try {
        const horariosref = collection(db, "Horarios");

   
        await addDoc(horariosref, {
          tren: "N 1",
          horario: "12:20"
        });
   await addDoc(horariosref, {
          tren: "N 1",
          horario: "13:20"
        });

         await addDoc(horariosref, {
          tren: "N 1",
          horario: "14:20"
        });

        console.log("Horarios cargados");
      } catch (error) {
        console.error("Error, no se pudieron cargar los horarios", error);
      }
    };

    cargarHorarios();
  }, []);

  return (
    <div>
      <h1>Colección Horarios</h1>
      <p>Se cargaron 3 documentos en Firestore.</p>
    </div>
  );
}

export default Horarios;
