import { Link } from "react-router-dom";
import Navbar from "./NavbarBARRA";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "../css/FrmIniciosesion.css";
import FrmRegistar from "./FrmRegistrar";

function Inicio (){
    return (
    <div ClaseHome="Home" >
        <h1>Viaja con Andensur por todo el valle de Neuquen</h1>
            <div>
                <link to="/FrmRegistrar"> Registrarme →</link>
                <link to="/FrmInicioSesion">Iniciar sesion→</link>
            </div>
    </div>
);
}

export default Inicio;