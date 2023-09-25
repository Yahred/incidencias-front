import { useEffect } from 'react';

const useFormSetEffect = (data: any, setValue: any) => {
  useEffect(() => {
    if (!data) return;

    Object.entries(data).forEach(([key, entrie]) => {
      setValue(key, entrie);
    });
  }, [data, setValue]);
};

export default useFormSetEffect;
