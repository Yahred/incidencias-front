import { FC, ReactNode, useCallback, useState } from 'react';

import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';

import ListaImagenes from '@components/generales/ListaImagenes';
import TextField from '@components/formularios/TextField';
import Dialogo from '@components/contenedores/Dialogo';
import DialogoConfirmacion from '../../generales/DialogoConfirmacion';
import InfoRecurso from '../InfoRecurso';
import SubmitButton from '@components/formularios/SubmitButton';
import BotonCerrar from '../../generales/BotonCerrar';
import InfoTecnico from '@components/incidencias/InfoTecnico';
import IndicadorEstatus from '../IndicadorEstatus';
import IndicadorPrioridad from '../IndicadorPrioridad';

import { MensajesConfirmacion } from '@constants/general';
import { Incidencia } from '@interfaces/Incidencia';
import { Prioridad } from '../../../interfaces/Prioridad';

interface ModalIncidenciaProps {
  incidencia: Incidencia | null;
  open: boolean;
  onCerrar: () => void;
  aprobarIncidencia?: boolean;
  onAprobar?: (id: string) => Promise<void>;
  accion?: ReactNode;
}

const ModalIncidencia: FC<ModalIncidenciaProps> = ({
  incidencia,
  open,
  onCerrar,
  aprobarIncidencia,
  onAprobar,
  accion,
}) => {
  const [isDialogoOpen, setIsDialogoOpen] = useState<boolean>(false);

  const handleAprobarIncidencia = useCallback(
    (confirmado: boolean) => {
      setIsDialogoOpen(false);
      if (!confirmado) return;
      onAprobar!(incidencia!.id!);
    },
    [onAprobar, incidencia]
  );

  return (
    <>
      <Dialogo
        open={open}
        title={
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            justifyContent="space-between"
            rowGap={{ xs: 4, sm: 0 }}
          >
            <Typography
              sx={{ order: { xs: 2, md: 1 } }}
              variant="h4"
              fontWeight="bold"
            >
              {incidencia?.titulo}
            </Typography>
            <Stack
              order={{ xs: 1 }}
              direction="row"
              gap={2}
              justifyContent={{ xs: 'flex-end' }}
            >
              {aprobarIncidencia && (
                <SubmitButton
                  color="success"
                  onClick={() => setIsDialogoOpen(true)}
                >
                  Aprobar
                </SubmitButton>
              )}
              {accion}
              <BotonCerrar onClick={onCerrar} />
            </Stack>
          </Stack>
        }
        maxWidth="xl"
        fullWidth
      >
        <Grid container rowSpacing={4} p={4}>
          <Grid item lg={8} xs={12}>
            <Stack>
              <Typography>{incidencia?.descripcion}</Typography>
              <Stack direction="row" gap={2} pt={4}>
                {incidencia?.estatus && (
                  <Stack direction="row" gap={1} alignItems="center">
                    <Typography fontWeight="bold">Estatus: </Typography>
                    <IndicadorEstatus estatus={incidencia?.estatus} />
                  </Stack>
                )}
                {incidencia?.prioridad && (
                  <Stack direction="row" gap={1} alignItems="center">
                    <Typography fontWeight="bold">Prioridad: </Typography>
                    <IndicadorPrioridad
                      prioridad={incidencia?.prioridad as Prioridad}
                    />
                  </Stack>
                )}
              </Stack>
              {!!incidencia?.evidencias?.length && (
                <ListaImagenes
                  images={incidencia.evidencias}
                  addAllowed={false}
                  deleteAllowed={false}
                  carrusel
                />
              )}
            </Stack>
          </Grid>
          <Grid
            lg={4}
            xs={12}
            sx={({ palette: { primary } }) => ({
              borderLeft: { md: 2, xs: 0 },
              borderColor: primary.main,
            })}
            item
          >
            <Stack px={{ md: 2, xs: 0 }} rowGap={2}>
              {incidencia?.atiende && (
                <Stack direction="row" gap={2} alignItems="center">
                  <Typography fontWeight="bold">Atiende: </Typography>
                  <Typography>{`${incidencia?.atiende?.nombres} ${incidencia?.atiende?.apellidoPat} ${incidencia?.atiende?.apellidoMat}`}</Typography>
                  <InfoTecnico tecnico={incidencia.atiende} />
                </Stack>
              )}
              <TextField
                value={incidencia?.folio || 'SIN FOLIO'}
                title="Folio"
                disabled
              />
              <TextField
                value={incidencia?.departamento?.nombre || ''}
                title="Departamento"
                disabled
              />
              <TextField
                value={incidencia?.edificio?.nombre || ''}
                title="Edificio"
                disabled
              />
              <TextField
                value={incidencia?.salon?.nombre || ''}
                title="Salón"
                disabled
              />
              <InfoRecurso recurso={incidencia?.recurso} />
            </Stack>
          </Grid>
        </Grid>
      </Dialogo>
      <DialogoConfirmacion
        open={isDialogoOpen}
        onClose={handleAprobarIncidencia}
        mensaje={MensajesConfirmacion.APROBAR_INCIDENCIA}
      />
    </>
  );
};

export default ModalIncidencia;
