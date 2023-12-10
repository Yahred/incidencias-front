import { useCallback, useMemo, useState, Fragment } from 'react';

import Stack from '@mui/material/Stack';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import SliderIncidencias from '@components/incidencias/SliderIncidencias';
import ModalIncidencia from '@components/incidencias/ModalIncidencia';
import AsignacionTecnico from './components/AsignacionTecnico';
import FadeIn from '@components/animaciones/FadeIn';

import useSliderIncidencias from './hooks/useSliderIncidencias';
import useAccionIncidencia from './hooks/useAccionIncidencia';
import useModalIncidencia from '@hooks/useModalIncidencia';
import { ESTATUS_NOMBRES, EstatusEnum } from '@constants/estatus';
import { Typography } from '@mui/material';

const Incidencias = () => {
  const [estatusSelecccionado, setEstatusSeleccionado] = useState<EstatusEnum>(
    EstatusEnum.Pendiente
  );

  const {
    sliders,
    estatus,
    isFetching,
    departamentos,
    refetch,
  } = useSliderIncidencias();

  const {
    modalAbierto,
    abrirModal,
    cerrarModal,
    incidenciaSeleccionada
  } = useModalIncidencia();

  const handleIncidenciaAccion = useCallback(() => {
    cerrarModal();
    refetch();
  }, [cerrarModal, refetch]);

  const {
    accionPorEstatus,
    isAsignarTecnicoOpen,
    asignarTecnico,
    cerrarAsignarTecnico,
  } = useAccionIncidencia(incidenciaSeleccionada, handleIncidenciaAccion);

  const incidenciasPorEstatus = useCallback((estatus: EstatusEnum, departamento: string) =>
    sliders[departamento].filter(({ estatus: { id } }) => id === estatus)
  , [sliders]);

  const estatusSinIncidencias = useMemo(() =>
    departamentos?.every(
      (departamento) =>
        !incidenciasPorEstatus(estatusSelecccionado, departamento.id!).length
    ),
  [departamentos, estatusSelecccionado, incidenciasPorEstatus]);

  return (
    <>
      <Stack padding={{ md: 4, xs: 2 }} rowGap={4} height="100%">
        <Tabs
          value={estatusSelecccionado}
          onChange={(_, value) => setEstatusSeleccionado(value)}
        >
          {estatus.map((est) => (
            <Tab key={est} label={ESTATUS_NOMBRES[est]} value={est} />
          ))}
        </Tabs>
        <Stack rowGap={4}>
          {departamentos?.map((departamento) =>
            incidenciasPorEstatus(estatusSelecccionado, departamento.id!)
              .length ? (
              <SliderIncidencias
                key={departamento.id}
                incidencias={incidenciasPorEstatus(
                  estatusSelecccionado,
                  departamento.id!
                )}
                isLoading={isFetching}
                titulo={departamento.nombre}
                onClick={abrirModal}
              />
            ) : (
              <Fragment key={departamento.id} />
            )
          )}
        </Stack>
        {estatusSinIncidencias && (
          <Stack height="100%" justifyContent="center" alignItems="center">
            <FadeIn sx={{ display: 'grid', placeItems: 'center' }}>
              <Typography variant="h4">
                Sin incidencias {ESTATUS_NOMBRES[estatusSelecccionado]}
              </Typography>
            </FadeIn>
          </Stack>
        )}
      </Stack>
      <ModalIncidencia
        open={modalAbierto}
        incidencia={incidenciaSeleccionada}
        onCerrar={cerrarModal}
        accion={accionPorEstatus[estatusSelecccionado]}
      />
      <AsignacionTecnico
        area={incidenciaSeleccionada?.recurso.area}
        open={isAsignarTecnicoOpen}
        onClick={asignarTecnico}
        onCancelar={cerrarAsignarTecnico}
      />
    </>
  );
};

export default Incidencias;
