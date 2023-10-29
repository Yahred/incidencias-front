import { useCallback, useState } from 'react';

import Stack from '@mui/material/Stack';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import SliderIncidencias from '@components/SliderIncidencias';
import ModalIncidencia from '@components/ModalIncidencia';

import useStore from '../../stores/store';
import useSliderIncidencias from './hooks/useSliderIncidencias';
import useManejarIncidencia from './hooks/useManejarIncidencia';
import { ESTATUS_NOMBRES, EstatusEnum } from '@constants/estatus';

const Incidencias = () => {
  const usuario = useStore(({ usuario }) => usuario);

  const [tabValue, setTabValue] = useState<EstatusEnum>(EstatusEnum.Pendiente);

  const { sliders, estatus, isFetching, departamentos, refetch } = useSliderIncidencias(
    usuario?.departamento.id || ''
  );

  const { modalAbierto, abrirModal, cerrarModal, incidenciaSeleccionada, aprobarIncidencia } =
    useManejarIncidencia();

  const incidenciasPorEstatus = (estatus: EstatusEnum, departamento: string) =>
    sliders[departamento].filter(({ estatus: { id } }) => id === estatus);

  const handleAprobarIncidencia = useCallback(async (id: string) => {
    await aprobarIncidencia(id);
    refetch();
    cerrarModal();
  }, [aprobarIncidencia, refetch, cerrarModal]);

  return (
    <>
      <Stack padding={{ md: 4, xs: 2 }} rowGap={4}>
        <Tabs value={tabValue} onChange={(_, value) => setTabValue(value)}>
          {estatus.map((est) => (
            <Tab key={est} label={ESTATUS_NOMBRES[est]} value={est} />
          ))}
        </Tabs>
        <Stack rowGap={4}>
          {departamentos?.map((departamento) => (
            <SliderIncidencias
              key={departamento.id}
              incidencias={incidenciasPorEstatus(tabValue, departamento.id!)}
              isLoading={isFetching}
              titulo={departamento.nombre}
              onClick={abrirModal}
            />
          ))}
        </Stack>
      </Stack>
      <ModalIncidencia
        isOpen={modalAbierto}
        incidencia={incidenciaSeleccionada}
        onCerrar={cerrarModal}
        aprobarIncidencia={tabValue === EstatusEnum.Pendiente}
        onAprobar={handleAprobarIncidencia}
      />
    </>
  );
};

export default Incidencias;
