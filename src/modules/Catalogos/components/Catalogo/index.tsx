import { FC, useCallback, useMemo, useRef, useState } from 'react';

import { useMutation, useQuery } from 'react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Grid from '@mui/material/Grid';
import Search from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';

import FadeIn from '@components/animaciones/FadeIn';
import Table, { Cabeceros } from '@components/generales/Table';
import TextField from '@components/formularios/TextField';
import Paginador from '@components/generales/Paginador';
import DialogoConfirmacion from '@components/generales/DialogoConfirmacion';

import useDebounce from '@hooks/useDebounce';
import usePagination from '@hooks/usePagination';
import { Paginado } from '@interfaces/Paginado';
import { DEBOUNCE_TIME } from '@constants/general';

interface CatalogoProps {
  cabeceros: Cabeceros<any>[];
  title?: string;
  placeholderBusqueda?: string;
  agregarText?: string;
  queryFn: (q: string, pagina?: string) => Promise<Paginado<any>>;
  deleteFn: (id: string) => Promise<any>
}

const Catalogo: FC<CatalogoProps> = ({
  cabeceros,
  title,
  placeholderBusqueda,
  queryFn,
  agregarText,
  deleteFn,
}) => {
  const navigate = useNavigate();

  const [dialogoConfirmacioOpen, setDialogoConfirmacionOpen] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams({ pagina: '1', q: '' });

  const { handlePaginaChange, pagina } = usePagination(searchParams, setSearchParams);

  const debounceQ = useDebounce<string>(
    searchParams.get('q') || '',
    DEBOUNCE_TIME
  );

  const { data, refetch } = useQuery({
    queryFn: () => queryFn(debounceQ, searchParams.get('pagina')!),
    queryKey: [title, debounceQ, searchParams.get('pagina')],
    staleTime: 0,
  });

  const { mutateAsync: borrar } = useMutation({
    mutationKey: [title, 'delete'],
    mutationFn: deleteFn,
    onSuccess: () => refetch(),
  });

  const idDelete = useRef<string | null>(null);

  const handleDialogoConfirmacionClose = useCallback(async (confirmado: boolean) => {
    setDialogoConfirmacionOpen(false);
    if (confirmado) await borrar(idDelete.current!);
  }, [borrar]);

  const handleDelete = useCallback((id: string) => {
    return () => {
      idDelete.current = id;
      setDialogoConfirmacionOpen(true);
    }
  }, []);

  const handleEdit = useCallback((id: string) => {
    return () => {
      navigate(`./${id}`)
    }
  }, [navigate]);

  const cabecerosCatalogo = useMemo<Cabeceros<any>[]>(() => [
    ...cabeceros,
    {
      label: 'Acciones',
      transform: ({ id }: any) => <Box display='flex' gap={1} justifyContent={'flex-end'}>
        <IconButton onClick={handleEdit(id)}>
          <Icon>edit</Icon>
        </IconButton>
        <IconButton onClick={handleDelete(id)}>
          <Icon>delete</Icon>
        </IconButton>
      </Box>,
    }
  ], [cabeceros, handleEdit, handleDelete]);

  const handleAgregarClick = useCallback(() => {
    navigate('./formulario');
  }, [navigate]);

  const handleSearchChange = useCallback((q: string) => {
    setSearchParams({ q, pagina: '1' });
  }, [setSearchParams]);

  return (
    <>
      <Grid container rowSpacing={4}>
        <Grid item xs={12}>
          <Typography variant="h4">{title}</Typography>
        </Grid>
        <Grid
          item
          container
          rowSpacing={2}
          xs={12}
          display="flex"
          justifyContent="space-between"
        >
          <Grid item xs={12} lg={6}>
            <TextField
              placeholder={placeholderBusqueda}
              onTextChange={handleSearchChange}
              value={searchParams.get('q') || ''}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }} />
          </Grid>
          <Grid item xs={12} lg={6} display="flex" justifyContent="flex-end">
            <Button type='button' onClick={handleAgregarClick}>{agregarText}</Button>
          </Grid>
        </Grid>
        <Grid item xs={12} minHeight='50svh'>
          <Table cabeceros={cabecerosCatalogo} rows={data?.docs} />
        </Grid>
        <Grid item xs={12}>
          <FadeIn delay={350}>
            <Paginador
              onChange={handlePaginaChange}
              pagina={pagina || 1}
              totalPaginas={data?.totalPages || 1}
            />
          </FadeIn>
        </Grid>
      </Grid>
      <DialogoConfirmacion open={dialogoConfirmacioOpen} onClose={handleDialogoConfirmacionClose} />
    </>
  );
};

export default Catalogo;
