import React, { useState } from "react";
import "../css/FormularioReclamos.css";
import Select from "react-select";
import Navbar from "./NavbarBARRA";

import { db } from "../firebaseConfig";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";

/**
 * 
 * @variable FrmReclamos 
 * @returns 
 */
const FrmReclamos = ({ titulo = "Soporte" }) => {
  const [parada, setParada] = useState(null);
  const [problema, setProblema] = useState(null);
  const [detalle, setDetalle] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [imagen, setImagen] = useState(null);
  const [imagenPreview, setImagenPreview] = useState(null);

  /**
   * @variable auth
   */
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

  /**
   * 
   * @param {*} e 
   */
  const handleImagenChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagen(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagenPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
/**
 * @variable handleRemoveImagen
 */
  const handleRemoveImagen = () => {
    setImagen(null);
    setImagenPreview(null);
    document.getElementById("fileInput").value = "";
  };

  /**
   * 
   * @param {*} e 
   * @returns 
   */
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
      const reclamoData = {
        userId: user.uid,
        parada: parada.label,
        problema: problema.label,
        detalle: detalle.trim(),
        fecha: Timestamp.now(),
      };

      if (imagen) {
        reclamoData.tieneImagen = true;
        reclamoData.nombreImagen = imagen.name;
      }

      const docRef = await addDoc(collection(db, "reclamos"), reclamoData);

      console.log("✅ Reclamo creado con ID:", docRef.id);
      setMensaje(
        imagen
          ? `✅ Reclamo enviado con imagen adjunta (${imagen.name}). ¡Gracias!`
          : "✅ Reclamo enviado correctamente. ¡Gracias!"
      );
      
      setParada(null);
      setProblema(null);
      setDetalle("");
      setImagen(null);
      setImagenPreview(null);
      document.getElementById("fileInput").value = "";
    } catch (error) {
      console.error("❌ Error al enviar reclamo:", error);
      setMensaje("❌ Error al enviar reclamo. Revisá la consola o las reglas.");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="reclamos-page-wrapper">
      <Navbar />
      <div className="reclamos-form-container">
        <form onSubmit={handleSubmit} className="reclamos-glass-form">
          <h2>{titulo}</h2>

          <div className="reclamos-form-group">
            <label htmlFor="parada-select">Parada</label>
            <Select
              inputId="parada-select"
              options={opcionesParadas}
              placeholder="Seleccione una parada"
              onChange={setParada}
              value={parada}
              isClearable
              classNamePrefix="reclamos-select"
              styles={{
                control: (base) => ({
                  ...base,
                  borderRadius: '10px',
                  border: '2px solid #e5e5e5',
                  background: '#fafafa',
                  padding: '0.15rem',
                  '&:hover': {
                    borderColor: '#6b9d4d',
                  },
                }),
                menu: (base) => ({
                  ...base,
                  borderRadius: '10px',
                }),
              }}
            />
          </div>

          <div className="reclamos-form-group">
            <label htmlFor="problema-select">Tipo de problema</label>
            <Select
              inputId="problema-select"
              options={opcionesProblemas}
              placeholder="Seleccione un problema"
              onChange={setProblema}
              value={problema}
              isClearable
              classNamePrefix="reclamos-select"
              styles={{
                control: (base) => ({
                  ...base,
                  borderRadius: '10px',
                  border: '2px solid #e5e5e5',
                  background: '#fafafa',
                  padding: '0.15rem',
                  '&:hover': {
                    borderColor: '#6b9d4d',
                  },
                }),
                menu: (base) => ({
                  ...base,
                  borderRadius: '10px',
                }),
              }}
            />
          </div>

          <div className="reclamos-form-group">
            <label htmlFor="detalle">Descripción del problema</label>
            <div className="reclamos-textarea-wrapper">
              <textarea
                id="detalle"
                value={detalle}
                onChange={(e) => setDetalle(e.target.value)}
                placeholder="Describa el problema que ha experimentado..."
                rows={4}
              />
              <div className="reclamos-attachment-area">
                <div className="reclamos-file-input-wrapper">
                  <label htmlFor="fileInput" className="reclamos-file-input-label">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                    <span>Adjuntar imagen</span>
                  </label>
                  <input
                    type="file"
                    id="fileInput"
                    accept="image/*"
                    onChange={handleImagenChange}
                  />
                  {imagen && (
                    <span className="reclamos-file-name">{imagen.name}</span>
                  )}
                </div>
                {imagen && (
                  <button
                    type="button"
                    className="reclamos-remove-file"
                    onClick={handleRemoveImagen}
                  >
                    ×
                  </button>
                )}
              </div>
            </div>
            {imagenPreview && (
              <div className="reclamos-image-preview">
                <img src={imagenPreview} alt="Vista previa" />
              </div>
            )}
          </div>

          <button type="submit" disabled={enviando}>
            {enviando ? "Enviando..." : "Enviar Reclamo"}
          </button>

          {mensaje && (
            <p className={`reclamos-mensaje ${mensaje.includes("❌") ? "error" : ""}`}>
              {mensaje}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default FrmReclamos;