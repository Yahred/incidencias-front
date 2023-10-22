import { FC } from 'react';

import { Incidencia } from '../../interfaces/Incidencia';
import Dialogo from '../Dialogo';

import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import ListaImagenes from '@components/ListaImagenes';
import TextField from '@components/TextField';

interface ModalIncidenciaProps {
  incidencia: Incidencia | null;
  isOpen: boolean;
  onCerrar: () => void;
}

const ModalIncidencia: FC<ModalIncidenciaProps> = ({
  incidencia,
  isOpen,
  onCerrar,
}) => {
  return (
    <Dialogo
      open={isOpen}
      title={
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h4" fontWeight="bold">
            {incidencia?.titulo}
          </Typography>
          <Button onClick={onCerrar}>Cerrar</Button>
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
              disabled
            />
          </Stack>
        </Grid>
      </Grid>
    </Dialogo>
  );
};

export default ModalIncidencia;
