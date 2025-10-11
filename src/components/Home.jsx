import React from "react";
import Navbar from "./NavbarBARRA";
import "../css/Home.css";
import trenInicioImage from "./Imagenes/treninicio2.jpg";
import boletoImage from "./Imagenes/boletos.png";
import discapacidadImage from "./Imagenes/discapacidad.png";
import estudianteImage from "./Imagenes/estudiante.png";
import plottierImage from "./Imagenes/tren-aplottier.png";
import neuquenImage from "./Imagenes/tren_aneuquen.png";

function Home({ onCerrarSesion }) {
  console.log("Home (antes PaginaPrincipal) renderizando, onCerrarSesion:", onCerrarSesion);
  
  return (
    <div className="home-page">
      <Navbar onCerrarSesion={onCerrarSesion} />
      
      <div className="home-content">
        <h1 className="titulo">Bienvenido a ANDENSUR</h1>
        <p className="subtitulo">Sistema de Movilidad Urbana</p>

        <section className="search-section home-search" style={{ textAlign: 'center', backgroundColor: 'transparent', boxShadow: 'none', marginTop: '-20px' }}>
          <div
            className="integrated-search-button"
            style={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              color: '#333',
              fontSize: '1.5rem',
              padding: '10px 15px',
              backgroundColor: 'transparent',
              border: '1px solid #ccc',
              transition: 'color 0.3s ease',
              width: '100%',
              maxWidth: '500px',
              boxShadow: 'none',
            }}
            onMouseEnter={(e) => {
              e.target.style.color = '#000';
            }}
            onMouseLeave={(e) => {
              e.target.style.color = '#333';
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '10px', color: '#666', flexShrink: 0 }}>
              <path d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <input
              type="text"
              placeholder="A dónde querés ir?"
              className="integrated-input"
              style={{
                border: 'none',
                outline: 'none',
                background: 'transparent',
                color: '#333',
                fontSize: '1.5rem',
                flex: 1,
                cursor: 'text',
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.target.value.trim()) {
                  console.log('Buscando:', e.target.value);
                 
                }
              }}
            />
          </div>
        </section>

        <div
          className="background-image-section"
          style={{
            backgroundImage: `url(${trenInicioImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            width: '100%',
            height: '300px',
            marginTop: '20px',
          }}
        ></div>
        <div className="destinos-section">
          <h2 className="destinos-title">Conectá destinos, viví el viaje</h2>
          <p className="destinos-text" style={{ fontSize: '1.1rem', lineHeight: '1.5', marginBottom: '20px', textAlign: 'center' }}>
            Usá nuestros mapas para explorar los recorridos disponibles y elegí el trayecto que mejor se adapte a vos.
          </p>
          <h3 className="destinos-subtitle">Cipolletti – Neuquén – Plottier</h3>
          <p className="destinos-text">
            Los trenes circulan con recorrido limitado entre Neuquén y Plottier, con un cronograma provisorio debido a un incidente ajeno a Trenes Argentinos
          </p>
          <div className="destinos-images">
            <div className="destinos-image-container">
              <p className="destinos-image-title">Recorrido hacia Plottier</p>
              <img src={plottierImage} alt="Recorrido hacia Plottier" className="destinos-image" />
            </div>
            <div className="destinos-image-container">
              <p className="destinos-image-title">Recorrido hacia Neuquen</p>
              <img src={neuquenImage} alt="Recorrido hacia Neuquen" className="destinos-image" />
            </div>
          </div>
        </div>

        <div className="tarifas-section">
          <h2 className="tarifas-title">Conocé las tarifas antes de viajar</h2>
          <p className="tarifas-text" style={{ fontSize: '1.1rem', lineHeight: '1.5', marginBottom: '20px', textAlign: 'center' }}>
            Las tarifas varían según el recorrido que realices. Sin embargo, los estudiantes y las personas con discapacidad cuentan con precios fijos.
          </p>
          <ul className="tarifas-list">
            <li className="tarifas-item">
              <img src={boletoImage} alt="Boleto normal" className="tarifas-icon" />
              Boleto normal: $700 - $900
            </li>
            <li className="tarifas-item">
              <img src={estudianteImage} alt="Boleto estudiantil" className="tarifas-icon" />
              Boleto Estudiantil: $50
            </li>
            <li className="tarifas-item">
              <img src={discapacidadImage} alt="Personas con discapacidad" className="tarifas-icon" />
              Personas con discapacidad: $50
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;