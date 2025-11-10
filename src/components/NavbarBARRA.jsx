import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/navbar.css";
import logoAndensur from "./Imagenes/logo_andensur.jpg";


/**
 * 
 * @param {*} param0 
 * @returns
 *  <div className="GeneralNavbar">
      <div className="brand">
        <img src={logoAndensur} alt="ANDENSUR" className="brand-logo" />
        <h1 className="tituloP">ANDENSUR</h1>
      </div>

      <div className="TituloNavbar">
        <p onClick={() => navigate("/Home")}>Inicio</p>
        <p onClick={() => navigate("/Horarios")}>Horarios</p>
        <p onClick={() => navigate("/Notificaciones")}>Notificaciones</p>
        <p onClick={() => navigate("/FrmSoporte")}>Soporte</p>
      </div>

      <div className="flex justify-end">
        <button className="CerrarSesion" onClick={handleCerrarSesion}>
          Cerrar Sesión
        </button>
      </div>
    </div>
 * 
 */
const Navbar = ({ onCerrarSesion }) => {
  const navigate = useNavigate();
  
  console.log("Navbar renderizando, onCerrarSesion:", onCerrarSesion);

  /**
   * @variable handleCerrarSesion
   */
  const handleCerrarSesion = () => {
    if (typeof onCerrarSesion === "function") {
      onCerrarSesion();
    }
    navigate("/FrmIniciosesion");
  };

  return (
    <div className="GeneralNavbar">
      <div className="brand">
        <img src={logoAndensur} alt="ANDENSUR" className="brand-logo" />
        <h1 className="tituloP">ANDENSUR</h1>
      </div>

      <div className="TituloNavbar">
        <p onClick={() => navigate("/Home")}>Inicio</p>
        <p onClick={() => navigate("/Horarios")}>Horarios</p>
        <p onClick={() => navigate("/Notificaciones")}>Notificaciones</p>
        <p onClick={() => navigate("/FrmSoporte")}>Soporte</p>
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
