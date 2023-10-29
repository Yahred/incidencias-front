import { FC, useMemo } from 'react';

import { useQuery } from 'react-query';

import Menu from '@mui/material/Menu';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import ImagePreview from '../ImagePreview';

import { obtenerModeloPorRecursoId } from '../../services';

interface InfoRecursoProps {
  recursoId?: string;
  anchorEl: HTMLElement | null;
  open: boolean;
  onClick: () => void;
}

const InfoRecurso: FC<InfoRecursoProps> = ({
  open,
  recursoId,
  anchorEl,
  onClick,
}) => {
  const maxCaracteristicas = useMemo(() => 4, []);
  const { data: modelo } = useQuery({
    queryKey: ['modelo', recursoId],
    enabled: !!recursoId,
    staleTime: Infinity,
    queryFn: () => obtenerModeloPorRecursoId(recursoId!),
  });

  return (
    <Menu onClick={onClick} open={open} anchorEl={anchorEl}>
      <Box px={2}>
        <Stack rowGap={2}>
          {modelo?.imagen && (
            <ImagePreview
              sx={{ width: 80, objectFit: 'cover' }}
              src={modelo.imagen}
            />
          )}
          <Typography>Modelo {modelo?.nombre}</Typography>
          <Stack rowGap={1}>
            {modelo?.caracteristicas
              ?.slice(0, maxCaracteristicas)
              .map(({ nombre, unidad, valor }) => (
                <Stack key={nombre} direction="row" gap={2}>
                  <Typography variant="caption">{`${nombre}: ${valor} ${unidad}`}</Typography>
                </Stack>
              ))}
            {modelo?.caracteristicas &&
              modelo.caracteristicas.length > maxCaracteristicas && (
                <Typography variant="caption">...</Typography>
              )}
          </Stack>
        </Stack>
      </Box>
    </Menu>
  );
};

export default InfoRecurso;
