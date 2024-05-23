import React from 'react';
import { ImageComponentProps } from '@types/ImageComponentProps';

const ImageComponent: React.FC<ImageComponentProps> = ({ src, alt, className, width, height }) => {
  return (
    <img
      src={src}
      alt={alt}
      className={className || ''}
      style={{ width: width, height: height }}
    />
  );
};

export default ImageComponent;