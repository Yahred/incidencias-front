import { FC, useState, useCallback } from 'react';

import { Button, Stack, Typography } from '@mui/material';

import Dialogo from '@components/contenedores/Dialogo';
import SubmitButton from '@components/formularios/SubmitButton';

import { useQuery } from 'react-query';
import { obtenerPrioridades } from '@services';
import { PrioridadesEnum } from '@constants/prioridades';

interface AsignacionPrioridadProps {
  onAsignarPrioridad: (prioridad: PrioridadesEnum) => void;
}

const AsignacionPrioridad: FC<AsignacionPrioridadProps> = ({
  onAsignarPrioridad,
}) => {
  const [open, setOpen] = useState<boolean>(false);

  const { data: prioridades } = useQuery({
    queryKey: 'prioridades',
    cacheTime: Infinity,
    queryFn: obtenerPrioridades,
    initialData: [],
  });

  const handleAsignarPrioridad = useCallback(
    (prioridad: PrioridadesEnum) => {
      return () => {
        onAsignarPrioridad(prioridad);
      };
    },
    [onAsignarPrioridad]
  );

  const abrir = useCallback(() => {
    setOpen(true);
  }, []);

  const cerrar = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <>
      <SubmitButton onClick={abrir}>Aprobar Incidencia</SubmitButton>
      <Dialogo
        open={open}
        onClick={cerrar}
        title={
          <Typography>Seleccione la prioridad de la incidencia</Typography>
        }
      >
        <Stack rowGap={'4px'} p={2}>
          <Stack gap={1} alignItems="center">
            {prioridades?.map(({ id, nombre, color }) => (
              <Button
                onClick={handleAsignarPrioridad(id)}
                variant="outlined"
                sx={{ borderColor: color, color, width: 120 }}
              >
                {nombre}
              </Button>
            ))}
          </Stack>
        </Stack>
      </Dialogo>
    </>
  );
};

AsignacionPrioridad.defaultProps = {
  onAsignarPrioridad: () => {},
};

export default AsignacionPrioridad;
