import ax from 'axios';
import { toast } from 'react-toastify';

import store from '../stores/store';
import obtenerMensajeError from '../utils/functions/obtenerMensajesError';
import { MAP_ESTATUS_MENSAJE, MensajesToast } from '../constants/general';

const { VITE_API_BASE_URL } = import.meta.env;

const baseURL = VITE_API_BASE_URL as string;

const axios = ax.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

axios.interceptors.request.use((req) => {
  const token = JSON.parse(
    localStorage.getItem('token')! || sessionStorage.getItem('token')!
  );
  req.headers.set('token', token);

  if (req.method === 'get') {
    store.getState().setLoadingOn();
  } else if (['post', 'put', 'delete'].includes(req.method!)) {
    store.getState().setMutatingOn();
  }
  return req;
});

axios.interceptors.response.use(
  ({ data, status }) => {
    const mensaje = MAP_ESTATUS_MENSAJE[status];

    if (mensaje) {
      toast.success(mensaje);
    }

    store.getState().setLoadingOff();
    store.getState().setMutatingOff();
    return data;
  },
  (error) => {
    store.getState().setLoadingOff();
    store.getState().setMutatingOff();
    const { data } = error.response;
    let msj = ''
    if (typeof data === 'string') {
      msj = data;
    }
    const mensaje = obtenerMensajeError(error);
    toast.error(mensaje || msj|| MensajesToast.ERROR);
    throw new Error(error);
  }
);

export default axios;
