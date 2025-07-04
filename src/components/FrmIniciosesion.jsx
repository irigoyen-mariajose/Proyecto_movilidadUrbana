import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/FrmIniciosesion.css";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const FrmIniciosesion = ({ titulo = "Iniciar sesion" }) => {
  const [correo, setCorreo] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [mostrarContrasenia, setMostrarContrasenia] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate("/resultado", {
      state: { correo, contrasenia },
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
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            placeholder="Escribe tu correo" required
          />
        </div>
        <div className="form-group password-wrapper">
          <label></label>
          <input
            className="barras"
            type={mostrarContrasenia ? "text" : "password"}
            value={contrasenia}
            onChange={(e) => setContrasenia(e.target.value)}
            placeholder="Contraseña" required
            style={{ paddingRight: "40px" }}
          />
          <span
            className="ojo-icon-password"
            onClick={() => setMostrarContrasenia(!mostrarContrasenia)}
          >
            {mostrarContrasenia ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </span>
        </div>

        <button type="submit"
        className="button">Entrar</button>
      <div className="social-login">
  <p className="texto-social">O iniciá sesión con:</p>
  <div className="botones-rds-sociales">
    <button type="button" className="btn-google">
      <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="Google" />
      Google
    </button>
    <button type="button" className="btn-facebook">
      <img src="https://img.icons8.com/fluency/16/000000/facebook-new.png" alt="Facebook" />
      Facebook
    </button>
  </div>
</div>

        <p>
          ¿No tenés cuenta? <span className="enlace-registrarse">Registrate</span>
        </p>
      </form>
    </div>
  );
};

export default FrmIniciosesion;
