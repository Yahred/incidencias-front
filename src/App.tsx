import { Fragment, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'chart.js/auto';

import Layout from './layout';

import autenticarUsuario from './utils/functions/autenticarUsuario';
import useRenovarSesion from './utils/hooks/useVerificarSesion';
import validarPermiso from '@functions/validarPermiso';
import useSesion from './stores/hooks/useSesion';
import { TipoUsuario } from './interfaces';
import { TiposUsuario } from '@constants/tiposUsuario';

function App() {
  const usuario = useSesion();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { renovarSesion } = useRenovarSesion();

  useEffect(() => {
    const autenticado = autenticarUsuario();
    if (!autenticado) navigate('/login');

    if (pathname === '/') return;

    if (!usuario) return;

    const tipoUsuario = usuario.tipoUsuario as TipoUsuario;
    if (tipoUsuario.id === TiposUsuario.Admin) return;

    const tienePermiso = validarPermiso(pathname, tipoUsuario.modulos!);

    if (!tienePermiso) navigate('');
  }, [pathname, navigate, usuario]);

  useEffect(() => {
    renovarSesion();
  }, [renovarSesion]);

  if (!usuario) return <Fragment />;

  return (
    <Layout>
      <ToastContainer limit={4} />
      <Outlet />
    </Layout>
  );
}

export default App;
