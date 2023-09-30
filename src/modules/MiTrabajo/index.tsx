import { FC } from 'react';

import { Box, Grid, Typography } from '@mui/material';

import Contenedor from '../../components/Contenedor';
import TarjetaIncidencia from './components/TarjetaIncidencia';

import scrollbarMixin from '../../theme/scrollbar';

const MiTrabajo: FC = () => {
  return (
    <Grid container py={6} px={8} rowGap={2}>
      <Grid container item xs={12} rowGap={2}>
        <Grid item xs={12}>
          <Typography variant="h5">Mis incidencias</Typography>
        </Grid>
        <Grid item xs={12}>
          <Box display="flex" gap={3} px={1} py={2} sx={{ overflowX: 'auto', ...scrollbarMixin }}>
            {[1, 2, 3, 4, 5].map(() => (
              <TarjetaIncidencia />
            ))}
          </Box>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Typography></Typography>
      </Grid>
    </Grid>
  );
};

export default MiTrabajo;
