import React, { useEffect } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";

function Trenes() {
  useEffect(() => {
    const cargarTrenes = async () => {
      try {
        const trenref = collection(db, "Trenes");

   
        await addDoc(trenref, {
          tren: "N 1"
        });
      
        await addDoc(trenref, {
          tren: "N 2"
        });

       
        await addDoc(trenref, {
          tren: "N 3"
        });

        console.log("Trenes cargados");
      } catch (error) {
        console.error("Error, no se pudieron cargar los trenes", error);
      }
    };

    cargarTrenes();
  }, []);

  return (
    <div>
      <h1>Colección Trenes</h1>
      <p>Se cargaron 3 documentos en Firestore.</p>
    </div>
  );
}

export default Trenes;
