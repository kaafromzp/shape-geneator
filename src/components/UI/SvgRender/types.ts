import { CSSProperties } from 'react';

export interface SvgRenderProps {
  src: string;
  wrapperClassName?: string;
  style?: CSSProperties;
  draggable?: boolean;
  onClick?: () => void;
}
