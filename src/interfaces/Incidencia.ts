import { Departamento } from '.';
import { Edificio } from './Edificio';
import { Estatus } from './Estatus';
import { Recurso } from './Recurso';
import { Salon } from './Salon';
import { Servicio } from './Servicio';
import { Usuario } from './Usuario';

export interface Incidencia {
  id?: string;
  folio: string;
  titulo: string;
  departamento: Departamento;
  descripcion: string;
  diagnostico: string;
  servicio: Servicio | string;
  edificio: Edificio;
  salon: Salon;
  recurso: Recurso;
  evidencias?: (string | File)[];
  atiende?: Usuario;
  estatus: Estatus;
  usuarioCreacion: Usuario;
}
