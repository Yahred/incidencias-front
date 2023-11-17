import { FC, ReactNode, useEffect } from 'react';

import Appbar from './components/Appbar';
import useNotificaciones from '../utils/hooks/useNotificaciones';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const { pedirPermiso } = useNotificaciones();

  useEffect(() => {
    pedirPermiso();
  }, [pedirPermiso]);

  return (
    <>
      <Appbar />
      {children}
    </>
  );
};

export default Layout;
