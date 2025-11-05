import React, { useState } from "react";
import "../css/FormularioReclamos.css";
import Select from "react-select";
import Navbar from "./NavbarBARRA";

import { db } from "../firebaseConfig";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const FrmReclamos = ({ titulo = "Soporte" }) => {
  const [parada, setParada] = useState(null);
  const [problema, setProblema] = useState(null);
  const [detalle, setDetalle] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [enviando, setEnviando] = useState(false);

  const auth = getAuth();

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

  // 🔸 Evento del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("🚀 Formulario detectado. Intentando guardar reclamo...");

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
      const docRef = await addDoc(collection(db, "reclamos"), {
        userId: user.uid,
        parada: parada.label,
        problema: problema.label,
        detalle: detalle.trim(),
        fecha: Timestamp.now(),
      });

      console.log("✅ Reclamo creado con ID:", docRef.id);
      setMensaje("✅ Reclamo enviado correctamente. ¡Gracias!");
      setParada(null);
      setProblema(null);
      setDetalle("");
    } catch (error) {
      console.error("❌ Error al enviar reclamo:", error);
      setMensaje("❌ Error al enviar reclamo. Revisá la consola o las reglas.");
    } finally {
      setEnviando(false);
    }
  };

  console.log("🧩 FrmReclamos se renderizó correctamente");

  return (
    <div className="form-container">
      <Navbar />
      <form
        onSubmit={handleSubmit}
        className="glass-form"
        style={{ padding: "20px", backgroundColor: "rgba(0,0,0,0.3)" }}
      >
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

        <div className="form-group">
          <textarea
            value={detalle}
            onChange={(e) => setDetalle(e.target.value)}
            placeholder="Contanos más acerca de tu problema"
            rows={4}
          />
        </div>

        {/* 🔹 Importante: botón con type="submit" dentro del <form> */}
        <button type="submit" disabled={enviando} style={{ marginTop: "10px" }}>
          {enviando ? "Enviando..." : "Enviar"}
        </button>

        {mensaje && (
          <p style={{ marginTop: "15px", color: "#fff", textAlign: "center" }}>{mensaje}</p>
        )}
      </form>
    </div>
  );
};

export default FrmReclamos;
