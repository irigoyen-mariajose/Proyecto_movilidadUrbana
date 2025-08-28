import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/FormularioNombreApellido.css";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const FrmRegistar = ({ titulo = "Registrarse" }) => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [correo, setCorreo] = useState("");
  const [mostrarContrasenia, setMostrarContrasenia] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Navegar a PantallaDestino y pasar los datos
    navigate("/resultado", {
      state: { nombre, apellido, contrasenia, correo },
    });
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="glass-form">
        <h2 className="titulo">{titulo}</h2>

        <div className="form-group">
          <label></label>
          <input
            className="barras"
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre"
          />
        </div>

        <div className="form-group">
          <label></label>
          <input
            className="barras"
            type="text"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            placeholder="Apellido"
          />
        </div>
        <div className="form-group">
          <label></label>
          <input
            className="barras"
            type="text"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            placeholder="Correo"
          />
        </div>
        <div
          className="form-group password-wrapper"
          style={{ position: "relative" }}
        >
          <label></label>
          <input
            className="barras"
            type={mostrarContrasenia ? "text" : "password"}
            value={contrasenia}
            onChange={(e) => setContrasenia(e.target.value)}
            placeholder="Contraseña"
            style={{ paddingRight: "40px" }} // deja espacio para el icono
          />
          <span
            className="icon-password"
            onClick={() => setMostrarContrasenia(!mostrarContrasenia)}
          >
            {mostrarContrasenia ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </span>
        </div>

        <button type="submit" className="button">
          Entrar
        </button>
        <p>Ya tenes cuenta? <span className="inicio">Iniciar Sesion</span></p>
      </form>
    </div>
  );
};

export default FrmRegistar;
