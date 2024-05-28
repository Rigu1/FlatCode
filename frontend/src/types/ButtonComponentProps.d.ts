import { ImageComponentProps } from './ImageComponentProps';


export interface ButtonComponentProps {
  text: string;
  onClick: () => void;
  imageProps: ImageComponentProps;
  size?: 'small' | 'medium' | 'large';
  hoverEffect?: 'none' | 'scale' | 'opacity';
}