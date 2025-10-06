import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/FormularioNombreApellido.css";
import "./FrmIniciosesion";

import { auth, db } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const FrmRegistar = ({ titulo = "Registrarse" }) => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [correo, setCorreo] = useState("");
  const [mostrarContrasenia, setMostrarContrasenia] = useState(false);
  const [errores, setErrores] = useState({});
  const navigate = useNavigate();

  // FEEDBACK EN VIVO
  const [correoValido, setCorreoValido] = useState(false);
  const [contraseniaValida, setContraseniaValida] = useState(false);

  // VALIDACION CON USE EFFECT
  useEffect(() => {
    const regexCorreo = /^[a-zA-Z0-9._%+-]+@gmail\.com$/i;
    setCorreoValido(regexCorreo.test(correo));

    const regexPassword = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/;
    setContraseniaValida(regexPassword.test(contrasenia));
  }, [correo, contrasenia]);

  const validar = () => {
    let nuevosErrores = {};

    // OBLIGA USUARIOS A PONER NOMBRE Y APELLIDO
    if (!nombre.trim()) nuevosErrores.nombre = "El nombre es obligatorio.";
    if (!apellido.trim()) nuevosErrores.apellido = "El apellido es obligatorio.";

    // VALIDACION CORRECTA Y ESTRICTA DE GMAIL
    if (!correo.trim()) {
      nuevosErrores.correo = "El correo es obligatorio.";
    } else if (!correoValido) {
      nuevosErrores.correo = "Solo se permiten correos Gmail válidos.";
    }

    // VALIDACION DE CONTRAEÑA MAS SEGURA
    if (!contrasenia.trim()) {
      nuevosErrores.contrasenia = "La contraseña es obligatoria.";
    } else if (!contraseniaValida) {
      nuevosErrores.contrasenia =
        "La contraseña debe tener min. 6 caracteres, 1 mayúscula, 1 número y 1 símbolo.";
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const esValido = validar();
    if (!esValido) return;

    try {
      // CREA USUARIO :O
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        correo,
        contrasenia
      );
      const user = userCredential.user;

      // GUARDA USUARIO :3
      await setDoc(doc(db, "users", user.uid), {
        nombre,
        apellido,
        correo,
        createdAt: new Date(),
      });

      // REDIRIGIR USUARIO A HOME :3
      navigate("/Home", {
        state: { nombre, apellido, contrasenia, correo },
      });
    } catch (error) {
      console.error("Error en el registro:", error);

      let firebaseError = {};
      switch (error.code) {
        case "auth/email-already-in-use":
          firebaseError.correo = "El correo ya está en uso.";
          break;
        case "auth/invalid-email":
          firebaseError.correo = "El correo no es válido.";
          break;
        case "auth/weak-password":
          firebaseError.contrasenia = "La contraseña es demasiado débil.";
          break;
        default:
          alert("Ocurrió un error: " + error.message);
      }
      setErrores(firebaseError);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="glass-form">
        <h2 className="titulo">{titulo}</h2>

        <div className="form-group">
          <input
            className="barras"
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre"
            required
          />
          {errores.nombre && (
            <p className="mensaje-error">{errores.nombre}</p>
          )}
        </div>

        <div className="form-group">
          <input
            className="barras"
            type="text"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            placeholder="Apellido"
            required
          />
          {errores.apellido && (
            <p className="mensaje-error">{errores.apellido}</p>
          )}
        </div>

        <div className="form-group">
          <input
            className="barras"
            type="text"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            placeholder="Correo"
            required
          />
          {errores.correo && (
            <p className="mensaje-error">{errores.correo}</p>
          )}
          {!errores.correo && correo && (
            <p
              className={`mensaje-feedback ${
                correoValido ? "valido" : "invalido"
              }`}
            >
              {correoValido ? "Correo válido " : "Correo inválido "}
            </p>
          )}
        </div>

        <div
          className="form-group password-wrapper"
          style={{ position: "relative" }}
        >
          <input
            className="barras"
            type={mostrarContrasenia ? "text" : "password"}
            value={contrasenia}
            onChange={(e) => setContrasenia(e.target.value)}
            placeholder="Contraseña"
            required
          />
          <span
            className="icon-password"
            onClick={() => setMostrarContrasenia(!mostrarContrasenia)}
          >
            {mostrarContrasenia ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </span>
          {errores.contrasenia && (
            <p className="mensaje-error">{errores.contrasenia}</p>
          )}
          {!errores.contrasenia && contrasenia && (
            <p
              className={`mensaje-feedback ${
                contraseniaValida ? "valido" : "invalido"
              }`}
            >
              {contraseniaValida
                ? "Contraseña segura"
                : "Contraseña insegura"}
            </p>
          )}
        </div>

        <button type="submit" className="button">
          Registrarse
        </button>
        <p>
          Ya tenes cuenta?{" "}
          <span className="inicio" onClick={() => navigate("/FrmIniciosesion")}>
            Iniciar Sesion
          </span>
        </p>
      </form>
    </div>
  );
};

export default FrmRegistar;
