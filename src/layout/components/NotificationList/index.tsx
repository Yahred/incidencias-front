import { Notificacion } from '@interfaces/Notificacion';
import { List } from '@mui/material';
import { FC } from 'react';
import NotificactionItem from '../NotificationItem';

interface NotificationListProps {
  notificaciones: Notificacion[];
}

const NotificationList: FC<NotificationListProps> = ({ notificaciones }) => {
  return (
    <List>
      {notificaciones.map((notificacion) => (
        <NotificactionItem key={notificacion.id} notificacion={notificacion} />
      ))}
    </List>
  );
};

NotificationList.defaultProps = {
  notificaciones: [],
};

export default NotificationList;
