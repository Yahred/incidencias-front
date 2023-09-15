import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import Box from '@mui/material/Box';

import Sidebar from '../../components/Sidebar';
import { Container } from '@mui/material';
import Grid from '@mui/material/Grid';

const Catalogos: FC = () => {
  return (
    <>
      <Sidebar />
      <Box display="flex" pl={{ md: '220px', xs: 0 }}>
        <Box p={4} width='100%'>
          <Outlet />
        </Box>
      </Box>
    </>
  );
};

export default Catalogos;
