import axios from "../config/axios";
import { AREAS, obtenerPaginado, param } from "../constants/uris";
import { Edificio } from "../interfaces/Edificio";
import { Paginado } from "../interfaces/Paginado";

export const obtenerAreasPaginado = (q: string, pagina?: string) => axios.get<unknown, Paginado<Edificio>>(obtenerPaginado(AREAS), {
  params: {
    q,
    pagina
  }
});

export const obtenerAreas = () => axios.get<unknown, Edificio[]>(AREAS)

export const registrarArea = (edificio: Edificio) => axios.post(AREAS, edificio);

export const eliminarArea = (id: string) => axios.delete(param(AREAS, id));
