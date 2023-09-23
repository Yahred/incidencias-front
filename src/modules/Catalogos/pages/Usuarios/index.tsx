import { FC, useMemo, useState } from 'react';

import Grid from '@mui/material/Grid';
import { Button, InputAdornment, Typography } from '@mui/material';
import { Search } from '@mui/icons-material';

import Table, { Cabeceros } from '../../../../components/Table';
import TextField from '../../../../components/TextField';
import { useQuery } from 'react-query';
import { obtenerUsuarios } from '../../services';
import { Usuario } from '../../../../interfaces/Usuario';
import useDebounce from '../../../../utils/hooks/useDebounce';
import { DEBOUNCE_TIME } from '../../../../constants/general';

const rows = [
  {
    username: 'Yahred',
    nombreCompleto: 'Yahred Gastelum',
    tipoUsuario: { nombre: 'Acádemico' },
  },
  {
    username: 'Jesus',
    nombreCompleto: 'Jesus Manjarrez',
    tipoUsuario: { nombre: 'Técnico' },
  }
]

const cabeceros: Cabeceros<Usuario>[] = [
  {
    label: 'Usuario',
    key: 'username'
  },
  {
    label: 'Nombre',
    key: 'nombres'
  },
  {
    label: 'Tipo',
    transform: ({ tipoUsuario }) => tipoUsuario.nombre!,
  },
];


const Usuarios: FC = () => {
  const [q, setQ] = useState<string>('');
  const debounceQ = useDebounce<string>(q, DEBOUNCE_TIME);

  const { data } = useQuery({
    queryFn: () => obtenerUsuarios(debounceQ),
    queryKey: [debounceQ],
    keepPreviousData: true,
    staleTime: 1000,
  });

  return (
    <Grid container rowSpacing={4}>
      <Grid item xs={12}>
        <Typography variant="h4">Usuarios</Typography>
      </Grid>
      <Grid
        item
        container
        xs={12}
        display="flex"
        justifyContent="space-between"
      >
        <Grid item xs={6}>
          <TextField
            placeholder="Buscar usuario"
            onTextChange={setQ}
            value={q}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={6} display="flex" justifyContent="flex-end">
          <Button>Agregar usuario</Button>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Table cabeceros={cabeceros} rows={data?.docs} />
      </Grid>
    </Grid>
  );
};

export default Usuarios;
