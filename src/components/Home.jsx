import React from "react";
import Navbar from "./NavbarBARRA";
import "../css/Home.css";

function Home({ onCerrarSesion }) {
  console.log("Home (antes PaginaPrincipal) renderizando, onCerrarSesion:", onCerrarSesion);
  
  return (
    <div className="home-page">
      <Navbar onCerrarSesion={onCerrarSesion} />
      
      <div className="home-content">
        <h1 className="titulo">Bienvenido a ANDENSUR</h1>
        <p className="subtitulo">Sistema de Movilidad Urbana</p>

        <section className="search-section home-search">
          <h2 className="results-title">A dónde querés ir?</h2>
          <form className="search-form home-search-form">
            <div className="input-with-icon">
              <span className="input-icon" aria-hidden="true">
                {}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <input
                type="text"
                placeholder="Número de tren o estación"
                className="search-input"
              />
            </div>
            <button type="submit" className="search-button">
              Buscar
            </button>
          </form>
        </section>




        
        <div className="home-cards">
          <div className="home-card">
            <h3>Volver</h3>
            <p>Consulta los horarios de trenes y buses</p>
          </div>
          
          <div className="home-card">
            <h3>Notificaciones</h3>
            <p>Mantente informado sobre el estado del servicio</p>
          </div>
          
          <div className="home-card">
            <h3>Soporte</h3>
            <p>Reporta problemas o solicita ayuda</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;