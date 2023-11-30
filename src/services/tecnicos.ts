import axios from '../config/axios';

import { AREA, RECOMENDACION, TECNICOS, endpoint } from '../constants/uris';
import { Usuario } from '../interfaces';

export const obtenerTecnicoRecomendado = (area: string) =>
  axios.get<never, Usuario>(endpoint(TECNICOS, RECOMENDACION, AREA, area));
