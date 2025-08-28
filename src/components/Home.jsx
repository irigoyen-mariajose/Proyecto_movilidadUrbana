import React from "react";
import Navbar from "./NavbarBARRA";
import "../css/Home.css";

function Home({ onCerrarSesion }) {
  console.log("Home (antes PaginaPrincipal) renderizando, onCerrarSesion:", onCerrarSesion);
  
  return (
    <div className="home-page">
      <Navbar onCerrarSesion={onCerrarSesion} />
      
      <div className="home-content">
        <h1>Bienvenido a ANDENSUR</h1>
        <p>Sistema de Movilidad Urbana</p>
        
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