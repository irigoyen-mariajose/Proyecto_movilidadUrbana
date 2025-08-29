import React from "react";
import Navbar from "./NavbarBARRA";
import "../css/Notificaciones.css";



const Notificaciones = ({ onCerrarSesion }) => {  
  return(
   <div className="noti-principal">
    <Navbar onCerrarSesion={onCerrarSesion} />
   <header className="noti-header">
       
            <h1>En caso de una notificacion se activa la campanita:</h1>
    
        </header>
         <div className="noti-cards">
          <div className="noti-card">
            <h2>¡Recorda!</h2>
            <p>Se habilito otra parada en Plottier “Constituyente“</p>
          </div>
          
          <div className="noti-card">
            <h2>¡Atencion!</h2>
            <p>Hay cambio de tarifas.Estas aumentaran un 20%</p>
          </div>
          
          <div className="noti-card">
            <h2>Paro</h2>
            <p>Reporta problemas o solicita ayuda</p>
          </div>
        </div>
      </div>





  );
  };
  export default Notificaciones;
