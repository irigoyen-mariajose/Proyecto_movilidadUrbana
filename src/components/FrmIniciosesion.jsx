import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../css/FrmIniciosesion.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth"; // 🔹 agregamos signInWithEmailAndPassword
import { auth, googleProvider } from "../firebaseConfig";

//FORMULARIO
const FrmIniciosesion = ({ titulo = "Iniciar sesion", onFrmIniciosesion }) => {
  const [correo, setCorreo] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [mostrarContrasenia, setMostrarContrasenia] = useState(false);
  const [errores, setErrores] = useState({});
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log("Usuario logueado con Google:", user);

      if (typeof onFrmIniciosesion === "function") {
        onFrmIniciosesion(user);
      }

      navigate("/Home");
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error);
      alert("No se pudo iniciar sesión con Google");
    }
  };

  const validar = () => {
    let nuevosErrores = {};

    if (!correo.trim()) {
      nuevosErrores.correo = "El correo es obligatorio.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
      nuevosErrores.correo = "El correo no es válido.";
    }

    if (!contrasenia.trim()) {
      nuevosErrores.contrasenia = "La contraseña es obligatoria.";
    } else if (contrasenia.length < 6) {
      nuevosErrores.contrasenia =
        "La contraseña debe tener al menos 6 caracteres.";
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validar()) {
      return;
    }

    try {
      // LOGIN FIREBASE
      const userCredential = await signInWithEmailAndPassword(auth, correo, contrasenia);
      const user = userCredential.user;
      console.log("Usuario logueado:", user);

      if (typeof onFrmIniciosesion === "function") {
        onFrmIniciosesion(user);
      }

      navigate("/Home");
    } catch (error) {
      console.error("Error al iniciar sesión:", error.message);
      alert("Correo o contraseña incorrectos");
    }
  };

  return (
    <div className="login-page">
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
              placeholder="Escribe tu correo"
              required
            />
            {errores.correo && (
              <p className="mensaje-error">{errores.correo}</p>
            )}
          </div>

          <div className="form-group password-wrapper">
            <label></label>
            <input
              className="barras"
              type={mostrarContrasenia ? "text" : "password"}
              value={contrasenia}
              onChange={(e) => setContrasenia(e.target.value)}
              placeholder="Contraseña"
              required
            />
            <span
              className="ojo-icon-password"
              onClick={() => setMostrarContrasenia(!mostrarContrasenia)}
            >
              {mostrarContrasenia ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </span>
            {errores.contrasenia && (
              <p className="mensaje-error">{errores.contrasenia}</p>
            )}
          </div>

          <button type="submit" className="button">
            Entrar
          </button>

          <div className="social-login">
            <p className="texto-social">O iniciá sesión con</p>
            <div className="botones-rds-sociales">
              <button type="button" className="btn-google" onClick={handleGoogleLogin}>
                  <img
                    src="https://img.icons8.com/color/16/000000/google-logo.png"
                    alt="Google"
                  />
                  Google
                </button>
              <button type="button" className="btn-facebook">
                <img
                  src="https://img.icons8.com/fluency/16/000000/facebook-new.png"
                  alt="Facebook"
                />
                Facebook
              </button>
            </div>
          </div>

          <p>
            ¿No tenés cuenta?{" "}
            <Link to="/FrmRegistrar" className="enlace-registrarse">
              Registrate
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default FrmIniciosesion;

