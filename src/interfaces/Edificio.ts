import { Departamento } from "./Departamento";

export interface Edificio {
  id: string;
  nombre: string;
  descripcion: string;
  departamento: Departamento;
}
