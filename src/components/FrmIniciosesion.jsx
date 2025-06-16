import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/FormularioNombreApellido.css";
import "../css/App.css";

const FrmIniciosesion = ({ titulo = "Iniciar sesion" }) => {
    const [correos, setCorreo] = useState("");
  const [contraseña, setContrasenia] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate("/resultado", {
      state: { correo, contraseña},
    });
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="glass-form">
        <h2>{titulo}</h2>

        <div className="form-group">
          <label>Correo</label>
          <input
            type="text"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            placeholder="Escribe tu correo"
          />
        </div>
        <div className="form-group">
          <label>Contraseña</label>
          <input
            type="text"
            value={contraseña}
            onChange={(e) => setContrasenia(e.target.value)}
            placeholder="Ingrese su contraseña"
          />
        </div>

        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default FrmIniciosesion;
