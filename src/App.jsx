import "./App.css";
import "./css/FormularioNombreApellido.css";
import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// Componentes
import FrmRegistrar from "./components/FrmRegistrar";
import FrmIniciosesion from "./components/FrmIniciosesion";
import Home from "./components/Home";
import Horarios from "./components/Horarios";
import Notificaciones from "./components/Notificaciones";
import ProgramarViaje from "./components/FrmProgViaje";
import FrmReclamos from "./components/FrmReclamos";
import CargarDatos from "./components/CargarDatos";
import AdminTrenes from "./components/AdminTrenes";


// PrivateRoute
function PrivateRoute({ isAuthenticated, children }) {
  return isAuthenticated ? children : <Navigate to="/frminiciosesion" replace />;
}
/**
 * @variable App
 * @returns 
 *       <Route
        path="/FrmIniciosesion"
        element={
          !isAuthenticated ? (
            <FrmIniciosesion onFrmIniciosesion={() => setIsAuthenticated(true)} />
          ) : (
            <Navigate to="/Home" replace />
        <Route
        path="/FrmRegistrar"
        element={
          !isAuthenticated ? (
            <FrmRegistrar onFrmRegistrar={() => setIsAuthenticated(true)} />
          ) : (
            <Navigate to="/Home" replace />
          )
        }/>
      <Route
        path="/Home"
        element={
          <PrivateRoute isAuthenticated={isAuthenticated}>
            <Home onCerrarSesion={() => setIsAuthenticated(false)} />
          </PrivateRoute>
        }/>
      <Route
        path="/Reclamos"
        element={
          <PrivateRoute isAuthenticated={isAuthenticated}>
            <FrmReclamos onCerrarSesion={() => setIsAuthenticated(false)} />
          </PrivateRoute>
        }/>
      <Route
        path="/Horarios"
        element={
          <PrivateRoute isAuthenticated={isAuthenticated}>
            <Horarios onCerrarSesion={() => setIsAuthenticated(false)} />
          </PrivateRoute>
        }/>
      <Route
          path="/Notificaciones"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Notificaciones onCerrarSesion={() => setIsAuthenticated(false)} />
            </PrivateRoute>
          }/>
 *    <Route
          path="/FrmSoporte"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <FrmSoporte onCerrarSesion={() => setIsAuthenticated(false)} />
            </PrivateRoute> }/>
    <Route
        path="/ProgramarViaje"
        element={
          <PrivateRoute isAuthenticated={isAuthenticated}>
            <ProgramarViaje onCerrarSesion={() => setIsAuthenticated(false)} />
          </PrivateRoute>
        }/>
    <Route
        path="/Notificaciones"
        element={
          <PrivateRoute isAuthenticated={isAuthenticated}>
            <Notificaciones onCerrarSesion={() => setIsAuthenticated(false)} />
          </PrivateRoute>
        }/>
    
 */

  function App() {
  // null = todavía cargando el estado de sesión
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsub = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user); // true si hay usuario, false si no
    });
    return () => unsub();
  }, []);

  // ⬇️ loader mientras Firebase responde
  if (isAuthenticated === null) {
    return <div style={{ padding: 20 }}>Cargando sesión…</div>;
  }

  // ⬇️ ahora sí devolvemos las rutas
  return (
    <Routes>
      {/* redirección por defecto */}
      <Route path="/" element={<Navigate to="/frminiciosesion" replace />} />

      {/* login / registro (sin proteger) */}
      <Route
        path="/frminiciosesion"
        element={
          !isAuthenticated ? (
            <FrmIniciosesion onFrmIniciosesion={() => setIsAuthenticated(true)} />
          ) : (
            <Navigate to="/home" replace />
          )
        }
      />
      <Route
        path="/frmregistrar"
        element={
          !isAuthenticated ? (
            <FrmRegistrar onFrmRegistrar={() => setIsAuthenticated(true)} />
          ) : (
            <Navigate to="/home" replace />
          )
        }
      />

      {/* pantallas protegidas */}
      <Route
        path="/home"
        element={
          <PrivateRoute isAuthenticated={isAuthenticated}>
            <Home onCerrarSesion={() => setIsAuthenticated(false)} />
          </PrivateRoute>
        }
      />
      <Route
        path="/reclamos"
        element={
          <PrivateRoute isAuthenticated={isAuthenticated}>
            <FrmReclamos onCerrarSesion={() => setIsAuthenticated(false)} />
          </PrivateRoute>
        }
      />
      <Route
        path="/horarios"
        element={
          <PrivateRoute isAuthenticated={isAuthenticated}>
            <Horarios onCerrarSesion={() => setIsAuthenticated(false)} />
          </PrivateRoute>
        }
      />
      <Route
        path="/programarviaje"
        element={
          <PrivateRoute isAuthenticated={isAuthenticated}>
            <ProgramarViaje onCerrarSesion={() => setIsAuthenticated(false)} />
          </PrivateRoute>
        }
      />
      <Route
        path="/notificaciones"
        element={
          <PrivateRoute isAuthenticated={isAuthenticated}>
            <Notificaciones onCerrarSesion={() => setIsAuthenticated(false)} />
          </PrivateRoute>
        }
      />

      {/* admin trenes (protegido) */}
      <Route
        path="/admin/trenes"
        element={
          <PrivateRoute isAuthenticated={isAuthenticated}>
            <AdminTrenes />
          </PrivateRoute>
        }
      />
      {/* opcional: compatibilidad con /horarios/admin */}
      <Route
        path="/horarios/admin"
        element={
          <PrivateRoute isAuthenticated={isAuthenticated}>
            <AdminTrenes />
          </PrivateRoute>
        }
      />

      {/* utilitario opcional */}
      <Route path="/cargardatos" element={<CargarDatos />} />

      {/* 404 */}
      <Route path="*" element={<h2>404 - Página no encontrada</h2>} />
    </Routes>
  );
}

export default App;
