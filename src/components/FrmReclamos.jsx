import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/FormularioNombreApellido.css";
import CloseIcon from "@mui/icons-material/Close";


const FrmRegistar = ({ titulo = "soporte" }) => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [contraseña, setContrasenia] = useState("");
  const [correos, setCorreo] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Navegar a PantallaDestino y pasar los datos
    navigate("/resultado", {
      state: { nombre, apellido, contraseña, correos },
    });
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="glass-form">
        <h2>{titulo}</h2>

        <div className="form-group">
          <label>Nombre</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Escribe tu nombre"
          />
          <CloseIcon />
        </div>

        <div className="form-group">
          <label>Apellido</label>
          <input
            type="text"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            placeholder="Escribe tu apellido"
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
        <div className="form-group">
          <label>Correo</label>
          <input
            type="text"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            placeholder="Escribe tu correo"
          />
        </div>

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default FrmReclamos;
