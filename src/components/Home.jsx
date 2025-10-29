import React from "react";
import Navbar from "./NavbarBARRA";
import "../css/Home.css";
import trenInicioImage from "./Imagenes/treninicio2.jpg";
import boletoImage from "./Imagenes/boletos.png";
import discapacidadImage from "./Imagenes/discapacidad.png";
import estudianteImage from "./Imagenes/estudiante.png";
import plottierImage from "./Imagenes/tren-aplottier.png";
import neuquenImage from "./Imagenes/tren_aneuquen.png";

/**
 * 
 * @param {*} param0 
 * @returns 
 */

function Home({ onCerrarSesion }) {
  console.log("Home (antes PaginaPrincipal) renderizando, onCerrarSesion:", onCerrarSesion);
  
  return (
    <div className="home-page">
      <Navbar onCerrarSesion={onCerrarSesion} />
      
      <div className="home-content">
        <h1 className="titulo">Bienvenido a ANDENSUR</h1>
        <p className="subtitulo">Sistema de Movilidad Urbana</p>

        

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