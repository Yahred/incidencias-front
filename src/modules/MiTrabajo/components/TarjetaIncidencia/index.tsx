import { FC } from 'react';

import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Typography, styled } from '@mui/material';

import IndicadorEstatus from '../IndicadorEstatus';

const Bold = styled('span')({
  fontWeight: 'normal',
});

const TarjetaIncidencia: FC = () => {
  return (
    <Paper elevation={2} sx={{ cursor: 'pointer', position: 'relative', minWidth: 450, overflow: 'hidden' }}>
      <IndicadorEstatus />
      <Grid container p={3} rowGap={2}>
        <Grid item xs={12}>
          <Typography variant="h6">
            Reparación de computadora
          </Typography>
        </Grid>
        <Grid item xs={12} display="flex" flexDirection="column" rowGap='6px'>
          <Typography>
            <Bold>Reporta:</Bold> Jesús Manjarrez
          </Typography>
          <Typography>
            <Bold>Recurso:</Bold> Computadora B1
          </Typography>
          <Typography>
            <Bold>Ubicación:</Bold> Edificio B Salón B2
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default TarjetaIncidencia;
