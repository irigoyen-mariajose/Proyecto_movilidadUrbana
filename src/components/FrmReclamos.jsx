import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/FormularioNombreApellido.css";
import CloseIcon from "@mui/icons-material/Close";
import Select from "react-select";
import { FaImage } from "react-icons/fa"; 

const FrmReclamos = ({ titulo = "Soporte" }) => {
  const [parada, setParada] = useState(null);
  const [problema, setProblema] = useState(null);
  const [detalle, setDetalle] = useState("");
  const [archivo, setArchivo] = useState(null);
  const navigate = useNavigate();

// Opciones de paradas para el selector
  const opcionesParadas = [
    { value: "neuquen", label: "Neuquén (Terminal)" },
    { value: "eton", label: "ETON" },
    { value: "union", label: "Barrio Unión" },
    { value: "aeropuerto", label: "Aeropuerto de Neuquén" },
    { value: "constituyentes", label: "Constituyentes" },
    { value: "cholar", label: "El Cholar" },
    { value: "rivas", label: "Ignacio Rivas" },
    { value: "plottier", label: "Plottier" }
  ];

// Opciones de problemas para el selector
  const opcionesProblemas = [
    { value: "ubicacion", label: "La ubicación de la parada no coincide con la de la aplicación" },
    { value: "fuera-servicio", label: "La parada está fuera de servicio" },
    { value: "no-freno", label: "El tren no frenó" },
    { value: "problemas", label: "La parada tiene problemas" },
    { value: "trabajadores", label: "Los trabajadores del tren" }
  ];

  // Esta funcion se ejecuta cuando se manda el formulario

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validación para que si o si elija una parada y problema
    if (!parada || !problema) {
      alert("Por favor, selecciona una parada y un problema."); // Mensaje de alerta si llega a faltar informacion
      return;// Sale de la función si no se cumple la validación
    }
    // Redirige a la ruta "/resultado" pasando los datos del formulario
    navigate("/resultado", {
      state: { parada, problema, detalle, archivo }
    });
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="glass-form">
        <h2>{titulo}</h2>

        <div className="form-group">
          <label>Nombre de parada</label>
          <Select
            options={opcionesParadas}
            placeholder="Nombre de parada"
            onChange={setParada}
            isClearable
          />
        </div>

        <div className="form-group">
          <label>Seleccione un problema</label>
          <Select
            options={opcionesProblemas}
            placeholder="Seleccione un problema"
            onChange={setProblema}
            isClearable
          />
        </div>

        <div className="form-group textarea-group" style={{ position: "relative" }}>
          <label>Cuéntanos más acerca de tu problema</label>
          <textarea
            value={detalle}
            onChange={(e) => setDetalle(e.target.value)}
            placeholder="Cuéntanos más acerca de tu problema..."
            rows={4}
          />
          <input
            type="file"
            accept="image/*,video/*"
            onChange={(e) => setArchivo(e.target.files[0])}
            style={{ display: "none" }}
            id="input-file"
          />
          <label htmlFor="input-file" style={{
            position: "absolute",
            bottom: "10px",
            right: "10px",
            cursor: "pointer"
          }}>
            <FaImage size={20} />
          </label>
        </div>

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};


export default FrmReclamos;
