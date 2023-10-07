import { FC } from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import { Skeleton, styled } from '@mui/material';

import IndicadorEstatus from '../IndicadorEstatus';
import { Incidencia } from '../../../../interfaces/Incidencia';
import FadeIn from '../../../../components/FadeIn';

const Bold = styled('span')({
  fontWeight: 'normal',
});

interface TarjetaIncidenciaProps {
  incidencia: Incidencia;
  isLoading: boolean;
  onClick: (incidencia: Incidencia) => void
}

const TarjetaIncidencia: FC<TarjetaIncidenciaProps> = ({
  incidencia,
  isLoading,
  onClick,
}) => {
  if (isLoading) {
    return (
      <Paper>
        <Box
          minWidth={320}
          display="flex"
          flexDirection="column"
          gap="12px"
          p={3}
          position="relative"
        >
          <Skeleton
            variant="circular"
            height={30}
            width={40}
            sx={{ position: 'absolute', bottom: 20, right: 20 }}
          />
          <Skeleton height={40} />
          <Box display="flex" flexDirection="column" gap={1}>
            <Skeleton width={'70%'} />
            <Skeleton width={'70%'} />
            <Skeleton width={'70%'} />
          </Box>
        </Box>
      </Paper>
    );
  }

  return (
    <FadeIn sx={{ width: 380 }}>
      <Paper
        onClick={() => onClick(incidencia)}
        elevation={2}
        sx={{
          position: 'relative',
          overflow: 'hidden',
          transition: 'transform .2s',
          cursor: 'pointer',
          '&:hover': {
            transform: 'translateY(-20px)',
            transition: 'transform ease-in linear 50ms',
          },
        }}
      >
        <IndicadorEstatus color={incidencia?.estatus.color} />
        <Avatar
          sx={{
            position: 'absolute',
            bottom: 20,
            right: 20,
            cursor: 'pointer',
          }}
        />
        <Grid container p={3} rowGap={2} width={380}>
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
              {incidencia?.titulo}
            </Typography>
          </Grid>
          <Grid item xs={12} display="flex" flexDirection="column" rowGap="6px">
            <Typography>
              <Bold>Reporta:</Bold>{' '}
              {`${incidencia?.usuarioCreacion.nombres} ${incidencia?.usuarioCreacion.apellidoPat}`}
            </Typography>
            <Typography>
              <Bold>Recurso:</Bold> {incidencia?.recurso.nombre}
            </Typography>
            <Typography>
              <Bold>Ubicación:</Bold>{' '}
              {`${incidencia?.edificio.nombre} ${incidencia?.salon.nombre}`}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </FadeIn>
  );
};

export default TarjetaIncidencia;
