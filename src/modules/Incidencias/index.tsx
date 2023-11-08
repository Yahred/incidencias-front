import { useCallback, useState } from 'react';

import Stack from '@mui/material/Stack';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import SliderIncidencias from '@components/SliderIncidencias';
import ModalIncidencia from '@components/ModalIncidencia';
import AsignacionTecnico from './components/AsignacionTecnico';

import useStore from '../../stores/store';
import useSliderIncidencias from './hooks/useSliderIncidencias';
import useManejarIncidencia from './hooks/useManejarIncidencia';
import useAccionIncidencia from './hooks/useAccionIncidencia';
import { ESTATUS_NOMBRES, EstatusEnum } from '@constants/estatus';

const Incidencias = () => {
  const usuario = useStore(({ usuario }) => usuario);

  const [estatusSelecccionado, setEstatusSeleccionado] = useState<EstatusEnum>(EstatusEnum.Pendiente);

  const { sliders, estatus, isFetching, departamentos, refetch } = useSliderIncidencias(
    usuario?.departamento.id || ''
  );

  const {
    modalAbierto,
    abrirModal,
    cerrarModal,
    incidenciaSeleccionada,
  } = useManejarIncidencia();

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

  const incidenciasPorEstatus = (estatus: EstatusEnum, departamento: string) =>
    sliders[departamento].filter(({ estatus: { id } }) => id === estatus);

  return (
    <>
      <Stack padding={{ md: 4, xs: 2 }} rowGap={4}>
        <Tabs value={estatusSelecccionado} onChange={(_, value) => setEstatusSeleccionado(value)}>
          {estatus.map((est) => (
            <Tab key={est} label={ESTATUS_NOMBRES[est]} value={est} />
          ))}
        </Tabs>
        <Stack rowGap={4}>
          {departamentos?.map((departamento) => (
            <SliderIncidencias
              key={departamento.id}
              incidencias={incidenciasPorEstatus(estatusSelecccionado, departamento.id!)}
              isLoading={isFetching}
              titulo={departamento.nombre}
              onClick={abrirModal}
            />
          ))}
        </Stack>
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
