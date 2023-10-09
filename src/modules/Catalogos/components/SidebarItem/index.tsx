import { FC, useCallback } from 'react';

import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Icon from '@mui/material/Icon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import { ISidebarItem } from '../../../../interfaces/SidebarItem';

interface SidebarItemProps {
  item: ISidebarItem;
  seleccionado: boolean;
  onClick: (ruta: string) => void;
  divider: boolean;
}

const SidebarItemComponent: FC<SidebarItemProps> = ({
  item,
  seleccionado,
  onClick,
  divider,
}) => {
  const handleClick = useCallback(() => {
    onClick(item.ruta!);
  }, [onClick, item.ruta]);

  if (divider) {
    return (
      <Box py={1}>
        <Divider />
      </Box>
    );
  }

  return (
    <ListItem disablePadding>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <Icon color={seleccionado ? 'secondary' : 'inherit'}>
            {item.icono}
          </Icon>
        </ListItemIcon>
        <ListItemText
          sx={{
            color: seleccionado ? 'secondary.main' : 'inherit',
            fontSize: 12,
          }}
          primary={
            <Typography
              variant="caption"
              sx={{
                color: seleccionado ? 'secondary.main' : 'inherit',
              }}
            >
              {item.nombre}
            </Typography>
          }
        />
      </ListItemButton>
    </ListItem>
  );
};

export default SidebarItemComponent;
