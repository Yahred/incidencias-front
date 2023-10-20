import { Recurso } from '.';

export interface IFiltrosConfiguracion {
  edificio?: string;
  departamento?: string;
  modelo?: string;
  categoria?: string;
}

export interface ReporteConfiguracion {
  numRecursos: number;
  numIncidencias: number;
  recursos: Recurso[];
  totalPages: number;
}
