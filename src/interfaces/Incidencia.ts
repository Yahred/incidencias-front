import { Edificio } from './Edificio';
import { Recurso } from './Recurso';
import { Salon } from './Salon';
import { Usuario } from './Usuario';

export interface Incidencia {
  titulo: string;
  descripcion: string;
  edificio: Edificio | string;
  salon: Salon | string;
  recurso: Recurso | string;
  evidencias?: string[];
  atiende?: Usuario | string;
}
