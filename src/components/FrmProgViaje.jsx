import React, { useState } from "react";
import "../css/ProgramarViaje.css";
import Navbar from "./NavbarBARRA";
import { useNavigate } from "react-router-dom";

/**
 * 
 * @param {*} onCerrarSesion 
 * @returns 
 */
const ProgramarViaje = ({ onCerrarSesion }) => {
  const [origen, setOrigen] = useState("");
  const [destino, setDestino] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const navigate = useNavigate();

  // Pedir permiso para usar notificaciones cuando se carga la página
React.useEffect(() => {
  if (Notification.permission !== "granted") {
    Notification.requestPermission();
  }
}, []);

// Función para mostrar notificación
const mostrarNotificacion = (titulo, mensaje) => {
  if (Notification.permission === "granted") {
    new Notification(titulo, { body: mensaje });
  }
};

// Nueva versión del handleBuscar
const handleBuscar = (e) => {
  e.preventDefault();

  alert(`Buscando tren desde ${origen} a ${destino} el ${fecha} a las ${hora}`);

  // Combinar fecha y hora seleccionadas
  const fechaHoraViaje = new Date(`${fecha}T${hora}`);
  const ahora = new Date();

  // Calcular diferencia de tiempo en milisegundos
  const diferenciaMs = fechaHoraViaje - ahora;

  // Si el viaje es en el futuro
  if (diferenciaMs > 0) {
    const recordatorioMs = diferenciaMs - 10 * 60 * 1000; // 10 minutos antes

    if (recordatorioMs > 0) {
      setTimeout(() => {
        mostrarNotificacion(
          "Recordatorio de viaje 🚄",
          `Tu viaje de ${origen} a ${destino} está por comenzar en 10 minutos.`
        );
      }, recordatorioMs);
    } else {
      mostrarNotificacion(
        "Recordatorio de viaje 🚄",
        `Tu viaje de ${origen} a ${destino} es pronto.`
      );
    }
  }

  navigate("/Horarios");
};


  return (
    <div className="programar-page">
      <Navbar onCerrarSesion={onCerrarSesion} />

      <div className="form-container">
        <form onSubmit={handleBuscar} className="glass-form">
          <h2 className="titulo">Planear viaje</h2>

          <div className="form-group">
  <label >Origen</label>
  <select
    id="origen"
    className="barras"
    value={origen}
    onChange={(e) => setOrigen(e.target.value)}
    required
  >
    <option value="" disabled>Selecciona tu ubicacion</option>
    <option value="Centro">Centro</option>
    <option value="Terminal">Terminal</option>
    <option value="Nemo">Nemo</option>
    <option value="Plottier">Plottier</option>
    <option value="La Estrella de la Muerte">La Estrella de la Muerte</option>
    <option value="Tatooine">Tatooine</option>
  </select>
</div>


          <div className="form-group">
  <label >Destino</label>
  <select
    id="destino"
    className="barras"
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
            Buscar
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

export default ProgramarViaje;
