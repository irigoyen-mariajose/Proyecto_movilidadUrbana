import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/FormularioNombreApellido.css";
import "./FrmIniciosesion";

import { auth, db } from "../firebaseConfig"; // 🔹 importa auth y db
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
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // CREA USUARIO
      const userCredential = await createUserWithEmailAndPassword(auth, correo, contrasenia);
      const user = userCredential.user;

      // GUARDADO DE DATOS :v
      await setDoc(doc(db, "users", user.uid), {
        nombre,
        apellido,
        correo,
        createdAt: new Date()
      });

      // ENTRA A HOME SOLO CON LOS DATOS
      navigate("/Home", {
        state: { nombre, apellido, contrasenia, correo },
      });
    } catch (error) {
      console.error("Error al registrar:", error.message);
      alert("Hubo un error: " + error.message);
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
          />
        </div>

        <div className="form-group">
          <input
            className="barras"
            type="text"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            placeholder="Apellido"
          />
        </div>

        <div className="form-group">
          <input
            className="barras"
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            placeholder="Correo"
          />
        </div>

        <div className="form-group password-wrapper" style={{ position: "relative" }}>
          <input
            className="barras"
            type={mostrarContrasenia ? "text" : "password"}
            value={contrasenia}
            onChange={(e) => setContrasenia(e.target.value)}
            placeholder="Contraseña"
            style={{ paddingRight: "40px" }}
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
