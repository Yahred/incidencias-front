import { Categoria } from '.';
import { Servicio } from './Servicio';

export interface ErrorConocido {
  id?: string;
  titulo: string;
  descripcion: string;
  servicios: Servicio[] | string[];
  categoria: Categoria | string;
}
