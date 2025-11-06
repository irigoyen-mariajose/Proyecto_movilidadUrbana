
import React, { useState } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

// ✅ Paradas completas del Tren del Valle (con todas las ubicaciones)
const paradas = [
  { 
    nombre: "Estación Plottier", 
    descripcion: "Estación terminal en Plottier", 
    ubicacion: "https://www.google.com/maps/search/?api=1&query=Estación+Plottier+Tren+del+Valle+Neuquén", 
    activa: true, 
    orden: 1 
  },
  { 
    nombre: "Constituyentes", 
    descripcion: "Apeadero entre Plottier y Neuquén, sobre Ruta Nacional 22", 
    ubicacion: "https://www.google.com/maps/search/?api=1&query=Apeadero+Constituyentes+Tren+del+Valle+Neuquén", 
    activa: true, 
    orden: 2 
  },
  { 
    nombre: "Barrio Unión", 
    descripcion: "Apeadero en Río Limay, Neuquén", 
    ubicacion: "https://www.google.com/maps/search/?api=1&query=Apeadero+Barrio+Unión+Río+Limay+Neuquén", 
    activa: true, 
    orden: 3 
  },
  { 
    nombre: "Aeropuerto", 
    descripcion: "Apeadero Aeropuerto Internacional Presidente Perón", 
    ubicacion: "https://www.google.com/maps/search/?api=1&query=Aeropuerto+Internacional+Presidente+Perón+Neuquén", 
    activa: true, 
    orden: 4 
  },
  { 
    nombre: "El Cholar", 
    descripcion: "Apeadero entre ETON y Aeropuerto", 
    ubicacion: "https://www.google.com/maps/search/?api=1&query=Apeadero+El+Cholar+Tren+del+Valle+Neuquén", 
    activa: true, 
    orden: 5 
  },
  { 
    nombre: "ETON", 
    descripcion: "Estación Terminal de Ómnibus de Neuquén", 
    ubicacion: "https://www.google.com/maps/search/?api=1&query=Terminal+de+Ómnibus+Neuquén+ETON", 
    activa: true, 
    orden: 6 
  },
  { 
    nombre: "Ignacio Rivas", 
    descripcion: "Apeadero entre Neuquén Central y ETON", 
    ubicacion: "https://www.google.com/maps/search/?api=1&query=Apeadero+Ignacio+Rivas+Tren+del+Valle+Neuquén", 
    activa: true, 
    orden: 7 
  },
  { 
    nombre: "Neuquén Central", 
    descripcion: "Estación Central de Neuquén (ex Estación Neuquén)", 
    ubicacion: "https://www.google.com/maps/search/?api=1&query=Estación+Neuquén+Central+Parque+Central", 
    activa: true, 
    orden: 8 
  },
  { 
    nombre: "Cipolletti", 
    descripcion: "Estación en Cipolletti (Río Negro) - Actualmente sin servicio", 
    ubicacion: "https://www.google.com/maps/search/?api=1&query=Estación+Cipolletti+Tren+del+Valle", 
    activa: false, 
    orden: 9 
  }
];

const horarios = [
  { tren: "Tren 102", salida: "06:30", llegada: "07:15", ruta: "Barrio Unión → Parque Central" },
  { tren: "Tren 203", salida: "07:00", llegada: "07:45", ruta: "Plottier → Neuquén" },
  { tren: "Tren 310", salida: "08:00", llegada: "08:50", ruta: "Cipolletti → Neuquén" }
];

const CargarDatos = () => {
  const [mensaje, setMensaje] = useState("Presioná el botón para cargar paradas y horarios");
  const [cargando, setCargando] = useState(false);

  const cargarDatos = async () => {
    try {
      setCargando(true);
      setMensaje("🔄 Iniciando carga de paradas y horarios...");

      // === CARGAR PARADAS ===
      const paradasCol = collection(db, "Paradas");
      const snapshotParadas = await getDocs(paradasCol);
      
      if (!snapshotParadas.empty) {
        setMensaje("⚠️ Las paradas ya están cargadas en Firebase.");
        console.log("⚠️ Las paradas ya están cargadas.");
      } else {
        for (const parada of paradas) {
          const docRef = await addDoc(paradasCol, parada);
          console.log(`✅ Parada "${parada.nombre}" agregada con ID: ${docRef.id}`);
        }
        setMensaje("✅ Paradas cargadas. Ahora cargando horarios...");
      }

      // === CARGAR HORARIOS ===
      const horariosCol = collection(db, "horarios");
      const snapshotHorarios = await getDocs(horariosCol);
      
      if (!snapshotHorarios.empty) {
        setMensaje("⚠️ Los horarios ya están cargados en Firebase.");
        console.log("⚠️ Los horarios ya están cargados.");
      } else {
        for (const horario of horarios) {
          const docRef = await addDoc(horariosCol, horario);
          console.log(`✅ Horario "${horario.tren}" agregado con ID: ${docRef.id}`);
        }
      }
      
      setMensaje("🎉 ¡Paradas y horarios cargados exitosamente!");
    } catch (error) {
      setMensaje(`❌ Error al cargar datos: ${error.message}`);
      console.error("❌ Error al cargar datos:", error);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "50px", fontFamily: "Arial, sans-serif" }}>
      <h2>🚆 Cargar Paradas y Horarios - Tren del Valle</h2>
      <p style={{ fontSize: "16px", marginBottom: "20px" }}>{mensaje}</p>
      
      <button
        onClick={cargarDatos}
        disabled={cargando}
        style={{ 
          padding: "12px 24px", 
          fontSize: "16px", 
          cursor: cargando ? "not-allowed" : "pointer",
          backgroundColor: cargando ? "#ccc" : "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          fontWeight: "bold"
        }}
      >
        {cargando ? "⏳ Cargando..." : "📥 Cargar Datos"}
      </button>
      
      <p style={{ marginTop: "20px", fontSize: "12px", color: "#666" }}>
        Verificá la consola del navegador para más detalles.
      </p>

      <div style={{ marginTop: "30px", textAlign: "left", maxWidth: "600px", margin: "30px auto" }}>
        <h3>📋 Paradas a cargar:</h3>
        <ul style={{ fontSize: "14px", lineHeight: "1.8" }}>
          {paradas.map((p, i) => (
            <li key={i}>
              <strong>{p.nombre}</strong> - {p.descripcion} 
              {!p.activa && <span style={{ color: "red" }}> (Sin servicio)</span>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CargarDatos;