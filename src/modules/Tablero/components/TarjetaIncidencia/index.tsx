import { FC } from 'react';

import { Incidencia } from '../../../../interfaces/Incidencia';
import { Card, Typography } from '@mui/material';

interface TarjetaIncidenciaProps {
  incidencia?: Incidencia
}

const TarjetaIncidencia: FC<TarjetaIncidenciaProps> = ({ incidencia }) => {
  return <Card sx={{ width: 160 }}>
    <Typography>Computadora sin funcionar</Typography>
  </Card>
}

export default TarjetaIncidencia;
