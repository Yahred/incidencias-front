import { FC } from 'react';

import { Incidencia } from "../../interfaces/Incidencia"
import Dialogo from '../Dialogo';
import { Typography } from '@mui/material';

interface ModalIncidenciaProps {
  incidencia: Incidencia | null;
  isOpen: boolean;
}

const   ModalIncidencia: FC<ModalIncidenciaProps> = ({ incidencia, isOpen }) => {
  return <Dialogo open={isOpen} maxWidth="xl" fullWidth>
    <Typography variant="h4"fontWeight="bold">{incidencia?.titulo}</Typography>
  </Dialogo>
}

export default ModalIncidencia;
