
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
const adminRef = collection(db, "admins");

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

export function useAdmins() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    fetchAdmins();
  }, []);

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
