import React from "react";
import Navbar from "./NavbarBARRA";

function Home({ onCerrarSesion }) {
  console.log("Home (antes PaginaPrincipal) renderizando, onCerrarSesion:", onCerrarSesion);
  
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <Navbar onCerrarSesion={onCerrarSesion} />
      
      <div className="contenido-principal" style={{ padding: "20px" }}>
        <h1>Bienvenido a ANDEN</h1>
        <p>Sistema de Movilidad Urbana</p>
        
        <div className="tarjetas-principales" style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
          gap: "20px", 
          marginTop: "30px" 
        }}>
          <div className="tarjeta" style={{
            backgroundColor: "#f8f9fa",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
          }}>
            <h3>Volver</h3>
            <p>Consulta los horarios de trenes y buses</p>
          </div>
          
          <div className="tarjeta" style={{
            backgroundColor: "#f8f9fa",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
          }}>
            <h3>Notificaciones</h3>
            <p>Mantente informado sobre el estado del servicio</p>
          </div>
          
          <div className="tarjeta" style={{
            backgroundColor: "#f8f9fa",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
          }}>
            <h3>Soporte</h3>
            <p>Reporta problemas o solicita ayuda</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;