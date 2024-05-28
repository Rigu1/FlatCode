import React from 'react';
import { ButtonComponentProps } from '../../types/ButtonComponentProps';
import ImageComponent from '@components/common/ImageComponent';

const ButtonComponent: React.FC<ButtonComponentProps> = ({ text, onClick, imageProps, size = 'medium', hoverEffect = 'none' }) => {
  return (
    <button className={`custom-button ${size} ${hoverEffect}`} onClick={onClick}>
      <ImageComponent {...imageProps} />
      {text}
    </button>
  );
};

export default ButtonComponent;