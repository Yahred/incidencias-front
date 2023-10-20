import axios from '../config/axios';
import { CONFIGURACIONES, REPORTES, param } from '@constants/uris';
import {
  IFiltrosConfiguracion,
  ReporteConfiguracion,
} from '@interfaces/Reportes';

export const obtenerReporteConfiguraciones = (filtros: IFiltrosConfiguracion, pagina: number, itemsPorPagina: number) =>
  axios.get<unknown, ReporteConfiguracion>(param(REPORTES, CONFIGURACIONES), {
    params: {
      ...filtros,
      pagina,
      itemsPorPagina,
    },
  });
