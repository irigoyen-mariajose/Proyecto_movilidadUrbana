import React, { useEffect } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";

function Paradas() {
  useEffect(() => {
    const cargarParadas = async () => {
      try {
        const paradaref = collection(db, "Paradas");

   
        await addDoc(paradaref, {
          parada: "2611"
        });
       await addDoc(paradaref, {
          parada: "2601"
        });

        await addDoc(paradaref, {
          parada: "2609"
        });

        console.log("Paradas cargadas");
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
    </div>
  );
}

export default Paradas;
