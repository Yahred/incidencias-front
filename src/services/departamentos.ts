import axios from '../config/axios';
import { DEPARTAMENTOS, obtenerPaginado, param } from '../constants/uris';
import { Departamento } from '../interfaces/Departamento';
import { Paginado } from '../interfaces/Paginado';

export const obtenerDepartamentosPaginado = (q: string, pagina?: string) =>
  axios.get<unknown, Paginado<Departamento>>(obtenerPaginado(DEPARTAMENTOS), {
    params: {
      q,
      pagina,
    },
  });

export const registrarDepartamento = (
  departamento: Departamento,
  id?: string
) =>
  id
    ? axios.put(param(DEPARTAMENTOS, id!), departamento)
    : axios.post(DEPARTAMENTOS, departamento);

export const obtenerDepartamentos = () =>
  axios.get<unknown, Departamento[]>(DEPARTAMENTOS);

export const obtenerDepartamentoPorId = (id: string) =>
  axios.get<never, Departamento>(param(DEPARTAMENTOS, id));

export const eliminarDepartamento = (id: string) =>
  axios.delete(param(DEPARTAMENTOS, id));
