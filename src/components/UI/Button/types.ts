import React from 'react';

export interface ButtonProps {
  svg?: string;
  text?: string;
  active?: boolean;
  disabled?: boolean;
  size?: 'long';
  title?: string;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}
