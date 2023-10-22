import { FC, Suspense, useEffect, useMemo, useState } from 'react';

import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';

import TabsReportes from './components/TabsReportes';

import { TABS_REPORTES } from '../../constants/menu';
import { Stack, Typography } from '@mui/material';

const Reportes: FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const opciones = useMemo(() => TABS_REPORTES, []);
  const [seleccion, setSeleccion] = useState(1);

  useEffect(() => {
    const opcion = opciones.find(({ id }) => id === seleccion);
    navigate(`.${opcion?.ruta}`);
  }, [seleccion, navigate, opciones, pathname]);

  return (
    <Suspense>
      <Stack padding={2} paddingTop={3} direction="column" rowGap={2}>
        <Box paddingX={2}>
          <Typography variant="h4">Reportes</Typography>
        </Box>
        <Stack direction="column">
          <TabsReportes
            value={seleccion}
            onChange={setSeleccion}
            options={opciones}
          />
          <Box padding={2}>
            <Outlet />
          </Box>
        </Stack>
      </Stack>
    </Suspense>
  );
};

export default Reportes;
