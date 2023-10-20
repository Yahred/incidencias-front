import { FC } from 'react';

import Pagination from '@mui/material/Pagination';

interface PaginadorProps {
  pagina: number;
  totalPaginas: number;
  onChange: (event: React.ChangeEvent<unknown>, page: number) => void;
}

const Paginador: FC<PaginadorProps> = ({ pagina, totalPaginas, onChange }) => {
  return <Pagination count={totalPaginas} page={pagina} onChange={onChange} />;
};

export default Paginador;
