import React, { useState, useEffect, useCallback } from "react";
import { collection, getDocs, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebaseConfig";
import Navbar from "./NavbarBARRA";
import "../css/Horarios.css";
import { useNavigate } from "react-router-dom";

const Horarios = ({ onCerrarSesion }) => {
  const navigate = useNavigate();

  // Estado búsqueda y paradas
  const [searchTerm, setSearchTerm] = useState("");
  const [paradas, setParadas] = useState([]);
  const [resultadosBusqueda, setResultadosBusqueda] = useState([]);
  const [buscando, setBuscando] = useState(false);

  // Estado trenes (tiempo real)
  const [trenes, setTrenes] = useState([]);
  const [cargandoTrenes, setCargandoTrenes] = useState(true);
  const [errorTrenes, setErrorTrenes] = useState("");

  // 1) Cargar PARADAS una vez (lectura simple)
  useEffect(() => {
    const cargarParadas = async () => {
      try {
        const col = collection(db, "Paradas");
        const snap = await getDocs(col);
        const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        setParadas(data);
      } catch (err) {
        console.error("Error al cargar paradas:", err);
      }
    };
    cargarParadas();
  }, []);

  // 2) Suscripción en tiempo real a TRENES
  useEffect(() => {
    const q = query(collection(db, "Trenes"), orderBy("tren", "asc")); // o "numero"
    const off = onSnapshot(
      q,
      (snap) => {
        const rows = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        setTrenes(rows);
        setCargandoTrenes(false);
      },
      (e) => {
        console.error("Error Trenes:", e);
        setErrorTrenes("No se pudo cargar el estado de los trenes.");
        setCargandoTrenes(false);
      }
    );
    return () => off();
  }, []);

  // 3) Helper para badge según estado
  function estadoToBadge(estado = "") {
    const txt = estado.toLowerCase();
    if (txt.includes("cancel")) return "badge-red";
    if (txt.includes("retrasa") || txt.includes("demora")) return "badge-yellow";
    return "badge-green"; // A tiempo / default
  }

  // 4) Handlers
  const handleProgramar = (e) => {
    e.preventDefault();
    navigate("/ProgramarViaje");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    realizarBusqueda();
  };

  // 5) Búsqueda de paradas
  const realizarBusqueda = useCallback(() => {
    if (searchTerm.trim() === "") {
      setResultadosBusqueda([]);
      setBuscando(false);
      return;
    }
    setBuscando(true);
    const termino = searchTerm.toLowerCase().trim();
    const resultados = paradas.filter((p) =>
      (p.nombre || "").toLowerCase().includes(termino)
    );
    setResultadosBusqueda(resultados);
  }, [searchTerm, paradas]);

  useEffect(() => {
    realizarBusqueda();
  }, [realizarBusqueda]);

  const abrirGoogleMaps = (ubicacion) => {
    if (!ubicacion) return;
    window.open(ubicacion, "_blank");
  };

  // Estilos inline solo para resultados de búsqueda
  const searchResultsStyles = {
    container: { marginTop: "20px" },
    title: { marginBottom: "15px", fontSize: "18px", color: "#333" },
    grid: {
      display: "grid",
      gap: "15px",
      gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    },
    card: {
      backgroundColor: "#f8f9fa",
      padding: "20px",
      borderRadius: "10px",
      border: "2px solid #e0e0e0",
      display: "flex",
      flexDirection: "column",
      gap: "12px",
      transition: "transform 0.2s, box-shadow 0.2s",
    },
    stationName: {
      fontSize: "18px",
      fontWeight: "bold",
      margin: "0 0 8px 0",
      color: "#333",
    },
    stationDesc: { fontSize: "14px", color: "#666", margin: 0, lineHeight: "1.5" },
    inactiveLabel: { fontSize: "12px", color: "#e74c3c", marginLeft: "8px", fontWeight: "normal" },
    mapButton: {
      backgroundColor: "#4285f4",
      color: "white",
      padding: "10px 16px",
      borderRadius: "6px",
      border: "none",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "500",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "6px",
      transition: "background-color 0.2s",
    },
  };

  return (
    <div className="horarios-page" style={{ backgroundColor: "#feeb9e", minHeight: "100vh", margin: 0, padding: 0 }}>
      <Navbar onCerrarSesion={onCerrarSesion} />
      <div className="horarios-container">
        <header className="horarios-header">
          <h1>Consulta el estado en tiempo real de los trenes y planifica tus viajes con facilidad.</h1>
        </header>

        {/* BUSCADOR DE PARADAS */}
        <section className="search-section">
          <h2 className="results-title">Buscar estación</h2>
          <form className="search-form home-search-form" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Buscar estación (ej: Plottier, Neuquén, ETON...)"
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="programar-button" type="button" onClick={handleProgramar}>
              <svg className="calendar-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M8 2V5M16 2V5M3 9H21M5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Programar viaje
            </button>
          </form>

          {/* Resultados de búsqueda */}
          {buscando && searchTerm && (
            <div style={searchResultsStyles.container}>
              <h3 style={searchResultsStyles.title}>
                {resultadosBusqueda.length > 0
                  ? `Encontradas ${resultadosBusqueda.length} estación(es)`
                  : "No se encontraron estaciones"}
              </h3>
              {resultadosBusqueda.length > 0 && (
                <div style={searchResultsStyles.grid}>
                  {resultadosBusqueda.map((parada) => (
                    <div
                      key={parada.id}
                      style={searchResultsStyles.card}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-2px)";
                        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      <div>
                        <p style={searchResultsStyles.stationName}>
                          {parada.nombre}
                          {!parada.activa && (
                            <span style={searchResultsStyles.inactiveLabel}>(Sin servicio)</span>
                          )}
                        </p>
                        {parada.descripcion && (
                          <p style={searchResultsStyles.stationDesc}>{parada.descripcion}</p>
                        )}
                      </div>
                      <button
                        onClick={() => abrirGoogleMaps(parada.ubicacion)}
                        style={searchResultsStyles.mapButton}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#357ae8")}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#4285f4")}
                      >
                        📍 Ver en Google Maps
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </section>

        {/* ESTADO DEL TREN (desde Firestore) */}
        <section className="results-section">
          <h2 className="results-title">Estado del tren</h2>

          {cargandoTrenes && <p>Cargando estado de trenes…</p>}
          {errorTrenes && <p>{errorTrenes}</p>}
          {!cargandoTrenes && !errorTrenes && (
            <div className="results-grid">
              {trenes.length === 0 ? (
                <p>No hay trenes cargados.</p>
              ) : (
                trenes.map((t) => (
                  <div className="result-card" key={t.id}>
                    <div>
                      <p className="font-semibold">{t.tren || `Tren ${t.numero || "—"}`}</p>
                      <p className="text-gray-500">
                        {(t.origen || "").trim()} {t.origen || t.destino ? "→" : ""} {(t.destino || "").trim()}
                      </p>
                    </div>
                    <span className={`badge ${estadoToBadge(t.estado)}`}>{t.estado || "A tiempo"}</span>
                  </div>
                ))
              )}
            </div>
          )}
        </section>
      </div>

      <div className="boleteria-section">
        <h2 className="boleteria-title">Horario Boletería Plottier / Neuquén</h2>
        <p className="boleteria-text">Lunes a viernes de 06:00 a 22:00 hs.</p>
        <p className="boleteria-text">Adquirí tu boleto en las boleterías habilitadas.</p>
      </div>
    </div>
  );
};

export default Horarios;
