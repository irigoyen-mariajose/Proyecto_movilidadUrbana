import React, { useState } from "react";
import { crearTren } from "../services/trenes";

const init = { tren:"", origen:"", destino:"", estado:"A tiempo", activo:true, linea:"Roca" };

export default function AdminTrenes() {
  const [form, setForm] = useState(init);
  const [msg, setMsg] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      await crearTren(form);
      setMsg("✅ Tren creado");
      setForm(init);
    } catch (err) {
      setMsg("❌ " + (err.message || "Error al crear"));
    }
  };

  return (
    <div style={{maxWidth:720, margin:"32px auto", padding:"16px"}}>
      <h1>Admin – Agregar tren</h1>
      {msg && <p>{msg}</p>}

      <form onSubmit={onSubmit} style={{display:"grid", gap:12, gridTemplateColumns:"1fr 1fr"}}>
        <input placeholder="Tren (ej: Tren 220)" value={form.tren}
               onChange={e=>setForm({...form, tren:e.target.value})}/>
        <input placeholder="Origen" value={form.origen}
               onChange={e=>setForm({...form, origen:e.target.value})}/>
        <input placeholder="Destino" value={form.destino}
               onChange={e=>setForm({...form, destino:e.target.value})}/>
        <select value={form.estado} onChange={e=>setForm({...form, estado:e.target.value})}>
          <option>A tiempo</option>
          <option>Retrasado 5 min</option>
          <option>Retrasado 10 min</option>
          <option>Cancelado</option>
        </select>
        <input placeholder="Línea" value={form.linea}
               onChange={e=>setForm({...form, linea:e.target.value})}/>
        <label style={{display:"flex", alignItems:"center", gap:8}}>
          <input type="checkbox" checked={form.activo}
                 onChange={e=>setForm({...form, activo:e.target.checked})}/>
          Activo
        </label>

        <div style={{gridColumn:"1 / -1"}}>
          <button type="submit">Crear tren</button>
        </div>
      </form>

      <p style={{marginTop:12, color:"#666"}}>Al crear, aparecerá al instante en “Horarios”.</p>
    </div>
  );
}
