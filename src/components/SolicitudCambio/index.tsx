import { FC, useCallback, useEffect } from 'react';

import * as yup from 'yup';
import { useForm } from 'react-hook-form';

import { Box, Button, Drawer, Stack, Typography } from '@mui/material';

import Form from '../Form';
import FormField from '../FormField';
import SubmitButton from '../SubmitButton';
import BotonCerrar from '../BotonCerrar';
import IndicadorEstatus from '../IndicadorEstatus';

import useCambioRecurso from '../../modules/MiTrabajo/hooks/useCambioRecurso';
import { CambioRecurso, Incidencia } from '../../interfaces';
import { CAMPO_REQUERIDO } from '../../constants/validaciones';
import { yupResolver } from '@hookform/resolvers/yup';
import { Estatus } from '../../interfaces/Estatus';

interface SolicitudCambioProps {
  incidencia: Incidencia;
  onSolicitarCambio?: (cambio: CambioRecurso) => void;
  soloConsulta: boolean;
  aprobarSolicitud?: boolean;
}

const cambioSchema = yup.object({
  motivo: yup.string().required(CAMPO_REQUERIDO),
  recurso: yup.string().required(CAMPO_REQUERIDO),
  incidencia: yup.string().required(CAMPO_REQUERIDO),
});

const SolicitudCambio: FC<SolicitudCambioProps> = ({
  incidencia,
  onSolicitarCambio,
  soloConsulta,
  aprobarSolicitud,
}) => {
  const form = useForm({
    defaultValues: {
      recurso: incidencia?.recurso?.id,
      incidencia: incidencia?.id || '',
    },
    resolver: yupResolver(cambioSchema),
  });

  const {
    isDrawerOpen,
    abrirDrawer,
    cerrarDrawer,
    solicitarCambio,
    cambio,
    aprobarCambio,
  } = useCambioRecurso(incidencia?.cambio?.id);

  const handleSubmit = useCallback(
    async (cambio: CambioRecurso) => {
      const cambioBD = await solicitarCambio(cambio);
      cerrarDrawer();
      onSolicitarCambio!(cambioBD);
    },
    [solicitarCambio, cerrarDrawer, onSolicitarCambio]
  );

  const handleAprobarCambio = useCallback(async () => {
    await aprobarCambio(incidencia!.cambio!.id!);
    cerrarDrawer();
  }, [aprobarCambio, cerrarDrawer, incidencia]);

  useEffect(() => {
    if (!isDrawerOpen) form.reset();
  }, [isDrawerOpen, form]);

  useEffect(() => {
    if (incidencia?.cambio) form.setValue('motivo', incidencia.cambio.motivo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [incidencia]);

  return (
    <>
      <Button variant="outlined" onClick={abrirDrawer}>
        {soloConsulta ? 'Ver' : 'Solicitar'} cambio
      </Button>
      <Drawer open={isDrawerOpen} anchor="right">
        <Form methods={form} onSubmit={handleSubmit}>
          <Stack p={2} maxWidth={520} minWidth={420} gap={4}>
            <Stack direction="row-reverse">
              <BotonCerrar onClick={cerrarDrawer} />
            </Stack>
            <Stack>
              <Typography variant="h5">Folio</Typography>
              <Typography variant="caption">{incidencia?.folio}</Typography>
            </Stack>
            {cambio && (
              <IndicadorEstatus
                estatus={cambio.estatus as Estatus}
                sx={{ width: 'min-content' }}
              />
            )}
            <FormField
              title="¿Por qué es necesario el cambio?"
              name="motivo"
              rows={4}
              disabled={soloConsulta}
              multiline
            />
          </Stack>
          <Box p={2}>
            {!soloConsulta && <SubmitButton>Solicitar cambio</SubmitButton>}
            {aprobarSolicitud && (
              <Button onClick={handleAprobarCambio}>Aprobar cambio</Button>
            )}
          </Box>
        </Form>
      </Drawer>
    </>
  );
};

SolicitudCambio.defaultProps = {
  onSolicitarCambio: () => {},
};

export default SolicitudCambio;
