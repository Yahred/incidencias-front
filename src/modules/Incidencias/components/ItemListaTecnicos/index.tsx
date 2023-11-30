import { FC, useCallback } from 'react';

import {
  ListItem,
  ListItemButton,
  Stack,
  Avatar,
  Typography,
} from '@mui/material';

import { Usuario } from '@interfaces/Usuario';

interface ItemListaTecnicosProps {
  tecnico: Usuario;
  onClick: (tecnico: Usuario) => void;
  disabled?: boolean;
}

const ItemListaTecnicos: FC<ItemListaTecnicosProps> = ({
  tecnico,
  onClick,
  disabled,
}) => {
  const { avatar, nombres, apellidoPat, apellidoMat } = tecnico;

  const handleClick = useCallback(() => {
    onClick(tecnico)
  } , [onClick, tecnico])

  return (
    <ListItem>
      <ListItemButton onClick={handleClick} disabled={disabled}>
        <Stack direction="row" gap={2} alignItems="center">
          <Avatar src={avatar} />
          <Typography>{`${nombres} ${apellidoPat} ${apellidoMat}`}</Typography>
        </Stack>
      </ListItemButton>
    </ListItem>
  );
};

export default ItemListaTecnicos;
