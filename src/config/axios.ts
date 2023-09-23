import ax from 'axios';
import { toast } from 'react-toastify';

import store from '../stores/store';

const { VITE_API_BASE_URL } = import.meta.env;

const baseURL = VITE_API_BASE_URL as string;

const axios = ax.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
})

axios.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  req.headers.set('token', token);
  store.getState().setLoadingOn();
  return req;
});

axios.interceptors.response.use(({ data, status }) => {
  if (status === 201) {
    toast('Recursos creados correctamente')
  }
  store.getState().setLoadingOff();
  return data;
}, (error) => {
  store.getState().setLoadingOff();
  throw new Error(error);
});

export default axios;
