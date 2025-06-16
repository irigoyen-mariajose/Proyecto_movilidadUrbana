import React from "react";
import "../css/navbar.css";

const Navbar = () => {
  return (
    <div className="GeneralNavbar">
      <div className="TituloNavbar">
        <p>Inicio</p>
        <p>Horarios</p>
        <p>Notificaciones</p>
        <p>Soporte</p>
      </div>

      <div className="flex justify-end">
        <button className="CerrarSesion">Salir</button>
      </div>
    </div>
  );
};

export default Navbar;
