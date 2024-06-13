import { ImageComponentProps } from './ImageComponentProps';

export interface ButtonComponentProps {
  text: string;
  onClick: () => void;
  imageProps?: ImageComponentProps;
  size?: 'small' | 'medium' | 'large';
  hoverEffect?: 'none' | 'scale' | 'opacity';
  className?: string;
  style?: React.CSSProperties; // Add this line to support custom styles
}
