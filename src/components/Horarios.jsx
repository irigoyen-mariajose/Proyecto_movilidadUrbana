import React, { useState } from "react";
import Navbar from "./NavbarBARRA";
import "../css/Horarios.css";
import { useNavigate } from "react-router-dom"; 

/**
 * 
 * @param {*} onCerrarSesion 
 * @returns 
 */
const Horarios = ({ onCerrarSesion }) => {
  const navigate = useNavigate(); 
  const [searchTerm, setSearchTerm] = useState("");
/**
 * 
 * @param {*} e 
 */
  const handleProgramar = (e) => {
    e.preventDefault();
    navigate("/ProgramarViaje");
  };
/**
 * 
 * @param {*} e 
 */
  const handleSearch = (e) => {
    e.preventDefault();
    
    console.log("Buscando:", searchTerm);
  
  };

  return (
    <div className="horarios-page" style={{ backgroundColor: '#feeb9e', minHeight: '100vh', margin: 0, padding: 0 }}>
      <Navbar onCerrarSesion={onCerrarSesion} />
      <div className="horarios-container">
        <header className="horarios-header">
          <h1>
            Consulta el estado en tiempo real de los trenes y planifica tus viajes con facilidad.
          </h1 >
        </header>
        
        <section className="search-section">
          <h2 className="results-title">Buscar tren</h2>
          <form className="search-form home-search-form" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Número de tren o estación"
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="programar-button" type="button" onClick={handleProgramar}>
              <svg className="calendar-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 2V5M16 2V5M3 9H21M5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Programar viaje
            </button>
          </form>
        </section>
        <section className="results-section">
          <h2 className="results-title">Estado del tren</h2>
          <div className="results-grid">
            <div className="result-card">
              <div>
                <p className="font-semibold">Tren 102</p>
                <p className="text-gray-500">Barrio Union → Parque central</p>
              </div>
              <span className="badge badge-green">A tiempo</span>
            </div>
            <div className="result-card">
              <div>
                <p className="font-semibold">Tren 203</p>
                <p className="text-gray-500">Plottier → Neuquen</p>
              </div>
              <span className="badge badge-yellow">Retrasado 10 min</span>
            </div>
            <div className="result-card">
              <div>
                <p className="font-semibold">Tren 310</p>
                <p className="text-gray-500">Cipolleti→ Neuquen</p>
              </div>
              <span className="badge badge-red">Cancelado</span>
            </div>
          </div>
        </section>
      </div>

      {/* Nueva sección de horarios de boletería */}
      <div className="boleteria-section">
        <h2 className="boleteria-title">Horario Boletería Plottier / Neuquén</h2>
        <p className="boleteria-text">Lunes a viernes de 06:00 a 22:00 hs.</p>
        <p className="boleteria-text">Adquirí tu boleto en las boleterías habilitadas.</p>
      </div>
    </div>
  );
};

export default Horarios;
