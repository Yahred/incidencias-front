import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Layout from './layout';

import autenticarUsuario from './utils/functions/autenticarUsuario';
import useTokenRenew from './utils/hooks/useTokenRenew';

function App() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { renovarSesion } = useTokenRenew();

  useEffect(() => {
    const autenticado = autenticarUsuario();
    if (!autenticado) navigate('/login');
  }, [pathname, navigate]);

  useEffect(() => {
    renovarSesion();
  }, [renovarSesion]);

  return (
    <Layout>
      <ToastContainer limit={1} />
      <Outlet />
    </Layout>
  );
}

export default App;
