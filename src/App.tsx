import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import Layout from './layout';
import autenticarUsuario from './utils/functions/autenticarUsuario';

function App() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    const autenticado = autenticarUsuario();
    if (!autenticado) navigate('/login');
  }, [pathname, navigate]);

  return (
    <Layout>
      <ToastContainer />
      <Outlet />
    </Layout>
  );
}

export default App;
