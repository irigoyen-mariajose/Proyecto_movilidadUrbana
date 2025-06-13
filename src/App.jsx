import logo from "./logo.svg";
import "./css/FormularioNombreApellido.css";
import FrmRegistar from "./components/FrmRegistrar";
import React from 'react';
import Search from './components/Search'; 
import initialDetails from './components/initialDetails';

function App() {
  return (
    <div className="tc bg-green ma0 pa4 min-vh-100">
      <Search details={initialDetails} />
      <FrmRegistar />
    </div>
  );
}
export default App;
