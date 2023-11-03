import { Categoria } from '.';

export interface Servicio {
  id?: string;
  nombre: string;
  descripcion: string;
  duracion: number;
  categoria: Categoria;
}
