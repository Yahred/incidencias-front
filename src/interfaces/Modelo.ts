import { Categoria } from "./Categoria";

export interface ICaracteristicaModelo {
  nombre: string;
  obligatoria: boolean;
  valor?: string;
  unidad?: string;
  modelo?: IModelo
}

export interface IModelo {
  nombre: string;
  descripcion?: string;
  categoria: Categoria,
  caracteristicas?: ICaracteristicaModelo[]
  foto?: string;
}
