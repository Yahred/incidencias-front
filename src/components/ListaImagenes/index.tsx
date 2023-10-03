import { FC, useCallback, useEffect, useRef, useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { IconButton, Typography, styled } from '@mui/material';
import { Add, Delete } from '@mui/icons-material';

import scrollbarMixin from '../../theme/scrollbar';

interface ListaImagenesProps {
  images: (string | File)[];
  title?: string;
  deleteAllowed?: boolean;
  onChange: (image: File | string) => void;
  onRemoved: (index: number) => void;
  onClick?: (index: number) => void;
}

const HiddenFileInput = styled('input')({
  display: 'none',
});

const Image = styled('img')({
  objectFit: 'cover',
  width: '100%',
  height: '100%',
});

const ListaImagenes: FC<ListaImagenesProps> = ({
  images,
  onChange,
  title,
  onRemoved,
  deleteAllowed,
  onClick,
}) => {
  const [imagesSrc, setImagesSrc] = useState<string[]>([]);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const longitudImagesSrc = useRef<number>(0);
  const indexEliminado = useRef<number | null>(null);

  const handleClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileSelected = useCallback((event: any) => {
    if (!event.target.files) return;
    onChange(event.target.files[0]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }, [onChange]);

  const readFiles = useCallback((images) => {
    images.forEach((image, index) => {
      if (typeof image === 'string') {
        setImagesSrc((prev) => [...prev, image]);
        return;
      }
      if (image instanceof File) {
        const reader = new FileReader();
        reader.onload = function (e) {
          const { result: src } = e.target as any;
          setImagesSrc((prev) => {
            const newImagesSrc = Object.values({
              ...prev,
              [index]: src,
            });
            return newImagesSrc as string[];
          });
        };
        reader.readAsDataURL(image);
      }
    });
  }, []);

  const addFile = useCallback((images) => {
    const image = images.at(-1);

    if (typeof image === 'string') {
      setImagesSrc((prev) => [...prev, image]);
      return;
    }

    if (image instanceof File) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const { result: src } = e.target as any;
        setImagesSrc((prev) => [...prev, src]);
      };
      reader.readAsDataURL(image);
    }
  }, []);

  const handleDeleteClick = useCallback((index: number) => {
    return () => {
      indexEliminado.current = index;
      onRemoved(index);
    };
  }, [onRemoved]);

  const removeImage = useCallback(() => {
    const eliminado = indexEliminado.current;
    indexEliminado.current = null;
    setImagesSrc((prev) => {
      prev.splice(eliminado!, 1);
      return [...prev];
    });
  }, []);

  const handleImageClick = useCallback((index: number) => {
    return () => {
      if (onClick) onClick(index);
    }
  }, [onClick]);

  useEffect(() => {
    longitudImagesSrc.current = imagesSrc.length;
  }, [imagesSrc]);

  useEffect(() => {
    if (!longitudImagesSrc.current) {
      readFiles(images);
      return;
    }

    if (longitudImagesSrc.current > images.length) {
      removeImage();
      return;
    }

    addFile(images);
  }, [images, readFiles, addFile, removeImage]);

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Typography>{title}</Typography>
      <Box display="flex" gap={2} py={2} width="100%" maxWidth="100%" overflow="auto" sx={{ ...scrollbarMixin }}>
        <HiddenFileInput
          ref={fileInputRef}
          onChange={handleFileSelected}
          type="file"
        />
        {imagesSrc.map((src, index) => (
          <Card
            sx={{
              display: 'flex',
              width: 250,
              height: 250,
              position: 'relative',
              cursor: onClick ? 'pointer' : 'auto',
            }}
            onClick={handleImageClick(index)}
          >
            {deleteAllowed && (
              <IconButton
                sx={{
                  top: 10,
                  right: 10,
                  position: 'absolute',
                }}
                onClick={handleDeleteClick(index)}
              >
                <Delete color="error" />
              </IconButton>
            )}
            <Image src={src} />
          </Card>
        ))}
        <Box display="grid" alignItems="center">
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
  deleteAllowed: true,
};

export default ListaImagenes;
