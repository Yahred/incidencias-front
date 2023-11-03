import { FC, useCallback } from 'react';

import {
  Avatar,
  List,
  ListItem,
  ListItemButton,
  Stack,
  Typography,
} from '@mui/material';

import { Usuario } from '@interfaces/Usuario';

interface ListaTecnicosProps {
  tecnicos?: Usuario[];
  onClick: (tecnico: Usuario) => void;
}

const ListaTecnicos: FC<ListaTecnicosProps> = ({ tecnicos, onClick }) => {
  const handleClick = useCallback(
    (tecnico: Usuario) => {
      return () => {
        onClick(tecnico);
      };
    },
    [onClick]
  );

  return (
    <List>
      {tecnicos?.map((tecnico) => (
        <ListItem key={tecnico.id}>
          <ListItemButton onClick={handleClick(tecnico)}>
            <Stack direction="row" gap={2} alignItems="center">
              <Avatar src={tecnico.avatar} />
              <Typography>{`${tecnico.nombres} ${tecnico.apellidoPat} ${tecnico.apellidoMat}`}</Typography>
            </Stack>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

ListaTecnicos.defaultProps = {
  tecnicos: [],
};

export default ListaTecnicos;
