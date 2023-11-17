import { FC, useCallback, useState } from 'react';

import { useQuery } from 'react-query';
import { useForm } from 'react-hook-form';

import Drawer from '@mui/material/Drawer';
import { Grid, Typography } from '@mui/material';

import FormSelect from '@components/FormSelect';
import Form from '@components/Form';
import FormField from '@components/FormField';
import SubmitButton from '@components/SubmitButton';

import * as yup from 'yup';
import { CAMPO_REQUERIDO } from '@constants/validaciones';
import { yupResolver } from '@hookform/resolvers/yup';
import { Incidencia } from '@interfaces/Incidencia';
import { obtenerServiciosPorRecurso } from '@services';

interface DiagnosticoProps {
  onClick: () => void;
  incidencia: Incidencia | null;
}

const diagnosticoSchema = yup.object({
  diagnostico: yup.string().required(CAMPO_REQUERIDO),
  servicio: yup.string().required(CAMPO_REQUERIDO),
});

const Diagnostico: FC<DiagnosticoProps> = ({ incidencia }) => {
  const form = useForm({
    resolver: yupResolver(diagnosticoSchema),
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const { data: servicios } = useQuery({
    queryKey: ['servicios', incidencia?.recurso.id],
    queryFn: () => obtenerServiciosPorRecurso(incidencia!.recurso.id!),
    enabled: !!incidencia,
    initialData: [],
  });

  const handleClick = useCallback(() => {
    setIsDrawerOpen(true);
  }, []);

  const handleSubmit = useCallback((diagnostico) => {
    console.log(diagnostico);
  }, []);

  return (
    <>
      <SubmitButton onClick={handleClick} type="button">
        Dar diagnostico
      </SubmitButton>
      <Drawer open={isDrawerOpen}>
        <Form methods={form} onSubmit={handleSubmit}>
          <Grid container p={4} rowGap={2} sx={{ maxWidth: 520 }}>
            <Grid item xs={12}>
              <Typography variant="h5">Folio</Typography>
              <Typography variant="caption">{incidencia?.folio}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>¿Cuál es el diágnostico?</Typography>
            </Grid>
            <Grid item xs={12}>
              <FormField name="diagnostico" rows={4} multiline />
            </Grid>
            <Grid item xs={12}>
              <Typography>Selecciona el servicio</Typography>
            </Grid>
            <Grid item xs={12}>
              <FormSelect name="servicio" options={servicios!} />
            </Grid>
            <Grid item xs={12}>
              <SubmitButton>Guardar</SubmitButton>
            </Grid>
          </Grid>
        </Form>
      </Drawer>
    </>
  );
};

export default Diagnostico;
