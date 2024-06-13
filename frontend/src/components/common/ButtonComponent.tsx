import React from 'react';
import { ButtonComponentProps } from '../../types/ButtonComponentProps';
import ImageComponent from '@components/common/ImageComponent';
import styled from 'styled-components';

const StyledButton = styled.button<{ size: 'small' | 'medium' | 'large' }>`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  background-color: #181818;
  color: #fff;

  &.small {
    padding: 4px;
  }

  &.medium {
    padding: 8px;
  }

  &.large {
    padding: 12px;
  }

  &.scale:hover {
    transform: scale(1.1);
  }

  &.opacity:hover {
    opacity: 0.7;
  }
`;

const ButtonComponent: React.FC<ButtonComponentProps> = ({
  text,
  onClick,
  imageProps,
  size = 'medium',
  hoverEffect = 'none',
  className = '',
  style, // Destructure the style prop
}) => {
  return (
    <StyledButton
      className={`custom-button ${size} ${hoverEffect} ${className}`}
      onClick={onClick}
      size={size}
      style={style} // Apply the style prop
    >
      {imageProps && <ImageComponent {...imageProps} />}
      {text}
    </StyledButton>
  );
};

export default ButtonComponent;
