import { FC, memo } from 'react';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import TarjetaIncidencia from '@components/TarjetaIncidencia';

import { Incidencia } from '@interfaces/Incidencia';

interface SliderIncidenciasProps {
  incidencias: Incidencia[];
  titulo: string;
  isLoading: boolean;
}

const SliderIncidenciasC: FC<SliderIncidenciasProps> = ({
  incidencias,
  titulo,
  isLoading,
}) => {
  return (
    <Stack rowGap={2}>
      <Typography variant="h4">{titulo}</Typography>
      <Stack direction="row" gap={2}>
        {incidencias.map((incidencia) => (
          <TarjetaIncidencia
            key={incidencia.id}
            incidencia={incidencia}
            isLoading={isLoading}
          />
        ))}
      </Stack>
    </Stack>
  );
};

SliderIncidenciasC.defaultProps = {
  incidencias: [],
};

const SliderIncidencias = memo(SliderIncidenciasC);

export default SliderIncidencias;
