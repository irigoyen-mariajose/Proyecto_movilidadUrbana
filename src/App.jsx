import logo from "./logo.svg";
import "./App.css";
import "./css/FormularioNombreApellido.css";
import FrmRegistrar from "./components/FrmRegistrar";
import Home from "./components/Home";
import React from "react";
import Search from "./components/Search";
import Navbar from "./components/NavbarBARRA";
import FrmIniciosesion from "./components/FrmIniciosesion";
import FrmReclamos from "./components/FrmReclamos";
import Horarios from "./components/Horarios";
import Notificaciones from "./components/Notificaciones";
import { Routes, Route, Navigate, Link } from "react-router-dom";
import { useState } from "react";



function PrivateRoute({ isAuthenticated, children }) {
  return isAuthenticated ? children : <Navigate to="/FrmIniciosesion" replace />;

}

function App() {
   const [isAuthenticated, setIsAuthenticated] = useState(false);
    
  return (
      <div>

      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/Home" replace />
            ) : (
              <Navigate to="/FrmIniciosesion" replace />
            )
          }
        />


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

        <Route
          path="/Home"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Home onCerrarSesion={() => setIsAuthenticated(false)} />
            </PrivateRoute>
          }
        />

        <Route
          path="/Horarios"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Horarios onCerrarSesion={() => setIsAuthenticated(false)} />
            </PrivateRoute>
          }
        />
        
        <Route
          path="/Notificaciones"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Notificaciones onCerrarSesion={() => setIsAuthenticated(false)} />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<h2>404 - Página no encontrada</h2>} />
      </Routes>
    </div>
  );
}
export default App;
