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
      await addDoc(collection(db, "viajesProgramados"), viaje);
      alert(`✅ Viaje programado de ${origen} a ${destino}.`);

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

  return (
    <div className="prog-page">

      <Navbar onCerrarSesion={onCerrarSesion} />

      <div className="prog-container">
        <form onSubmit={handleBuscar}>
          <h2 className="prog-form-title">Planear viaje</h2>

          <div className="prog-group">
            <label>Origen</label>
            <select
              className="prog-select"
              value={origen}
              onChange={(e) => setOrigen(e.target.value)}
              required
            >
              <option value="" disabled>Selecciona tu ubicación</option>
              <option value="Centro">Centro</option>
              <option value="Terminal">Terminal</option>
              <option value="Nemo">Nemo</option>
              <option value="Plottier">Plottier</option>
              <option value="La Estrella de la Muerte">La Estrella de la Muerte</option>
              <option value="Tatooine">Tatooine</option>
            </select>
          </div>

          <div className="prog-group">
            <label>Destino</label>
            <select
              className="prog-select"
              value={destino}
              onChange={(e) => setDestino(e.target.value)}
              required
            >
              <option value="" disabled>Selecciona tu destino</option>
              <option value="Centro">Centro</option>
              <option value="Terminal">Terminal</option>
              <option value="Nemo">Nemo</option>
              <option value="Plottier">Plottier</option>
              <option value="La Estrella de la Muerte">La Estrella de la Muerte</option>
              <option value="Tatooine">Tatooine</option>
            </select>
          </div>

          <div className="prog-group">
            <label>Fecha</label>
            <input
              type="date"
              className="prog-input"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              required
            />
          </div>

          <div className="prog-group">
            <label>Hora</label>
            <input
              type="time"
              className="prog-input"
              value={hora}
              onChange={(e) => setHora(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="prog-button">
            Programar viaje
          </button>

          <button
            type="button"
            className="prog-button prog-button-volver"
            onClick={() => navigate("/Horarios")}
          >
            Volver a horarios
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProgramarViaje;
