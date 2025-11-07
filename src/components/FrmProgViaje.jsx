import React, { useState, useEffect } from "react";
import "../css/ProgramarViaje.css";
import Navbar from "./NavbarBARRA";
import { useNavigate } from "react-router-dom";
import { db } from "../firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const ProgramarViaje = ({ onCerrarSesion }) => {
  const [origen, setOrigen] = useState("");
  const [destino, setDestino] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const navigate = useNavigate();

  // Pedir permiso para notificaciones
  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  const handleBuscar = async (e) => {
    e.preventDefault();

    if (!origen || !destino || !fecha || !hora) {
      alert("Por favor completa todos los campos.");
      return;
    }

    const fechaHoraViaje = new Date(`${fecha}T${hora}`);
    const ahora = new Date();
    const diferenciaMs = fechaHoraViaje - ahora;

    const viaje = {
      origen,
      destino,
      fecha,
      hora,
      fechaHoraViaje: fechaHoraViaje.toISOString(),
      creadoEn: serverTimestamp(),
    };

    try {
      console.log("Intentando guardar viaje en Firestore:", viaje);

      const docRef = await addDoc(collection(db, "viajesProgramados"), viaje);
      console.log("Documento guardado con ID:", docRef.id);

      alert(`✅ Viaje programado de ${origen} a ${destino}.`);

      // Programar notificación 10 minutos antes
      if (diferenciaMs > 0) {
        const recordatorioMs = diferenciaMs - 10 * 60 * 1000;
        setTimeout(() => {
          if (Notification.permission === "granted") {
            new Notification("Recordatorio de viaje 🚄", {
              body: `Tu viaje de ${origen} a ${destino} está por comenzar en 10 minutos.`,
            });
          }
        }, Math.max(recordatorioMs, 0));
      }

      navigate("/Horarios");
    } catch (error) {
      console.error("❌ Error al guardar el viaje:", error);
      alert("Hubo un error al guardar el viaje. Ver consola.");
    }
  };

  // 🔹 Importante: el return debe estar dentro del componente (acá)
  return (
    <div className="programar-page">
      <Navbar onCerrarSesion={onCerrarSesion} />

      <div className="form-container">
        <form onSubmit={handleBuscar} className="glass-form">
          <h2 className="titulo">Planear viaje</h2>

          <div className="form-group">
            <label>Origen</label>
            <select
              id="origen"
              className="barras"
              value={origen}
              onChange={(e) => setOrigen(e.target.value)}
              required
            >
              <option value="" disabled>Selecciona tu ubicación</option>
              <option value="Plottier">Plottier</option>
              <option value="Constituyentes">Constituyentes</option>
              <option value="Barrio Union">Barrio Union</option>
              <option value="Aeropuerto">Aeropuerto</option>
              <option value="El cholar">El Cholar</option>
              <option value="ETON">ETON</option>
              <option value="Rivas">Ignacio Rivas</option>
              <option value="Neuquen">Neuquen</option>
              <option value="Cipo">Cipolletti (fuera de servicio)</option>
            </select>
          </div>

          <div className="form-group">
            <label>Destino</label>
            <select
              id="destino"
              className="barras"
              value={destino}
              onChange={(e) => setDestino(e.target.value)}
              required
            >
              <option value="" disabled>Selecciona tu destino</option>
               <option value="Plottier">Plottier</option>
              <option value="Constituyentes">Constituyentes</option>
              <option value="Barrio Union">Barrio Union</option>
              <option value="Aeropuerto">Aeropuerto</option>
              <option value="El cholar">El Cholar</option>
              <option value="ETON">ETON</option>
              <option value="Rivas">Ignacio Rivas</option>
              <option value="Neuquen">Neuquen</option>
              <option value="Cipo">Cipolletti (fuera de servicio)</option>
            </select>
          </div>

          <div className="form-group">
            <label>Fecha</label>
            <input
              type="date"
              className="barras"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Hora</label>
            <input
              type="time"
              className="barras"
              value={hora}
              onChange={(e) => setHora(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="button button-verde">
            Programar viaje
          </button>

          <button
            type="button"
            className="button button-volver"
            onClick={() => navigate("/Horarios")}
          >
            Volver a horarios
          </button>
        </form>
      </div>
    </div>
  );
};

// 👇 Esto es clave, el export va al final, fuera del componente
export default ProgramarViaje;
