import { useCallback, useMemo } from 'react';
import { SetURLSearchParams } from 'react-router-dom';

const usePagination = (searchParams: URLSearchParams, setSearchParams: SetURLSearchParams) => {
  const pagina = useMemo(() => Number(searchParams.get('pagina')), [searchParams]);

  const handlePaginaChange = useCallback((_, page: number) => {
    setSearchParams((prev) => {
      const copy = new URLSearchParams(prev);
      copy.set('pagina', page.toString());
      return copy;
    });
  }, [setSearchParams]);

  return {
    handlePaginaChange,
    pagina,
  };
};

export default usePagination;
