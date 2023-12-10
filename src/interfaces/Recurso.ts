import { Edificio } from "./Edificio";
import { Modelo } from "./Modelo";
import { Salon } from "./Salon";

export interface Recurso  {
  id: string;
  folio: string;
  nombre: string;
  descripcion?: string;
  modelo: Modelo | string;
  foto?: string;
  salon?: Salon | string;
  costo: number;
  edificio?: Edificio | string;
  area?: string;
}
