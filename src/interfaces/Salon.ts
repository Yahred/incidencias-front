import { Edificio } from './Edificio';

export interface Salon {
  id: string;
  nombre: string;
  descripcion?: string;
  edificio?: string | Edificio;
}
