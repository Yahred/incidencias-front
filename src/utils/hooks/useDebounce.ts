import { useEffect, useState } from 'react';

const useDebounce = <Type>(value: Type, delay: number) => {
  const [debounced, setDebounce] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounce(value);
    }, delay);

    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debounced;
};

export default useDebounce;
