import { Incidencia, Recurso } from '.';
import { Estatus } from './Estatus';

export interface CambioRecurso {
  id?: string;
  recurso: Recurso | string;
  incidencia: Incidencia | string;
  estatus: Estatus | string;
  motivo: string;
  fechaCreacion: string;
}
