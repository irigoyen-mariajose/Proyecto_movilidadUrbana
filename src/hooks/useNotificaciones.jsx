import React, { useEffect } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";

function Notificaciones() {
  useEffect(() => {
    const cargarNotificaciones = async () => {
      try {
        const notisref = collection(db, "Notificaciones");

   
        await addDoc(notisref, {
          Notificacion: "Viaje suspendido"
        });
        await addDoc(notisref, {
          Notificacion: "Viaje suspendido"
        });

        await addDoc(notisref, {
          Notificacion: "Viaje suspendido"
        });

        console.log("Notificaciones cargadas");
      } catch (error) {
        console.error("Error, no se pudieron cargar las notificaciones", error);
      }
    };

    cargarNotis();
  }, []);

  return (
    <div>
      <h1>Colección Notificaciones</h1>
      <p>Se cargaron 3 documentos en Firestore.</p>
    </div>
  );
}

export default Notificaciones;
