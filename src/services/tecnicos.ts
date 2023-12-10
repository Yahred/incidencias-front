import axios from '../config/axios';

import { AREA, RECOMENDACION, TECNICOS, endpoint } from '../constants/uris';
import { Usuario } from '../interfaces';

export const obtenerTecnicoRecomendado = (area: string) =>
  axios.get<never, Usuario | null>(endpoint(TECNICOS, RECOMENDACION, AREA, area));
