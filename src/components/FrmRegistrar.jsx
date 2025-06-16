import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/FormularioNombreApellido.css";
import CloseIcon from "@mui/icons-material/Close";

const FrmRegistar = ({ titulo = "Registrarse" }) => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [correo, setCorreo] = useState("");
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
          <CloseIcon />
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
        <div className="form-group">
          <label></label>
          <input
            className="barras"
            type="text"
            value={contrasenia}
            onChange={(e) => setContrasenia(e.target.value)}
            placeholder="Contraseña"
          />
        </div>

        <button type="submit" className="button">
          Entrar
        </button>
        <p>ya tenes cuenta? botonIniciarsesion</p>
      </form>
    </div>
  );
};

export default FrmRegistar;
