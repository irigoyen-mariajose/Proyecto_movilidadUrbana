
import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  onSnapshot,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebase"; 
/**
 * @variable collection
 */
const adminRef = collection(db, "admins");

/**
 * 
 * @param {*} param0 
 * @returns 
 * catch (error) {
    console.error("Error al crear Admin:", error);
    return false;
 */
export const crearAdmin = async ({ nombre, apellido, dni, telefono, direccion, rol }) => {
  try {
    const docRef = await addDoc(adminRef, {
      nombre,
      apellido,
      dni,
      telefono,
      direccion,
      rol,
    });
    console.log("Admin creado con ID:", docRef.id);
    return true;
  } catch (error) {
    console.error("Error al crear Admin:", error);
    return false;
  }
};
/**
 * 
 * @param {*} id 
 * @param {*} cb 
 * @param {*} errCb 
 * @returns 
 * ref,
    (d) => {
      cb(d.exists() ? { id: d.id, ...d.data() } : null);
    },
    errCb
 */
export const listenById = (id, cb, errCb) => {
  const ref = doc(db, "admins", id);
  return onSnapshot(
    ref,
    (d) => {
      cb(d.exists() ? { id: d.id, ...d.data() } : null);
    },
    errCb
  );
};
/**
 * @param {*} @param
 * @returns 
 * { admins, loading, fetchAdmins, updateAdmin, deleteAdmin }
 */
export function useAdmins() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);

  /**
   * @variable fetchAdmins
   */
  const fetchAdmins = async () => {
    setLoading(true);
    try {
      const snapshot = await getDocs(adminRef);
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setAdmins(data);
    } catch (error) {
      console.error(" Error al obtener admins:", error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * useEffect ()=> fetchAdmins
   */
  useEffect(() => {
    fetchAdmins();
  }, []);

  /**
   * 
   * @param {*} id 
   * @param {*} newData 
   */
  const updateAdmin = async (id, newData) => {
    try {
      const ref = doc(db, "admins", id);
      await updateDoc(ref, newData);
      console.log(" Admin actualizado");
      fetchAdmins();
    } catch (error) {
      console.error(" Error al actualizar Admin:", error);
    }
  };

  /**
   * 
   * @param {*} id 
   */
  const deleteAdmin = async (id) => {
    try {
      const ref = doc(db, "admins", id);
      await deleteDoc(ref);
      console.log(" Admin eliminado");
      fetchAdmins();
    } catch (error) {
      console.error(" Error al eliminar Admin:", error);
    }
  };

  return { admins, loading, fetchAdmins, updateAdmin, deleteAdmin };
}
