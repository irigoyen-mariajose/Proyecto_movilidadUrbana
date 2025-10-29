import React, { useState } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

const paradas = [
  { nombre: "Estación Plottier", descripcion: "Estación terminal en Plottier", ubicacion: "https://www.google.com/maps/search/?api=1&query=Estación+Plottier+Tren+del+Valle+Neuquén", activa: true, orden: 1 },
  { nombre: "Constituyentes", descripcion: "Apeadero entre Plottier y Neuquén, sobre Ruta Nacional 22", ubicacion: "https://www.google.com/maps/search/?api=1&query=Apeadero+Constituyentes+Tren+del+Valle+Neuquén", activa: true, orden: 2 },
  { nombre: "Barrio Unión", descripcion: "Apeadero en Río Limay, Neuquén", ubicacion: "https://www.google.com/maps/search/?api=1&query=Apeadero+Barrio+Unión+Río+Limay+Neuquén", activa: true, orden: 3 },
  { nombre: "Aeropuerto", descripcion: "Apeadero Aeropuerto Internacional Presidente Perón", ubicacion: "https://www.google.com/maps/search/?api=1&query=Aeropuerto+Internacional+Presidente+Perón+Neuquén", activa: true, orden: 4 },
  { nombre: "El Cholar", descripcion: "Apeadero entre ETON y Aeropuerto", ubicacion: "https://www.google.com/maps/search/?api=1&query=Apeadero+El+Cholar+Tren+del+Valle+Neuquén", activa: true, orden: 5 },
  { nombre: "ETON", descripcion: "Estación Terminal de Ómnibus de Neuquén", ubicacion: "https://www.google.com/maps/search/?api=1&query=Terminal+de+Ómnibus+Neuquén+ETON", activa: true, orden: 6 },
  { nombre: "Ignacio Rivas", descripcion: "Apeadero entre Neuquén Central y ETON", ubicacion: "https://www.google.com/maps/search/?api=1&query=Apeadero+Ignacio+Rivas+Tren+del+Valle+Neuquén", activa: true, orden: 7 },
  { nombre: "Neuquén Central", descripcion: "Estación Central de Neuquén (ex Estación Neuquén)", ubicacion: "https://www.google.com/maps/search/?api=1&query=Estación+Neuquén+Central+Parque+Central", activa: true, orden: 8 },
  { nombre: "Cipolletti", descripcion: "Estación en Cipolletti (Río Negro) - Actualmente sin servicio", ubicacion: "https://www.google.com/maps/search/?api=1&query=Estación+Cipolletti+Tren+del+Valle", activa: false, orden: 9 }
];

const CargarParadas = () => {
  const [mensaje, setMensaje] = useState("Presioná el botón para cargar las paradas");

  const cargarParadas = async () => {
    try {
      setMensaje("🔄 Iniciando carga de paradas...");
      const coleccion = collection(db, "Paradas");

      // 🔹 Verificar si ya existen paradas
      const snapshot = await getDocs(coleccion);
      if (!snapshot.empty) {
        setMensaje("⚠️ Las paradas ya están cargadas en Firestore. Revisa la consola.");
        console.log("⚠️ Las paradas ya están cargadas.");
        return;
      }

      for (const parada of paradas) {
        const docRef = await addDoc(coleccion, parada);
        console.log(`✅ Parada "${parada.nombre}" agregada con ID: ${docRef.id}`);
      }

      setMensaje("🎉 ¡Todas las paradas fueron cargadas exitosamente!");
      console.log("🎉 Todas las paradas fueron cargadas exitosamente!");
    } catch (error) {
      setMensaje("❌ Error al cargar paradas. Revisa la consola.");
      console.error("❌ Error al cargar paradas:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h2>Cargar Paradas Tren del Valle</h2>
      <p>{mensaje}</p>
      <button
        onClick={cargarParadas}
        style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}
      >
        Cargar Paradas
      </button>
      <p style={{ marginTop: "20px", fontSize: "12px", color: "#666" }}>
        Verificá la consola para más detalles.
      </p>
    </div>
  );
};

export default CargarParadas;
