import { Area } from './Area';

export interface Caracteristica {
  nombre: string;
  unidad?: string;
  requerida: boolean;
}

export interface Categoria {
  nombre: string;
  descripcion?: string;
  area: string | Area;
  caracteristicas: Caracteristica[];
}
