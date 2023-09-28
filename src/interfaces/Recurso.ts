import { Edificio } from "./Edificio";
import { Modelo } from "./Modelo";
import { Salon } from "./Salon";

export interface Recurso  {
  id: string;
  nombre: string;
  descripcion?: string;
  modelo: Modelo | string;
  foto?: string;
  salon?: Salon | string;
  edificio?: Edificio | string;
}
