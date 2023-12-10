import { PrioridadesEnum } from "../constants/prioridades";

export interface Prioridad {
  id: PrioridadesEnum
  nombre: string;
  color: string;
  descripcion: string;
  duracion: number;
}
