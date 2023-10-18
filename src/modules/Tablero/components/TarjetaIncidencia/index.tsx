import { FC } from 'react';

import { Incidencia } from '../../../../interfaces/Incidencia';
import { Card, Skeleton, Typography } from '@mui/material';

interface TarjetaIncidenciaProps {
  incidencia?: Incidencia;
  isLoading?: boolean;
}

const TarjetaIncidencia: FC<TarjetaIncidenciaProps> = ({
  isLoading,
}) => {
  if (isLoading) {
    return (
      <Card sx={{ width: 200, height: 80, padding: 2, position: 'relative' }}>
        <Skeleton />
        <Skeleton height={70} width="70%" />
        <Skeleton
          variant="circular"
          height={30}
          width={30}
          sx={{ position: 'absolute', bottom: 20, right: 20 }}
        />
      </Card>
    );
  }

  return (
    <Card sx={{ width: 200, height: 80, padding: 2 }}>
      <Typography>Computadora sin funcionar</Typography>
    </Card>
  );
};

export default TarjetaIncidencia;
