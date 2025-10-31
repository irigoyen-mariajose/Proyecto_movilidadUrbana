import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/FormularioReclamos.css";
import CloseIcon from "@mui/icons-material/Close";
import Select from "react-select";
import { FaImage } from "react-icons/fa"; 
import Navbar from "./NavbarBARRA";

import { db, storage } from "../firebaseConfig"; 
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const FrmReclamos = ({ titulo = "Soporte" }) => {
  const [parada, setParada] = useState(null);
  const [problema, setProblema] = useState(null);
  const [detalle, setDetalle] = useState("");
  const [archivo, setArchivo] = useState(null);
const [enviando, setEnviando] = useState(false);
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

 /**
     * @description Maneja el envío del formulario, sube el archivo a Storage y guarda el documento en Firestore.
     * @param {*} e 
     */
    const handleSubmit = async (e) => { // 💡 Función convertida a ASÍNCRONA
        e.preventDefault();

        if (!parada || !problema) {
            alert("Por favor, selecciona una parada y un problema.");
            return;
        }

        setEnviando(true);
        let urlArchivo = null;

        try {
           
            if (archivo) {
                const storageRef = ref(
                    storage, 
                    `reclamos/${Date.now()}_${archivo.name}` 
                );

                const snapshot = await uploadBytes(storageRef, archivo);
                
                urlArchivo = await getDownloadURL(snapshot.ref);
            }

         
            const datosReclamo = {
                parada: parada.label,
                problema: problema.label,
                detalle: detalle,
                fechaCreacion: new Date(),
                estado: 'pendiente', 
                urlArchivo: urlArchivo, 
            };

           
            await addDoc(collection(db, "reclamos"), datosReclamo);

            
            alert("¡Reclamo enviado! Pronto recibirás una confirmación.");
            navigate("/resultado");

        } catch (error) {
            console.error("Error al enviar el reclamo a Firebase:", error);
            alert("Ocurrió un error al enviar el reclamo. Por favor, verifica tu conexión.");
        } finally {
            setEnviando(false);
        }
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
