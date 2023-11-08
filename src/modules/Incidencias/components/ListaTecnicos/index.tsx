import { FC, useCallback } from 'react';

import {
  Avatar,
  List,
  ListItem,
  ListItemButton,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';

import { Usuario } from '@interfaces/Usuario';
import FadeIn from '@components/FadeIn';

interface ListaTecnicosProps {
  tecnicos?: Usuario[];
  onClick: (tecnico: Usuario) => void;
  isLoading?: boolean;
}

const ListaTecnicos: FC<ListaTecnicosProps> = ({
  tecnicos,
  onClick,
  isLoading,
}) => {
  const handleClick = useCallback(
    (tecnico: Usuario) => {
      return () => {
        onClick(tecnico);
      };
    },
    [onClick]
  );

  if (isLoading) {
    return (
      <List sx={{ width: '100%' }}>
        {[1, 2, 3, 4, 5].map((i) => (
          <ListItem key={i}>
            <Stack direction="row" gap={2} alignItems="center" width="100%">
              <Skeleton variant="circular" height={40} width={40} />
              <Skeleton height={30} width="100%" />
            </Stack>
          </ListItem>
        ))}
      </List>
    );
  }

  return (
    <FadeIn>
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
    </FadeIn>
  );
};

ListaTecnicos.defaultProps = {
  tecnicos: [],
};

export default ListaTecnicos;
