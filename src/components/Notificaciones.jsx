import React from "react";
import Navbar from "./NavbarBARRA";
import "../css/Notificaciones.css";



const Notificaciones = ({ onCerrarSesion }) => {  
  return(
   <div className="noti-principal">
    <Navbar onCerrarSesion={onCerrarSesion} />


    <div className="noti-content">
        <h1>En caso de una notificacion se activa la campanita</h1>
        </div>   
   </div>

  );
  };
  export default Notificaciones;
