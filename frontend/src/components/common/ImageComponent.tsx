import { FC } from 'react';
import { ImageComponentProps } from '../../types/ImageComponentProps';

const ImageComponent: FC<ImageComponentProps> = ({ src, alt, className = '' }) => {
  return (
    <img
      src={src}
      alt={alt}
      className={className || ''}
    />
  );
};

export default ImageComponent;