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
  addAllowed?: boolean;
  onChange?: (image: File | string) => void;
  onRemoved?: (index: number) => void;
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
  addAllowed,
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
    if (onChange) onChange(event.target.files[0]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }, [onChange]);

  const readFiles = useCallback(async (images: (string | File)[]) => {
    const nuevoImagenesSrc: string[] = [];
    await Promise.all(images.map((image) => {
      if (typeof image === 'string') {
        setImagesSrc((prev) => [...prev, image]);
        nuevoImagenesSrc.push(image);
        return;
      }

      if (image instanceof File) {
        const reader = new FileReader();

        return new Promise<void>((resolve) => {
          reader.onload = function (e) {
            const { result } = e.target as any;
            nuevoImagenesSrc.push(result);
            resolve();
          };
          reader.readAsDataURL(image);
        });
      }
    }));

    setImagesSrc(nuevoImagenesSrc);
  }, []);

  const handleDeleteClick = useCallback((index: number) => {
    return () => {
      indexEliminado.current = index;
      if (onRemoved) onRemoved(index);
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
    if (longitudImagesSrc.current > images.length) {
      removeImage();
      return;
    }

    readFiles(images);
  }, [images, readFiles, removeImage]);

  return (
    <Box display="flex" flexDirection="column" gap={2} overflow="auto" maxWidth="90%">
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
        {addAllowed && <Box display="grid" alignItems="center">
          <IconButton onClick={handleClick}>
            <Add />
          </IconButton>
        </Box>}
      </Box>
    </Box>
  );
};

ListaImagenes.defaultProps = {
  images: [],
  onChange: () => {},
  deleteAllowed: true,
  addAllowed: true,
};

export default ListaImagenes;
