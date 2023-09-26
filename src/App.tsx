import { useCallback, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import Layout from './layout';
import autenticarUsuario from './utils/functions/autenticarUsuario';
import { useMutation } from 'react-query';
import axios from './config/axios';
import { LOGIN, param } from './constants/uris';
import { RenovarResponse } from './interfaces/Renovar';
import useStore from './stores/store';

function App() {
  const navigate = useNavigate();
  const setUsuario = useStore(({ setUsuario }) => setUsuario);
  const { pathname } = useLocation();

  const { mutateAsync } = useMutation({
    mutationKey: 'renovar-token',
    mutationFn: (token: string) => {
      return axios.post<unknown, RenovarResponse>(param(LOGIN, 'renovar'), { token });
    }
  });

  const renovarToken = useCallback(async () => {
    let tokenAnterior = localStorage.getItem('token');
    const esSesionPersistente = !!tokenAnterior;

    if (!tokenAnterior) tokenAnterior = sessionStorage.getItem('token');
    if (!tokenAnterior) return;

    tokenAnterior = JSON.parse(tokenAnterior) as string;

    const { token, usuario } = await mutateAsync(tokenAnterior);

    setUsuario(usuario);

    if (esSesionPersistente) {
      localStorage.setItem('token', JSON.stringify(token));
    } else {
      sessionStorage.setItem('token', JSON.stringify(token));
    }
  }, [mutateAsync, setUsuario]);

  useEffect(() => {
    const autenticado = autenticarUsuario();
    if (!autenticado) navigate('/login');
  }, [pathname, navigate]);

  useEffect(() => {
    renovarToken();
  }, [renovarToken]);

  return (
    <Layout>
      <ToastContainer limit={1} />
      <Outlet />
    </Layout>
  );
}

export default App;
