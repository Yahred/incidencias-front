import { FC, useCallback, useRef, useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import FormHelperText from '@mui/material/FormHelperText';
import Card from '@mui/material/Card';
import { styled } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

import ImagePreview from '@components/generales/ImagePreview';

interface FormFile {
  name: string;
  title?: string;
  subtitle?: string;
  required?: boolean;
  accept?: string;
  showPreview?: boolean;
  previewSrc?: string;
}

const InputHidden = styled('input')({
  display: 'none',
});

const FormFile: FC<FormFile> = ({
  name,
  title,
  subtitle,
  required,
  accept,
  showPreview,
  previewSrc,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const fileRef = useRef<HTMLInputElement | null>(null);

  const [uploadSrc, setUploadSrc] = useState<string>('');

  const handleClick = useCallback(() => {
    const { current: el } = fileRef;
    if (!el) return;
    el.click();
  }, []);

  const handleUploadChange = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      const { result: src } = e.target as any;
      setUploadSrc(src);
    };
    reader.readAsDataURL(file);
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
            accept={accept}
            value={value?.fileName}
            onChange={(event) => {
              if (!event.target.files) return;
              const [file] = event.target.files;
              onChange(file);
              handleUploadChange(file);
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
            {!!errors[name] && (
              <FormHelperText>{(errors[name] as any)?.message}</FormHelperText>
            )}
            {showPreview && (previewSrc || uploadSrc) && (
              <Box
                display="flex"
                justifyContent="center"
                position="relative"
                pt={2}
              >
                <Card elevation={2} sx={{ position: 'absolute', p: 0 }}>
                  <ImagePreview src={uploadSrc || previewSrc} />
                </Card>
              </Box>
            )}
          </Stack>
        </>
      )}
    />
  );
};

export default FormFile;
