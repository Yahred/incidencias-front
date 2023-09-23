import { FC, ReactNode, memo } from 'react';

import MuiTable from '@mui/material/Table';
import Skeleton from '@mui/material/Skeleton';
import {
  Box,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

import useStore from '../../stores/store';
import FadeIn from '../FadeIn';

export interface Cabeceros<T> {
  key?: string;
  label: string;
  transform?: (row: T) => string | ReactNode;
}

interface TableProps {
  cabeceros?: Cabeceros<any>[];
  rows?: any[];
}

const Table: FC<TableProps> = ({ cabeceros, rows }) => {
  const isLoading = useStore(({ isLoading }) => isLoading);

  return (
    <TableContainer>
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
          {isLoading &&
            [1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (
              <TableRow key={index}>
                {cabeceros!.map((_, index) => (
                  <TableCell
                    key={index}
                    component="th"
                    scope="row"
                    sx={{ border: 0 }}
                    align={index === 0 ? 'left' : 'right'}
                  >
                    <FadeIn delay={100}>
                      <Skeleton width="100%" height={30} />
                    </FadeIn>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          {!isLoading &&
            rows!.map((row, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                {cabeceros!.map((cabecero, index) => (
                  <TableCell
                    key={index}
                    component="th"
                    scope="row"
                    align={index === 0 ? 'left' : 'right'}
                  >
                    <FadeIn>
                      {cabecero.transform
                        ? cabecero.transform(row)
                        : row[cabecero.key!]}
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
              overflow: 'hidden'
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
