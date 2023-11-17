import axios from "../config/axios";
import { EDIFICIOS, obtenerPaginado, endpoint } from "../constants/uris";
import { Edificio } from "../interfaces/Edificio";
import { Paginado } from "../interfaces/Paginado";

export const obtenerEdificiosPaginado = (q: string, pagina?: string) => axios.get<unknown, Paginado<Edificio>>(obtenerPaginado(EDIFICIOS), {
  params: {
    q,
    pagina
  }
});

export const obtenerEdicios = (departamento?: string) => axios.get<unknown, Edificio[]>(EDIFICIOS, {
  params: { departamento }
})

export const registrarEdificio = (edificio: Edificio) => axios.post(EDIFICIOS, edificio);

export const eliminarEdificio = (id: string) => axios.delete(endpoint(EDIFICIOS, id));
