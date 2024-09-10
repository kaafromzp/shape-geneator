import React from 'react';
import './index.scss';
import SvgRender from '../SvgRender';
import { ButtonProps } from './types';

const Button = (
  {
    onClick,
    text,
    title,
    className,
    disabled,
    svg
  }: ButtonProps ) => {
  return (
    <button
      className={ `button ${ className }` }
      disabled={ disabled }
      onClick={ onClick }
      title={ title }
    >
      {svg && <SvgRender src={ svg }/>}
      {text}
    </button>
  );
};

export default Button;
