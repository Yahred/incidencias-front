import { Area } from './Area';

export interface Caracteristica {
  nombre: string;
  descripcion?: string;
  magnitud?: string;
  tipo?: 'Number' | 'String' | 'ObjectId';
}

export interface Categoria {
  nombre: string;
  descripcion?: string;
  area: string | Area;
  caracteristicas: Caracteristica[];
}
