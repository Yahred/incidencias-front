import { FC, useCallback } from 'react';

import { List, ListItem, Skeleton, Stack } from '@mui/material';

import FadeIn from '@components/FadeIn';

import useStore from '../../../../stores/store';
import { Usuario } from '@interfaces/Usuario';
import ItemListaTecnicos from '../ItemListaTecnicos';

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
  const isMutating = useStore(({ isMutating }) => isMutating);

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
          <ItemListaTecnicos
            key={tecnico.id}
            tecnico={tecnico}
            onClick={handleClick(tecnico)}
            disabled={isMutating}
          />
        ))}
      </List>
    </FadeIn>
  );
};

ListaTecnicos.defaultProps = {
  tecnicos: [],
};

export default ListaTecnicos;
