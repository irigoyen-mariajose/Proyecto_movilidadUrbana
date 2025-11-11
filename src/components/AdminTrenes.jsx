import React, { useEffect, useState } from "react";
import "../css/Admin.css";


import {
  crearTren,
  suscribirTrenes,
  actualizarTren,
  borrarTren,
} from "../services/trenes";

/**
 * @variable Init
 */
const init = {
  tren: "",
  origen: "",
  destino: "",
  estado: "A tiempo",
  activo: true,
  linea: "Roca",
};

/**
 * 
 * @param {*} param0
 * @returns 
 * div className="admin-container">
 * 
 */
export default function AdminTrenes() {
  const [form, setForm] = useState(init);
  const [msg, setMsg] = useState("");
  const [trenes, setTrenes] = useState([]);
  const [editId, setEditId] = useState(null);

  /**
   * useEffect () => navigate
   */
  useEffect(() => {
    const unsub = suscribirTrenes(setTrenes, (e) =>
      setMsg("❌ " + (e.message || "Error leyendo trenes"))
    );
    return () => unsub();
  }, []);
/**
 * 
 * @param {*} e 
 */
  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      if (editId) {
        await actualizarTren(editId, form);
        setMsg("✅ Cambios guardados");
      } else {
        await crearTren(form);
        setMsg("✅ Tren creado");
      }
      setForm(init);
      setEditId(null);
    } catch (err) {
      setMsg("❌ " + (err.message || "Error al guardar"));
    }
  };
/**
 * 
 * @param {*} t 
 */
  const startEdit = (t) => {
    setForm({
      tren: t.tren || "",
      origen: t.origen || "",
      destino: t.destino || "",
      estado: t.estado || "A tiempo",
      activo: t.activo !== false,
      linea: t.linea || "Roca",
    });
    setEditId(t.id);
    setMsg("");
  };

  /**
   * @variable cancelEdit
   */
  const cancelEdit = () => {
    setEditId(null);
    setForm(init);
  };

  /**
   * 
   * @param {*} id 
   * @returns 
   */
  const remove = async (id) => {
    if (!window.confirm("¿Borrar tren?")) return;
    try {
      await borrarTren(id);
      setMsg("🗑️ Tren eliminado");
    } catch (err) {
      setMsg("❌ " + (err.message || "No se pudo borrar"));
    }
  };

  return (
    <div className="admin-container">

      <h1>Administrador – Trenes</h1>
      {msg && <p>{msg}</p>}

      
      <form
        onSubmit={onSubmit}
        style={{ display: "grid", gap: 12, gridTemplateColumns: "1fr 1fr" }}
      >
        <input
          placeholder="Tren (ej: Tren 220)"
          value={form.tren}
          onChange={(e) => setForm({ ...form, tren: e.target.value })}
        />
        <input
          placeholder="Origen"
          value={form.origen}
          onChange={(e) => setForm({ ...form, origen: e.target.value })}
        />
        <input
          placeholder="Destino"
          value={form.destino}
          onChange={(e) => setForm({ ...form, destino: e.target.value })}
        />
        <select
          value={form.estado}
          onChange={(e) => setForm({ ...form, estado: e.target.value })}
        >
          <option>A tiempo</option>
          <option>Retrasado 5 min</option>
          <option>Retrasado 10 min</option>
          <option>Cancelado</option>
        </select>
        <input
          placeholder="Línea"
          value={form.linea}
          onChange={(e) => setForm({ ...form, linea: e.target.value })}
        />
        <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <input
            type="checkbox"
            checked={form.activo}
            onChange={(e) => setForm({ ...form, activo: e.target.checked })}
          />
          Activo
        </label>

        <div style={{ gridColumn: "1 / -1", display: "flex", gap: 8 }}>
          <button type="submit">
            {editId ? "Guardar cambios" : "Crear tren"}
          </button>
          {editId && (
            <button type="button" onClick={cancelEdit}>
              Cancelar
            </button>
          )}
        </div>
      </form>

      <hr style={{ margin: "24px 0" }} />

      
      <ul style={{ listStyle: "none", padding: 0 }}>
        {trenes.map((t) => (
          <li
            key={t.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px 0",
              borderBottom: "1px solid #eee",
            }}
          >
            <div>
              <b>{t.tren}</b> — {t.origen} → {t.destino} — {t.estado}{" "}
              {t.activo === false ? "(inactivo)" : ""}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => startEdit(t)}>Editar</button>
              <button onClick={() => remove(t.id)}>Borrar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
