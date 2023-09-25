import { FC, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import Box from '@mui/material/Box';

import Sidebar from './components/Sidebar';

const Catalogos: FC = () => {
  return (
    <>
      <Sidebar />
      <Suspense>
        <Box display="flex" pl={{ md: '220px', xs: 0 }}>
          <Box p={4} width="100%">
            <Outlet />
          </Box>
        </Box>
      </Suspense>
    </>
  );
};

export default Catalogos;
