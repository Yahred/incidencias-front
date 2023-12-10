import { FC, useCallback, useEffect } from 'react';

import * as yup from 'yup';
import { useForm } from 'react-hook-form';

import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import BotonCerrar from '../../generales/BotonCerrar';
import Form from '../../formularios/Form';
import FormField from '@components/formularios/FormField';
import IndicadorEstatus from '../IndicadorEstatus';
import InfoRecurso from '../InfoRecurso';
import SubmitButton from '@components/formularios/SubmitButton';

import useCambioRecurso from '../../../modules/MiTrabajo/hooks/useCambioRecurso';
import { CambioRecurso, Incidencia } from '../../../interfaces';
import { CAMPO_REQUERIDO } from '../../../constants/validaciones';
import { yupResolver } from '@hookform/resolvers/yup';
import { Estatus } from '../../../interfaces/Estatus';
import { EstatusEnum } from '../../../constants/estatus';

interface SolicitudCambioProps {
  incidencia: Incidencia;
  onSolicitarCambio?: (cambio: CambioRecurso) => void;
  onAprobarCambio?: (cambio: CambioRecurso) => void;
  soloConsulta: boolean;
  accion?: boolean;
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
  accion,
  onAprobarCambio,
}) => {
  const form = useForm({
    defaultValues: {
      recurso: incidencia?.recurso?.id,
      incidencia: incidencia?.id || '',
    },
    resolver: yupResolver(cambioSchema),
  });

  const recurso = incidencia?.recurso;

  const {
    isDrawerOpen,
    abrirDrawer,
    cerrarDrawer,
    solicitarCambio,
    cambio,
    aprobarCambio,
    rechazarCambio,
  } = useCambioRecurso(incidencia?.cambio?.id);

  const handleSubmit = useCallback(
    async (cambio: CambioRecurso) => {
      const cambioBD = await solicitarCambio(cambio);
      cerrarDrawer();
      onSolicitarCambio!(cambioBD);
    },
    [solicitarCambio, cerrarDrawer, onSolicitarCambio]
  );

  const handleAprobarCambio = useCallback(
    (rechazado?: boolean) => {
      return async () => {
        const cambio = await (rechazado
          ? rechazarCambio(incidencia!.cambio!.id!)
          : aprobarCambio(incidencia!.cambio!.id!));
        cerrarDrawer();
        onAprobarCambio!(cambio);
      };
    },
    [aprobarCambio, cerrarDrawer, incidencia, onAprobarCambio, rechazarCambio]
  );

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
          <Stack px={4} py={2} maxWidth={520} minWidth={420} gap={4}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="flex-end"
            >
              <Typography variant="h5">Solicitud de cambio</Typography>
              <BotonCerrar onClick={cerrarDrawer} />
            </Stack>
            <Stack>
              <Typography variant="h6">Folio</Typography>
              <Typography variant="caption">{incidencia?.folio}</Typography>
            </Stack>
            <Stack>
              <Typography variant="h6">Costo del recurso</Typography>
              <Typography variant="caption">{`$ ${recurso.costo}`}</Typography>
            </Stack>
            {cambio && (
              <IndicadorEstatus
                estatus={cambio.estatus as Estatus}
                sx={{ width: 'min-content' }}
              />
            )}
            <InfoRecurso recurso={recurso} />
            <FormField
              title="¿Por qué es necesario el cambio?"
              name="motivo"
              rows={4}
              disabled={soloConsulta}
              multiline
            />
          </Stack>
          <Stack p={4} direction="row" gap={2}>
            {!soloConsulta && <SubmitButton>Solicitar cambio</SubmitButton>}
            {accion &&
              (cambio?.estatus as Estatus)?.id !== EstatusEnum.Aprobado && (
                <>
                  <Button onClick={handleAprobarCambio(false)}>
                    Aprobar cambio
                  </Button>
                  <Button onClick={handleAprobarCambio(true)} variant='outlined'>
                    Rechazar cambio
                  </Button>
                </>
              )}
          </Stack>
        </Form>
      </Drawer>
    </>
  );
};

SolicitudCambio.defaultProps = {
  onSolicitarCambio: () => {},
  onAprobarCambio: () => {},
};

export default SolicitudCambio;
