import { FC, ReactNode } from 'react';

import MuiTable from '@mui/material/Table';
import Skeleton from '@mui/material/Skeleton';
import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

import useStore from '../../stores/store';

export interface Cabeceros<T> {
  key?: string;
  label: string;
  transform?: (row: T) => string | ReactNode;
}

interface TableProps {
  cabeceros: Cabeceros<unknown>[];
  rows: any[];
}

const Table: FC<TableProps> = ({ cabeceros, rows }) => {
  const isLoading = useStore(({ isLoading }) => isLoading);

  return (
    <TableContainer>
      <MuiTable sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {cabeceros.map((cabecero, index) => (
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
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                {cabeceros.map((_, index) => (
                  <TableCell
                    key={index}
                    component="th"
                    scope="row"
                    align={index === 0 ? 'left' : 'right'}
                  >
                    <Skeleton width='100%' height={30} />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          {!isLoading &&
            rows.map((row, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                {cabeceros.map((cabecero, index) => (
                  <TableCell
                    key={index}
                    component="th"
                    scope="row"
                    align={index === 0 ? 'left' : 'right'}
                  >
                    {cabecero.transform
                      ? cabecero.transform(row)
                      : row[cabecero.key!]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
};

Table.defaultProps = {
  cabeceros: [],
  rows: [],
};

export default Table;
