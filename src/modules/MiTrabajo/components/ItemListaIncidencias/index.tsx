import { FC } from 'react';

import {
  Button,
  Divider,
  ListItem,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';

import IndicadorEstatus from '@components/IndicadorEstatus';

import { Incidencia } from '@interfaces/Incidencia';
import InfoTecnico from '../../../../components/InfoTecnico';

interface ItemListaIncidenciasProps {
  incidencia: Incidencia;
  onClick?: () => void;
}

const ItemListaIncidencias: FC<ItemListaIncidenciasProps> = ({
  incidencia,
  onClick,
}) => {
  const { folio, titulo, atiende, estatus } = incidencia;

  return (
    <>
      <ListItem>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          px={2}
          pt={1}
          width={'100%'}
        >
          <Stack direction="row" gap={2} alignItems="center">
            <IndicadorEstatus estatus={estatus} />
            <Button onClick={onClick} variant="text">
              <Stack direction="row" gap={2}>
                <Typography variant="caption" fontWeight="bold">
                  {folio}
                </Typography>
                <Typography variant="body1">{titulo}</Typography>
              </Stack>
            </Button>
          </Stack>
          <Stack direction="row" gap={2}>
            <Tooltip
              title={`${atiende?.nombres} ${atiende?.apellidoPat} ${atiende?.apellidoMat}`}
              arrow
            >
              <InfoTecnico tecnico={atiende} sx={{ width: 45, height: 45 }} />
            </Tooltip>
          </Stack>
        </Stack>
      </ListItem>
      <Divider />
    </>
  );
};

export default ItemListaIncidencias;
