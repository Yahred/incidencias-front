import { FC, memo, useCallback, useState } from 'react';

import CircularProgress from '@mui/material/CircularProgress';
import { SxProps, styled } from '@mui/material';

import FadeIn from '../FadeIn';

interface ImagePreviewProps {
  src?: string;
  alt?: string;
  sx?: SxProps;
}

const Image = styled('img')({
  height: 160,
  width: 160,
  objectFit: 'cover',
  borderRadius: 6,
});

const ImagePreviewComponent: FC<ImagePreviewProps> = ({ alt, src, sx }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <>
      {isLoading && (
        <CircularProgress />
      )}
      <FadeIn>
        <Image
          onLoad={handleLoad}
          src={src}
          alt={alt}
          sx={{ ...sx, visibility: isLoading ? 'hidden' : 'visible' }}
        />
      </FadeIn>
    </>
  );
};

const ImagePreview = memo(ImagePreviewComponent);

export default ImagePreview;
