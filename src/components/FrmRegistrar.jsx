import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "../css/FormularioNombreApellido.css";
import "./FrmIniciosesion";

import { auth, db } from "../firebaseConfig";
import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from "firebase/auth"; 
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
  const [contraseniaFuerza, setContraseniaFuerza] = useState(0);
  const [feedbackContrasenia, setFeedbackContrasenia] = useState("");

  const [correoEnUso, setCorreoEnUso] = useState(false);
  const [verificandoCorreo, setVerificandoCorreo] = useState(false);

  // VER SI EXISTE CORREO EN FIREBASE
  const verificarCorreoEnUso = useCallback(async (email) => {
    if (!email || !/^[a-zA-Z0-9._%+-]+@gmail\.com$/i.test(email)) {
      setCorreoEnUso(false);
      return;
    }

    setVerificandoCorreo(true);
    try {
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);
      setCorreoEnUso(signInMethods.length > 0);
    } catch (error) {
      console.error("Error al verificar correo:", error);
      setCorreoEnUso(false); 
    } finally {
      setVerificandoCorreo(false);
    }
  }, []);

  /**
   * useEffect () => setCorreoValido
   */
  // VALIDACION EN TIEMPO REAL PARA FEEDBACK
  useEffect(() => {
    // 1. Validación de Correo (Gmail)
    const regexCorreo = /^[a-zA-Z0-9._%+-]+@gmail\.com$/i;
    const esValido = regexCorreo.test(correo);
    setCorreoValido(esValido);
    
    // VERIFICACION DE CORREO
    let handler;
    if (esValido && correo.length > 0) {
        handler = setTimeout(() => {
            verificarCorreoEnUso(correo);
        }, 500); 
    } else {
        setCorreoEnUso(false);
    }
    
    // VALIDACION FEEDBACK
    let fuerza = 0;
    let feedback = [];
    
    // REGLAS PARA CONTRASEÑAS
    if (contrasenia.length >= 6) { fuerza++; } else { feedback.push("mínimo 6 caracteres"); }
    if (/(?=.*[a-z])/.test(contrasenia)) { fuerza++; } else { feedback.push("una minúscula"); }
    if (/(?=.*[A-Z])/.test(contrasenia)) { fuerza++; } else { feedback.push("una mayúscula"); }
    if (/(?=.*\d)/.test(contrasenia)) { fuerza++; } else { feedback.push("un número"); }
    if (/(?=.*[@$!%*?&])/.test(contrasenia)) { fuerza++; } else { feedback.push("un símbolo (@$!%*?&)"); }

    setContraseniaFuerza(fuerza);

    if (contrasenia.length > 0) {
      setFeedbackContrasenia(fuerza === 5 ? "¡Contraseña excelente! ✅" : "Falta: " + feedback.join(", "));
    } else {
      setFeedbackContrasenia("");
    }
    
   
    if (correo.length > 0 || contrasenia.length > 0) {
        setErrores(prevErrores => {
            if (Object.keys(prevErrores).length > 0) {
                return {};
            }
            return prevErrores;
        });
    }

    return () => {
      if (handler) {
        clearTimeout(handler);
      }
    };

  }, [correo, contrasenia, verificarCorreoEnUso]); // Ahora sin 'errores'

  /**
   * 
   * @returns 
   * Object.keys(nuevosErrores).length === 0;
   */
  const validar = () => {
    let nuevosErrores = {};

    // VALIDACIÓN DE DATOS REQUERIDOS
    if (!nombre.trim()) nuevosErrores.nombre = "El nombre es obligatorio.";
    if (!apellido.trim()) nuevosErrores.apellido = "El apellido es obligatorio.";

    // VALIDAR CORREO
    if (!correo.trim()) nuevosErrores.correo = "El correo es obligatorio.";
    else if (!correoValido)
      nuevosErrores.correo = "Solo se permiten correos **@gmail.com** válidos.";
    else if (correoEnUso) 
      nuevosErrores.correo = "Este correo ya está registrado en nuestra base de datos.";


    // VALIDAR CONTRASEÑA -.-
    if (!contrasenia.trim()) nuevosErrores.contrasenia = "La contraseña es obligatoria.";
    else if (contraseniaFuerza < 5)
      nuevosErrores.contrasenia =
        "La contraseña debe tener: min. 6 caracteres, 1 minúscula, 1 mayúscula, 1 número y 1 símbolo.";

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  /**
   * 
   * @param {*} e 
   * @returns 
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const esValido = validar();
    if (!esValido) return; 

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, correo, contrasenia);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        nombre,
        apellido,
        correo,
        createdAt: new Date(),
      });

      navigate("/Home", {
        state: { nombre, apellido, contrasenia, correo },
      });
    } catch (error) {
      console.error("Error en el registro:", error);
      
      let firebaseError = {};
      switch (error.code) {
        case "auth/email-already-in-use":
          firebaseError.correo = "Este correo ya está registrado (verificación de Firebase).";
          break;
        case "auth/invalid-email":
          firebaseError.correo = "El formato de correo es inválido.";
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

  /**
   * 
   * @param {*} nivel 
   * @returns 
   */
  const getColorFuerza = (nivel) => {
    switch (nivel) {
      case 0: return "red";
      case 1: return "orangered";
      case 2: return "orange";
      case 3: return "yellowgreen";
      case 4: case 5: return "green";
      default: return "gray";
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="glass-form">
        <h2 className="titulo">{titulo}</h2>

        
        <div className="form-group">
          <input className="barras" type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre" required />
          {errores.nombre && <p className="mensaje-error">{errores.nombre}</p>}
        </div>
      
        <div className="form-group">
          <input className="barras" type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} placeholder="Apellido" required />
          {errores.apellido && <p className="mensaje-error">{errores.apellido}</p>}
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
          {errores.correo && <p className="mensaje-error">{errores.correo}</p>}
          
          
          {!errores.correo && correo && (
            <p className={`mensaje-feedback ${correoValido && !correoEnUso ? "valido" : "invalido"}`}>
              {verificandoCorreo && "Verificando uso..."}
              {correoEnUso && !verificandoCorreo && "❌ ¡Este correo ya está registrado!"}
              {!correoValido && "❌ Solo se aceptan correos **@gmail.com**"}
              {correoValido && !correoEnUso && !verificandoCorreo && "Correo listo para usar ✅"}
            </p>
          )}
        </div>

      
        <div className="form-group password-wrapper" style={{ position: "relative" }}>
          <input
            className="barras"
            type={mostrarContrasenia ? "text" : "password"}
            value={contrasenia}
            onChange={(e) => setContrasenia(e.target.value)}
            placeholder="Contraseña"
            required
          />
          <span className="icon-password" onClick={() => setMostrarContrasenia(!mostrarContrasenia)}>
            {mostrarContrasenia ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </span>
          
          {errores.contrasenia && <p className="mensaje-error">{errores.contrasenia}</p>}
          
          {!errores.contrasenia && contrasenia && (
            <>
              <p className={`mensaje-feedback ${contraseniaFuerza === 5 ? "valido" : "invalido"}`}>
                {feedbackContrasenia}
              </p>
              <div
                style={{
                  height: "5px",
                  width: `${(contraseniaFuerza / 5) * 100}%`,
                  backgroundColor: getColorFuerza(contraseniaFuerza),
                  transition: "0.3s",
                  borderRadius: "4px",
                  marginTop: "2px",
                }}
              ></div>
            </>
          )}
        </div>

        <button type="submit" className="button" disabled={correoEnUso || verificandoCorreo}>
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