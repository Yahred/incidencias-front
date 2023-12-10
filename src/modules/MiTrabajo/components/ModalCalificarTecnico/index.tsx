import { FC, useEffect } from 'react';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import Dialogo from '@components/contenedores/Dialogo';
import Form from '@components/formularios/Form';
import FormRating from '@components/formularios/FormRating';
import SubmitButton from '@components/formularios/SubmitButton';

import { Usuario } from '@interfaces/Usuario';
import { CAMPO_REQUERIDO } from '@constants/validaciones';

interface ModalCalificarTecnicoProps {
  tecnico?: Usuario;
  open: boolean;
  onSubmit: (evaluacion: any) => void;
  onClose: () => void;
}

const evaluacionFormularioSchema = yup.object().shape({
  puntualidad: yup.number().required(CAMPO_REQUERIDO),
  eficacia: yup.number().required(CAMPO_REQUERIDO),
  amabilidad: yup.number().required(CAMPO_REQUERIDO),
  tecnico: yup.string().required(CAMPO_REQUERIDO),
});

const ModalCalificarTecnico: FC<ModalCalificarTecnicoProps> = ({
  tecnico,
  open,
  onClose,
  onSubmit,
}) => {
  const form = useForm({
    resolver: yupResolver(evaluacionFormularioSchema),
    defaultValues: {
      puntualidad: 0,
      eficacia: 0,
      amabilidad: 0,
      tecnico: tecnico!.id!,
    },
  });

  useEffect(() => {
    if (open) form.reset();
  }, [open, form]);

  useEffect(() => {
    if (tecnico) form.setValue('tecnico', tecnico.id!);
  }, [tecnico, form]);

  return (
    <Dialogo
      open={open}
      title={
        <Typography variant="h4" textAlign="center">
          Calificar técnico
        </Typography>
      }
      onClickBotonCerrar={onClose}
      botonCerrar
    >
      <Form methods={form} onSubmit={onSubmit}>
        <Stack
          rowGap={2}
          alignItems="center"
          px={2}
          pb={4}
          sx={{ overflow: 'hidden' }}
        >
          <Avatar src={tecnico?.avatar} sx={{ width: 140, height: 140 }} />
          <Typography variant="h5">{`${tecnico?.nombres} ${tecnico?.apellidoPat} ${tecnico?.apellidoMat}`}</Typography>
          <Stack alignItems="center">
            <Typography variant="caption">
              ¿El técnico llegó a tiempo?
            </Typography>
            <FormRating name="puntualidad" />
          </Stack>
          <Stack alignItems="center">
            <Typography variant="caption">
              ¿El técnico cumplió en tiempo puntual?
            </Typography>
            <FormRating name="eficacia" />
          </Stack>
          <Stack alignItems="center">
            <Typography variant="caption">¿El técnico fue amable?</Typography>
            <FormRating name="amabilidad" />
          </Stack>
          <SubmitButton>Finalizar</SubmitButton>
        </Stack>
      </Form>
    </Dialogo>
  );
};

export default ModalCalificarTecnico;
