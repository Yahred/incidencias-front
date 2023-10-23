import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import SliderIncidencias from './components/SliderIncidencias';

import useStore from '../../stores/store';
import useSliderIncidencias from './hooks/useSliderIncidencias';
import { ESTATUS_NOMBRES } from '@constants/estatus';

const Incidencias = () => {
  const usuario = useStore(({ usuario }) => usuario);

  const { sliders, estatus, isLoading } = useSliderIncidencias(
    usuario?.departamento.id || ''
  );

  return (
    <Box padding={2}>
      <Stack rowGap={2}>
        {estatus.map((est) => (
          <SliderIncidencias
            incidencias={sliders[est]}
            isLoading={isLoading}
            titulo={ESTATUS_NOMBRES[est]}
          />
        ))}
      </Stack>
    </Box>
  );
};

export default Incidencias;
