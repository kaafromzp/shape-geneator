import React from 'react';
import { ReactSVG } from 'react-svg';
import { SvgRenderProps } from './types';

const SvgRender = ( { src, style, onClick, ...rest }: SvgRenderProps ) => {

  return (
    <ReactSVG
      src={ src }
      path={ src }
      className={ `svg-wrap ${ rest.wrapperClassName || '' }` }
      style={ style }
      onClick={ onClick }
      { ...rest }
    />
  );
};

export default SvgRender;
