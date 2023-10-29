import { FC, memo } from 'react';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import FadeIn from '@components/FadeIn';
import TarjetaIncidencia from '@components/TarjetaIncidencia';

import { Incidencia } from '@interfaces/Incidencia';

interface SliderIncidenciasProps {
  incidencias: Incidencia[];
  titulo?: string;
  isLoading?: boolean;
  onClick: (incidencia: Incidencia) => void;
}

const SliderIncidenciasC: FC<SliderIncidenciasProps> = ({
  incidencias,
  titulo,
  onClick,
}) => {

  return (
    <Stack rowGap={3}>
      <Typography variant="body1" fontWeight="bold">{titulo}</Typography>
      <Stack direction="row" gap={2}>
        {incidencias.map((incidencia, index) => (
          <TarjetaIncidencia
            key={index}
            incidencia={incidencia}
            onClick={() => onClick(incidencia)}
          />
        ))}
        {!incidencias.length && (
          <FadeIn
            sx={{ display: 'grid', placeItems: 'center', height: 120, width: '100%' }}
          >
            <Typography variant='h6'>Sin incidencias</Typography>
          </FadeIn>
        )}
      </Stack>
    </Stack>
  );
};

SliderIncidenciasC.defaultProps = {
  incidencias: [],
};

const SliderIncidencias = memo(SliderIncidenciasC);

export default SliderIncidencias;