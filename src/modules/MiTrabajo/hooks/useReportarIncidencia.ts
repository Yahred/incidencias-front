import { useCallback, useState } from 'react';

import { useMutation } from 'react-query';

import objectToFormData from '@functions/objectToFormData';
import { registrarIncidencia } from '@services';
import { Incidencia } from '@interfaces/Incidencia';

const useReportarIncidencia = () => {
  const [modalReportarAbierto, setModalReportarAbierto] =
    useState<boolean>(false);

  const { mutateAsync: reportarIncidenciaMut } = useMutation({
    mutationKey: 'incidencia',
    mutationFn: (form: Incidencia) => {
      const { evidencias, ...incidencia } = form;
      const formData = objectToFormData(incidencia);
      evidencias?.forEach((evidencia) =>
        formData.append('evidencias', evidencia)
      );
      return registrarIncidencia(formData);
    },
  });

  const abrirModalReportar = useCallback(() => {
    setModalReportarAbierto(true);
  }, []);

  const cerrarModalReportar = useCallback(() => {
    setModalReportarAbierto(false);
  }, []);

  return {
    modalReportarAbierto,
    abrirModalReportar,
    cerrarModalReportar,
    reportarIncidenciaMut,
  };
};

export default useReportarIncidencia;
