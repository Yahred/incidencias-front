import { FC, useCallback, useMemo, useState } from 'react';

import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Menu from '@mui/material/Menu';

import NotificationList from '../NotificationList';

import { Notificacion } from '@interfaces/Notificacion';

const notificaciones: Notificacion[] = [
  {
    id: '1',
    titulo: 'Se ha aprobado tu incidencia',
    descripcion: 'El jefe de departamento ha aprobado tu incidencia',
    vista: false,
  },
  {
    id: '2',
    titulo: 'Se ha aprobado tu incidencia',
    descripcion: 'El jefe de departamento ha aprobado tu incidencia',
    vista: false,

  },
  {
    id: '3',
    titulo: 'Se ha aprobado tu incidencia',
    descripcion: 'El jefe de departamento ha aprobado tu incidencia',
    vista: true,
  },
];

const Notifications: FC = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const numNotificacionesSinVer = useMemo(() => notificaciones.filter(({ vista }) => !vista).length, [])

  const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  return (
    <>
      <IconButton onClick={handleClick}>
        <Badge badgeContent={numNotificacionesSinVer} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClick={handleClose}>
        <NotificationList notificaciones={notificaciones} />
      </Menu>
    </>
  );
};

export default Notifications;
