import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/navbar.css";

const Navbar = ({ onCerrarSesion }) => {
  const navigate = useNavigate();
  
  console.log("Navbar renderizando, onCerrarSesion:", onCerrarSesion);

  const handleCerrarSesion = () => {
    if (typeof onCerrarSesion === 'function') {
      onCerrarSesion();
    }
    navigate("/FrmIniciosesion");
  };

  return (
    <div className="GeneralNavbar">
      <h1 className="tituloP">ANDENSUR</h1>
      <div className="TituloNavbar">
        <p onClick={() => navigate("/Home")}>Inicio</p>
        <p onClick={() => navigate("/Horarios")}>Horarios</p>
        <p>Notificaciones</p>
        <p>Soporte</p>
      </div>

      <div className="flex justify-end">
        <button className="CerrarSesion" onClick={handleCerrarSesion}>
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default Navbar;
