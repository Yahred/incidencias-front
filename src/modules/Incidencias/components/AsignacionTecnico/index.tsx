import { FC, useCallback } from 'react';

import { useQuery } from 'react-query';

import Drawer from '@mui/material/Drawer';
import CloseIcon from '@mui/icons-material/Close';
import { Grid, IconButton, Stack, Typography } from '@mui/material';

import { obtenerTecnicosPorArea } from '@services';
import ListaTecnicos from '../ListaTecnicos';
import { Usuario } from '@interfaces/index';

interface AsignacionTecnicoProps {
  open: boolean;
  area?: string;
  onClick: (tecnico: Usuario) => void;
  onCancelar: () => void;
}

const AsignacionTecnico: FC<AsignacionTecnicoProps> = ({ open, area, onClick, onCancelar }) => {
  const { data: tecnicos } = useQuery({
    queryKey: ['tecnicos', area],
    queryFn: () => obtenerTecnicosPorArea(area!),
    enabled: open && !!area,
    initialData: [],
  });

  const handleClick = useCallback((tecnico: Usuario) => {
    onClick(tecnico);
  }, [onClick]);

  return (
    <Drawer open={open} anchor="right" hideBackdrop sx={{ zIndex: 1500 }}>
      <Grid container p={4} rowSpacing={4} maxWidth={420}>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h4">Técnicos disponibles</Typography>
            <IconButton onClick={onCancelar}>
              <CloseIcon />
            </IconButton>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Typography>Seleccione el técnico que se encargará de atender la incidencia</Typography>
        </Grid>
        <Grid item xs={12}>
          <ListaTecnicos tecnicos={tecnicos} onClick={handleClick} />
        </Grid>
      </Grid>
    </Drawer>
  );
};

export default AsignacionTecnico;
