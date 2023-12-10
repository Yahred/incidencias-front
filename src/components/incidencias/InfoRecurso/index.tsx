import { FC, useCallback, useMemo, useRef, useState } from 'react';

import { useQuery } from 'react-query';

import Menu from '@mui/material/Menu';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Info from '@mui/icons-material/Info';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';

import TextField from '../../formularios/TextField';

import { obtenerModeloPorRecursoId } from '@services';
import { Recurso } from '@interfaces/Recurso';

interface InfoRecursoProps {
  recurso?: Recurso;
}

const InfoRecurso: FC<InfoRecursoProps> = ({ recurso }) => {
  const [isInfoRecursoOpen, setIsInfoRecursoOpen] = useState<boolean>(false);

  const anchorElInfoRecurso = useRef<HTMLElement | null>(null);

  const handleInfoRecursoClick = useCallback(() => {
    setIsInfoRecursoOpen(true);
  }, []);

  const maxCaracteristicas = useMemo(() => 4, []);
  const { data: modelo } = useQuery({
    queryKey: ['modelo', recurso?.id],
    enabled: !!recurso?.id,
    staleTime: Infinity,
    queryFn: () => obtenerModeloPorRecursoId(recurso!.id),
  });

  const cerrarInfoRecuro = useCallback(() => {
    setIsInfoRecursoOpen(false);
  }, [])

  return (
    <>
      <TextField
        value={`${recurso?.folio} - ${recurso?.nombre}` || ''}
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
      <Menu
        onClick={cerrarInfoRecuro}
        open={isInfoRecursoOpen}
        anchorEl={anchorElInfoRecurso.current}
      >
        <Box px={2}>
          <Stack rowGap={2} py={2}>
            {modelo?.imagen && (
              <Avatar
                sx={{ width: 150, height: 150, alignSelf: 'center' }}
                src={modelo.imagen}
                variant='rounded'
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
    </>
  );
};

export default InfoRecurso;
