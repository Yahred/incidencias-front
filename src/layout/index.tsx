import { FC, ReactNode } from 'react';

import Appbar from './components/Appbar';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {

  return (
    <>
      <Appbar />
      {children}
    </>
  );
};

export default Layout;
