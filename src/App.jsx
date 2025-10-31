import "./App.css";
import "./css/FormularioNombreApellido.css";
import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Componentes
import FrmRegistrar from "./components/FrmRegistrar";
import FrmIniciosesion from "./components/FrmIniciosesion";
import Home from "./components/Home";
import Horarios from "./components/Horarios";
import Notificaciones from "./components/Notificaciones";
import ProgramarViaje from "./components/FrmProgViaje";
import FrmReclamosdos from "./components/FrmReclamosdos";
import CargarDatos from "./components/CargarDatos";
import FrmSoporte from "./components/FrmSoporte";

// PrivateRoute
function PrivateRoute({ isAuthenticated, children }) {
  return isAuthenticated ? children : <Navigate to="/FrmIniciosesion" replace />;
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (

    <Routes>
    <Route
      path="/CargarDatos"
      element={
        
          <CargarDatos/>

      }
    />


      <Route path="/" element={<Navigate to="/FrmIniciosesion" replace />} />

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
            <FrmReclamosdos onCerrarSesion={() => setIsAuthenticated(false)} />
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


        {/* Notificaciones */}
        <Route
          path="/Notificaciones"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Notificaciones onCerrarSesion={() => setIsAuthenticated(false)} />
            </PrivateRoute>
          }
        />
        <Route
          path="/FrmSoporte"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <FrmSoporte onCerrarSesion={() => setIsAuthenticated(false)} />
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
  );
}

export default App;
