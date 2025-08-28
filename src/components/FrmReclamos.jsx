import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/FormularioReclamos.css";
import CloseIcon from "@mui/icons-material/Close";
import Select from "react-select";
import { FaImage } from "react-icons/fa"; 


const FrmReclamos = ({ titulo = "Soporte" }) => {
  const [parada, setParada] = useState(null);
  const [problema, setProblema] = useState(null);
  const [detalle, setDetalle] = useState("");
  const [archivo, setArchivo] = useState(null);
  const navigate = useNavigate();


  const opcionesParadas = [
    { value: "neuquen", label: "Terminal" },
    { value: "eton", label: "ETON" },
    { value: "union", label: "Barrio Unión" },
    { value: "aeropuerto", label: "Aeropuerto de Neuquén" },
    { value: "constituyentes", label: "Constituyentes" },
    { value: "cholar", label: "El Cholar" },
    { value: "rivas", label: "Ignacio Rivas" },
    { value: "plottier", label: "Plottier" }
  ];

  const opcionesProblemas = [
    { value: "ubicacion", label: "La ubicación de la parada no coincide con la de la aplicación" },
    { value: "fuera-servicio", label: "La parada está fuera de servicio" },
    { value: "no-freno", label: "El tren no frenó" },
    { value: "problemas", label: "La parada tiene problemas" },
    { value: "trabajadores", label: "Los trabajadores del tren" }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!parada || !problema) {
      alert("Por favor, selecciona una parada y un problema.");
      return;
    }
    navigate("/resultado", {
      
    });
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="glass-form">
        <h2>{titulo}</h2>

        <div className="form-group">
          
          <Select
            options={opcionesParadas}
            placeholder="Nombre de parada"
            onChange={setParada}
            isClearable
          />
        </div>

        <div className="form-group">
          
          <Select
            options={opcionesProblemas}
            placeholder="Seleccione un problema"
            onChange={setProblema}
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
