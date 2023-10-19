import Box from '@mui/material/Box';
import FiltrosConfiguracion from '../../components/FiltrosConfiguracion';
import { Suspense, useState } from 'react';
import { IFiltrosConfiguracion } from '@interfaces/Reportes';

const ElementosConfiguracion = () => {
  const [filtros, setFiltros] = useState<IFiltrosConfiguracion>({});

  return (
    <Suspense>
      <Box>
        <FiltrosConfiguracion value={filtros} onChange={setFiltros} />
      </Box>
    </Suspense>
  );
};

export default ElementosConfiguracion;
