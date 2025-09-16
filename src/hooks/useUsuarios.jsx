import React, { useEffect } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";

function Usuarios() {
  useEffect(() => {
    const cargarUsuarios = async () => {
      try {
        const useref = collection(db, "Usuarios");

   
        await addDoc(useref, {
          nombre: "poriro123",
          correo: ""
        });
        
        await addDoc(useref, {
          nombre: "skibidi20",
          correo: ""
        });

        await addDoc(useref, {
          nombre: "Hachis Perez",
          correo: ""
        });

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
    </div>
  );
}

export default Usuarios;
