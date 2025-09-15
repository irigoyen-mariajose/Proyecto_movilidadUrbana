
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig"; // Ajusta si está en otra ruta

const horarios = [
  {
    estacion: "Retiro",
    destino: "Tigre",
    horaSalida: "06:00",
    horaLlegada: "06:55",
  },
  {
    estacion: "Retiro",
    destino: "Tigre",
    horaSalida: "07:00",
    horaLlegada: "07:55",
  },
  {
    estacion: "Retiro",
    destino: "Tigre",
    horaSalida: "08:00",
    horaLlegada: "08:55",
  }
];
  export async function cargarHorarios() {
  try {
    for (const h of horarios) {
      await addDoc(collection(db, "horarios"), h);
      console.log(`Horario cargado: ${h.estacion} → ${h.destino} (${h.horaSalida})`);
    }
    console.log("Todos los horarios fueron cargados correctamente.");
  } catch (error) {
    console.error("Error al cargar horarios:", error);
  }
}
;