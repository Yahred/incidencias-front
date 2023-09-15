import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import Layout from './layout';

function App() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    //navigate("login");
  }, [pathname, navigate]);

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}

export default App;
