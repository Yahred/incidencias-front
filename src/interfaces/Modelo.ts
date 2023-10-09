import { Area } from "./Area";
import { Categoria } from "./Categoria";

export interface CaracteristicaModelo {
  nombre: string;
  obligatoria: boolean;
  valor?: string;
  unidad?: string;
  modelo?: Modelo
}

export interface Modelo {
  nombre: string;
  descripcion?: string;
  categoria: Categoria | string,
  area?: Area | string,
  caracteristicas?: CaracteristicaModelo[]
  imagen?: string;
}
