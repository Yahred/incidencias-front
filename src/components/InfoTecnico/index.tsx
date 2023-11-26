import { FC, useCallback, useMemo, useRef, useState } from 'react';

import { useQuery } from 'react-query';

import Menu from '@mui/material/Menu';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import { SxProps } from '@mui/material';

import FadeIn from '../FadeIn';

import { Usuario } from '@interfaces/Usuario';
import { obtenerInfoTecnico } from '@services';

interface InfoTecnicoProps {
  tecnico?: Usuario;
  tituloTooltip?: string;
  sx?: SxProps;
}

const InfoTecnico: FC<InfoTecnicoProps> = ({ tecnico, tituloTooltip, sx }) => {
  const [open, setOpen] = useState<boolean>(false);

  const anchorEl = useRef<HTMLDivElement | null>(null);

  const { data: info } = useQuery({
    queryKey: ['info-tecnico', tecnico?.id],
    queryFn: () => obtenerInfoTecnico(tecnico!.id!),
    enabled: !!tecnico,
  });

  const openInfo = useCallback(() => {
    setOpen(true);
  }, []);

  const closeInfo = useCallback(() => {
    setOpen(false);
  }, []);

  const areas = useMemo(
    () => info?.areas.map(({ nombre }) => nombre).join(', '),
    [info]
  );

  return (
    <>
      <Tooltip title={tituloTooltip || 'Click para ver más'} arrow>
        <Avatar
          ref={anchorEl}
          src={tecnico?.avatar}
          onClick={openInfo}
          sx={{ cursor: 'pointer', ...sx }}
        />
      </Tooltip>
      <Menu onClick={closeInfo} open={open} anchorEl={anchorEl.current}>
        <FadeIn>
          <Stack px={4} py={2} alignItems="center" gap={2}>
            <Avatar src={tecnico?.avatar} sx={{ height: 90, width: 90 }} />
            <Stack alignItems="center" gap={'8px'}>
              <Stack alignItems="center">
                <Typography variant="body1" fontWeight="bold" sx={{ mb: 0 }}>
                  {`${tecnico?.nombres} ${tecnico?.apellidoPat} ${tecnico?.apellidoMat}`}
                </Typography>
                <Typography variant="caption">{tecnico?.email}</Typography>
              </Stack>
              <Rating value={info?.evaluacion} readOnly />
              <Typography variant="caption">{areas}</Typography>
            </Stack>
          </Stack>
        </FadeIn>
      </Menu>
    </>
  );
};

export default InfoTecnico;
