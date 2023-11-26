import { FC, useCallback } from 'react';

import List from '@mui/material/List';

import ItemListaIncidencias from '../ItemListaIncidencias';

import { Incidencia } from '@interfaces/Incidencia';

interface ListaIncidenciasProps {
  incidencias: Incidencia[];
  onClick: (incidencia: Incidencia) => void;
}

const ListaIncidencias: FC<ListaIncidenciasProps> = ({
  incidencias,
  onClick,
}) => {
  const handleClick = useCallback((incidencia: Incidencia) => {
    return () => {
      onClick(incidencia);
    }
  }, [onClick])

  return (
    <List>
      {incidencias.map((incidencia) => (
        <ItemListaIncidencias
          key={incidencia.id}
          incidencia={incidencia}
          onClick={handleClick(incidencia)}
        />
      ))}
    </List>
  );
};

export default ListaIncidencias;
