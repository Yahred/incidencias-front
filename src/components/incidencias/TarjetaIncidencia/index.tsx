import { FC } from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';

import { styled } from '@mui/material';

import IndicadorEstatus from '@components/incidencias/IndicadorEstatus';
import FadeIn from '@components/animaciones/FadeIn';

import { Incidencia } from '@interfaces/Incidencia';
import IndicadorPrioridad from '../IndicadorPrioridad';
import { Prioridad } from '../../../interfaces/Prioridad';

const Bold = styled('span')({
  fontWeight: 'normal',
});

interface TarjetaIncidenciaProps {
  incidencia?: Incidencia;
  isLoading?: boolean;
  onClick?: (incidencia: Incidencia) => void;
  fullWidth?: boolean;
}

const TarjetaIncidencia: FC<TarjetaIncidenciaProps> = ({
  incidencia,
  isLoading,
  onClick,
  fullWidth,
}) => {
  if (isLoading) {
    return (
      <Paper>
        <Box
          minWidth={350}
          display="flex"
          flexDirection="column"
          gap="12px"
          p={3}
          position="relative"
        >
          <Skeleton
            variant="circular"
            height={30}
            width={30}
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
    <FadeIn sx={{ width: fullWidth ? '100%' : 380 }}>
      <Paper
        onClick={() => onClick!(incidencia!)}
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
        <IndicadorEstatus
          estatus={incidencia?.estatus}
          sx={{ position: 'absolute', right: 10, top: 20 }}
        />
        {incidencia?.prioridad && (
          <IndicadorPrioridad
            prioridad={incidencia?.prioridad as Prioridad}
            sx={{ position: 'absolute', top: 60, right: 10 }}
          />
        )}
        {incidencia?.atiende && (
          <Avatar
            sx={{
              position: 'absolute',
              bottom: 20,
              right: 20,
              cursor: 'pointer',
            }}
            src={incidencia?.atiende?.avatar}
          />
        )}
        <Grid container p={3} rowGap={2} width={fullWidth ? '100%' : 380}>
          <Grid item xs={12}>
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                width: '220px',
              }}
            >
              {incidencia?.titulo}
            </Typography>
            <Typography variant="caption">
              {incidencia?.folio || 'Sin folio'}
            </Typography>
          </Grid>
          <Grid item xs={12} display="flex" flexDirection="column" rowGap="6px">
            <Typography>
              <Bold>Reporta:</Bold>{' '}
              {`${incidencia?.usuarioCreacion?.nombres} ${incidencia?.usuarioCreacion?.apellidoPat}`}
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

TarjetaIncidencia.defaultProps = {
  onClick: () => {},
};

export default TarjetaIncidencia;
