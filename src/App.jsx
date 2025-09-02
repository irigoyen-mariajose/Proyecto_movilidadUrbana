import "./App.css";
import "./css/FormularioNombreApellido.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Componentes
import FrmRegistrar from "./components/FrmRegistrar";
import FrmIniciosesion from "./components/FrmIniciosesion";
import FrmHome from "./components/FrmHome";
import Home from "./components/Home";
import Horarios from "./components/Horarios";
import Notificaciones from "./components/Notificaciones";
import ProgramarViaje from "./components/FrmProgViaje";
import FrmReclamos from "./components/FrmReclamos";

// PrivateRoute
function PrivateRoute({ isAuthenticated, children }) {
  return isAuthenticated ? children : <Navigate to="/FrmIniciosesion" replace />;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Routes>
        {/* Página inicial (landing con botones) */}
        <Route path="/" element={<FrmHome />} />

        {/* Login */}
        <Route
          path="/FrmIniciosesion"
          element={
            !isAuthenticated ? (
              <FrmIniciosesion onFrmIniciosesion={() => setIsAuthenticated(true)} />
            ) : (
              <Navigate to="/Home" replace />
            )
          }
        />

        {/* Registro */}
        <Route
          path="/FrmRegistrar"
          element={
            !isAuthenticated ? (
              <FrmRegistrar onFrmRegistrar={() => setIsAuthenticated(true)} />
            ) : (
              <Navigate to="/Home" replace />
            )
          }
        />

        {/* Home protegido */}
        <Route
          path="/Home"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Home onCerrarSesion={() => setIsAuthenticated(false)} />
            </PrivateRoute>
          }
        />

        {/* Reclamos */}
        <Route
          path="/Reclamos"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <FrmReclamos onCerrarSesion={() => setIsAuthenticated(false)} />
            </PrivateRoute>
          }
        />

        {/* Horarios */}
        <Route
          path="/Horarios"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Horarios onCerrarSesion={() => setIsAuthenticated(false)} />
            </PrivateRoute>
          }
        />

        {/* Programar Viaje */}
        <Route
          path="/ProgramarViaje"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <ProgramarViaje onCerrarSesion={() => setIsAuthenticated(false)} />
            </PrivateRoute>
          }
        />

        {/* Notificaciones */}
        <Route
          path="/Notificaciones"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Notificaciones onCerrarSesion={() => setIsAuthenticated(false)} />
            </PrivateRoute>
          }
        />

        {/* Página no encontrada */}
        <Route path="*" element={<h2>404 - Página no encontrada</h2>} />
      </Routes>
    </Router>
  );
}

export default App;
