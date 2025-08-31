import React, { useState } from "react";
import "../css/ProgramarViaje.css";
import Navbar from "./NavbarBARRA";
import { useNavigate } from "react-router-dom";

const ProgramarViaje = ({ onCerrarSesion }) => {
  const [origen, setOrigen] = useState("");
  const [destino, setDestino] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const navigate = useNavigate();

  const handleBuscar = (e) => {
    e.preventDefault();
    alert(`Buscando tren desde ${origen} a ${destino} el ${fecha} a las ${hora}`);
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
