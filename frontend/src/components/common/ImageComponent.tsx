import React from 'react';
import { ImageComponentProps } from '../../types/ImageComponentProps';

const ImageComponent: React.FC<ImageComponentProps> = ({ src, alt, className }) => {
  return (
    <img
      src={src}
      alt={alt}
      className={className || ''}
    />
  );
};

export default ImageComponent;