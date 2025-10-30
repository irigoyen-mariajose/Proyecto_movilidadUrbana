import React, { useState } from "react";
import { collection, addDoc, getDocs, serverTimestamp } from "firebase/firestore";
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

const horarios = [
  { tren: "Tren 102", salida: "06:30", llegada: "07:15", ruta: "Barrio Unión → Parque Central" },
  { tren: "Tren 203", salida: "07:00", llegada: "07:45", ruta: "Plottier → Neuquén" },
  { tren: "Tren 310", salida: "08:00", llegada: "08:50", ruta: "Cipolletti → Neuquén" }
];

const trenesSeed = [
  { tren: "Tren 102", origen: "Barrio Unión", destino: "Parque Central",  estado: "A tiempo",         linea: "Roca", activo: true },
  { tren: "Tren 203", origen: "Plottier",     destino: "Neuquén",         estado: "Retrasado 10 min", linea: "Roca", activo: true },
  { tren: "Tren 310", origen: "Cipolletti",   destino: "Neuquén",         estado: "Cancelado",        linea: "Roca", activo: false },
];

const CargarDatos = () => {
  const [mensaje, setMensaje] = useState("Presioná el botón para cargar Paradas, Horarios y Trenes");

  const cargarDatos = async () => {
    try {
      setMensaje("🔄 Iniciando carga…");

      // === CARGAR PARADAS ===
      const paradasCol = collection(db, "Paradas");
      const snapshotParadas = await getDocs(paradasCol);
      if (!snapshotParadas.empty) {
        console.log("⚠️ Las paradas ya están cargadas.");
      } else {
        for (const parada of paradas) {
          const docRef = await addDoc(paradasCol, { ...parada, createdAt: serverTimestamp() });
          console.log(`✅ Parada "${parada.nombre}" agregada (ID: ${docRef.id})`);
        }
      }

      // === CARGAR HORARIOS ===  (usa el mismo nombre de colección en toda la app: "Horarios" o "horarios")
      const horariosCol = collection(db, "Horarios");
      const snapshotHorarios = await getDocs(horariosCol);
      if (!snapshotHorarios.empty) {
        console.log("⚠️ Los horarios ya están cargados.");
      } else {
        for (const horario of horarios) {
          const docRef = await addDoc(horariosCol, { ...horario, createdAt: serverTimestamp() });
          console.log(`✅ Horario "${horario.tren}" agregado (ID: ${docRef.id})`);
        }
      }

      // === CARGAR TRENES ===
      const trenesCol = collection(db, "Trenes");
      const snapshotTrenes = await getDocs(trenesCol);
      if (!snapshotTrenes.empty) {
        console.log("⚠️ Los trenes ya están cargados.");
      } else {
        for (const tren of trenesSeed) {
          const docRef = await addDoc(trenesCol, { ...tren, createdAt: serverTimestamp() });
          console.log(`✅ Tren "${tren.tren}" agregado (ID: ${docRef.id})`);
        }
      }

      setMensaje("🎉 ¡Paradas, Horarios y Trenes cargados exitosamente!");
    } catch (error) {
      console.error("❌ Error al cargar datos:", error);
      setMensaje("❌ Error al cargar datos. Revisá la consola.");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h2>Cargar Paradas, Horarios y Trenes</h2>
      <p>{mensaje}</p>
      <button
        onClick={cargarDatos}
        style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}
      >
        Cargar Datos
      </button>
      <p style={{ marginTop: "20px", fontSize: "12px", color: "#666" }}>
        Verificá la consola para más detalles.
      </p>
    </div>
  );
};

export default CargarDatos;
