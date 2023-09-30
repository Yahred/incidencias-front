import { FC } from 'react';

import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import { Typography, styled } from '@mui/material';

import IndicadorEstatus from '../IndicadorEstatus';

const Bold = styled('span')({
  fontWeight: 'normal',
});

const TarjetaIncidencia: FC = () => {
  return (
    <Paper
      elevation={2}
      sx={{
        position: 'relative',
        minWidth: 380,
        overflow: 'hidden',
        transition: 'transform .2s',
        cursor: 'pointer',
        '&:hover': {
          transform: 'translateY(-20px)',
          transition: 'transform ease-in linear 50ms',
        },
      }}
    >
      <IndicadorEstatus />
      <Avatar
        sx={{ position: 'absolute', bottom: 20, right: 20, cursor: 'pointer' }}
      />
      <Grid container p={3} rowGap={2}>
        <Grid item xs={12}>
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              width: '320px',
            }}
          >
            Reparación de computadora Reparación de computadora Reparación de
            computadora
          </Typography>
        </Grid>
        <Grid item xs={12} display="flex" flexDirection="column" rowGap="6px">
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
