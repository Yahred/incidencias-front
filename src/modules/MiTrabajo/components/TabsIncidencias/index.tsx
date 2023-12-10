import { FC, memo, useMemo } from 'react';

import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';

import ListaIncidencias from '../ListaIncidencias';
import FadeIn from '@components/animaciones/FadeIn';

import useTabsIncidencias from '../../hooks/useTabsIncidencias';
import { Incidencia } from '../../../../interfaces';
import { EstatusEnum } from '../../../../constants/estatus';

interface TabsIncidenciasProps {
  incidenciasTerminadas?: Incidencia[];
  incidenciasValidadas?: Incidencia[];
  onClick: (incidencia: Incidencia) => void;
}

const TabsIncidenciasC: FC<TabsIncidenciasProps> = ({
  incidenciasTerminadas,
  incidenciasValidadas,
  onClick,
}) => {
  const { indexTab, handleTabChange } = useTabsIncidencias();

  const incidenciasPorEstatus = useMemo(
    () => ({
      [EstatusEnum.Terminada]: incidenciasTerminadas,
      [EstatusEnum.Validado]: incidenciasValidadas,
    }),
    [incidenciasTerminadas, incidenciasValidadas]
  );

  return (
    <Box>
      <Tabs value={indexTab} onChange={handleTabChange}>
        <Tab value={EstatusEnum.Terminada} label="Incidencias Terminadas" />
        <Tab value={EstatusEnum.Validado} label="Incidencias Validadas" />
      </Tabs>
      {incidenciasPorEstatus[indexTab].length ? (
        <FadeIn>
          <ListaIncidencias
            incidencias={incidenciasPorEstatus[indexTab]}
            onClick={onClick}
          />
        </FadeIn>
      ) : (
        <FadeIn>
          <Box
            width={'100%'}
            display={'flex'}
            justifyContent={'center'}
            pt={12}
          >
            <Typography variant="h5">Sin incidencias</Typography>
          </Box>
        </FadeIn>
      )}
    </Box>
  );
};

TabsIncidenciasC.defaultProps = {
  incidenciasTerminadas: [],
  incidenciasValidadas: [],
};

const TabsIncidencias = memo(TabsIncidenciasC);

export default TabsIncidencias;
