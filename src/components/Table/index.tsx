import { FC, memo, JSX } from 'react';

import MuiTable from '@mui/material/Table';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

import useStore from '../../stores/store';
import FadeIn from '../FadeIn';
import { SxProps } from '@mui/material';

export interface Cabeceros<T> {
  key?: string;
  label: string;
  transform?: (row: T) => string | Element | JSX.Element;
  sx?: SxProps;
  align?: 'left' | 'right' | 'center' | 'inherit' | 'justify';
}

interface TableProps {
  cabeceros?: Cabeceros<any>[];
  rows?: any[];
}

const Table: FC<TableProps> = ({ cabeceros, rows }) => {
  const isLoading = useStore(({ isFetching: isLoading }) => isLoading);

  return (
    <TableContainer sx={{ overflowY: 'hidden' }}>
      <MuiTable sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {cabeceros!.map((cabecero, index) => (
              <TableCell
                key={index}
                sx={{ color: 'primary.main', fontWeight: 'bold' }}
                align={index === 0 ? 'left' : 'right'}
              >
                {cabecero.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading && (
            <TableRow>
              <TableCell
                colSpan={cabeceros?.length}
                sx={{ border: 'none', paddingTop: 0 }}
              >
                <LinearProgress />
              </TableCell>
            </TableRow>
          )}
          {!isLoading && rows!.map((row, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {cabeceros!.map((cabecero, index) => (
                <TableCell
                  key={index}
                  component="th"
                  scope="row"
                  align={cabecero.align || index === 0 ? 'left' : 'right'}
                  sx={cabecero.sx}
                >
                  <FadeIn translate>
                    {cabecero.transform
                      ? cabecero.transform(row)
                      : (row[cabecero.key!] || 'N / A')}
                  </FadeIn>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </MuiTable>
      {!isLoading && !rows?.length && (
        <FadeIn>
          <Box
            sx={{
              display: 'grid',
              placeItems: 'center',
              height: 420,
              overflow: 'hidden',
            }}
          >
            <Typography variant="h5">Sin registros</Typography>
          </Box>
        </FadeIn>
      )}
    </TableContainer>
  );
};

Table.defaultProps = {
  cabeceros: [],
  rows: [],
};

const TableMemo = memo(Table);

export default TableMemo;
