import React from "react";
import Navbar from "./NavbarBARRA";
import "../css/Home.css";
import trenInicioImage from "./Imagenes/treninicio2.jpg";
import boletoImage from "./Imagenes/boletos.png";
import discapacidadImage from "./Imagenes/discapacidad.png";
import estudianteImage from "./Imagenes/estudiante.png";

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
                  // Aquí puedes agregar lógica adicional para manejar la búsqueda
                }
              }}
            />
          </div>
        </section>

        {/* Imagen de fondo debajo de la búsqueda */}
        <div
          className="background-image-section"
          style={{
            backgroundImage: `url(${trenInicioImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            width: '100%',
            height: '300px', // Ajusta esta altura según necesites para que cubra desde navbar hasta fin de lupa
            marginTop: '20px', // Espacio opcional después de la búsqueda
          }}
        ></div>

        {/* Nueva sección de tarifas */}
        <div className="tarifas-section" style={{ marginTop: '40px', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px', width: '100%', marginBottom: '20px' }}>
          <h2 style={{ color: 'green', fontSize: '2.5rem', marginBottom: '15px', textAlign: 'center', textTransform: 'uppercase', fontWeight: 'bold' }}>Conocé las tarifas antes de viajar</h2>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.5', marginBottom: '20px', textAlign: 'center' }}>
            Las tarifas varían según el recorrido que realices. Sin embargo, los estudiantes y las personas con discapacidad cuentan con precios fijos.
          </p>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
            <li style={{ marginBottom: '10px', fontSize: '1.1rem', display: 'flex', alignItems: 'center', flex: '1', justifyContent: 'center' }}>
              <img src={boletoImage} alt="Boleto normal" style={{ width: '24px', height: '24px', marginRight: '10px' }} />
              Boleto normal: $700 - $900
            </li>
            <li style={{ marginBottom: '10px', fontSize: '1.1rem', display: 'flex', alignItems: 'center', flex: '1', justifyContent: 'center' }}>
              <img src={estudianteImage} alt="Boleto estudiantil" style={{ width: '24px', height: '24px', marginRight: '10px' }} />
              Boleto Estudiantil: $50
            </li>
            <li style={{ marginBottom: '10px', fontSize: '1.1rem', display: 'flex', alignItems: 'center', flex: '1', justifyContent: 'center' }}>
              <img src={discapacidadImage} alt="Personas con discapacidad" style={{ width: '24px', height: '24px', marginRight: '10px' }} />
              Personas con discapacidad: $50
            </li>
          </ul>
        </div>

        
      </div>
    </div>
  );
}

export default Home;