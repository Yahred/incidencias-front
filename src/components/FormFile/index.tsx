import { FC, useCallback, useRef } from 'react';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

interface FormFile {
  name: string;
  title?: string;
  subtitle?: string;
  required?: boolean;
}

const InputHidden = styled('input')({
  display: 'none',
});

const FormFile: FC<FormFile> = ({ name, title, subtitle, required }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const fileRef = useRef<HTMLInputElement | null>(null);

  const handleClick = useCallback(() => {
    const { current: el } = fileRef;
    if (!el) return;
    el.click();
  }, []);

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={''}
      render={({ field: { value, onChange, ...field } }) => (
        <>
          <InputHidden
            {...field}
            ref={fileRef}
            type="file"
            value={value?.fileName}
            onChange={(event) => {
              onChange(event?.target?.files[0]);
            }}
          />
          <Stack gap="4px">
            <Typography variant="body1">
              {`${title} ${required ? '*' : ''}`}{' '}
            </Typography>
            <Typography variant="caption">{subtitle}</Typography>
            <Button sx={{ backgroundColor: 'gray' }} onClick={handleClick}>
              Cargar
            </Button>
          </Stack>
        </>
      )}
    />
  );
};

export default FormFile;
