import axios from "../../../config/axios";
import { EDIFICIOS, obtenerPaginado } from "../../../constants/uris";
import { Edificio } from "../../../interfaces/Edificio";
import { Paginado } from "../../../interfaces/Paginado";

export const obtenerEdificios = (q: string, pagina?: string) => axios.get<unknown, Paginado<Edificio>>(obtenerPaginado(EDIFICIOS), {
  params: {
    q,
    pagina
  }
})

export const registrarEdificio = (edificio: Edificio) => axios.post(EDIFICIOS, edificio);
