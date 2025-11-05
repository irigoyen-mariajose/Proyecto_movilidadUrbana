import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Soporte.css";
import "../css/FormularioReclamos.css";
import Select from "react-select";
import { FaImage } from "react-icons/fa";
import Navbar from "./NavbarBARRA";

import { db } from "../firebaseConfig";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const FrmSoporte = ({ titulo = "Soporte" }) => {
  const [parada, setParada] = useState(null);
  const [problema, setProblema] = useState(null);
  const [detalle, setDetalle] = useState("");
  const [archivo, setArchivo] = useState(null); // si después querés agregar imágenes
  const [mensaje, setMensaje] = useState("");
  const [enviando, setEnviando] = useState(false);
  const navigate = useNavigate();

  const auth = getAuth();

  // 🔹 Opciones del formulario
  const opcionesParadas = [
    { value: "neuquen", label: "Terminal" },
    { value: "eton", label: "ETON" },
    { value: "union", label: "Barrio Unión" },
    { value: "aeropuerto", label: "Aeropuerto de Neuquén" },
    { value: "constituyentes", label: "Constituyentes" },
    { value: "cholar", label: "El Cholar" },
    { value: "rivas", label: "Ignacio Rivas" },
    { value: "plottier", label: "Plottier" },
  ];

  const opcionesProblemas = [
    { value: "ubicacion", label: "La ubicación de la parada no coincide con la de la aplicación" },
    { value: "fuera-servicio", label: "La parada está fuera de servicio" },
    { value: "no-freno", label: "El tren no frenó" },
    { value: "problemas", label: "La parada tiene problemas" },
    { value: "trabajadores", label: "Los trabajadores del tren" },
  ];

  // 🔸 Enviar datos a Firestore
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("🚀 Formulario detectado. Intentando enviar reclamo...");

    const user = auth.currentUser;
    if (!user) {
      alert("⚠️ Debés estar logueado para enviar un reclamo.");
      return;
    }

    if (!parada || !problema) {
      alert("Por favor, seleccioná una parada y un problema.");
      return;
    }

    setEnviando(true);
    setMensaje("⏳ Enviando reclamo...");

    try {
      // Guarda los datos en Firestore
      console.log("🔑 UID autenticado:", user.uid);

      const docRef = await addDoc(collection(db, "reclamos"), {
        userId: user.uid,
        parada: parada.label,
        problema: problema.label,
        detalle: detalle.trim(),
        fecha: Timestamp.now(),
      });

      console.log("Reclamo creado con ID:", docRef.id);
      setMensaje("Reclamo enviado correctamente. ¡Gracias por tu colaboración!");
      setParada(null);
      setProblema(null);
      setDetalle("");
      setArchivo(null);

      // Si querés redirigir luego de enviar:
      // navigate("/resultado");
    } catch (error) {
      console.error("Error al enviar reclamo:", error);
      setMensaje("Error al enviar reclamo. Revisá las reglas o la consola.");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="form-container">
        <form onSubmit={handleSubmit} className="glass-form">
          <h2>{titulo}</h2>

          <div className="form-group">
            <Select
              options={opcionesParadas}
              placeholder="Nombre de parada"
              onChange={setParada}
              value={parada}
              isClearable
            />
          </div>

          <div className="form-group">
            <Select
              options={opcionesProblemas}
              placeholder="Seleccione un problema"
              onChange={setProblema}
              value={problema}
              isClearable
            />
          </div>

          <div className="form-group textarea-group" style={{ position: "relative" }}>
            <textarea
              value={detalle}
              onChange={(e) => setDetalle(e.target.value)}
              placeholder="Contanos más acerca de tu problema"
              rows={4}
            />
            <input
              type="file"
              accept="image/*,video/*"
              onChange={(e) => setArchivo(e.target.files[0])}
              style={{ display: "none" }}
              id="input-file"
            />
            <label
              htmlFor="input-file"
              style={{
                position: "absolute",
                bottom: "10px",
                right: "10px",
                cursor: "pointer",
              }}
            >
              <FaImage size={20} />
            </label>
          </div>

          <button type="submit" disabled={enviando}>
            {enviando ? "Enviando..." : "Enviar"}
          </button>

          {mensaje && (
            <p style={{ marginTop: "15px", color: "#fff", textAlign: "center" }}>
              {mensaje}
            </p>
          )}
        </form>
      </div>
    </>
  );
};

export default FrmSoporte;
