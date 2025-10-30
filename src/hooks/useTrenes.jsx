import React, { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../../firebase";
/**
 * @variable Trenes
 * @returns
 *     <div>
      <h1>Colección Trenes</h1>
      <p>Se cargaron 3 documentos en Firestore.</p>
      <ul>
        <li><b>INSERT</b> → addDoc</li>
        <li><b>SELECT</b> → getDocs</li>
        <li><b>UPDATE</b> → updateDoc</li>
        <li><b>DELETE</b> → deleteDoc</li>
        <li><b>ORDER BY</b> → query + orderBy</li>
      </ul>
    </div>
 */
function Trenes() {
  const [trenes, setTrenes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  /**
   * useEffect cargarTrenes
   */
    const cargarTrenes = async () => {
    setCargando(true);
    setError("");
    try {
      const trenRef = collection(db, "Trenes");
      const q = query(trenRef, orderBy("tren", "asc")); 
      const snap = await getDocs(q);
      const lista = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setTrenes(lista);
    } catch (e) {
      console.error("Error leyendo Trenes:", e);
      setError("No se pudieron cargar los trenes.");
    } finally {
      setCargando(false);
    }
  };

    /**
     * @variable cargarTrenes
     */
    
       useEffect(() => { cargarTrenes(); }, []);


  if (cargando) return <p>Cargando trenes…</p>;

  if (error)
    return (
      <div>
        <p>{error}</p>
        <button onClick={cargarTrenes}>Reintentar</button>
      </div>
    );

  if (!trenes.length)
    return (
      <div>
        <p>No hay trenes cargados.</p>
        <button onClick={cargarTrenes}>Recargar</button>
      </div>
    );

 
  return (
    <div>
      <h1>Trenes</h1>
      <button onClick={cargarTrenes} style={{ marginBottom: 8 }}>
        Recargar
      </button>
      <ul>
        {trenes.map((t) => (
          <li key={t.id}>{t.tren || t.numero || "Sin nombre"}</li>
        ))}
      </ul>
    </div>
  );
}

export default Trenes;
