import { FC, useCallback, useRef, useState } from 'react';

import { Incidencia } from '../../interfaces/Incidencia';

import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Info from '@mui/icons-material/Info';

import ListaImagenes from '@components/ListaImagenes';
import TextField from '@components/TextField';
import Dialogo from '../Dialogo';
import DialogoConfirmacion from '../DialogoConfirmacion';
import InfoRecurso from '../InfoRecurso';
import SubmitButton from '../SubmitButton';

import { MensajesConfirmacion } from '@constants/general';

interface ModalIncidenciaProps {
  incidencia: Incidencia | null;
  isOpen: boolean;
  onCerrar: () => void;
  aprobarIncidencia?: boolean;
  onAprobar?: (id: string) => Promise<void>;
}

const ModalIncidencia: FC<ModalIncidenciaProps> = ({
  incidencia,
  isOpen,
  onCerrar,
  aprobarIncidencia,
  onAprobar,
}) => {
  const [isDialogoOpen, setIsDialogoOpen] = useState<boolean>(false);
  const [isInfoRecursoOpen, setIsInfoRecursoOpen] = useState<boolean>(false);

  const anchorElInfoRecurso = useRef<HTMLElement | null>(null);

  const handleAprobarIncidencia = useCallback((confirmado: boolean) => {
    setIsDialogoOpen(false);
    if (!confirmado) return;
    onAprobar!(incidencia!.id!);
  }, [onAprobar, incidencia]);

  const handleInfoRecursoClick = useCallback(() => {
    setIsInfoRecursoOpen(true);
  }, []);

  return (
    <>
      <Dialogo
        open={isOpen}
        title={
          <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" rowGap={{ xs: 4, sm: 0 }}>
            <Typography sx={{  order: { xs: 2, md: 1 } }} variant="h4" fontWeight="bold">
              {incidencia?.titulo}
            </Typography>
            <Stack order={{ xs: 1 }} direction="row" gap={2} justifyContent={{ xs: 'flex-end' }}>
              {aprobarIncidencia && (
                <SubmitButton color="success" onClick={() => setIsDialogoOpen(true)}>
                  Aprobar
                </SubmitButton>
              )}
              <Button onClick={onCerrar}>Cerrar</Button>
            </Stack>
          </Stack>
        }
        maxWidth="xl"
        fullWidth
      >
        <Grid container rowSpacing={4} p={3}>
          <Grid item lg={8} xs={12}>
            <Stack>
              <Typography>{incidencia?.descripcion}</Typography>
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
            item
            lg={4}
            xs={12}
            sx={{ borderLeft: 4, borderColor: 'primary.main' }}
          >
            <Stack px={2} rowGap={2}>
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
              <TextField
                value={incidencia?.recurso?.nombre || ''}
                title="Recurso"
                InputProps={{
                  endAdornment: (
                    <Box ref={anchorElInfoRecurso}>
                      <IconButton onClick={handleInfoRecursoClick}>
                        <Info />
                      </IconButton>
                    </Box>
                  ),
                }}
                disabled
              />
            </Stack>
          </Grid>
        </Grid>
      </Dialogo>
      <DialogoConfirmacion
        open={isDialogoOpen}
        onClose={handleAprobarIncidencia}
        mensaje={MensajesConfirmacion.APROBAR_INCIDENCIA}
      />
      <InfoRecurso
        open={isInfoRecursoOpen}
        anchorEl={anchorElInfoRecurso.current}
        recursoId={incidencia?.recurso.id}
        onClick={() => setIsInfoRecursoOpen(false)}
      />
    </>
  );
};

export default ModalIncidencia;
