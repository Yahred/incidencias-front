import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { IconButton, Typography, styled } from '@mui/material';
import { Add, Delete } from '@mui/icons-material';

interface ListaImagenesProps {
  images: (string | File)[];
  title?: string;
  onChange: (image: File | string) => void;
  onRemoved: (index: number) => void;
}

const HiddenFileInput = styled('input')({
  display: 'none',
});

const Image = styled('img')({
  objectFit: 'cover',
  width: '100%',
  height: '100%'
});

type ImageSrc = {
  src: string;
  index: number;
}

const ListaImagenes: FC<ListaImagenesProps> = ({ images, onChange, title, onRemoved }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [imagesSrc, setImagesSrc] = useState<ImageSrc[]>([]);

  const orderedImages = useMemo(() =>
    [...imagesSrc].sort((a, b) => a.index - b.index).map(({ src }) => src),
  [imagesSrc]);

  const longitudImagesSrc = useRef<number>(0);

  const handleClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileSelected = useCallback((event: any) => {
    if (!event.target.files) return;
    onChange(event.target.files[0]);
  }, [onChange]);

  const readFiles = useCallback((images) => {
    images.forEach((image, index) => {
      if (typeof image === 'string') {
        return;
      }
      if (image instanceof File) {
        const reader = new FileReader();
        reader.onload = function (e) {
          const { result: src } = e.target as any;
          setImagesSrc((prev) => {
            const newImagesSrc = Object.values({
              ...prev,
              [index]: { src, index },
            });
            return newImagesSrc as ImageSrc[];
          });
        };
        reader.readAsDataURL(image);
      }
    });
  }, []);

  const removeImage = useCallback((index) => {
    return () => {
      setImagesSrc([]);
      onRemoved(index);
    };
  }, [onRemoved]);

  useEffect(() => {
    longitudImagesSrc.current = imagesSrc.length;
  }, [imagesSrc]);

  useEffect(() => {
    readFiles(images);
  }, [images, readFiles]);

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Typography>{title}</Typography>
      <Box display="flex" gap={2} width="100%">
        <HiddenFileInput
          ref={fileInputRef}
          onChange={handleFileSelected}
          type="file"
        />
        {orderedImages.map((src, index) => (
          <Card sx={{ display: 'flex', maxWidth: 260, height: 250, position: 'relative' }}>
            <IconButton sx={{
              top: 10,
              right: 10,
              position: 'absolute'
            }}
              onClick={removeImage(index)}
            >
              <Delete color='error' />
            </IconButton>
            <Image src={src} />
          </Card>
        ))}
        <Box display="grid" alignItems="center" >
          <IconButton onClick={handleClick}>
            <Add />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

ListaImagenes.defaultProps = {
  images: [],
  onChange: () => {},
};

export default ListaImagenes;
