import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import Layout from './layout';
import autenticarUsuario from './utils/functions/autenticarUsuario';

function App() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    const autenticado = autenticarUsuario();
    console.log(autenticado);
    if (!autenticado) navigate('/login');
    console.log('paht')
  }, [pathname, navigate]);

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}

export default App;
