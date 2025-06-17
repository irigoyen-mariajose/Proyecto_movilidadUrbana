import logo from "./logo.svg";
import "./css/FormularioNombreApellido.css";
import FrmRegistrar from "./components/FrmRegistrar";
import React from "react";
import Search from "./components/Search";
import initialDetails from "./components/initialDetails";
import Navbar from "./components/NavbarBARRA";
import FrmIniciosesion from "./components/FrmIniciosesion";


function App() {
  return (
    <div className="tc bg-green ma0 pa4 min-vh-100">
      <Navbar />
      <Search details={initialDetails} />
      <div className="contenedor-formularios">
      <FrmRegistrar />
      <FrmIniciosesion />
      </div>    
    </div>
  );
}
export default App;
