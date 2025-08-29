import React from "react";
import Navbar from "./NavbarBARRA";
import "../css/Horarios.css";

const Horarios = ({ onCerrarSesion }) => {
  return (
    <div className="horarios-page">
      <Navbar onCerrarSesion={onCerrarSesion} />
      <div className="horarios-container">
        <header className="horarios-header">
          <p>
            Consulta el estado en tiempo real de los trenes y planifica tus viajes con facilidad.
          </p>
        </header>

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
    </div>
  );
};

export default Horarios;
