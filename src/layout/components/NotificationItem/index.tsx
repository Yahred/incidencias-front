import { FC } from 'react';

import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import Stack from '@mui/material/Stack';

import { Notificacion } from '@interfaces/Notificacion';
import { Typography, styled } from '@mui/material';

interface NotificationItemProps {
  notificacion: Notificacion;
}

const Dot = styled('div')(({ theme: { palette } }) => ({
  borderRadius: '50%',
  backgroundColor: palette.success.main,
  height: 12,
  width: 12
}));

const NotificactionItem: FC<NotificationItemProps> = ({ notificacion }) => {
  return (
    <>
      <ListItem>
        <Stack direction="row" gap={2}>
          <Stack>
            <Typography variant="body1">{notificacion.titulo}</Typography>
            <Typography variant="body2">{notificacion.descripcion}</Typography>
          </Stack>
          {!notificacion.vista && <Dot />}
        </Stack>
      </ListItem>
      <Divider />
    </>
  );
};

export default NotificactionItem;
