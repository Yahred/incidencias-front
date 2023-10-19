import { FC, memo, useState } from 'react';

import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

const TabsIncidenciasC: FC = () => {
  const [indexTab, setIndexTab] = useState<number>(0);

  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs value={indexTab} onChange={(_, value) => setIndexTab(value)}>
        <Tab label="Incidencias Abiertas"/>
        <Tab label="Incidencias Terminadas"/>
      </Tabs>
    </Box>
  );
}

const TabsIncidencias = memo(TabsIncidenciasC);

export default TabsIncidencias;
