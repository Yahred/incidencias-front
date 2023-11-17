import axios from '../config/axios';
import { CONFIGURACIONES, REPORTES, endpoint } from '@constants/uris';
import {
  IFiltrosConfiguracion,
  ReporteConfiguracion,
} from '@interfaces/Reportes';

export const obtenerReporteConfiguraciones = (filtros: IFiltrosConfiguracion, pagina: number, itemsPorPagina: number) =>
  axios.get<unknown, ReporteConfiguracion>(endpoint(REPORTES, CONFIGURACIONES), {
    params: {
      ...filtros,
      pagina,
      itemsPorPagina,
    },
  });
