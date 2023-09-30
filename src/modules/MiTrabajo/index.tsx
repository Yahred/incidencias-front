import { FC, useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import Contenedor from '../../components/Contenedor';
import TarjetaIncidencia from './components/TarjetaIncidencia';

import scrollbarMixin from '../../theme/scrollbar';
import TabsIncidencias from './components/TabsIncidencias';

const MiTrabajo: FC = () => {

  return (
    <Grid container py={6} px={8} rowGap={2}>
      <Grid container item xs={12} rowGap={2}>
        <Grid item xs={12} display='flex' justifyContent='space-between'>
          <Typography variant="h5">Mis incidencias</Typography>
          <Button color='error' sx={{ color: 'white' }}>Reportar</Button>
        </Grid>
        <Grid item xs={12}>
          <Box display="flex" gap={3} px={1} py={4} sx={{ overflowX: 'auto', ...scrollbarMixin }}>
            {[1, 2, 3, 4, 5].map(() => (
              <TarjetaIncidencia />
            ))}
          </Box>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <TabsIncidencias />
      </Grid>
    </Grid>
  );
};

export default MiTrabajo;
