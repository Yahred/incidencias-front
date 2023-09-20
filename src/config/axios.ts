import ax from 'axios';

import store from '../stores/store';

const { VITE_API_BASE_URL } = import.meta.env;

const baseURL = VITE_API_BASE_URL as string;

const axios = ax.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

axios.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  req.headers.set('token', token);
  store.getState().setLoadingOn();
  return req;
});

axios.interceptors.response.use(({ data }) => {
  store.getState().setLoadingOff();
  return data;
}, ({ resp: { status }, ...error }) => {
  store.getState().setLoadingOff();
  throw new Error(error);
});

export default axios;
