import { FC, Suspense, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import Box from '@mui/material/Box';

import Sidebar from './components/Sidebar';
import useStore from '../../stores/store';

const Catalogos: FC = () => {
  const setExistSidebar = useStore(({ setExistSidebar }) => setExistSidebar);

  useEffect(() => {
    setExistSidebar(true);
    return () => {
      setExistSidebar(false);
    }
  }, [setExistSidebar]);

  return (
    <>
      <Sidebar />
      <Suspense>
        <Box display="flex" pl={{ md: '220px', xs: 0 }}>
          <Box p={{ lg: 4, xs: 2 }} width={{ lg: '100%', xs: '90%'}}>
            <Outlet />
          </Box>
        </Box>
      </Suspense>
    </>
  );
};

export default Catalogos;
